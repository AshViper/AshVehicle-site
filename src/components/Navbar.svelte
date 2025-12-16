<script>
  import { Menu, X, Download, Globe } from 'lucide-svelte';
  import { createI18n } from '$lib/i18n.svelte.js';

  const i18n = createI18n();

  let isOpen = $state(false);
  let scrolled = $state(false);
  let showLangMenu = $state(false);

  $effect(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function scrollToSection(id) {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      isOpen = false;
    }
  }

  function setLang(lang) {
    i18n.language = lang;
    showLangMenu = false;
  }

  const navLinks = $derived([
    { name: i18n.t.nav.about, href: '#about' },
    { name: i18n.t.nav.vehicles, href: '#vehicles' },
    { name: i18n.t.nav.team, href: '#team' },
    { name: i18n.t.nav.changelog, href: '#changelog' }
  ]);
</script>

<nav class="fixed top-0 w-full z-50 transition-all duration-300 border-b {scrolled || isOpen ? 'bg-black/90 backdrop-blur-xl border-white/10 py-3' : 'bg-transparent border-transparent py-4 md:py-6'}">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <!-- Logo Text -->
    <button class="cursor-pointer group z-50 flex flex-col" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <span class="font-heading font-black text-lg md:text-xl tracking-tighter uppercase leading-none text-white group-hover:text-primary transition-colors duration-300">AshVehicle</span>
      <span class="font-mono text-[8px] md:text-[10px] text-primary tracking-[0.2em] leading-none mt-0.5 uppercase">MOD</span>
    </button>

    <!-- Desktop Nav -->
    <div class="hidden md:flex items-center gap-1">
      {#each navLinks as link}
        <button onclick={() => scrollToSection(link.href)} class="cursor-pointer text-sm font-bold text-muted-foreground hover:text-white hover:bg-white/5 px-4 py-2 transition-all duration-300 uppercase tracking-widest font-mono clip-corner relative group">
          {link.name}
          <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
        </button>
      {/each}
    </div>

    <!-- Desktop Actions -->
    <div class="hidden md:flex items-center gap-4">
      <div class="relative">
        <button onclick={() => showLangMenu = !showLangMenu} class="cursor-pointer p-2 text-muted-foreground hover:text-white hover:bg-white/5 transition-all duration-300">
          <Globe class="h-5 w-5" />
        </button>
        {#if showLangMenu}
          <div class="absolute right-0 top-full mt-2 bg-zinc-900 border border-white/10 w-32">
            <button onclick={() => setLang('en')} class="cursor-pointer w-full text-left font-mono text-xs py-2 px-3 hover:bg-primary hover:text-white transition-all duration-200">ENGLISH</button>
            <button onclick={() => setLang('ru')} class="cursor-pointer w-full text-left font-mono text-xs py-2 px-3 hover:bg-primary hover:text-white transition-all duration-200">РУССКИЙ</button>
            <button onclick={() => setLang('ja')} class="cursor-pointer w-full text-left font-mono text-xs py-2 px-3 hover:bg-primary hover:text-white transition-all duration-200">日本語</button>
          </div>
        {/if}
      </div>

      <button class="cursor-pointer bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider px-6 py-2 clip-corner shadow-[0_0_15px_rgba(255,107,53,0.3)] hover:shadow-[0_0_25px_rgba(255,107,53,0.5)] transition-all duration-300 flex items-center gap-2" onclick={() => window.open('https://www.curseforge.com/minecraft/mc-mods/ashvehicle', '_blank')}>
        <Download class="h-4 w-4" /> {i18n.t.nav.download}
      </button>
    </div>

    <!-- Mobile Toggle -->
    <button class="cursor-pointer md:hidden text-foreground p-2 border border-white/10 hover:bg-white/5 transition-all duration-300 z-50" onclick={() => isOpen = !isOpen}>
      {#if isOpen}
        <X class="h-6 w-6" />
      {:else}
        <Menu class="h-6 w-6" />
      {/if}
    </button>
  </div>

  <!-- Mobile Nav -->
  <div class="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 md:hidden transition-all duration-300 flex flex-col pt-24 pb-8 px-6 {isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}">
    <div class="flex-1 flex flex-col gap-2 overflow-y-auto">
      {#each navLinks as link, idx}
        <button onclick={() => scrollToSection(link.href)} class="cursor-pointer text-left text-2xl font-black text-white py-4 border-b border-white/5 uppercase tracking-tighter font-heading hover:text-primary hover:pl-2 transition-all duration-300 flex justify-between items-center group">
          {link.name}
          <span class="text-xs font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">0{idx + 1}</span>
        </button>
      {/each}
    </div>

    <div class="mt-8 space-y-6">
      <div class="grid grid-cols-3 gap-2">
        <button onclick={() => setLang('en')} class="cursor-pointer font-mono text-xs h-10 border border-white/10 transition-all duration-300 {i18n.language === 'en' ? 'bg-primary border-primary text-white' : 'bg-transparent hover:bg-white/5'}">ENG</button>
        <button onclick={() => setLang('ru')} class="cursor-pointer font-mono text-xs h-10 border border-white/10 transition-all duration-300 {i18n.language === 'ru' ? 'bg-primary border-primary text-white' : 'bg-transparent hover:bg-white/5'}">RUS</button>
        <button onclick={() => setLang('ja')} class="cursor-pointer font-mono text-xs h-10 border border-white/10 transition-all duration-300 {i18n.language === 'ja' ? 'bg-primary border-primary text-white' : 'bg-transparent hover:bg-white/5'}">JPN</button>
      </div>

      <button class="cursor-pointer w-full bg-primary text-white uppercase font-bold py-4 clip-corner shadow-[0_0_20px_rgba(255,107,53,0.2)] flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]" onclick={() => window.open('https://www.curseforge.com/minecraft/mc-mods/ashvehicle', '_blank')}>
        <Download class="h-5 w-5" />
        {i18n.t.nav.accessFiles}
      </button>
    </div>
  </div>
</nav>
