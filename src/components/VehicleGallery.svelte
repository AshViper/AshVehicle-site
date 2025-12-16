<script>
  import { createI18n } from '$lib/i18n.svelte.js';
  import ModelViewer from './ModelViewer.svelte';

  const i18n = createI18n();

  let activeTab = $state('helicopters');
  let isTransitioning = $state(false);
  
  // 3D Model viewer state
  let modelViewerOpen = $state(false);
  let currentModelPath = $state('');
  let currentModelName = $state('');
  
  // Available 3D models
  const available3DModels = {
    // Helicopters
    'MH-60M': '/AshVehicle-site/models/mh-60m.gltf',
    'V-22': '/AshVehicle-site/models/V-22.gltf',
    'AH-64': '/AshVehicle-site/models/AH-64.gltf',
    'RAH-66': '/AshVehicle-site/models/rah-66.gltf',
    // Fighters
    'Su-34': '/AshVehicle-site/models/Su-34.gltf',
    'Su-27': '/AshVehicle-site/models/Su-27.gltf',
    'Su-33': '/AshVehicle-site/models/Su-33.gltf',
    'Su-25': '/AshVehicle-site/models/su-25.gltf',
    'Su-57': '/AshVehicle-site/models/su-57.gltf',
    'Mig-29': '/AshVehicle-site/models/mig-29.gltf',
    'JAS39E': '/AshVehicle-site/models/jas39e.gltf',
    'F-35': '/AshVehicle-site/models/F-35.gltf',
    'F-117': '/AshVehicle-site/models/F-117.gltf',
    'F-18': '/AshVehicle-site/models/f-18.gltf',
    'F-2': '/AshVehicle-site/models/F-2.gltf',
    'F-15': '/AshVehicle-site/models/F-15.gltf',
    'F-16': '/AshVehicle-site/models/F-16.gltf',
    'F-22': '/AshVehicle-site/models/f-22.gltf',
    'F-4': '/AshVehicle-site/models/f-4.gltf',
    'Eurofighter': '/AshVehicle-site/models/eurofighter.gltf',
    'J-20': '/AshVehicle-site/models/j-20.gltf',
    'Potuzhnoflylet': '/AshVehicle-site/models/zelensky.gltf',
    // Bombers
    'B-2': '/AshVehicle-site/models/b-2.gltf',
    // Ground
    'T-90': '/AshVehicle-site/models/t-90.gltf',
    'KV-2': '/AshVehicle-site/models/KV-2.gltf',
    'M3A3 Bradley': '/AshVehicle-site/models/m3a3-bradley.gltf',
    'Gepard1A2': '/AshVehicle-site/models/gepard1a2.gltf',
    'Sapsan': '/AshVehicle-site/models/sapsan.gltf',
    'Tos1 Sunlight': '/AshVehicle-site/models/tos.gltf',
    'Pantsir S1': '/AshVehicle-site/models/pa_pantsir.gltf',
    // Naval
    'Zumwalt': '/AshVehicle-site/models/zumwalt.gltf',
    'Rubber Boat': '/AshVehicle-site/models/rubber_boat.gltf',
    // Weapons
    'R-60': '/AshVehicle-site/models/r60.gltf',
    'CBU-87': '/AshVehicle-site/models/cbu87.gltf',
    'GBU-57': '/AshVehicle-site/models/gbu57.gltf',
    'AIM-9': '/AshVehicle-site/models/aim9.gltf',
    'AIM-120': '/AshVehicle-site/models/aim120.gltf',
    'Toilet Bomb': '/AshVehicle-site/models/toiletbomb.gltf',
    'Tomahawk': '/AshVehicle-site/models/Tomahawk.gltf',
    'JASSM-XR': '/AshVehicle-site/models/Jassm-xr.gltf',
    'AGM-114': '/AshVehicle-site/models/agm114.gltf'
  };
  
  function open3DViewer(name) {
    if (available3DModels[name]) {
      currentModelPath = available3DModels[name];
      currentModelName = name;
      modelViewerOpen = true;
      document.body.style.overflow = 'hidden';
    }
  }
  
  function close3DViewer() {
    modelViewerOpen = false;
    document.body.style.overflow = '';
  }

  // Status: added, remake, planned
  const vehicles = {
    helicopters: [
      { name: "MH-60M", status: "added" },
      { name: "Chinook", status: "planned" },
      { name: "KA-52", status: "planned" },
      { name: "V-22", status: "added" },
      { name: "AH-64", status: "added" },
      { name: "RAH-66", status: "added" }
    ],
    fighters: [
      { name: "Su-34", status: "remake" },
      { name: "Su-33", status: "remake" },
      { name: "Su-25", status: "remake" },
      { name: "Su-27", status: "added" },
      { name: "Mig-29", status: "remake" },
      { name: "F-4", status: "added" },
      { name: "JAS39E", status: "remake" },
      { name: "F-35", status: "remake" },
      { name: "F-22", status: "added" },
      { name: "F-117", status: "added" },
      { name: "F-18", status: "remake" },
      { name: "F-2", status: "added" },
      { name: "F-15", status: "added" },
      { name: "Su-57", status: "remake" },
      { name: "F-16", status: "added" },
      { name: "F-14", status: "planned" },
      { name: "F-100", status: "planned" },
      { name: "F-104", status: "planned" },
      { name: "Mig-21", status: "planned" },
      { name: "Mig-19", status: "planned" },
      { name: "Eurofighter", status: "added" },
      { name: "J-20", status: "added" },
      { name: "Potuzhnoflylet", status: "added" }
    ],
    bombers: [
      { name: "B-2", status: "added" },
      { name: "B-21", status: "planned" },
      { name: "TU-95MS", status: "planned" },
      { name: "TU-160", status: "planned" },
      { name: "AC-130J", status: "planned" }
    ],
    ground: [
      { name: "T-90", status: "remake" },
      { name: "KV-2", status: "remake" },
      { name: "M3A3 Bradley", status: "added" },
      { name: "Tos1 Sunlight", status: "added" },
      { name: "Pantsir S1", status: "added" },
      { name: "Gepard1A2", status: "added" },
      { name: "Sapsan", status: "remake" },
      { name: "Type-10", status: "planned" },
      { name: "M1A2 Abrams", status: "remake" },
      { name: "T80UK", status: "planned" },
      { name: "2S38", status: "planned" },
      { name: "Leopard 2", status: "planned" },
      { name: "Oreshnik", status: "planned" }
    ],
    naval: [
      { name: "Zumwalt", status: "added" },
      { name: "Rubber Boat", status: "added" },
      { name: "M777", status: "added" },
      { name: "LCVP", status: "planned" }
    ],
    weapons: [
      { name: "AIM-9", status: "added" },
      { name: "AIM-120", status: "added" },
      { name: "AGM-114", status: "added" },
      { name: "R-60", status: "added" },
      { name: "CBU-87", status: "added" },
      { name: "GBU-57", status: "added" },
      { name: "Tomahawk", status: "added" },
      { name: "JASSM-XR", status: "added" },
      { name: "Ballistic Missile", status: "planned" },
      { name: "Toilet Bomb", status: "added" },
      { name: "X-101", status: "planned" }
    ]
  };

  const statusColors = {
    added: { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400', dot: 'bg-green-500' },
    remake: { bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400', dot: 'bg-blue-500' },
    planned: { bg: 'bg-zinc-500/20', border: 'border-zinc-500/50', text: 'text-zinc-400', dot: 'bg-zinc-500' }
  };

  const categories = $derived([
    { id: "helicopters", label: i18n.t.gallery.helicopters, code: "HELI" },
    { id: "fighters", label: i18n.t.gallery.fighters, code: "JET" },
    { id: "bombers", label: i18n.t.gallery.bombers, code: "BOMB" },
    { id: "ground", label: i18n.t.gallery.ground, code: "TANK" },
    { id: "naval", label: i18n.t.gallery.naval, code: "SHIP" },
    { id: "weapons", label: i18n.t.gallery.weapons, code: "WPN" }
  ]);

  // Sort: added first, then remake, then planned
  const statusOrder = { added: 0, remake: 1, planned: 2 };
  const currentVehicles = $derived(
    [...(vehicles[activeTab] || [])].sort((a, b) => statusOrder[a.status] - statusOrder[b.status])
  );
  
  // Get translated status label
  function getStatusLabel(status) {
    const labels = {
      added: i18n.t.gallery.statusAdded,
      remake: i18n.t.gallery.statusRemake,
      planned: i18n.t.gallery.statusPlanned
    };
    return labels[status] || status;
  }
  
  // Generate image path from vehicle name
  function getImagePath(category, name) {
    const filename = name.toLowerCase().replace(/\s+/g, '-') + '.webp';
    return `/AshVehicle-site/vehicles/${category}/${filename}`;
  }
  
  // Track failed images
  let failedImages = $state(new Set());
  
  // Lightbox state
  let lightboxOpen = $state(false);
  let lightboxImage = $state('');
  let lightboxTitle = $state('');
  let lightboxZoom = $state(1);
  let lightboxPosition = $state({ x: 0, y: 0 });
  let isDragging = $state(false);
  let dragStart = $state({ x: 0, y: 0 });
  
  let lightboxVehicleName = $state('');
  
  function openLightbox(imagePath, title, vehicleName) {
    lightboxImage = imagePath;
    lightboxTitle = title;
    lightboxVehicleName = vehicleName;
    lightboxZoom = 1;
    lightboxPosition = { x: 0, y: 0 };
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightboxOpen = false;
    document.body.style.overflow = '';
  }
  
  function zoomIn() {
    lightboxZoom = Math.min(lightboxZoom + 0.5, 4);
  }
  
  function zoomOut() {
    lightboxZoom = Math.max(lightboxZoom - 0.5, 0.5);
    if (lightboxZoom <= 1) {
      lightboxPosition = { x: 0, y: 0 };
    }
  }
  
  function resetZoom() {
    lightboxZoom = 1;
    lightboxPosition = { x: 0, y: 0 };
  }
  
  function handleWheel(e) {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  }
  
  function handleMouseDown(e) {
    if (lightboxZoom > 1) {
      isDragging = true;
      dragStart = { x: e.clientX - lightboxPosition.x, y: e.clientY - lightboxPosition.y };
    }
  }
  
  function handleMouseMove(e) {
    if (isDragging && lightboxZoom > 1) {
      lightboxPosition = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
    }
  }
  
  function handleMouseUp() {
    isDragging = false;
  }
  
  function handleKeydown(e) {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === '+' || e.key === '=') zoomIn();
    if (e.key === '-') zoomOut();
    if (e.key === '0') resetZoom();
  }
  
  // Count all vehicles by status
  const allVehicles = $derived(Object.values(vehicles).flat());
  const addedCount = $derived(allVehicles.filter(v => v.status === 'added').length);
  const remakeCount = $derived(allVehicles.filter(v => v.status === 'remake').length);
  const plannedCount = $derived(allVehicles.filter(v => v.status === 'planned').length);

  function switchTab(tabId) {
    if (tabId === activeTab) return;
    isTransitioning = true;
    setTimeout(() => {
      activeTab = tabId;
      setTimeout(() => {
        isTransitioning = false;
      }, 50);
    }, 200);
  }
</script>

<section id="vehicles" class="py-20 md:py-28 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-black to-zinc-950"></div>
  
  <!-- Grid pattern -->
  <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
  
  <div class="container mx-auto px-4 relative z-10">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 mb-8">
        <div class="w-2 h-2 bg-primary animate-pulse"></div>
        <span class="text-primary font-mono font-bold tracking-widest uppercase text-xs">{i18n.t.gallery.armory}</span>
        <div class="w-2 h-2 bg-primary animate-pulse"></div>
      </div>
      
      <!-- Epic title -->
      <div class="relative mb-8">
        <!-- Glow effect behind -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-96 h-32 bg-primary/20 blur-3xl rounded-full"></div>
        </div>
        
        <!-- Main title -->
        <h2 class="relative text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight">
          <span class="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,107,53,0.3)]">
            {i18n.t.gallery.manifest}
          </span>
        </h2>
        
        <!-- Underline decoration -->
        <div class="flex items-center justify-center gap-4 mt-4">
          <div class="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-primary/70"></div>
          <div class="w-2 h-2 bg-primary rotate-45"></div>
          <div class="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-primary/70"></div>
        </div>
      </div>
      
      <div class="flex items-center justify-center gap-2 text-white/50 font-mono text-xs">
        <div class="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
        <span class="uppercase">{i18n.t.gallery.dbConnected}</span>
      </div>
    </div>

    <!-- Legend with counts -->
    <div class="flex flex-wrap items-center gap-4 md:gap-6 mb-6 font-mono text-xs">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-green-500 rounded-sm"></div>
        <span class="text-green-400">{i18n.t.gallery.statusAdded}</span>
        <span class="text-green-400/60">({addedCount})</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-blue-500 rounded-sm"></div>
        <span class="text-blue-400">{i18n.t.gallery.statusRemake}</span>
        <span class="text-blue-400/60">({remakeCount})</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 bg-zinc-500 rounded-sm"></div>
        <span class="text-zinc-400">{i18n.t.gallery.statusPlanned}</span>
        <span class="text-zinc-400/60">({plannedCount})</span>
      </div>
    </div>

    <!-- Tabs -->
    <div class="w-full overflow-x-auto border-b border-white/10 mb-8 pb-1 -mx-4 px-4 md:mx-0 md:px-0">
      <div class="flex gap-1 min-w-max">
        {#each categories as cat}
          <button 
            onclick={() => switchTab(cat.id)}
            class="cursor-pointer px-3 md:px-6 py-2 font-mono font-bold text-[10px] md:text-sm uppercase tracking-wider transition-all duration-300 border whitespace-nowrap {activeTab === cat.id ? 'bg-primary text-black border-primary' : 'bg-transparent text-muted-foreground border-transparent hover:text-white hover:bg-white/5'}"
          >
            {cat.label} <span class="ml-1 md:ml-2 text-[8px] md:text-[10px] {activeTab === cat.id ? 'text-black' : 'text-muted-foreground'}">{cat.code}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Vehicle Grid with fade transition -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-opacity duration-200 {isTransitioning ? 'opacity-0' : 'opacity-100'}">
      {#each currentVehicles as vehicle, index (activeTab + vehicle.name)}
        {@const colors = statusColors[vehicle.status]}
        {@const imagePath = getImagePath(activeTab, vehicle.name)}
        {@const imageKey = `${activeTab}-${vehicle.name}`}
        <div 
          class="cursor-pointer group relative overflow-hidden bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all duration-300 aspect-[4/3] flex flex-col justify-end hover:scale-[1.02]"
          style="animation: fadeInUp 0.3s ease-out {index * 0.03}s both;"
          onclick={() => !failedImages.has(imageKey) && openLightbox(imagePath, vehicle.name, vehicle.name)}
          onkeydown={(e) => e.key === 'Enter' && !failedImages.has(imageKey) && openLightbox(imagePath, vehicle.name, vehicle.name)}
          role="button"
          tabindex="0"
        >
          <!-- Background Image -->
          {#if !failedImages.has(imageKey)}
            <img 
              src={imagePath} 
              alt={vehicle.name}
              class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
              onerror={() => { failedImages = new Set([...failedImages, imageKey]); }}
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          {:else}
            <!-- Placeholder if no image -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 relative">
                <div class="absolute inset-0 border border-primary/20 rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div class="w-10 h-10 bg-white/5 rounded-full group-hover:bg-primary/10 transition-colors duration-300"></div>
              </div>
            </div>
          {/if}
          
          <!-- Status indicator -->
          <div class="absolute top-3 left-3 z-10 flex items-center gap-2">
            <div class="w-2 h-2 rounded-full {colors.dot}"></div>
          </div>
          
          <!-- 3D Button -->
          {#if available3DModels[vehicle.name]}
            <button
              class="absolute top-3 right-3 z-20 px-2 py-1 bg-primary/80 hover:bg-primary text-black font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1"
              onclick={(e) => { e.stopPropagation(); open3DViewer(vehicle.name); }}
            >
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              3D
            </button>
          {:else}
            <div class="absolute top-0 right-0 p-2 opacity-20 font-mono text-[10px] text-white group-hover:opacity-60 transition-opacity duration-300 z-10">
              #{String(index + 1).padStart(3, '0')}
            </div>
          {/if}

          <div class="relative z-20 p-4 border-t border-white/10 group-hover:border-primary/30 transition-colors duration-300 bg-black/50 backdrop-blur-sm">
            <span class="inline-block mb-2 border {colors.border} {colors.text} {colors.bg} font-mono text-[9px] uppercase tracking-widest px-1 py-0.5">
              {getStatusLabel(vehicle.status)}
            </span>
            <h3 class="text-lg font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors duration-300">{vehicle.name}</h3>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Lightbox -->
{#if lightboxOpen}
  <div 
    class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
    onclick={closeLightbox}
    onkeydown={handleKeydown}
    onwheel={handleWheel}
    role="dialog"
    tabindex="-1"
  >
    <!-- Close button -->
    <button 
      class="absolute top-4 right-4 z-50 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
      onclick={closeLightbox}
      aria-label="Close"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    
    <!-- Title -->
    <div class="absolute top-4 left-4 z-50">
      <h3 class="text-white font-bold text-xl uppercase tracking-wider">{lightboxTitle}</h3>
      <p class="text-white/50 font-mono text-xs mt-1">{i18n.t.lightbox.zoom}: {Math.round(lightboxZoom * 100)}%</p>
    </div>
    
    <!-- 3D Button in lightbox -->
    {#if available3DModels[lightboxVehicleName]}
      <button
        class="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-primary hover:bg-primary/90 text-black font-mono text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:shadow-[0_0_30px_rgba(255,107,53,0.5)]"
        onclick={(e) => { e.stopPropagation(); closeLightbox(); open3DViewer(lightboxVehicleName); }}
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        {i18n.t.lightbox.view3DModel}
      </button>
    {/if}
    
    <!-- Zoom controls -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 p-2">
      <button 
        class="cursor-pointer p-2 text-white/50 hover:text-white transition-colors"
        onclick={(e) => { e.stopPropagation(); zoomOut(); }}
        aria-label="Zoom out"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </button>
      <button 
        class="cursor-pointer px-3 py-1 text-white/70 hover:text-white font-mono text-sm transition-colors"
        onclick={(e) => { e.stopPropagation(); resetZoom(); }}
        aria-label="Reset zoom"
      >
        {Math.round(lightboxZoom * 100)}%
      </button>
      <button 
        class="cursor-pointer p-2 text-white/50 hover:text-white transition-colors"
        onclick={(e) => { e.stopPropagation(); zoomIn(); }}
        aria-label="Zoom in"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
    
    <!-- Image container -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div 
      class="relative max-w-[90vw] max-h-[85vh] overflow-hidden"
      onclick={(e) => e.stopPropagation()}
      onmousedown={handleMouseDown}
      onmousemove={handleMouseMove}
      onmouseup={handleMouseUp}
      onmouseleave={handleMouseUp}
      role="img"
      aria-label={lightboxTitle}
      style="cursor: {lightboxZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'}"
    >
      <img 
        src={lightboxImage} 
        alt={lightboxTitle}
        class="max-w-full max-h-[85vh] object-contain transition-transform duration-200 select-none"
        style="transform: scale({lightboxZoom}) translate({lightboxPosition.x / lightboxZoom}px, {lightboxPosition.y / lightboxZoom}px)"
        draggable="false"
      />
    </div>
    
    <!-- Instructions -->
    <div class="absolute bottom-4 right-4 z-50 text-white/30 font-mono text-[10px] text-right">
      <p>{i18n.t.lightbox.scrollToZoom}</p>
      <p>{i18n.t.lightbox.dragToPan}</p>
      <p>{i18n.t.lightbox.escToClose}</p>
    </div>
  </div>
{/if}

<svelte:window onkeydown={handleKeydown} />

<!-- 3D Model Viewer -->
{#if modelViewerOpen}
  <ModelViewer 
    modelPath={currentModelPath} 
    modelName={currentModelName} 
    onClose={close3DViewer} 
  />
{/if}



<style>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
