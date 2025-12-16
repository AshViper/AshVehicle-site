<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { createI18n } from '../lib/i18n.svelte.js';
  
  const i18n = createI18n();

  let { modelPath = '', modelName = '', onClose = () => {} } = $props();

  // Check if this is a weapon model
  const weaponNames = ['R-60', 'CBU-87', 'GBU-57', 'AIM-9', 'AIM-120', 'AGM-114', 'X-101', 'Tomahawk', 'JASSM', 'Toilet Bomb', 'Ballistic'];
  const isWeapon = weaponNames.some(w => modelName.toUpperCase().includes(w.toUpperCase()));

  let container;
  let renderer, scene, camera, controls, model, podium, modelGroup;
  let animationId;
  let isDragging = $state(false);
  let isLoading = $state(true);
  let loadProgress = $state(0);
  let isVisible = $state(false);
  let isClosing = $state(false);
  
  // Quality settings
  const qualityLevels = [
    { key: 'low', pixelRatio: 0.5, shadows: false, antialias: false },
    { key: 'medium', pixelRatio: 1, shadows: true, antialias: true },
    { key: 'high', pixelRatio: 1.5, shadows: true, antialias: true },
    { key: 'ultra', pixelRatio: 2, shadows: true, antialias: true }
  ];
  
  // Auto-detect quality based on device
  function detectQuality() {
    // Check localStorage first
    const saved = localStorage.getItem('modelViewerQuality');
    if (saved !== null) {
      const level = parseInt(saved);
      if (level >= 0 && level <= 3) return level;
    }
    
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 0;
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const gpu = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
    
    // Check for mobile or low-end
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isLowEnd = /Intel|Mali|Adreno 3|Adreno 4/i.test(gpu);
    
    if (isMobile || isLowEnd) return 1; // Medium
    if (window.devicePixelRatio >= 2) return 3; // Ultra for retina
    return 2; // High
  }
  
  let qualityLevel = $state(detectQuality());
  
  function saveQuality(level) {
    localStorage.setItem('modelViewerQuality', level.toString());
  }
  
  function setQuality(level) {
    qualityLevel = level;
    saveQuality(level);
    const q = qualityLevels[level];
    
    if (renderer) {
      renderer.setPixelRatio(q.pixelRatio);
      renderer.shadowMap.enabled = q.shadows;
      
      // Update shadow casting on lights
      scene.traverse((obj) => {
        if (obj.isLight && obj.shadow) {
          obj.castShadow = q.shadows;
        }
      });
    }
  }

  onMount(() => {
    // Fade in
    setTimeout(() => isVisible = true, 10);
    initScene();
    loadModel();
    animate();
    window.addEventListener('resize', onResize);
  });

  onDestroy(() => {
    cleanup();
  });

  function initScene() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);

    // Camera
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(5, 3, 5);

    // Renderer with quality settings
    const q = qualityLevels[qualityLevel];
    renderer = new THREE.WebGLRenderer({ 
      antialias: q.antialias, 
      alpha: true, 
      powerPreference: 'high-performance',
      precision: 'highp'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(q.pixelRatio);
    renderer.shadowMap.enabled = q.shadows;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.minDistance = 1;   // Minimum zoom (closest)
    controls.maxDistance = 3.5; // Maximum zoom (not too far)
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomSpeed = 0.5; // Slower zoom

    // Lights
    // Ambient
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    // Key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = q.shadows;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    keyLight.shadow.bias = 0;
    keyLight.shadow.normalBias = 0;
    keyLight.shadow.radius = 4;
    scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x8888ff, 0.3);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0xff6b35, 0.5);
    rimLight.position.set(0, 5, -8);
    scene.add(rimLight);
    
    // Top light
    const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);
    
    // Main spotlight from above (projector style)
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.3;
    spotLight.decay = 1;
    spotLight.distance = 20;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.bias = 0;
    spotLight.shadow.normalBias = 0;
    spotLight.shadow.radius = 4;
    scene.add(spotLight);
    
    // Secondary spotlight (accent)
    const spotLight2 = new THREE.SpotLight(0xff6b35, 0.8);
    spotLight2.position.set(3, 6, 3);
    spotLight2.angle = Math.PI / 5;
    spotLight2.penumbra = 0.5;
    spotLight2.decay = 1;
    scene.add(spotLight2);

    // Base podium for all
    const podiumGeometry = new THREE.CylinderGeometry(1, 1.1, 0.1, 64);
    const podiumMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.3,
      metalness: 0.8
    });
    podium = new THREE.Mesh(podiumGeometry, podiumMaterial);
    podium.position.y = 0;
    podium.receiveShadow = true;
    scene.add(podium);
    
    // Glowing orange ring for all
    const ringGeometry = new THREE.TorusGeometry(1.05, 0.03, 16, 64);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b35,
      emissive: 0xff6b35,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.5
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.06;
    scene.add(ring);
    
    // Inner glow disc
    const glowGeometry = new THREE.CircleGeometry(1, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b35,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.06;
    scene.add(glow);
    
    // Weapon stand pole (only for weapons)
    if (isWeapon) {
      const poleMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.3,
        metalness: 0.9
      });
      
      // Just vertical pole
      const poleGeometry = new THREE.CylinderGeometry(0.04, 0.04, 1.0, 16);
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.y = 0.6;
      pole.castShadow = true;
      scene.add(pole);
    }

    // Ground plane for shadows
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    scene.add(ground);
  }

  function loadModel() {
    const loader = new GLTFLoader();
    
    // Create group for rotation
    modelGroup = new THREE.Group();
    scene.add(modelGroup);
    
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        
        // Get bounding box
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Scale to fit (target size ~2 units)
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);
        
        // Recalculate bounding box after scaling
        box.setFromObject(model);
        box.getCenter(center);
        box.getSize(size);
        
        // Center model exactly at origin
        model.position.set(-center.x, -center.y, -center.z);
        
        // Add model to group, then position group on podium
        modelGroup.add(model);
        
        if (isWeapon) {
          // Position weapon on top of pole (no rotation - keep original orientation)
          modelGroup.position.y = 1.2;
        } else {
          modelGroup.position.y = size.y / 2 + 0.1; // Lift to sit on podium
          
          // Resize podium to fit model
          const podiumRadius = Math.max(size.x, size.z) * 0.6;
          podium.geometry.dispose();
          podium.geometry = new THREE.CylinderGeometry(podiumRadius, podiumRadius * 1.1, 0.1, 64);
          podium.position.y = 0;
        }
        
        // Enable shadows
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        isLoading = false;
        
        // Adjust camera based on model size
        if (isWeapon) {
          // For weapons - look at the weapon, not the pole
          camera.position.set(3, 2, 3);
          controls.target.set(0, 1.2, 0); // Focus on weapon height
        } else {
          const cameraDistance = Math.max(size.x, size.z) * 1.2;
          camera.position.set(cameraDistance, cameraDistance * 0.4, cameraDistance);
          controls.target.set(0, size.y * 0.35, 0);
        }
        controls.update();
      },
      (progress) => {
        if (progress.total > 0) {
          loadProgress = Math.round((progress.loaded / progress.total) * 100);
        }
      },
      (error) => {
        console.error('Error loading model:', error);
        isLoading = false;
      }
    );
  }

  function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Auto rotate when not dragging
    if (modelGroup && !isDragging) {
      modelGroup.rotation.y -= 0.005;
    }
    
    controls.update();
    renderer.render(scene, camera);
  }

  function onResize() {
    if (!container || !camera || !renderer) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function cleanup() {
    window.removeEventListener('resize', onResize);
    if (animationId) cancelAnimationFrame(animationId);
    if (controls) controls.dispose();
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
    }
    if (scene) {
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
  }

  function handleClose() {
    isClosing = true;
    setTimeout(() => {
      cleanup();
      onClose();
    }, 300);
  }
</script>

<div class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center transition-opacity duration-300 {isVisible && !isClosing ? 'opacity-100' : 'opacity-0'}">
  <!-- Close button -->
  <button 
    class="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
    onclick={handleClose}
    aria-label="Close"
  >
    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
  
  <!-- Title -->
  <div class="absolute top-4 left-4 z-50">
    <div class="flex items-center gap-2 mb-1">
      <div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <span class="text-primary font-mono text-xs uppercase">3D Model</span>
    </div>
    <h3 class="text-white font-bold text-xl uppercase tracking-wider">{modelName}</h3>
  </div>
  
  <!-- Loading -->
  {#if isLoading}
    <div class="absolute inset-0 flex items-center justify-center z-40 bg-black/80">
      <div class="text-center">
        <div class="w-16 h-16 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4 mx-auto"></div>
        <p class="text-white/50 font-mono text-sm">{i18n.t.modelViewer.loadingModel}... {loadProgress}%</p>
      </div>
    </div>
  {/if}
  
  <!-- 3D Container -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div 
    bind:this={container}
    class="w-full h-full"
    onmousedown={() => isDragging = true}
    onmouseup={() => isDragging = false}
    onmouseleave={() => isDragging = false}
    ontouchstart={() => isDragging = true}
    ontouchend={() => isDragging = false}
    role="application"
    aria-label="3D model viewer - {modelName}"
  ></div>
  
  <!-- Quality slider (centered) -->
  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10">
    <div class="flex items-center justify-center gap-3">
      <span class="text-white/50 font-mono text-[10px] uppercase">{i18n.t.modelViewer.quality}:</span>
      <input 
        type="range" 
        min="0" 
        max="3" 
        bind:value={qualityLevel}
        onchange={() => setQuality(qualityLevel)}
        class="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
      />
      <span class="text-primary font-mono text-xs min-w-[50px] text-center">{i18n.t.modelViewer[qualityLevels[qualityLevel].key]}</span>
    </div>
    <div class="text-white/30 font-mono text-[10px] text-center mt-2">
      {i18n.t.modelViewer.dragToRotate} • {i18n.t.modelViewer.scrollToZoom} • {i18n.t.modelViewer.escToClose}
    </div>
  </div>
  
  <!-- Corner decorations -->
  <div class="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-primary/30 pointer-events-none"></div>
  <div class="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-primary/30 pointer-events-none"></div>
  <div class="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-primary/30 pointer-events-none"></div>
  <div class="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-primary/30 pointer-events-none"></div>
</div>

<svelte:window onkeydown={(e) => e.key === 'Escape' && handleClose()} />
