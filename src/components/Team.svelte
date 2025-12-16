<script>
  import { createI18n } from '$lib/i18n.svelte.js';
  import { Users, Shield, Code, Wrench } from 'lucide-svelte';

  const i18n = createI18n();

  const teamMembers = {
    founder: [{ name: "Aru-san (あーる)", github: "https://github.com/AshViper" }],
    admin: [{ name: "DreMch" }],
    coder: [{ name: "Denys Shatin", github: "https://github.com/denys-shatin" }],
    modelers: [
      { name: "maaaraion" },
      { name: "Roif Workshop" },
      { name: "₲ⱤɄ₦₲Ɇ ├┼┼┴┴┴┐" },
      { name: "xingyu⭐🐟" },
      { name: "Chryzoz" },
      { name: "Myo" }
    ]
  };
  
  const teamData = $derived([
    { role: i18n.t.team.founder, members: teamMembers.founder, icon: Shield, type: 'founder' },
    { role: i18n.t.team.admin, members: teamMembers.admin, icon: Users, type: 'admin' },
    { role: i18n.t.team.coder, members: teamMembers.coder, icon: Code, type: 'coder' },
    { role: i18n.t.team.modelers, members: teamMembers.modelers, icon: Wrench, type: 'modeler' }
  ]);
</script>

<section id="team" class="py-20 md:py-28 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-black to-zinc-950"></div>
  
  <!-- Grid pattern -->
  <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
  
  <div class="container mx-auto px-4 relative z-10">
    <!-- Header -->
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 mb-6">
        <div class="w-2 h-2 bg-primary animate-pulse"></div>
        <span class="text-primary font-mono font-bold tracking-widest uppercase text-xs">{i18n.t.team.personnel}</span>
        <div class="w-2 h-2 bg-primary animate-pulse"></div>
      </div>
      <h2 class="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-4">
        {i18n.t.team.commandTeam}
      </h2>
      <p class="text-white/50 font-mono text-sm max-w-lg mx-auto">
        {i18n.t.team.subtitle}
      </p>
    </div>

    <!-- Team Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each teamData as group}
        <div class="group relative">
          <div class="relative bg-black/60 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden">
            <!-- Corner decorations -->
            <div class="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-primary/40"></div>
            <div class="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-primary/40"></div>
            <div class="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-primary/40"></div>
            <div class="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-primary/40"></div>
            
            <!-- Header -->
            <div class="p-5 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-primary/10 border border-primary/30">
                  <group.icon class="w-5 h-5 text-primary" />
                </div>
                <h3 class="text-lg font-bold uppercase tracking-wider text-primary">
                  {group.role}
                </h3>
              </div>
            </div>
            
            <!-- Members -->
            <div class="p-5">
              <ul class="space-y-2">
                {#each group.members as member}
                  <li>
                    {#if member.github}
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        class="cursor-pointer flex items-center gap-3 p-2 -mx-2 rounded hover:bg-white/5 transition-all duration-300 group/member"
                      >
                        <div class="w-1.5 h-1.5 bg-primary/50 group-hover/member:bg-primary transition-colors"></div>
                        <span class="text-white/80 text-sm font-medium group-hover/member:text-primary transition-colors flex-1">
                          {member.name}
                        </span>
                        <svg class="w-4 h-4 text-white/20 group-hover/member:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    {:else}
                      <div class="flex items-center gap-3 p-2 -mx-2">
                        <div class="w-1.5 h-1.5 bg-white/30"></div>
                        <span class="text-white/60 text-sm font-medium">
                          {member.name}
                        </span>
                      </div>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
            
            <!-- Bottom accent -->
            <div class="h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
