<script lang="ts">
  import ghost from '#lib/assets/favicon.svg';
  import { version } from '../../package.json';
</script>

<svelte:head>
  <title>SpectreOSS — Open software, independent hardware</title>
  <meta name="description" content="SpectreOSS builds open software and explores independent Linux systems for existing hardware. Explore Rabbit R1 and ProjectLibration." />
  <meta name="theme-color" content="#000000" />
</svelte:head>

<main>
  <header>
    <a class="identity" href="https://github.com/spectre-oss" aria-label="SpectreOSS on GitHub"><img src={ghost} alt="" width="38" height="38" /><span>SpectreOSS</span></a>
    <p class="intro">Open software.<br />Hardware on your terms.</p>
    <p class="description">We explore hardware, build independent Linux systems, and share the tools to make existing devices your own.</p>
  </header>

  <section aria-labelledby="projects">
    <h1 id="projects">Our projects</h1>
    <article>
      <div class="project-heading"><h2>Rabbit R1</h2><span class="status">In development</span></div>
      <p>An independent Linux stack for the Rabbit R1. Our work spans hardware reverse engineering, the kernel, the operating system, and a custom launcher.</p>
      <nav aria-label="Rabbit R1 repositories">
        <a href="https://github.com/spectre-oss/rabbit-r1">Overview <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/spectre-oss/rabbit-r1-kernel">Kernel <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/spectre-oss/rabbit-r1-os">OS <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/spectre-oss/spectre-launcher">Launcher <span aria-hidden="true">↗</span></a>
      </nav>
    </article>
    <article>
      <div class="project-heading"><h2>ProjectLibration</h2><span class="status">Early stage</span></div>
      <p>Give your phone a new life with mobile Linux. Reusable AI skills and system prompts help you investigate device support, build locally, and plan an installation of Droidian, Mobian, or an Arch Linux mobile system.</p>
      <p class="note">Linux host only. Currently a starter skill; device support and installation paths must be verified for each phone.</p>
      <nav aria-label="ProjectLibration resources">
        <a href="https://github.com/spectre-oss/project-libration">Explore the project <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/spectre-oss/project-libration/blob/main/skills/projectlibration.md">Read the skill <span aria-hidden="true">↗</span></a>
      </nav>
    </article>
  </section>

  <footer>
    <div><a href="https://github.com/spectre-oss">GitHub <span aria-hidden="true">↗</span></a><span class="version">Website v{version}</span></div>
    <p>Independent community projects. Not affiliated with Rabbit Inc.</p>
  </footer>
</main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(html) { background: #000; color-scheme: dark; }
  :global(body) { margin: 0; background: #000; color: #e8e8e8; font-family: system-ui, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1.7; }
  main { width: min(100%, 760px); margin: 0 auto; padding: 64px 32px 32px; }
  .identity { display: inline-flex; align-items: center; gap: 12px; font-size: 17px; font-weight: 550; letter-spacing: -.4px; text-decoration: none; }
  .identity img { display: block; border-radius: 50%; }
  p, h1, h2 { margin: 0; }
  .intro { margin-top: 68px; color: #f2f2f2; font-size: clamp(32px, 6vw, 46px); font-weight: 450; letter-spacing: -1.7px; line-height: 1.2; }
  .description { max-width: 520px; margin-top: 24px; color: #999; font-size: 16px; }
  section { margin-top: 68px; }
  h1 { padding-bottom: 18px; color: #777; font-size: 12px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; }
  article { padding: 30px 0 34px; border-top: 1px solid #242424; }
  .project-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 12px; }
  h2 { font-size: 20px; font-weight: 500; letter-spacing: -.5px; }
  .status { color: #747474; font-size: 12px; white-space: nowrap; }
  article p { max-width: 610px; color: #999; font-size: 15px; }
  article .note { margin-top: 12px; color: #737373; font-size: 13px; }
  nav { display: flex; flex-wrap: wrap; gap: 8px 24px; margin-top: 18px; }
  a { color: #d2d2d2; text-decoration: none; transition: color .15s; }
  a:hover { color: #fff; }
  a:focus-visible { outline: 2px solid #fff; outline-offset: 5px; }
  nav a, footer a { font-size: 13px; }
  nav a span, footer a span { margin-left: 3px; color: #777; }
  footer { margin-top: 20px; padding-top: 26px; border-top: 1px solid #242424; }
  footer > div { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .version, footer p { color: #606060; font-size: 11px; }
  footer p { margin-top: 12px; }
  @media (max-width: 480px) { main { padding: 32px 24px 24px; } .intro { margin-top: 48px; } section { margin-top: 48px; } .project-heading { flex-wrap: wrap; gap: 4px 16px; } }
  @media (prefers-reduced-motion: reduce) { a { transition: none; } }
</style>
