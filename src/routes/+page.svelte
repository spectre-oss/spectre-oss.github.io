<script lang="ts">
  import ghost from '#lib/assets/favicon.svg';
</script>

<svelte:head>
  <title>Spectre OSS</title>
  <meta name="description" content="Hardware reverse engineering, Linux device support, and open software. Starting with Rabbit R1." />
  <meta name="theme-color" content="#111111" />
</svelte:head>

<main>
  <img src={ghost} alt="Spectre ghost" width="88" height="88" />
  <h1>Spectre OSS</h1>
  <p>Hardware reverse engineering, Linux device support, and open software.</p>
  <section aria-labelledby="projects">
    <h2 id="projects">Rabbit R1</h2>
    <p>Our first project. An independent Linux stack for the Rabbit R1.</p>
    <nav aria-label="Rabbit R1 repositories">
      <a href="https://github.com/spectre-oss/rabbit-r1">Overview</a>
      <a href="https://github.com/spectre-oss/rabbit-r1-kernel">Kernel</a>
      <a href="https://github.com/spectre-oss/rabbit-r1-os">OS</a>
      <a href="https://github.com/spectre-oss/spectre-launcher">Launcher</a>
    </nav>
    <p class="note">In development. Public source releases are in preparation.</p>
  </section>
  <footer><a href="https://github.com/spectre-oss">GitHub ↗</a><p>Independent community project. Not affiliated with Rabbit Inc.</p></footer>
</main>

<style>
  :global(body) { margin: 0; background: #111; color: #ededed; font-family: system-ui, sans-serif; line-height: 1.7; }
  :global(*) { box-sizing: border-box; }
  main { max-width: 600px; margin: 0 auto; padding: 80px 24px 40px; }
  img { display: block; border-radius: 50%; margin-bottom: 24px; }
  h1 { font-size: 28px; letter-spacing: -.7px; font-weight: 600; margin: 0 0 12px; }
  h2 { font-size: 18px; font-weight: 500; margin: 0 0 8px; }
  p { color: #aaa; margin: 0 0 16px; }
  section { margin: 40px 0; padding: 28px 0; border-top: 1px solid #303030; border-bottom: 1px solid #303030; }
  nav { display: flex; flex-wrap: wrap; gap: 12px 24px; }
  a { color: #ededed; text-underline-offset: 4px; text-decoration-color: #666; }
  a:hover { text-decoration-color: #fff; }
  a:focus-visible { outline: 2px solid #fff; outline-offset: 5px; }
  .note { font-size: 13px; margin: 20px 0 0; }
  footer { font-size: 13px; }
  footer p { margin-top: 16px; color: #999; }
  @media (max-width: 480px) { main { padding-top: 40px; } }
</style>
