<script>
  import { Rocket, CheckCircle2, Calendar, Tag } from 'lucide-svelte';
  import { createI18n } from '$lib/i18n.svelte.js';

  const i18n = createI18n();

  const items = $derived([
    i18n.t.changelog.item1,
    i18n.t.changelog.item2,
    i18n.t.changelog.item3,
    i18n.t.changelog.item4
  ]);
</script>

<section id="changelog" class="py-20 md:py-28 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black"></div>
  
  <!-- Grid pattern -->
  <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
  
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 mb-6">
          <div class="w-2 h-2 bg-primary animate-pulse"></div>
          <span class="text-primary font-mono font-bold tracking-widest uppercase text-xs">{i18n.t.changelog.title}</span>
          <div class="w-2 h-2 bg-primary animate-pulse"></div>
        </div>
        <h2 class="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-4">
          {i18n.t.changelog.title}
        </h2>
        <p class="text-white/50 font-mono text-sm max-w-lg mx-auto">
          {i18n.t.changelog.subtitle}
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-px"></div>
        
        <!-- Release card -->
        <div class="relative pl-8 md:pl-0 md:w-1/2 md:ml-auto md:pl-12">
          <!-- Timeline dot -->
          <div class="absolute left-0 md:left-0 top-8 -translate-x-1/2 md:-translate-x-[calc(100%+1.5rem)]">
            <div class="relative">
              <div class="w-4 h-4 bg-primary rotate-45"></div>
              <div class="absolute inset-0 w-4 h-4 bg-primary rotate-45 animate-ping opacity-30"></div>
            </div>
          </div>
          
          <!-- Card -->
          <div class="relative bg-black/60 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-500 overflow-hidden group">
            <!-- Corner decorations -->
            <div class="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/40"></div>
            <div class="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/40"></div>
            <div class="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/40"></div>
            <div class="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/40"></div>
            
            <!-- Header -->
            <div class="p-6 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
              <div class="flex flex-wrap items-center gap-4 mb-4">
                <div class="flex items-center gap-2 px-3 py-1.5 bg-primary/20 border border-primary/40">
                  <Tag class="w-4 h-4 text-primary" />
                  <span class="text-primary font-mono font-bold text-sm">v1.0.0</span>
                </div>
                <div class="flex items-center gap-2 text-white/40 font-mono text-sm">
                  <Calendar class="w-4 h-4" />
                  <span>2025-07-12</span>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="p-2 bg-primary/10 border border-primary/30">
                  <Rocket class="w-6 h-6 text-primary" />
                </div>
                <h3 class="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
                  {i18n.t.changelog.initialRelease}
                </h3>
              </div>
            </div>
            
            <!-- Content -->
            <div class="p-6">
              <ul class="space-y-4">
                {#each items as item, idx}
                  <li class="flex items-start gap-4 group/item">
                    <div class="mt-0.5 p-1 bg-green-500/10 border border-green-500/30">
                      <CheckCircle2 class="w-4 h-4 text-green-400" />
                    </div>
                    <span class="text-white/70 font-mono text-sm leading-relaxed group-hover/item:text-white/90 transition-colors">
                      {item}
                    </span>
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Bottom accent -->
            <div class="h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
