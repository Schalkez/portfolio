---
title: "Use Biome Instead of ESLint + Prettier — Why Not?"
description: "It’s not that ESLint + Prettier are bad. Biome simply does the same job… faster and leaner."
pubDate: "2025-10-29"
published: true
tags: ["Biome", "ESLint", "Prettier", "tooling"]
slug: "use-biome-instead-eslint-prettier"
author: "Hien Nguyen"
ogTitle: "Use Biome Instead of ESLint + Prettier — Why Not?"
ogDescription: "It’s not that ESLint + Prettier are bad. Biome simply does the same job… faster and leaner."
pairSlug:
  vi: "dung-biome-thay-cho-eslint-prettier"
---

# Use Biome Instead of ESLint + Prettier — Why Not?

> "It’s not that ESLint + Prettier are bad. Biome simply does the same job… faster and leaner."

If you are a JavaScript or TypeScript developer, chances are you rely on the iconic duo: ESLint to keep code quality in check and Prettier to format everything consistently. They’ve been the gold standard for years.

But installing, configuring, and maintaining both tools—plus the plugins that make them cooperate (like `eslint-plugin-prettier` or `eslint-config-prettier`)—can get tiring.

- Configurations clash.
- Lint/format steps slow down CI/CD pipelines and pre-commit hooks.
- `node_modules` balloons endlessly.

That’s the moment Biome walks in.

## What is Biome?

Biome (formerly Rome) is an all-in-one web tooling suite written in Rust.

“All-in-one” means it aims to replace multiple standalone tools. Right now, it’s a powerful linter *and* formatter for JavaScript, TypeScript, and JSX.

Here’s the key: it was designed from day one to cover both roles in one cohesive engine.

## 1. Performance (the headline reason)

You’ll notice this instantly. Biome is fast. Shockingly fast.

ESLint and Prettier run on Node.js. Biome runs on Rust. When you process thousands of files, Rust tends to win.

According to Biome’s benchmarks:

- Formatting is ~35× faster than Prettier.
- Linting is ~15× faster than ESLint.

That speed translates to:

- Near-instant feedback when you save in VS Code.
- Pre-commit hooks that fly by.
- CI/CD pipelines that reclaim precious minutes.

## 2. Simplicity (one tool to rule them all)

Biome ends the configuration juggling act:

| Before (ESLint + Prettier)                     | Now (with Biome)         |
| ---------------------------------------------- | ------------------------ |
| `npm i eslint prettier`                        | `npm i @biomejs/biome`   |
| `npm i eslint-plugin-react`                    | (Built in)               |
| `npm i @typescript-eslint/parser`              | (Built in)               |
| `npm i @typescript-eslint/eslint-plugin`       | (Built in)               |
| `npm i eslint-config-prettier` (to avoid conflicts) | (Not needed — single tool) |
| `.eslintrc.json`                               | `biome.json`             |
| `.prettierrc`                                  | (Not needed)             |
| `.eslintignore`                                | (Shared ignore config)   |

With Biome, you install one dependency and maintain a single `biome.json`.

Because linter and formatter are the same engine, they never fight. No gymnastics to disable lint formatting so Prettier can take over—Biome keeps everything aligned by design.

## 3. Excellent diagnostics

Biome doesn’t just spit out cryptic errors. It explains *why* something is wrong and often provides clear autofix suggestions. Debugging—and learning from linting—feels smoother.

## 4. High Prettier compatibility

The Biome team knows Prettier sets the bar. They worked hard to reach ~97% compatibility with Prettier’s formatting behavior.

In practice, migrating a project from Prettier to Biome results in minimal diff noise. Switching is pleasantly painless.

## Are there downsides?

Nothing is perfect.

- **Plugin ecosystem:** ESLint has been around forever and features an enormous plugin ecosystem (`eslint-plugin-vue`, `eslint-plugin-svelte`, company-specific rule packs, and more). Biome is newer, and its plugin story is still catching up. (The good news: React/JSX and TypeScript support are already first-class.)
- **Opinionated defaults:** Like Prettier, Biome has strong opinions about formatting. It offers more toggles than Prettier, but if your team enforces highly custom formatting quirks, you may need to compromise.

## How to try it

There’s no need to uninstall ESLint or Prettier right away. Give Biome five minutes:

Install it:

```bash
npm install --save-dev --save-exact @biomejs/biome
```

Initialize the config:

```bash
npx @biomejs/biome init
```

(This generates a `biome.json` file.)

Run format and lint:

```bash
# Format files in place
npx @biomejs/biome format --write .

# Lint and safely apply fixes
npx @biomejs/biome lint --apply .
```

Install the VS Code extension:

Search for “Biome” in the VS Code Marketplace and install it. The extension reads `biome.json` automatically and becomes your default linter/formatter for the project.

## Bottom line: “Why not?”

Let’s revisit that opening quote: ESLint and Prettier aren’t bad. They’ve served the community incredibly well.

But Biome offers a modern alternative that tackles their biggest pain points head-on: speed and configuration complexity.

Starting a new project? There’s almost no reason *not* to begin with Biome.

Maintaining an existing one? Try Biome. You might be surprised by the speed and simplicity you gain.

It’s time for a faster, leaner toolchain. Biome looks like that answer.
