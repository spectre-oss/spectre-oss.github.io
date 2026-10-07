<script lang="ts">
  import ghost from '#lib/assets/favicon.svg';
  const projects = [
    { name: 'Kernel', repo: 'rabbit-r1-kernel', text: 'Linux kernel changes and hardware support.' },
    { name: 'Operating system', repo: 'rabbit-r1-os', text: 'System integration, device services, and image tooling.' },
    { name: 'Launcher', repo: 'spectre-launcher', text: 'A native interface built around the device.' }
  ];
</script>

<svelte:head>
  <title>Spectre OSS — Understand the hardware. Build open software.</title>
  <meta name="description" content="Open-source hardware reverse engineering, Linux device support, and system software. Meet Spectre OSS and our first project, Rabbit R1." />
  <meta name="theme-color" content="#101010" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>
<div class="page" id="top">
  <header>
    <a class="brand" href="#top" aria-label="Spectre OSS home"><img src={ghost} alt="" width="38" height="38" /> SPECTRE <span>OSS</span></a>
    <a class="github" href="https://github.com/spectre-oss">GitHub <span aria-hidden="true">↗</span></a>
  </header>
  <main id="main">
    <section class="hero" aria-labelledby="intro">
      <div>
        <p class="eyebrow"><span class="dot"></span> INDEPENDENT · OPEN SOURCE</p>
        <h1 id="intro">Understand the hardware.<br /><span>Build open software.</span></h1>
        <p class="intro">We explore how devices work and build what comes next.<br class="desktop" /> Hardware reverse engineering, Linux, and software made to be shared.</p>
        <a class="button" href="#projects">Explore our first project <span aria-hidden="true">↓</span></a>
      </div>
      <img class="hero-ghost" src={ghost} alt="The Spectre ghost mascot" width="240" height="240" />
    </section>
    <section id="projects" class="projects" aria-labelledby="project-title">
      <div class="section-label"><span>01 / OUR FIRST PROJECT</span><span class="status">In development</span></div>
      <div class="project-heading"><h2 id="project-title">Rabbit R1, reimagined.</h2><a href="https://github.com/spectre-oss/rabbit-r1">Project overview <span aria-hidden="true">↗</span></a></div>
      <p class="project-description">An independent Linux stack for the Rabbit R1. From the kernel to the interface, we're working toward a device you can understand and build on.</p>
      <div class="cards">
        {#each projects as project, i}
          <a class="card" href={`https://github.com/spectre-oss/${project.repo}`}>
            <div class="card-top"><span>0{i + 1}</span><span aria-hidden="true">↗</span></div>
            <h3>{project.name}</h3><p>{project.text}</p><span class="repo">{project.repo}</span>
          </a>
        {/each}
      </div>
      <p class="release-note">Public source releases are in preparation. No installable OS release is available yet.</p>
    </section>
    <section class="contribute" aria-labelledby="contribute-title"><div><h2 id="contribute-title">Curiosity is a good place to start.</h2><p>Have a hardware finding, a question, or an idea? Join the work.</p></div><a href="https://github.com/spectre-oss/rabbit-r1/issues">Start a conversation <span aria-hidden="true">↗</span></a></section>
  </main>
  <footer><span>SPECTRE OSS</span><p>Independent community work. Not affiliated with Rabbit Inc.</p><a href="https://github.com/spectre-oss">Open on GitHub ↗</a></footer>
</div>

<style>
  :global(*){box-sizing:border-box} :global(html){scroll-behavior:smooth;scroll-padding-top:30px} :global(body){margin:0;background:#101010;color:#f2f0e9;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased} :global(a){color:inherit;text-decoration:none} :global(a:focus-visible){outline:2px solid #d8f594;outline-offset:6px} :global(::selection){background:#d8f594;color:#101010}
  .page{max-width:1152px;margin:auto;padding:0 48px} header{height:100px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #303030}.brand{display:flex;align-items:center;gap:10px;font-size:16px;font-weight:700;letter-spacing:1.7px}.brand span{color:#92928d;font-weight:400}.brand img{border-radius:50%}.github{font-size:14px}.github span{margin-left:12px;color:#a3a39b}.hero{min-height:490px;display:flex;align-items:center;gap:36px;padding:75px 0}.eyebrow,.section-label,.repo,.card-top,.release-note{font-family:monospace}.eyebrow{font-size:11px;letter-spacing:1.8px;color:#b1b1a8;display:flex;align-items:center;gap:9px}.dot{height:6px;width:6px;border-radius:50%;background:#d8f594}h1{font-size:clamp(36px,4.4vw,55px);line-height:1.12;letter-spacing:-2px;font-weight:500;margin:27px 0 24px}h1 span{color:#a4a49c}.intro{font-size:16px;line-height:1.8;color:#a9a9a2}.button{display:inline-flex;gap:28px;background:#e2efc6;color:#161a11;font-size:13px;font-weight:600;padding:16px 19px;border-radius:5px;margin-top:18px}.button:hover{background:#d8f594}.hero-ghost{margin-left:auto;width:215px;height:215px;border-radius:50%;flex-shrink:0}.projects{border-top:1px solid #303030;padding:32px 0 46px}.section-label{display:flex;justify-content:space-between;font-size:11px;letter-spacing:1px;color:#aaa99e}.status{color:#d8f594;letter-spacing:0}.project-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:27px}h2{font-size:30px;font-weight:500;letter-spacing:-.9px;margin:0}.project-heading a,.contribute a{font-size:13px;white-space:nowrap}.project-heading a span,.contribute a span{margin-left:12px}.project-description{max-width:650px;font-size:15px;color:#a9a9a2;line-height:1.8;margin:16px 0 28px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.card{display:block;border:1px solid #343434;border-radius:7px;padding:23px;background:#151515;transition:background .15s,border-color .15s}.card:hover{background:#1d1e19;border-color:#727d58}.card-top{display:flex;justify-content:space-between;color:#95988a;font-size:12px}h3{font-size:19px;font-weight:500;letter-spacing:-.3px;margin:28px 0 12px}.card p{font-size:14px;line-height:1.6;color:#a4a49c;min-height:45px;margin:0 0 22px}.repo{font-size:11px;color:#c4c8b7}.release-note{color:#99998f;font-size:11px;line-height:1.8;margin:19px 0 0}.contribute{border-top:1px solid #303030;border-bottom:1px solid #303030;padding:39px 0;display:flex;align-items:center;justify-content:space-between;gap:24px}.contribute h2{font-size:23px}.contribute p{color:#a4a49c;font-size:14px;line-height:1.7;margin-bottom:0}footer{padding:28px 0 34px;display:flex;align-items:center;justify-content:space-between;gap:20px;font-size:11px;color:#96968e}footer>span{letter-spacing:1.2px;color:#c4c4bb}footer p{margin:0;line-height:1.6}.skip{position:absolute;top:-80px;left:20px;padding:12px;background:#e2efc6;color:#101010}.skip:focus{top:10px}
  @media(max-width:800px){.page{padding:0 25px}.hero-ghost{width:150px;height:150px}.hero{gap:12px}h1{font-size:40px}.desktop{display:none}.cards{gap:10px}.card{padding:18px}.repo{font-size:10px}footer{flex-wrap:wrap}}
  @media(max-width:600px){header{height:80px}.hero{padding:44px 0;min-height:auto;flex-direction:column-reverse;align-items:flex-start;gap:14px}.hero-ghost{margin:0;width:108px;height:108px}h1{font-size:37px;letter-spacing:-1.5px}.intro{font-size:15px}.project-heading{align-items:flex-start;flex-direction:column;gap:16px}h2{font-size:29px}.cards{grid-template-columns:1fr}.card p{min-height:0}.card h3{margin-top:20px}.contribute{align-items:flex-start;flex-direction:column}.contribute h2{font-size:22px}footer{align-items:flex-start;flex-direction:column;gap:12px}.eyebrow{font-size:10px}}
  @media(prefers-reduced-motion:reduce){:global(html){scroll-behavior:auto}.card{transition:none}}
</style>
