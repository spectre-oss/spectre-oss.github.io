<script lang="ts">
  import { onMount } from 'svelte';
  import ghostSource from '#lib/assets/favicon.svg?raw';
  const ghostMarkup = ghostSource.replace(/<rect[^>]*\/>/, '').replace('role="img" aria-label="Spectre ghost logo"', 'aria-hidden="true"');
  let logo: HTMLDivElement;
  let hero: HTMLElement;
  let meshCanvas: HTMLCanvasElement;
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

  onMount(() => {
    const context = meshCanvas.getContext('2d');
    if (!context) return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, columns = 0, rows = 0;
    let points: { x: number; y: number; dx: number; dy: number; vx: number; vy: number }[] = [];
    let x = 0, y = 0, pressure = 0, frame = 0, last = 0;
    const resize = new ResizeObserver(() => {
      const bounds = hero.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      meshCanvas.width = Math.round(width * ratio);
      meshCanvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.ceil(width / 16) + 3; rows = Math.ceil(height / 16) + 3;
      points = Array.from({ length: columns * rows }, (_, i) => ({
        x: (i % columns - 1) * 16, y: (Math.floor(i / columns) - 1) * 16,
        dx: 0, dy: 0, vx: 0, vy: 0
      }));
      x = width * .7; y = height * .72;
    });
    resize.observe(hero);
    function draw(now: number) {
      if (!context) return;
      const dt = Math.min((now - (last || now)) / 16.667, 2);
      last = now;
      const ease = 1 - Math.pow(.94, dt);
      x += ((backgroundLit ? pointerX : width * .7) - x) * ease;
      y += ((backgroundLit ? pointerY : height * .72) - y) * ease;
      pressure += ((backgroundLit ? 1 : 0) - pressure) * (1 - Math.pow(.96, dt));
      context.clearRect(0, 0, width, height);
      for (const point of points) {
        const ox = x - point.x, oy = y - point.y;
        const weight = Math.exp(-(ox * ox + oy * oy) / (18 * 18));
        const amount = reducedMotion.matches ? 0 : weight * pressure;
        const targetX = ox * .22 * amount;
        const targetY = (oy * .22 + 6) * amount;
        point.vx = (point.vx + (targetX - point.dx) * .025 * dt) * Math.pow(.84, dt);
        point.vy = (point.vy + (targetY - point.dy) * .025 * dt) * Math.pow(.84, dt);
        point.dx += point.vx * dt; point.dy += point.vy * dt;
      }
      const path = new Path2D();
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const p = points[row * columns + col];
          if (!col) path.moveTo(p.x + p.dx, p.y + p.dy);
          else path.lineTo(p.x + p.dx, p.y + p.dy);
        }
      }
      for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
          const p = points[row * columns + col];
          if (!row) path.moveTo(p.x + p.dx, p.y + p.dy);
          else path.lineTo(p.x + p.dx, p.y + p.dy);
        }
      }
      context.lineWidth = .7;
      context.strokeStyle = 'rgba(255,255,255,.025)';
      context.stroke(path);
      const glow = context.createRadialGradient(x, y, 0, x, y, backgroundLit ? 32 : 260);
      glow.addColorStop(0, `rgba(216,230,255,${.06 + pressure * .14})`);
      glow.addColorStop(1, 'rgba(216,230,255,0)');
      context.strokeStyle = glow;
      context.stroke(path);
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => { resize.disconnect(); cancelAnimationFrame(frame); };
  });

</script>

<svelte:head>
  <title>SpectreOSS — Open software, independent hardware</title>
  <meta name="description" content="SpectreOSS builds open software and explores independent Linux systems for existing hardware. Explore Rabbit R1 and ProjectLibration." />
  <meta name="theme-color" content="#000000" />
</svelte:head>

<svelte:window onpointermove={illuminate} onblur={clearLight} onpointerout={(event) => { if (!event.relatedTarget) clearLight(); }} />

<main>
  <header class="hero" bind:this={hero} class:background-lit={backgroundLit} style:--pointer-x={pointerX + 'px'} style:--pointer-y={pointerY + 'px'}>
    <div class="hero-background" aria-hidden="true"><div class="halo"></div><div class="idle-glow"></div><canvas class="cloth-grid" bind:this={meshCanvas}></canvas><div class="background-logo" bind:this={logo} class:lit style:--light-x={lightX + '%'} style:--light-y={lightY + '%'}><svg class="ghost-occlusion" viewBox="0 0 512 512" aria-hidden="true"><path transform="translate(83.2 100) scale(1.6)" fill="#000" d="M107 10C80 7 61 25 54 49L46 88Q43 108 25 103Q9 99 11 115Q13 127 25 138L29 145Q25 159 42 159Q51 158 54 169Q61 189 83 182L101 176Q110 175 121 180Q141 190 155 174Q162 165 175 167Q196 168 193 149L189 132Q203 114 201 104Q202 90 185 90Q166 89 157 66L145 36Q132 11 107 10Z" /></svg><div class="ghost-base">{@html ghostMarkup}</div><div class="ghost-idle">{@html ghostMarkup}</div><div class="ghost-light">{@html ghostMarkup}</div></div></div>
    <div class="hero-inner">
    <a class="identity" href="https://github.com/spectre-oss" aria-label="SpectreOSS on GitHub"><span>SpectreOSS</span></a>
    <div class="hero-copy">
    <p class="intro">Open software.<br />Hardware on your terms.</p>
    <p class="description">We explore hardware, build independent Linux systems, and share the tools to make existing devices your own.</p>
    </div>
    <a class="explore" href="#projects"><span>Explore our projects</span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></a>
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
  .cloth-grid { position: absolute; inset: 0; width: 100%; height: 100%; }
  .idle-glow { position: absolute; left: 70%; top: calc(50% + clamp(85px, 14vw, 210px)); width: clamp(260px, 35vw, 520px); height: clamp(100px, 12vw, 180px); transform: translate(-50%, -50%); background: radial-gradient(ellipse, #d8e6ff26 0%, #d8e6ff0c 38%, transparent 72%); opacity: 1; transition: opacity .6s ease; }
  .background-logo { position: absolute; top: 50%; left: 70%; width: clamp(280px, 46vw, 680px); aspect-ratio: 1; transform: translate(-50%, -50%); animation: logo-float 20s ease-in-out infinite alternate; will-change: transform; }
  .background-logo :global(svg) { display: block; width: 100%; height: 100%; overflow: visible; }
  .ghost-occlusion { position: absolute; inset: 0; }
  .ghost-base { position: relative; opacity: .055; }
  .ghost-idle { position: absolute; inset: 0; opacity: .45; filter: drop-shadow(0 0 5px #d8e6ffb3) drop-shadow(0 0 18px #c8dcff80); }
  .ghost-light { position: absolute; inset: 0; opacity: 0; transition: opacity .6s ease; mask-image: radial-gradient(circle 130px at var(--light-x) var(--light-y), #000 0%, #0009 35%, transparent 100%); filter: drop-shadow(0 0 5px #ffffffb3) drop-shadow(0 0 18px #c8dcff80); }
  .lit .ghost-light { opacity: .85; transition-duration: 0s; }
  @keyframes logo-float { from { transform: translate(-54%, -55%) rotate(-9deg); } to { transform: translate(-46%, -45%) rotate(9deg); } }
  @keyframes drift { from { transform: translate(-60%, -55%) scale(.85); opacity: .55; } to { transform: translate(-40%, -45%) scale(1.15); opacity: 1; } }
  .explore { display: inline-flex; align-items: center; gap: 18px; align-self: flex-start; font-size: 12px; color: #888; }
  .explore span { display: block; line-height: 1; }
  .explore svg { display: block; flex-shrink: 0; color: #bbb; transform: translateY(-1px); animation: chevron-bounce 1.1s infinite; }
  .explore:hover svg, .explore:focus-visible svg { animation-duration: .48s; }
  @keyframes chevron-bounce { 0%, 55%, 100% { transform: translateY(-1px); animation-timing-function: cubic-bezier(.2,.8,.2,1); } 22% { transform: translateY(4px); animation-timing-function: cubic-bezier(.16,1,.3,1); } 40% { transform: translateY(-2px); } }
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
  @media (prefers-reduced-motion: reduce) { a, .ghost-light, .idle-glow { transition: none; } .halo, .background-logo, .explore svg { animation: none; } }
</style>
