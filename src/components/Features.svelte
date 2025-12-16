<script>
  import { Rocket, Shield, Plane, Zap } from 'lucide-svelte';
  import { createI18n } from '$lib/i18n.svelte.js';

  const i18n = createI18n();

  const features = $derived([
    { icon: Plane, title: i18n.t.features.airSuperiority, description: i18n.t.features.airDesc },
    { icon: Shield, title: i18n.t.features.groundDominance, description: i18n.t.features.groundDesc },
    { icon: Rocket, title: i18n.t.features.ballistics, description: i18n.t.features.ballisticsDesc },
    { icon: Zap, title: i18n.t.features.performance, description: i18n.t.features.performanceDesc }
  ]);
</script>

<section id="about" class="py-20 md:py-28 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black"></div>
  
  <!-- Grid pattern -->
  <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
  
  <div class="container mx-auto px-4 relative z-10">
    <!-- Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 mb-8">
        <div class="w-2 h-2 bg-primary animate-pulse"></div>
        <span class="text-primary font-mono font-bold tracking-widest uppercase text-xs">{i18n.t.features.missionBriefing}</span>
        <div class="w-2 h-2 bg-primary animate-pulse"></div>
      </div>
      
      <!-- Epic title -->
      <div class="relative mb-8">
        <!-- Glow effect behind -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-96 h-32 bg-primary/20 blur-3xl rounded-full"></div>
        </div>
        
        <!-- Main title with effects -->
        <h2 class="relative text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight">
          <span class="title-text bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,107,53,0.3)]">
            {i18n.t.features.combatEvolved}
          </span>
        </h2>
        
        <!-- Underline decoration -->
        <div class="flex items-center justify-center gap-4 mt-4">
          <div class="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-primary/70"></div>
          <div class="w-2 h-2 bg-primary rotate-45"></div>
          <div class="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-primary/70"></div>
        </div>
      </div>
      
      <p class="text-white/50 font-mono text-sm max-w-2xl mx-auto">
        {i18n.t.features.description}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each features as feature, index}
        <div class="cursor-pointer bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 h-full group hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5" style="animation-delay: {index * 100}ms">
          <div class="p-6 flex flex-col items-start h-full">
            <div class="mb-4 p-3 bg-white/5 group-hover:bg-primary/20 transition-all duration-300 border border-white/5 group-hover:border-primary/30">
              <feature.icon class="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <h3 class="text-lg font-bold uppercase tracking-wide mb-2 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
            <p class="text-muted-foreground text-xs font-mono leading-relaxed">{feature.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
