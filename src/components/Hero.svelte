<script>
  import { ArrowRight, Terminal, Download, ChevronRight, Code } from 'lucide-svelte';
  import { createI18n } from '$lib/i18n.svelte.js';

  const i18n = createI18n();

  function scrollToVehicles() {
    document.getElementById('vehicles')?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<section class="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-20 md:pt-0">
  <!-- Background Effects -->
  <div class="absolute inset-0 z-0 overflow-hidden">
    <!-- Grid -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(255,107,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
    
    <!-- Animated gradient orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    
    <!-- Diagonal lines -->
    <div class="diagonal-lines"></div>
    
    <!-- Corner brackets -->
    <div class="corner-bracket tl"></div>
    <div class="corner-bracket tr"></div>
    <div class="corner-bracket bl"></div>
    <div class="corner-bracket br"></div>
    
    <!-- Horizontal scan line -->
    <div class="scan-line"></div>
    
    <!-- Noise overlay -->
    <div class="noise"></div>
  </div>

  <div class="container relative z-20 px-4 text-center flex flex-col items-center justify-center h-full py-12 md:py-0">
    <div class="flex flex-col items-center w-full max-w-4xl animate-fadeIn">
      <div class="relative mb-6">
        <h1 class="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white tracking-tighter drop-shadow-2xl uppercase leading-[0.9]">
          Ash<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Vehicle</span>
        </h1>
        <div class="absolute -left-8 top-0 h-full w-1 bg-primary/20 hidden md:block animate-growHeight"></div>
        <div class="absolute -right-8 top-0 h-full w-1 bg-primary/20 hidden md:block animate-growHeight"></div>
      </div>
      
      <div class="h-1 w-16 md:w-24 bg-primary mb-8 shadow-[0_0_15px_rgba(255,107,53,0.5)]"></div>

      <div class="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-12 font-mono leading-relaxed border-l-2 border-primary/20 pl-4 md:pl-6 text-left w-full md:w-auto min-h-[5rem] whitespace-pre-line">
        {i18n.t.hero.deploymentReady}
      </div>
      
      <!-- Military Style Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 w-full max-w-xl mx-auto">
        <!-- Primary Button - Download -->
        <a 
          href="https://www.curseforge.com/minecraft/mc-mods/ashvehicle" 
          target="_blank" 
          rel="noopener noreferrer"
          class="btn-primary group"
        >
          <span class="btn-corner tl"></span>
          <span class="btn-corner tr"></span>
          <span class="btn-corner bl"></span>
          <span class="btn-corner br"></span>
          <span class="btn-bg"></span>
          <span class="btn-content">
            <Download class="h-5 w-5" />
            <span class="font-bold tracking-wider">{i18n.t.hero.downloadProtocol}</span>
            <ChevronRight class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
        
        <!-- Secondary Button - Inspect -->
        <button class="btn-secondary group" onclick={scrollToVehicles}>
          <span class="btn-line top"></span>
          <span class="btn-line bottom"></span>
          <span class="btn-content">
            <Terminal class="h-5 w-5 text-primary" />
            <span class="font-medium tracking-wider">{i18n.t.hero.inspectAssets}</span>
          </span>
        </button>
      </div>
      
      <!-- Source Button -->
      <a 
        href="https://github.com/AshViper/AshVehicle" 
        target="_blank" 
        rel="noopener noreferrer"
        class="cursor-pointer mt-4 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-mono text-sm uppercase tracking-wider"
      >
        <Code class="h-4 w-4" />
        <span>{i18n.t.hero.source}</span>
      </a>
    </div>
  </div>

  <!-- Scroll Indicator -->
  <button class="cursor-pointer absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/30 flex-col items-center gap-2 hidden sm:flex group" onclick={scrollToAbout}>
    <span class="font-mono text-[10px] uppercase tracking-widest text-white/50 group-hover:text-primary transition-colors duration-300">{i18n.t.hero.scrollToInitiate}</span>
    <div class="relative h-12 w-[1px] bg-white/10 overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary to-transparent animate-scrollLine"></div>
    </div>
  </button>
</section>

<style>
  /* Primary Button */
  .btn-primary {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background: transparent;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    flex: 1;
    overflow: hidden;
  }

  .btn-primary .btn-bg {
    position: absolute;
    inset: 0;
    background: hsl(16 100% 55%);
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
    transition: all 0.3s ease;
  }

  .btn-primary:hover .btn-bg {
    background: hsl(16 100% 60%);
    box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  }

  .btn-primary .btn-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid white;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .btn-primary:hover .btn-corner {
    opacity: 1;
  }

  .btn-primary .btn-corner.tl { top: -2px; left: -2px; border-right: none; border-bottom: none; }
  .btn-primary .btn-corner.tr { top: -2px; right: -2px; border-left: none; border-bottom: none; }
  .btn-primary .btn-corner.bl { bottom: -2px; left: -2px; border-right: none; border-top: none; }
  .btn-primary .btn-corner.br { bottom: -2px; right: -2px; border-left: none; border-top: none; }

  .btn-primary .btn-content {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  /* Secondary Button */
  .btn-secondary {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    flex: 1;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: hsl(16 100% 55% / 0.5);
  }

  .btn-secondary .btn-line {
    position: absolute;
    left: 0;
    width: 0;
    height: 1px;
    background: hsl(16 100% 55%);
    transition: width 0.3s ease;
  }

  .btn-secondary .btn-line.top { top: 0; }
  .btn-secondary .btn-line.bottom { bottom: 0; right: 0; left: auto; }

  .btn-secondary:hover .btn-line {
    width: 100%;
  }

  .btn-secondary .btn-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  /* Background Effects */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    pointer-events: none;
  }
  
  .orb-1 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, hsl(16 100% 55% / 0.3) 0%, transparent 70%);
    top: -200px;
    right: -200px;
    animation: orbFloat1 15s ease-in-out infinite;
  }
  
  .orb-2 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, hsl(16 80% 45% / 0.2) 0%, transparent 70%);
    bottom: -100px;
    left: -100px;
    animation: orbFloat2 20s ease-in-out infinite;
  }
  
  .orb-3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, hsl(30 100% 50% / 0.15) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: orbPulse 8s ease-in-out infinite;
  }
  
  @keyframes orbFloat1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(-50px, 30px) scale(1.1); }
    66% { transform: translate(30px, -20px) scale(0.9); }
  }
  
  @keyframes orbFloat2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(40px, -40px) scale(1.15); }
  }
  
  @keyframes orbPulse {
    0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.3; transform: translate(-50%, -50%) scale(1.2); }
  }
  
  /* Diagonal lines */
  .diagonal-lines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 100px,
      rgba(255, 107, 53, 0.02) 100px,
      rgba(255, 107, 53, 0.02) 101px
    );
    pointer-events: none;
  }
  
  /* Corner brackets */
  .corner-bracket {
    position: absolute;
    width: 100px;
    height: 100px;
    pointer-events: none;
    opacity: 0.3;
  }
  
  .corner-bracket::before,
  .corner-bracket::after {
    content: '';
    position: absolute;
    background: hsl(16 100% 55%);
  }
  
  .corner-bracket.tl { top: 20px; left: 20px; }
  .corner-bracket.tl::before { width: 60px; height: 2px; top: 0; left: 0; }
  .corner-bracket.tl::after { width: 2px; height: 60px; top: 0; left: 0; }
  
  .corner-bracket.tr { top: 20px; right: 20px; }
  .corner-bracket.tr::before { width: 60px; height: 2px; top: 0; right: 0; }
  .corner-bracket.tr::after { width: 2px; height: 60px; top: 0; right: 0; }
  
  .corner-bracket.bl { bottom: 20px; left: 20px; }
  .corner-bracket.bl::before { width: 60px; height: 2px; bottom: 0; left: 0; }
  .corner-bracket.bl::after { width: 2px; height: 60px; bottom: 0; left: 0; }
  
  .corner-bracket.br { bottom: 20px; right: 20px; }
  .corner-bracket.br::before { width: 60px; height: 2px; bottom: 0; right: 0; }
  .corner-bracket.br::after { width: 2px; height: 60px; bottom: 0; right: 0; }
  
  /* Scan line */
  .scan-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, hsl(16 100% 55% / 0.5), transparent);
    animation: scanMove 6s linear infinite;
    pointer-events: none;
  }
  
  @keyframes scanMove {
    0% { top: -2px; opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  
  /* Noise overlay */
  .noise {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }
  @keyframes growHeight {
    from { height: 0; }
    to { height: 100%; }
  }
  .animate-growHeight {
    animation: growHeight 0.5s ease-out 0.5s forwards;
    height: 0;
  }
  @keyframes scrollLine {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  .animate-scrollLine {
    animation: scrollLine 1.5s ease-in-out infinite;
  }
</style>
