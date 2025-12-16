<script>
  import { onMount } from 'svelte';
  import { createI18n } from '../lib/i18n.svelte.js';
  
  const i18n = createI18n();
  
  let progress = $state(0);
  let isLoaded = $state(false);
  let isFading = $state(false);
  let statusKey = $state('initializing');
  
  onMount(() => {
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      
      if (progress >= 100) {
        progress = 100;
        statusKey = 'ready';
        clearInterval(interval);
        setTimeout(() => {
          isFading = true;
          setTimeout(() => {
            isLoaded = true;
          }, 600);
        }, 400);
      } else if (progress > 80) {
        statusKey = 'deploying';
      } else if (progress > 60) {
        statusKey = 'connecting';
      } else if (progress > 40) {
        statusKey = 'calibrating';
      } else if (progress > 20) {
        statusKey = 'loadingDb';
      }
    }, 150);
    
    return () => clearInterval(interval);
  });
</script>

{#if !isLoaded}
  <div class="loading-screen" class:fade-out={isFading}>
    <!-- Background grid -->
    <div class="grid-bg"></div>
    
    <!-- Floating particles -->
    <div class="particles">
      {#each Array(10) as _, i}
        <div class="particle" style="--delay: {i * 0.5}s; --x: {10 + i * 9}%; --duration: {4 + i % 3}s"></div>
      {/each}
    </div>
    
    <!-- Radar sweep -->
    <div class="radar-container">
      <div class="radar">
        <div class="radar-sweep"></div>
        <div class="radar-ring ring-1"></div>
        <div class="radar-ring ring-2"></div>
        <div class="radar-ring ring-3"></div>
        <div class="radar-dot dot-1"></div>
        <div class="radar-dot dot-2"></div>
        <div class="radar-dot dot-3"></div>
      </div>
    </div>
    
    <div class="loading-content">
      <!-- HUD corners -->
      <div class="hud-corner tl"></div>
      <div class="hud-corner tr"></div>
      <div class="hud-corner bl"></div>
      <div class="hud-corner br"></div>
      
      <!-- Logo -->
      <div class="logo-container">
        <div class="logo-icon">
          <svg viewBox="0 0 100 100" class="icon-svg">
            <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" stroke-width="2" class="triangle"/>
            <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" stroke-width="2" class="line-v"/>
            <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2" class="line-h"/>
          </svg>
        </div>
        <h1 class="logo-text">
          ASH<span class="text-primary">VEHICLE</span>
        </h1>
        <div class="logo-subtitle">MILITARY ASSETS MODULE</div>
      </div>
      
      <!-- Progress bar -->
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" style="width: {progress}%">
            <div class="progress-stripes"></div>
          </div>
          <div class="progress-glow" style="left: {progress}%"></div>
        </div>
        <div class="progress-info">
          <span class="status-text">
            <span class="status-indicator"></span>
            {i18n.t.loading[statusKey]}
          </span>
          <span class="progress-percent">{Math.floor(progress)}%</span>
        </div>
      </div>
      
      <!-- Data stream -->
      <div class="data-stream">
        <div class="data-line"></div>
        <div class="data-line"></div>
        <div class="data-line"></div>
      </div>
    </div>
    
    <!-- Scan lines overlay -->
    <div class="scanlines"></div>
  </div>
{/if}

<style>
  .loading-screen {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: radial-gradient(ellipse at center, #0f0c0a 0%, #050505 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    overflow: hidden;
  }
  
  .loading-screen.fade-out {
    opacity: 0;
    transform: scale(1.1);
  }
  
  /* Grid background */
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridMove 20s linear infinite;
  }
  
  @keyframes gridMove {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
  
  /* Particles */
  .particles {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: hsl(16 100% 55%);
    border-radius: 50%;
    left: var(--x);
    bottom: -10px;
    opacity: 0;
    animation: particleFloat var(--duration) ease-in-out infinite;
    animation-delay: var(--delay);
    box-shadow: 0 0 10px hsl(16 100% 55%);
  }
  
  @keyframes particleFloat {
    0% { transform: translateY(0) scale(0); opacity: 0; }
    10% { opacity: 0.8; transform: scale(1); }
    90% { opacity: 0.3; }
    100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
  }
  
  /* Radar */
  .radar-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.15;
  }
  
  .radar {
    width: 400px;
    height: 400px;
    position: relative;
    border-radius: 50%;
  }
  
  .radar-sweep {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0deg, hsl(16 100% 55% / 0.4) 30deg, transparent 60deg);
    animation: radarSweep 3s linear infinite;
  }
  
  @keyframes radarSweep {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .radar-ring {
    position: absolute;
    border: 1px solid hsl(16 100% 55% / 0.3);
    border-radius: 50%;
  }
  
  .ring-1 { inset: 30%; }
  .ring-2 { inset: 15%; }
  .ring-3 { inset: 0; }
  
  .radar-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    background: hsl(16 100% 55%);
    border-radius: 50%;
    animation: radarBlink 2s ease-in-out infinite;
    box-shadow: 0 0 10px hsl(16 100% 55%);
  }
  
  .dot-1 { top: 25%; left: 60%; animation-delay: 0s; }
  .dot-2 { top: 70%; left: 30%; animation-delay: 0.7s; }
  .dot-3 { top: 40%; left: 75%; animation-delay: 1.4s; }
  
  @keyframes radarBlink {
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1); }
  }
  
  /* Content */
  .loading-content {
    position: relative;
    width: 100%;
    max-width: 400px;
    padding: 3rem 2rem;
    z-index: 10;
  }
  
  /* HUD Corners */
  .hud-corner {
    position: absolute;
    width: 30px;
    height: 30px;
  }
  
  .hud-corner::before,
  .hud-corner::after {
    content: '';
    position: absolute;
    background: hsl(16 100% 55%);
  }
  
  .hud-corner.tl { top: 0; left: 0; }
  .hud-corner.tl::before { width: 30px; height: 2px; top: 0; left: 0; }
  .hud-corner.tl::after { width: 2px; height: 30px; top: 0; left: 0; }
  
  .hud-corner.tr { top: 0; right: 0; }
  .hud-corner.tr::before { width: 30px; height: 2px; top: 0; right: 0; }
  .hud-corner.tr::after { width: 2px; height: 30px; top: 0; right: 0; }
  
  .hud-corner.bl { bottom: 0; left: 0; }
  .hud-corner.bl::before { width: 30px; height: 2px; bottom: 0; left: 0; }
  .hud-corner.bl::after { width: 2px; height: 30px; bottom: 0; left: 0; }
  
  .hud-corner.br { bottom: 0; right: 0; }
  .hud-corner.br::before { width: 30px; height: 2px; bottom: 0; right: 0; }
  .hud-corner.br::after { width: 2px; height: 30px; bottom: 0; right: 0; }
  
  /* Logo */
  .logo-container {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .logo-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    color: hsl(16 100% 55%);
  }
  
  .icon-svg {
    width: 100%;
    height: 100%;
    animation: iconPulse 2s ease-in-out infinite;
  }
  
  .triangle {
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
    animation: drawTriangle 2s ease-out forwards;
  }
  
  .line-v, .line-h {
    stroke-dasharray: 50;
    stroke-dashoffset: 50;
    animation: drawLine 1s ease-out 1s forwards;
  }
  
  @keyframes drawTriangle {
    to { stroke-dashoffset: 0; }
  }
  
  @keyframes drawLine {
    to { stroke-dashoffset: 0; }
  }
  
  @keyframes iconPulse {
    0%, 100% { filter: drop-shadow(0 0 5px hsl(16 100% 55% / 0.5)); }
    50% { filter: drop-shadow(0 0 20px hsl(16 100% 55% / 0.8)); }
  }
  
  .logo-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.5rem;
    font-weight: 900;
    color: white;
    letter-spacing: -0.05em;
    text-transform: uppercase;
    animation: textGlitch 3s infinite;
  }
  
  .logo-subtitle {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 0.3em;
    margin-top: 0.5rem;
    text-transform: uppercase;
  }
  
  @keyframes textGlitch {
    0%, 95%, 100% { 
      transform: translate(0);
      text-shadow: none;
    }
    96% { 
      transform: translate(-3px, 1px);
      text-shadow: 3px 0 hsl(16 100% 55%), -3px 0 hsl(30 100% 60%);
    }
    97% { 
      transform: translate(3px, -1px);
      text-shadow: -3px 0 hsl(16 100% 55%), 3px 0 hsl(30 100% 60%);
    }
    98% { 
      transform: translate(-2px, 2px);
      text-shadow: 2px 0 hsl(16 100% 55%), -2px 0 hsl(30 100% 60%);
    }
  }
  
  /* Progress */
  .progress-container {
    width: 100%;
  }
  
  .progress-bar {
    position: relative;
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, hsl(16 100% 45%), hsl(16 100% 55%), hsl(16 100% 65%));
    transition: width 0.15s ease-out;
    position: relative;
    overflow: hidden;
  }
  
  .progress-stripes {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 5px,
      rgba(255,255,255,0.1) 5px,
      rgba(255,255,255,0.1) 10px
    );
    animation: stripesMove 0.5s linear infinite;
  }
  
  @keyframes stripesMove {
    from { transform: translateX(0); }
    to { transform: translateX(14px); }
  }
  
  .progress-glow {
    position: absolute;
    top: -15px;
    width: 30px;
    height: 36px;
    background: hsl(16 100% 55% / 0.5);
    filter: blur(15px);
    transition: left 0.15s ease-out;
  }
  
  .progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .status-text {
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .status-indicator {
    width: 6px;
    height: 6px;
    background: hsl(16 100% 55%);
    border-radius: 50%;
    animation: indicatorPulse 1s ease-in-out infinite;
  }
  
  @keyframes indicatorPulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 5px hsl(16 100% 55%); }
    50% { opacity: 0.5; box-shadow: 0 0 15px hsl(16 100% 55%); }
  }
  
  .progress-percent {
    color: hsl(16 100% 55%);
    font-size: 0.9rem;
    font-weight: bold;
  }
  
  /* Data stream */
  .data-stream {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .data-line {
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      hsl(16 100% 55% / 0.3) 20%, 
      hsl(16 100% 55% / 0.6) 50%, 
      hsl(16 100% 55% / 0.3) 80%, 
      transparent 100%
    );
    animation: dataFlow 1.5s ease-in-out infinite;
  }
  
  .data-line:nth-child(2) { animation-delay: 0.2s; opacity: 0.7; }
  .data-line:nth-child(3) { animation-delay: 0.4s; opacity: 0.4; }
  
  @keyframes dataFlow {
    0%, 100% { transform: scaleX(0.3); opacity: 0.3; }
    50% { transform: scaleX(1); opacity: 1; }
  }
  
  /* Scanlines overlay */
  .scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.1) 2px,
      rgba(0, 0, 0, 0.1) 4px
    );
    pointer-events: none;
    z-index: 100;
  }
</style>
