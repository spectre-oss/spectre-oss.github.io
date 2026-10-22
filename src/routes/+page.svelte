<script lang="ts">
  import ghostSource from '#lib/assets/favicon.svg?raw';
  const ghostMarkup = ghostSource.replace(/<rect[^>]*\/>/, '').replace('role="img" aria-label="Spectre ghost logo"', 'aria-hidden="true"');
  let logo: HTMLDivElement;
  let hero: HTMLElement;
  let pointerX = $state(0);
  let pointerY = $state(0);
  let backgroundLit = $state(false);
  function clearLight() { lit = false; backgroundLit = false; }
  let lightX = $state(50);
  let lightY = $state(50);
  let lit = $state(false);

  function illuminate(event: PointerEvent) {
    if (event.pointerType === 'touch') return;
    const heroBounds = hero.getBoundingClientRect();
    pointerX = event.clientX - heroBounds.left;
    pointerY = event.clientY - heroBounds.top;
    backgroundLit = pointerX >= 0 && pointerX <= heroBounds.width && pointerY >= 0 && pointerY <= heroBounds.height;
    const bounds = logo.getBoundingClientRect();
    lightX = (event.clientX - bounds.left) / bounds.width * 100;
    lightY = (event.clientY - bounds.top) / bounds.height * 100;
    lit = lightX >= 0 && lightX <= 100 && lightY >= 0 && lightY <= 100;
  }
  import { version } from '../../package.json';
</script>

<svelte:head>
  <title>SpectreOSS — Open software, independent hardware</title>
  <meta name="description" content="SpectreOSS builds open software and explores independent Linux systems for existing hardware. Explore Rabbit R1 and ProjectLibration." />
  <meta name="theme-color" content="#000000" />
</svelte:head>

<svelte:window onpointermove={illuminate} onblur={clearLight} onpointerout={(event) => { if (!event.relatedTarget) clearLight(); }} />

<main>
  <header class="hero" bind:this={hero} class:background-lit={backgroundLit} style:--pointer-x={pointerX + 'px'} style:--pointer-y={pointerY + 'px'}>
    <div class="hero-background" aria-hidden="true"><div class="halo"></div><div class="grid"></div><div class="pointer-light"></div><div class="background-logo" bind:this={logo} class:lit style:--light-x={lightX + '%'} style:--light-y={lightY + '%'}><div class="ghost-base">{@html ghostMarkup}</div><div class="ghost-light">{@html ghostMarkup}</div></div></div>
    <div class="hero-inner">
    <a class="identity" href="https://github.com/spectre-oss" aria-label="SpectreOSS on GitHub"><span>SpectreOSS</span></a>
    <div class="hero-copy">
    <p class="intro">Open software.<br />Hardware on your terms.</p>
    <p class="description">We explore hardware, build independent Linux systems, and share the tools to make existing devices your own.</p>
    </div>
    <a class="explore" href="#projects">Explore our projects <span aria-hidden="true">↓</span></a>
    </div>
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
  main { overflow: clip; }
  .hero { position: relative; isolation: isolate; min-height: 100vh; min-height: 100svh; display: flex; }
  .hero-inner { position: relative; width: min(100%, 760px); margin: 0 auto; padding: 48px 32px 40px; display: flex; flex-direction: column; }
  .hero-copy { margin: auto 0; padding: 64px 0; }
  .hero-background { position: absolute; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; background: #000; }
  .halo { position: absolute; width: max(900px, 100vw); height: max(900px, 100vw); top: 48%; left: 65%; border-radius: 50%; background: radial-gradient(ellipse, #ffffff0d 0%, #ffffff06 24%, transparent 62%); transform: translate(-50%, -50%); animation: drift 24s ease-in-out infinite alternate; }
  .grid { position: absolute; inset: -96px; background-image: linear-gradient(#ffffff07 1px, transparent 1px), linear-gradient(90deg, #ffffff07 1px, transparent 1px); background-size: 96px 96px; mask-image: radial-gradient(ellipse at 65% 50%, #000 0%, transparent 65%); animation: grid-drift 32s linear infinite; }
  .pointer-light { position: absolute; inset: 0; opacity: 0; transition: opacity .6s ease; background: radial-gradient(circle 260px at var(--pointer-x) var(--pointer-y), #d8e6ff0c, transparent 100%); mask-image: radial-gradient(circle 260px at var(--pointer-x) var(--pointer-y), #000 15%, transparent 100%); }
  .pointer-light::after { content: ''; position: absolute; inset: -96px; background-image: linear-gradient(#d8e6ff38 1px, transparent 1px), linear-gradient(90deg, #d8e6ff38 1px, transparent 1px); background-size: 96px 96px; animation: grid-drift 32s linear infinite; }
  .background-lit .pointer-light { opacity: 1; transition-duration: 0s; }
  .background-logo { position: absolute; top: 50%; left: 70%; width: clamp(280px, 46vw, 680px); aspect-ratio: 1; transform: translate(-50%, -50%); animation: logo-float 20s ease-in-out infinite alternate; will-change: transform; }
  .background-logo :global(svg) { display: block; width: 100%; height: 100%; overflow: visible; }
  .ghost-base { opacity: .055; }
  .ghost-light { position: absolute; inset: 0; opacity: 0; transition: opacity .6s ease; mask-image: radial-gradient(circle 130px at var(--light-x) var(--light-y), #000 0%, #0009 35%, transparent 100%); filter: drop-shadow(0 0 5px #ffffffb3) drop-shadow(0 0 18px #c8dcff80); }
  .lit .ghost-light { opacity: .85; transition-duration: 0s; }
  @keyframes logo-float { from { transform: translate(-54%, -55%) rotate(-9deg); } to { transform: translate(-46%, -45%) rotate(9deg); } }
  @keyframes drift { from { transform: translate(-60%, -55%) scale(.85); opacity: .55; } to { transform: translate(-40%, -45%) scale(1.15); opacity: 1; } }
  @keyframes grid-drift { from { transform: translate(0, 0); } to { transform: translate(96px, 96px); } }
  .explore { display: inline-flex; align-items: center; gap: 18px; align-self: flex-start; font-size: 12px; color: #888; }
  .explore span { color: #bbb; }
  section, footer { width: min(100% - 64px, 696px); margin-left: auto; margin-right: auto; }
  footer { margin-bottom: 32px; }
  .identity { align-self: center; display: inline-flex; align-items: center; gap: 12px; font-size: 17px; font-weight: 550; letter-spacing: -.4px; text-decoration: none; }
  p, h1, h2 { margin: 0; }
  .intro { color: #f2f2f2; font-size: clamp(32px, 6vw, 46px); font-weight: 450; letter-spacing: -1.7px; line-height: 1.2; }
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
  @media (max-width: 480px) { .hero-inner { padding: 28px 24px; } section, footer { width: calc(100% - 48px); } section { margin-top: 48px; } .project-heading { flex-wrap: wrap; gap: 4px 16px; } }
  @media (prefers-reduced-motion: reduce) { a, .ghost-light, .pointer-light { transition: none; } .halo, .grid, .background-logo, .pointer-light::after { animation: none; } }
</style>
