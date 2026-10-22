export const projects = [
  {
    slug: 'spectrer1', name: 'SpectreR1', category: 'LINUX · HARDWARE', status: 'In development', number: '01',
    tagline: 'A new system for the Rabbit R1.',
    summary: 'An independent Linux stack for the Rabbit R1, from hardware reverse engineering and the kernel to the operating system and launcher.',
    sections: [
      { title: 'Hardware, understood.', text: 'SpectreR1 explores the Rabbit R1 hardware and the Linux support needed to give the device an independent software stack.' },
      { title: 'From kernel to launcher.', text: 'The work spans device support, an operating system, and a custom launcher. Each part has its own repository so the stack can be explored piece by piece.' },
      { title: 'Work in progress.', text: 'SpectreR1 is in development. Check the repositories for current source availability and progress; a ready-to-install release is not promised here.' }
    ],
    links: [
      { label: 'Project overview', href: 'https://github.com/spectre-oss/rabbit-r1' },
      { label: 'Kernel', href: 'https://github.com/spectre-oss/rabbit-r1-kernel' },
      { label: 'Operating system', href: 'https://github.com/spectre-oss/rabbit-r1-os' },
      { label: 'Launcher', href: 'https://github.com/spectre-oss/spectre-launcher' }
    ]
  },
  {
    slug: 'projectlibration', name: 'ProjectLibration', category: 'MOBILE LINUX · AI SKILLS', status: 'Early stage', number: '02',
    tagline: 'Your phone. Your build. Your freedom.',
    summary: 'Reusable AI skills and system prompts to explore device support, build mobile Linux on your own machine, and plan an installation for your phone.',
    sections: [
      { title: 'Start with your device.', text: 'Give the starter skill to your AI assistant, then provide your exact phone model, codename, and Linux host distribution. The first step is to investigate a viable support path for that specific device.' },
      { title: 'Build on your own Linux machine.', text: 'ProjectLibration targets workflows for Droidian, Mobian, and Arch Linux mobile systems where device support exists. The skill helps plan source selection, host dependencies, a reproducible build, and output verification.' },
      { title: 'Choose the right hardware path.', text: 'Halium and libhybris are foundations for compatible Android hardware adaptations. They are not a universal installation path for every distribution or phone.' },
      { title: 'A starter skill, today.', text: 'The project currently provides a system prompt, not an automated installer or a verified device support list. A Linux host is required. Support, backups, and device-specific recovery instructions must be checked before flashing.' }
    ],
    links: [
      { label: 'Project repository', href: 'https://github.com/spectre-oss/project-libration' },
      { label: 'Read the starter skill', href: 'https://github.com/spectre-oss/project-libration/blob/main/skills/projectlibration.md' },
      { label: 'libhybris', href: 'https://github.com/libhybris/libhybris' },
      { label: 'Halium documentation', href: 'https://docs.halium.org/en/latest/project/Related-projects.html' }
    ]
  },
  {
    slug: 'shiraz', name: 'Shiraz', category: 'ANDROID · TRANSLATION LAYER', status: 'Experimental', number: '03',
    tagline: 'Android applications, a Linux home.',
    summary: 'An Android translation layer project exploring how Android applications can run on Linux systems.',
    sections: [
      { title: 'Bridging Android and Linux.', text: 'Shiraz explores the translation layer between Android applications and a Linux host, with the goal of making Android software usable within a Linux environment.' },
      { title: 'Compatibility is the work.', text: 'An application depends on more than its interface. Framework behavior, native libraries, graphics, and host integration all shape the compatibility work.' },
      { title: 'An experimental project.', text: 'Shiraz is under development. Application compatibility and installation instructions will depend on the implementation and target system; broad application support is not promised.' }
    ],
    links: [{ label: 'SpectreOSS on GitHub', href: 'https://github.com/spectre-oss' }]
  }
];
