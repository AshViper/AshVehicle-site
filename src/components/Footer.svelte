<script>
  import { Github } from 'lucide-svelte';
  import { createI18n } from '$lib/i18n.svelte.js';
  import logo from '$assets/logo.webp';

  const i18n = createI18n();
</script>

<footer class="relative py-16 overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black"></div>
  
  <div class="relative z-10">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div class="md:col-span-2">
        <div class="flex items-center gap-2 mb-6 cursor-pointer group">
          <img src={logo} alt="Logo" class="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
          <span class="font-heading font-bold text-xl text-white uppercase group-hover:text-primary transition-colors duration-300">AshVehicle</span>
        </div>
        <p class="text-muted-foreground max-w-sm mb-6 font-mono text-xs">
          {i18n.t.footer.desc}
        </p>
        <div class="flex gap-4">
          <a href="https://github.com/AshViper/AshVehicle-site" target="_blank" rel="noopener noreferrer" class="cursor-pointer p-2 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 border border-white/10 hover:border-primary/50 hover:scale-110">
            <Github class="h-5 w-5" />
          </a>
        </div>
      </div>

      <div>
        <h4 class="text-white font-bold mb-6 uppercase tracking-wider">{i18n.t.footer.resources}</h4>
        <ul class="space-y-4 font-mono text-sm">
          <li><a href="https://modrinth.com/mod/ashvehicle" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-muted-foreground hover:text-primary transition-all duration-300 hover:pl-2 inline-block">Modrinth</a></li>
          <li><a href="https://www.curseforge.com/minecraft/mc-mods/ashvehicle" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-muted-foreground hover:text-primary transition-all duration-300 hover:pl-2 inline-block">CurseForge</a></li>
          <li><a href="https://discord.com/invite/YGuzYt9pU2" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-muted-foreground hover:text-primary transition-all duration-300 hover:pl-2 inline-block">Discord</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-bold mb-6 uppercase tracking-wider">{i18n.t.footer.legal}</h4>
        <ul class="space-y-4 font-mono text-sm">
          <li><a href="https://github.com/AshViper/AshVehicle/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="cursor-pointer text-muted-foreground hover:text-primary transition-all duration-300 hover:pl-2 inline-block">GPL-3.0 License</a></li>
        </ul>
      </div>
    </div>

    <div class="pt-8 flex justify-center">
      <p class="text-muted-foreground text-xs font-mono">
        © {new Date().getFullYear()} {i18n.t.footer.copyright}
      </p>
    </div>
  </div>
  </div>
</footer>
