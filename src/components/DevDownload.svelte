<script>
  import { onMount } from 'svelte';
  import { Download, FileCode } from 'lucide-svelte';
  import { createI18n } from '$lib/i18n.svelte.js';

  const i18n = createI18n();
  
  let jarFilename = $state('');
  let version = $state('');
  let jarPath = $state('');
  let loading = $state(true);
  
  onMount(async () => {
    try {
      const res = await fetch('/AshVehicle-site/jar/version.json');
      const data = await res.json();
      jarFilename = data.filename;
      version = data.version;
      jarPath = '/AshVehicle-site/jar/' + jarFilename;
    } catch (e) {
      // Fallback
      jarFilename = 'ashvehicle-4.4dev-8.8-SNAPSHOT.jar';
      version = '4.4dev-8.8-SNAPSHOT';
      jarPath = '/AshVehicle-site/jar/' + jarFilename;
    }
    loading = false;
  });
</script>

<section class="py-12 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-zinc-950"></div>
  
  <div class="relative z-10">
  <div class="container mx-auto px-4">
    <div class="max-w-2xl mx-auto">
      <div class="relative bg-black/50 border border-primary/30 p-6 md:p-8">
        <!-- Corner decorations -->
        <div class="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary"></div>
        <div class="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-primary"></div>
        <div class="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary"></div>
        <div class="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary"></div>
        
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-primary/10 border border-primary/30">
              <FileCode class="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 class="text-white font-bold text-lg uppercase tracking-wider">{i18n.t.footer.devDownload}</h3>
              <p class="text-primary font-mono text-sm">{loading ? '...' : `v${version}`}</p>
            </div>
          </div>
          
          {#if loading}
          <div class="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 text-white/50 uppercase font-bold tracking-wider">
            <Download class="h-5 w-5 text-primary/50" />
            <span>...</span>
          </div>
          {:else}
          <a 
            href={jarPath}
            download
            class="cursor-pointer group relative flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/50 text-white hover:bg-primary/20 hover:border-primary transition-all duration-300 uppercase font-bold tracking-wider"
          >
            <Download class="h-5 w-5 text-primary" />
            <span>{i18n.t.footer.downloadJar}</span>
          </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
  </div>
</section>
