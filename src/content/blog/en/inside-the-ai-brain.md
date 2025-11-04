---
title: "Inside an AI’s Brain: It’s Not as Smart as You Think"
description: "Decoding how ChatGPT, Cursor, and Claude really ‘think’ — from tokens and context to making them read fresh docs and write code that never goes out of date."
pubDate: "2025-11-03"
published: true
tags: ["ai", "cursor", "chatgpt", "claude", "rag", "fine-tuning", "workflow"]
author: "Hien Nguyen"
---

# I understand how AI thinks — and that is how I force it to ship the code I want

> “AI will not replace developers — but it will replace the ones who **do not understand how it actually works.**”

---

## 1) Harsh truth: AI does not “understand,” it just **guesses**

The first thing to accept (even if it stings): ChatGPT, Claude, whatever model you are using does **not understand** you.  
It only **guesses**.

- It sees `const app =` and guesses the next token is `express()` **not** because it “knows” Express, but because it has seen **millions** of GitHub snippets shaped exactly like that.
- It is a glorified “**pattern mimic**” running at lightspeed.
- Because it only guesses, whenever context is missing it will **hallucinate something plausible**.

**My lesson:** avoid vague prompts. **Feed** it the context (schema, README, explicit I/O) so it can guess the **exact** thing you want.

---

## 2) What happens inside the “black box” when you send a prompt

You type a prompt, hit Enter, and it feels like the model “gets it.”  
Reality: an absurd sequence of math operations happens under the hood —  
like a developer reading logs without ever running the program.

Imagine it working like this:

### Step 1: **Break the prompt apart (Tokenization)**

It does not see words, it sees tiny **tokens**.  
Example: `"Hello world"` gets chopped into `["Hel", "lo", " world"]`.  
The sentence `"Refactor file A but do not touch file B"` also explodes into dozens of pieces like `"Re"`, `"factor"`, `"file"`, `"A"`, `"do"`, `"not"`, `"touch"`, `"file"`, `"B"`.

### Step 2: **Convert pieces into numbers (Embedding)**

After tokenizing, each token is turned into a **vector** —  
think of it as a “coordinate of meaning” in a high-dimensional space.

Illustration:

| Token     | Vector (toy 3D example) |
| --------- | ----------------------- |
| "React"   | [0.8, 0.6, 0.1]         |
| "Vue"     | [0.79, 0.58, 0.15]      |
| "Angular" | [0.75, 0.6, 0.2]        |
| "cat"     | [-0.2, 0.1, 0.9]        |

The first three tokens sit **close together** because they mean similar things (frontend frameworks).  
“cat” lives far away — semantically unrelated.

AI does not “understand” what React is;  
it simply **maps tokens to vectors**  
and uses distances (cosine similarity) to infer relationships.

💡 Quick note:  
• This toy table is just for intuition — real embedding spaces use thousands of dimensions.

### Step 3: **Look at everything at once (Self-attention)**

It does not read left-to-right; it scans the entire vector map at once,  
then decides which parts deserve focus.  
In the earlier sentence, the vectors for “touch” and “file B” sit close together,  
so “file B” gets marked as a **no-go zone**.  
Not because it “understands” the rule, but because in training data,  
phrases like “do not do X to Y” follow similar patterns.

### Step 4: **Generate one token at a time**

It never writes the whole answer in one go.  
It generates **one token**, appends it to the context,  
then **re-runs attention on the entire context** before predicting the next token.  
Repeat, token by token, line by line.

**Prompt example:**

> _“Write a JavaScript function `sum(a, b)` that returns the total and add one Jest test.”_

To keep it readable, we group the tiny tokens into meaningful **chunks** (the model still works at token granularity):

| Step | Tokens generated              | Updated context                  | Notes                                         |
| ---: | ----------------------------- | -------------------------------- | --------------------------------------------- |
|    1 | `function`                    | `function`                       | Starts with a familiar JavaScript template    |
|    2 | ` sum`                        | `function sum`                   | Reuses the prompt’s function name             |
|    3 | `(a, b) {`                    | `function sum(a, b) {`           | Adds parameters and opens the block           |
|    4 | ` return a + b;`              | `... { return a + b;`            | Guesses the obvious implementation            |
|    5 | ` }`                          | `... }`                          | Closes the function                           |
|    6 | `\n\n`                        | (new line)                       | Prepares for the test section                 |
|    7 | `test('sum', () => {`         | `test('sum', () => {`            | Standard Jest pattern                         |
|    8 | ` expect(sum(2, 3)).toBe(5);` | `... expect(sum(2,3)).toBe(5);`  | Looks back to reuse the correct function name |
|    9 | ` });`                        | `... });`                        | Closes the test                               |

**Final output:**

```js
function sum(a, b) {
  return a + b;
}

test('sum', () => {
  expect(sum(2, 3)).toBe(5);
});
```

**Pseudo-code (JS)**

```js
function respond(prompt) {
  let context = textToEmbeddings(prompt);
  let output = [];

  while (true) {
    const richContext = selfAttention(context);
    const nextToken = sample(predictNextToken(richContext));
    if (nextToken === "[END_OF_SEQUENCE]") break;
    output.push(nextToken);
    context.push(tokenToEmbedding(nextToken));
  }

  return tokensToText(output);
}
```

> It does not “understand” you.  
> It simply **re-examines everything it has emitted** and **guesses the next token that keeps the pattern coherent**.

---

## 3) Why AI feels “dumb” when you paste lots of code

AI does not measure code by line count; it measures **semantic weight**.  
A 50-line file packed with logic can exhaust it faster than 100 lines of boilerplate.

Drop ten files into Cursor and it has to do this internally:

1. **Chunking:** split the code or docs into digestible pieces.  
2. **Embedding:** turn every chunk into that vector representation.  
3. **Retrieval:** when you ask a question, fetch only the chunks whose vectors are **closest to your query**.

Problem: the **context window (temporary memory)** is finite.  
When it overflows, the model must **evict** whatever seems least relevant —  
and its definition of “least relevant” might be the exact file you needed.

> You ask about `authService`, but the `authService` chunk was dropped,  
> so it grabs `userService` (hey, looks similar) and answers using that logic.  
> Sounds reasonable, breaks in production.

> In short: it is not “dumb” because your file is long,  
> it just has **too many things to juggle at once** — much like a dev debugging ten repos after three sleepless nights.

**How I reduce the “dumbness”:**

- Split the feature into focused questions.  
- Paste the most critical files **last** so they stay in memory.  
- Provide explicit input/output examples.  
- Spell out constraints: “Only touch this module, ignore everything else.”

---

## 4) Bigger model ≠ longer memory

Many people assume a larger model (GPT-4) “remembers” more than GPT-3.5. **Not true.**

- Larger models tend to **reason deeper** and produce **cleaner code**.  
- The available “memory” depends on the **context window**, **not** the parameter count.

A GPT-4 model with **8K** context still struggles compared with Claude **200K** when you drop a 100-page doc.  
**Golden rule:** **Narrow prompts → sharper answers. Bloated prompts → diluted intent.**

---

## 5) Why it hallucinates — and how I keep it honest

Hallucination is simple: when data is missing, the model’s job is to **keep predicting**, so it invents something “reasonable.”

**My mitigation playbook:**

- **Feed real docs:** drop in the README, schema, changelog.  
- **Set hard rules:** “If unsure, respond with **UNKNOWN**. No guessing.”  
- **Enable browsing:** force it to research before answering.  
- **Decompose the task:** avoid “build the whole feature in one go”; ship module by module and test each piece.

---

## 6) How it “learns” and “forgets” — **RAG vs fine-tuning**

Bad news: close the chat tab and it forgets everything. Every conversation = **a fresh brain**.

If you want it to “remember” your codebase, you have two options:

| Approach               | Goal                                         | Use when                            | Cost / Effort                                 |
| ---------------------- | -------------------------------------------- | ----------------------------------- | --------------------------------------------- |
| **Fine-tuning**        | “Replace the brain” with your proprietary data| You need a custom tone or code style | 💸 **Very high** — like training an intern for months |
| **RAG (Retrieval)**    | Hand it the “study guide” every time          | Your docs/codebase change frequently | ⚡ **Low** — fast, cheap, works for most teams |

**Plain English:** **Fine-tuning = send it to grad school for years. RAG = hand it the cheat sheet right before the exam.**  
For **99%** of us, **RAG is enough**.

---

## 7) The security nightmare of “plausible” hallucinations

Syntax mistakes are easy to spot; **plausible logic errors** are lethal.

Example: it writes a pristine JWT middleware but **checks the token the wrong way** (`if (isValid)` instead of `if (!isValid)`) → everyone gets in.  
The code looks beautiful, but you just merged an **open door**.

**Rule of thumb:** never auto-merge. Audit anything that touches **auth, input validation, permissions**, or **money**.

---

## 8) Force it to “update its brain” like a real developer

GPT-4’s training cutoff is mid-2023. How do you make it ship **React 19** or **Next 15** code?

- **Quick and dirty:** enable **browsing** → “**read the latest changelog before coding**.”  
- **Safer workflow (my go-to):** **paste the changelog** right into the prompt: “**Read this.** Refactor the component, **flag anything deprecated**, propose replacements.”  
- **Pro mode:** build an internal **RAG pipeline** — crawl changelog/GitHub/wiki, store it in a **vector database**, and let your agent query it before touching code.

---

## 9) My daily “teach the AI” checklist

- Know the **model** and its **context window**.  
- Slice the feature into **small tasks** with **clear I/O and success criteria**.  
- Always **feed real docs** (schema, interfaces, README).  
- Ask it to **scan for deprecations** and **suggest refactors**.  
- **Test and review** like you would review an intern (especially auth and permissions).

---

## 10) Want to see the workflow in action?

This post is the **theory of the brain.**  
Part one shows the **hands-on workflow** to ship faster and still pass review:  
👉 **[Dev × AI Orchestrator](/en/blog/post/dev-ai-orchestrator/)**

---

## TL;DR (for the impatient)

- AI does **not understand**, it **predicts** based on massive pattern libraries. Want better guesses? Provide **clean, narrow context**.  
- It behaves “dumb” with lots of code because the **context window** is limited — it must discard something.  
- To keep it up to date, rely on **RAG** or force it to read changelogs.  
- Never trust it with **security, permissions, or money** without a human review.

---

**Written by Hien Nguyen** — full-stack developer leveraging AI to build faster, learn more, and still sleep eight hours.
