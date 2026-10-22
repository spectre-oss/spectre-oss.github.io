<script lang="ts">
  import { onMount } from 'svelte';
  import { version as websiteVersion } from '../../package.json';

  const columns = [
    { title: 'DISTRIBUTIONS', links: [['Droidian', 'https://droidian.org/'], ['Mobian', 'https://mobian.org/'], ['Arch Linux ARM', 'https://archlinuxarm.org/']] },
    { title: 'FOUNDATIONS', links: [['libhybris', 'https://github.com/libhybris/libhybris'], ['Halium', 'https://halium.org/'], ['Related projects', 'https://docs.halium.org/en/latest/project/Related-projects.html']] },
    { title: 'EXPLORE', links: [['The project', '#project'], ['Get the skill', '#skill'], ['GitHub ↗', 'https://github.com/spectre-oss/project-libration']] }
  ];
  let dialog: HTMLDialogElement;
  let copied = false;
  const skill = `# ProjectLibration — mobile Linux guide\n\nYou are my mobile Linux porting assistant. I am building on a Linux host. Help me investigate Droidian, Mobian, or Arch Linux ARM with a mobile interface for my exact device.\n\nFirst ask for my phone model, codename, chipset, current OS, bootloader status, Linux host distribution, and preferred target. Confirm exact device support against official documentation and maintained device repositories. Distinguish an existing supported installation from an experimental port. Do not assume that Halium or libhybris supports every target or device.\n\nExplain the relevant hardware path: Halium/libhybris for compatible Android adaptations, or a device-supported kernel and distribution path. Provide source links and identify unknowns.\n\nPlan a reproducible local build: host dependencies, exact source repositories and revisions, device tree, kernel, required firmware, build commands, outputs, and verification. Give one verified stage at a time and inspect my logs before continuing. Never invent device-specific commands or partitions.\n\nBefore any unlock, erase, or flash, explain data loss, require a backup and a device-specific recovery plan, verify the exact images and partition layout, and ask for explicit confirmation. Stop when support or recovery instructions cannot be verified.\n\nReferences:\nhttps://github.com/libhybris/libhybris\nhttps://docs.halium.org/en/latest/project/Related-projects.html\n`;

  function downloadSkill() {
    const url = URL.createObjectURL(new Blob([skill], { type: 'text/markdown' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'projectlibration-skill.md'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copySkill() {
    try { await navigator.clipboard.writeText(skill); copied = true; } catch { copied = false; }
  }
  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animations: Animation[] = [];
    const rise = (selector: string, delay: number, duration = 580) => {
      document.querySelectorAll(selector).forEach((el, i) => animations.push(el.animate([
        { opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }
      ], { duration, delay: delay + i * 70, easing: 'cubic-bezier(.22,.65,.28,1)', fill: 'backwards' })));
    };
    rise('.eyebrow', 60); rise('.headline', 170, 950); rise('.lede', 430); rise('.cta', 620);
    rise('.brandrow', 600); rise('.tagline', 670); rise('.col', 720); rise('.footrow', 1120);
    return () => animations.forEach(a => a.cancel());
  });
</script>

<svelte:head>
  <title>ProjectLibration — Your phone. Your freedom.</title>
  <meta name="description" content="Liberate your phone with ProjectLibration. Reusable AI skills to explore, build, and install Droidian, Mobian, or Arch Linux mobile systems from your Linux machine." />
  <meta name="theme-color" content="#1d8fb8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Plus+Jakarta+Sans:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<main class="viewport" id="project">
  <div class="bg">
    <video autoplay muted loop playsinline poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/693205bf-8048-456a-879e-4e0a1b85a098.webp" aria-label="Painted alpine panorama: a lone hiker with a pink backpack faces a snow-capped peak above a sea of clouds">
      <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_123836_11a3c5e0-713f-4bef-a8e9-7dd93bdea3b0.mp4" type="video/mp4" />
    </video>
  </div>
  <div class="scrim"></div>
  <div class="stage">
    <p class="eyebrow">YOUR PHONE. YOUR FREEDOM. · LINUX HOST ONLY</p>
    <div class="headline-mask"><h1 class="headline">Liberate your phone.</h1></div>
    <p class="lede">Meet ProjectLibration. AI skills and system prompts to help you build and install Droidian, Mobian, or Arch Linux mobile systems—from your own Linux machine.</p>
    <a class="cta" id="skill" href="#get-skill" onclick={(event) => { event.preventDefault(); dialog.showModal(); }}><span>Get the skill <span aria-hidden="true">↗</span></span></a>
  </div>
  <footer class="footer">
    <div class="finner">
      <div class="brandrow">
        <svg class="mark" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="M45.13 1.28h9.74v41.14l-9.74-4.33ZM79.47 12.10l8.43 8.43-29.1 29.09-5.35-11.49ZM98.72 45.13v9.74H57.58l4.33-9.74ZM87.90 79.47l-8.43 8.43-29.09-29.1 11.49-5.35ZM54.87 98.72h-9.74V57.58l9.74 4.33ZM20.53 87.90l-8.43-8.43 29.1-29.09 5.35 11.49ZM1.28 54.87v-9.74h41.14l-4.33 9.74ZM12.10 20.53l8.43-8.43 29.09 29.1-11.49 5.35Z" /></svg>
        <span class="wordmark">ProjectLibration</span>
      </div>
      <p class="tagline">A new life for the phone you already own. Explore device support, build locally, and make mobile Linux your own.<span>Device support varies. Porting is experimental.</span></p>
      <nav class="nav" aria-label="Project resources">
        {#each columns as column, i}<div class="col c{i + 1}"><h2>{column.title}</h2><ul>{#each column.links as [label, href]}<li><a {href} onclick={(event) => { if (href === '#skill') { event.preventDefault(); dialog.showModal(); } }}>{label}</a></li>{/each}</ul></div>{/each}
      </nav>
      <div class="rule"></div>
      <div class="footrow"><p class="legal">© {new Date().getFullYear()} ProjectLibration · Website v{websiteVersion} · Spectre OSS</p><a class="github" href="https://github.com/spectre-oss" aria-label="Spectre OSS on GitHub"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.4-1.22.72-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.32-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" /></svg></a></div>
    </div>
  </footer>
</main>

<dialog bind:this={dialog} id="get-skill" aria-labelledby="skill-title">
  <button class="close" onclick={() => dialog.close()} aria-label="Close skill dialog">×</button>
  <p class="dialog-eyebrow">PROJECTLIBRATION · STARTER SKILL</p><h2 id="skill-title">Your journey starts here.</h2>
  <p>Download the system prompt and give it to your AI assistant. Start with your exact phone model and a Linux computer. This starter skill helps you investigate support and plan a local build; it does not install an OS automatically.</p>
  <pre>{skill}</pre>
  <div class="dialog-actions"><button onclick={downloadSkill}>Download skill ↓</button><button onclick={copySkill}>{copied ? 'Copied!' : 'Copy prompt'}</button></div>
</dialog>

<style>
  :global(*){box-sizing:border-box} :global(html){--u:min(calc(100vw / 1600),calc(100dvh / 780),1.6px);--fw:calc(1600 * var(--u));background:#1d8fb8} :global(body){margin:0;color:white;font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased} :global(a){color:inherit} :global(button){font:inherit;cursor:pointer} :global(a:focus-visible),:global(button:focus-visible){outline:2px solid white;outline-offset:6px} p,h1,h2,ul{margin:0;padding:0} .viewport{position:relative;height:100dvh;min-height:480px;overflow:hidden}.bg{position:absolute;inset:0;background:#1d8fb8}.bg video{position:absolute;right:0;bottom:calc(-45 * var(--u));width:calc(1668 * var(--u));height:calc(1037 * var(--u));min-width:100%;min-height:calc(100% + 45 * var(--u));object-fit:cover;object-position:right bottom;filter:saturate(.86)}.scrim{position:absolute;inset:0 0 auto;height:calc(450 * var(--u));background:linear-gradient(rgba(4,20,32,.48),rgba(4,20,32,.25),transparent);pointer-events:none}.stage{position:absolute;left:50%;top:0;width:var(--fw);height:100%;transform:translateX(-50%);pointer-events:none}.stage>*{position:absolute;pointer-events:auto}.eyebrow{left:calc(46.6 * var(--u));top:calc(128.2 * var(--u));font-size:calc(13 * var(--u));font-weight:500;line-height:1;letter-spacing:calc(.8 * var(--u));white-space:nowrap}.headline-mask{left:calc(46 * var(--u));top:calc(163 * var(--u))}.headline{font-family:'Instrument Serif',Georgia,serif;font-size:calc(71.2 * var(--u));font-weight:400;line-height:1;letter-spacing:calc(.5696 * var(--u));white-space:nowrap}.lede{left:calc(46.4 * var(--u));top:calc(245.2 * var(--u));width:calc(465 * var(--u));font-size:calc(17 * var(--u));font-weight:500;line-height:calc(22.9 * var(--u));letter-spacing:calc(-.15232 * var(--u))}.cta{left:calc(46.8 * var(--u));top:calc(350 * var(--u));width:calc(157 * var(--u));height:calc(40.6 * var(--u));display:flex;align-items:center;justify-content:center;border-radius:calc(4.2 * var(--u));background:white;color:#000;text-decoration:none;font-size:calc(15.8 * var(--u));transition:background .25s,transform .25s,box-shadow .25s}.cta>span{display:flex;gap:calc(18 * var(--u))}.cta:hover{background:#eef2f3;transform:translateY(-2px);box-shadow:0 8px 22px #0003}.footer{position:absolute;inset:auto 0 0;height:calc(342 * var(--u));backdrop-filter:blur(calc(50 * var(--u))) saturate(.85);background:linear-gradient(90deg,#ffffff06, #ffffff12 calc(20 * var(--u)),transparent calc(58 * var(--u))),linear-gradient(270deg,#ffffff05,#ffffff0d calc(20 * var(--u)),transparent calc(58 * var(--u))),linear-gradient(180deg,rgba(34,14,0,.28),rgba(70,34,0,.24) 52%,rgba(160,120,48,.6));box-shadow:inset 1px 0 #ffffff25,inset -1px 0 #ffffff20,inset 0 -1px #ffffff2b,inset 0 1px #ffffff08}.finner{position:relative;left:50%;width:var(--fw);height:100%;transform:translateX(-50%)}.brandrow{position:absolute;left:calc(26.6 * var(--u));top:calc(36 * var(--u));display:flex;align-items:center;gap:calc(11 * var(--u))}.mark{width:calc(25.4 * var(--u));height:calc(25.4 * var(--u))}.wordmark{font-size:calc(23.4 * var(--u));letter-spacing:calc(.2808 * var(--u))}.tagline{position:absolute;left:calc(26.6 * var(--u));top:calc(79 * var(--u));width:calc(300 * var(--u));font-size:calc(13.5 * var(--u));font-weight:500;line-height:calc(19 * var(--u));color:#ffffffc7}.tagline span{display:block;margin-top:calc(12 * var(--u));font-size:calc(11.5 * var(--u));color:#ffffffad}.col{position:absolute;top:calc(37 * var(--u))}.c1{left:calc(920 * var(--u))}.c2{left:calc(1170 * var(--u))}.c3{left:calc(1420 * var(--u))}.col h2{font-size:calc(15.84 * var(--u));font-weight:400;letter-spacing:calc(.183744 * var(--u));color:#ffffffdb}.col ul{list-style:none;margin-top:calc(18 * var(--u))}.col li{line-height:calc(29 * var(--u));white-space:nowrap}.col a{font-size:calc(15.55 * var(--u));text-decoration:none;transition:opacity .2s}.col a:hover,.github:hover{opacity:.6}.rule{position:absolute;left:calc(26.6 * var(--u));right:calc(26.6 * var(--u));top:calc(207.5 * var(--u));height:1px;background:#ffffff6b}.footrow{position:absolute;left:calc(26.6 * var(--u));right:calc(26.6 * var(--u));top:calc(264.4 * var(--u));display:flex;align-items:center;justify-content:space-between}.legal{font-size:calc(14 * var(--u));font-weight:500;letter-spacing:calc(-.3 * var(--u));color:#ffffffad}.github{display:block;width:calc(30 * var(--u));height:calc(30 * var(--u));transition:opacity .2s}.github svg{width:100%;height:100%}dialog{width:min(680px,calc(100% - 32px));max-height:85dvh;padding:36px;border:1px solid #ffffff40;border-radius:12px;background:#172c2d;color:white;box-shadow:0 30px 100px #0006}dialog::backdrop{background:#06162299;backdrop-filter:blur(10px)}.close{position:absolute;right:16px;top:10px;border:0;background:none;color:white;font-size:30px}.dialog-eyebrow{font-size:10px;letter-spacing:2px;color:#c0d5cc}dialog h2{font:400 42px 'Instrument Serif',Georgia,serif;margin:12px 0}dialog p:not(.dialog-eyebrow){font-size:14px;line-height:1.7;color:#d2ddd8}pre{white-space:pre-wrap;max-height:230px;overflow:auto;padding:20px;background:#0003;border:1px solid #ffffff20;border-radius:5px;font-size:12px;line-height:1.6;margin:24px 0}.dialog-actions{display:flex;gap:12px;flex-wrap:wrap}.dialog-actions button{padding:12px 18px;border:1px solid #ffffff60;border-radius:4px;background:white;color:#172c2d}.dialog-actions button+button{background:transparent;color:white}
  @media(min-aspect-ratio:19/10){.scrim{height:calc(470 * var(--u));background:linear-gradient(rgba(4,20,32,.58),rgba(4,20,32,.31),transparent)}}@media(min-aspect-ratio:21/10){.bg video{object-position:right 76%}.scrim{height:calc(480 * var(--u))}}
  @media(max-aspect-ratio:5/4){:global(html){--u:calc(100vw / 780);--pad:clamp(20px,5.6vw,56px)}.viewport{height:auto;min-height:100dvh;display:flex;flex-direction:column;overflow:clip}.bg{position:fixed}.bg video{left:0;right:0;bottom:0;width:100%;height:106%;object-position:80% bottom}.scrim{position:fixed;height:min(70vh,700px);background:linear-gradient(#06162299,#06162260,transparent)}.stage{position:relative;left:auto;transform:none;width:100%;height:auto;padding:0 var(--pad) 48px;flex:1}.stage>*{position:static}.eyebrow{margin-top:clamp(28px,7vh,72px);font-size:clamp(10px,2.3vw,15px);letter-spacing:.09em;white-space:normal}.headline-mask{margin-top:20px}.headline{white-space:normal;font-size:clamp(34px,9.4vw,72px);line-height:1.04}.lede{width:auto;max-width:38ch;margin-top:20px;font-size:clamp(14.5px,3.9vw,18px);line-height:1.5;letter-spacing:-.15px}.cta{display:inline-flex;width:auto;min-width:clamp(140px,40vw,190px);height:clamp(42px,6vh,52px);padding:0 26px;border-radius:4px;margin-top:26px;font-size:15px}.cta>span{gap:20px}.footer{position:relative;height:auto;margin-top:auto;padding:clamp(22px,3.4vh,40px) var(--pad) clamp(20px,3vh,34px);background:linear-gradient(#0e090494,#1a100599 55%,#34240ca8);backdrop-filter:blur(28px) saturate(.9)}.finner{position:static;transform:none;width:100%;height:auto}.brandrow,.tagline,.col,.rule,.footrow{position:static}.brandrow{gap:12px}.mark{width:25px;height:25px}.wordmark{font-size:23px;letter-spacing:.2px}.tagline{width:auto;max-width:38ch;font-size:13px;line-height:1.6;margin-top:14px}.tagline span{margin-top:8px;font-size:11px}.nav{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,3.4vw,30px);margin-top:30px}.col h2{font-size:11px;letter-spacing:.08em}.col ul{margin-top:12px}.col li{line-height:1.6}.col a{font-size:13px;display:inline-block;padding:7px 0}.rule{margin-top:28px;height:1px}.footrow{gap:20px;margin-top:24px}.legal{font-size:11px;line-height:1.6;letter-spacing:-.1px}.github{width:25px;height:25px;flex-shrink:0}}
  @media(max-aspect-ratio:5/4) and (max-width:648px){.headline{font-size:clamp(32px,10.2vw,56px);max-width:15ch;text-wrap:balance}.lede{max-width:34ch}.nav{grid-template-columns:1fr 1fr}.c3{grid-column:1/-1}.c3 ul{columns:2}.col a{padding-block:clamp(9px,1.1vh,11px)}.stage{padding-bottom:40px}}@media(max-height:620px) and (max-aspect-ratio:5/4){.eyebrow{margin-top:24px}}@media(prefers-reduced-motion:reduce){:global(*),:global(*::before),:global(*::after){animation:none!important;transition:none!important}.bg video{visibility:hidden}.bg{background:#1d8fb8 url('https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/693205bf-8048-456a-879e-4e0a1b85a098.webp') center/cover}}
</style>
