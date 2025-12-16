<script>
  import LoadingScreen from './components/LoadingScreen.svelte';
  import Navbar from './components/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import DevDownload from './components/DevDownload.svelte';
  import Features from './components/Features.svelte';
  import VehicleGallery from './components/VehicleGallery.svelte';
  import Changelog from './components/Changelog.svelte';
  import Team from './components/Team.svelte';
  import Footer from './components/Footer.svelte';
</script>

<LoadingScreen />

<div class="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
  <Navbar />
  <Hero />
  <DevDownload />
  <Features />
  <VehicleGallery />
  <Changelog />
  <Team />
  <Footer />
</div>
