---
title: "Inside an AI’s Brain: It’s Not as Smart as You Think"
description: "Decoding how ChatGPT, Cursor, and Claude really ‘think’ — from tokens and context to making them read fresh docs and write code that never goes out of date."
pubDate: "2025-11-03"
published: true
tags: ["ai", "cursor", "chatgpt", "claude", "workflow"]
author: "Hien Nguyen"
---

# I understand how AI thinks — and that’s how I force it to code what I want

> “AI won’t replace developers — but it will replace the ones who have **no idea how it really works.**”

---

## Opening story

I used to think AI was magic.  
It wrote smooth React components, tests were green, the UI sparkled.  
Until I asked:

> “Hey, why does `updateUser()`… delete the user?”

AI calmly replied:

> “Because that pattern is common in the dataset.”

I laughed.  
Not because it was funny, but because I finally understood something:  
**AI doesn’t understand anything. It only guesses.**

If a developer doesn’t understand how it guesses,  
AI is just a turbo intern — **fast guesses, fast mistakes.**

---

## 1. The harsh truth: it doesn’t understand, it just guesses well

ChatGPT, Claude, Cursor… have no intent, no awareness.  
They’re language models trained to **predict the next token that looks right** in the sentence you typed.

Example:

- You write `const app =`
- It predicts `express()`
- Not because it “gets” Express,  
  but because across billions of lines, “`app = express()`” is the **most common pattern**.

AI is autocomplete — juiced up on steroids.

### The time it “invented” an API for me

I once asked:

> “What’s the endpoint to upgrade a user to premium?”

It answered with full confidence:  
`POST /api/v1/users/premium/upgrade`

I implemented it, ran the tests — 404.  
That endpoint never existed.  
It hallucinated something that “sounded right.”

That’s when it clicked:

> **It doesn’t know. It just remembers patterns that look similar.**

---

## 2. Inside its brain — Transformer, attention, and that context thing

I’m not going textbook mode. Here’s the dev version:

- It reads everything you type **in parallel**, not left-to-right.
- It “looks back” at important parts with a mechanism called **attention**.
- It only “remembers” inside a temporary buffer called the **context window** — think of it as RAM.

### Attention, explained for developers

If you say:

> “Refactor file A but **don’t touch file B**.”

The model tags file B with extra weight — that’s attention.  
It marks what not to touch.

Every chat session = a fresh working memory.  
When context overflows, it **forgets the beginning** — like a dev on a 3-day sprint binge who reads code and forgets it minutes later.

---

## 3. Tokens, attention, context — minus the academic jargon

- **Token**: tiny piece of text such as `"function"`, `"return"`, `"()"`.
- **Attention**: how the model spots the parts worth focusing on.
- **Context**: the temporary RAM — and yes, it has limits.

Paste ten files into Cursor and it will refactor smoothly at first.  
Ask about `authService` later and it replies: “that function’s undefined.”  
Not because it’s dumb, but because **that chunk fell out of memory**.

### The time I shoved 20 files into Cursor

I tried refactoring an `auth` module by pasting everything — `auth.service.ts`, `jwt.util.ts`, `user.repository.ts`…

- Minute 10: spotless refactors, neat comments.
- Minute 15: duplicate functions creep in.
- Minute 20: it forgets `TokenService` existed.

Conclusion:

> “It isn’t tired. It just… ran out of RAM.”

---

## 4. How AI “understands” code (and why it still gets it wrong)

AI doesn’t run your program — it **simulates how code usually behaves** based on patterns.  
When it sees `if (x > 0)`, it doesn’t evaluate; it thinks:

> “Well, in most cases there’ll be a return or a log next.”

So code can look correct while the logic is broken.  
It’s like a junior dev whose syntax is pristine yet the feature fails.

👉 If you want it to grasp intent:

- Provide **test cases, inputs, expected outputs.**
- Ask it: “Explain why this test should pass or fail.”
- Don’t just say “write code” — give it the **problem statement.**

AI doesn’t need you to teach syntax. It needs the **goal.**

---

## 5. Bigger models, bigger brains — still limited

Larger models capture deeper context and write smoother responses,  
but long-term memory still depends on **context window size.**

Even with a million-token model, dump an entire project into one prompt and it’ll still derail.

> Narrow prompt, sharp answer.  
> Bloated prompt, blurry answer.

---

## 6. Why it hallucinates — and how to keep it honest

When it lacks data, it doesn’t say “I don’t know.”  
It **predicts whatever sounds most plausible.**

**Example:**

> “How do you fetch server-side in Next.js 15?”  
> — “Just use `getServerSideProps` like usual.”  
> (Meanwhile, App Router is waving goodbye.)

### How I fight “confident nonsense”

1. **Feed real docs**: README, schema, changelog, release notes.
2. **Lay down rules**: “If unsure → answer UNKNOWN. No guessing.”
3. **Force it to browse** before coding (if the model can).
4. **Split the prompt**: don’t shove the entire repo at once.

AI isn’t malicious — it simply **lacks context.**  
The cleaner the data you feed, the more accurate the output.

---

## 7. How it “learns” and “forgets”

- Every chat = a fresh working brain.
- No persistent memory (unless you build an agent with storage).
- Want it to “remember” your codebase? Use **RAG (retrieval-augmented generation).**

You either **replace the brain** (fine-tuning) or **hand it a handbook every day** (RAG).

### RAG vs. fine-tuning (dev version)

| Approach        | Goal                                 | Use when                               | Cost / Effort                                |
| --------------- | ------------------------------------ | -------------------------------------- | -------------------------------------------- |
| **Fine-tuning** | Re-train the model with your data    | Keep AI strictly in your company tone  | 💸 Expensive: large dataset, time, money     |
| **RAG**         | Let AI retrieve fresh docs every run | Ensure up-to-date knowledge & versions | ⚡ Cheap: fast, easy to update the knowledge |

> Fine-tuning = **swap the brain**. RAG = **hand it the docs** every time.

---

## 8. Chunking, embeddings, and why prompts get diluted

When you drop code into Cursor or ChatGPT, it does three things:

1. **Chunking:** break code/docs into smaller pieces.
2. **Embedding:** turn each chunk into vector coordinates.
3. **Retrieval:** when you ask something, fetch the chunks whose coordinates are closest to your question.

That’s how it knows `authService` is related to `userSession`, not `auth.css`.

But paste 20 files and the context window overflows.  
Chunks with lower relevance get pushed out, so when you ask about `authService`, it answers with `userService` logic.

> **Bottom line:** dilution isn’t because AI is dumb — your chunk fell out of the priority zone.

Clean code, clear names, smaller files ⇒ smarter AI.  
Just like teammates understand you because your code is readable.

---

## 9. Hallucination and security — when it “helps” you ship bugs

The scary part isn’t obvious bugs — it’s the “sounds right” logic that breaks silently.

I’ve seen it write a JWT middleware that checks tokens the wrong way, letting empty tokens through.

> It’s not trying to hack you, but it can “help you die quietly” with logic like `if (!token) allowAccess();` 😅

When AI writes backend code, **never auto-merge.**  
Audit especially: auth, validation, permissions.

It isn’t sabotaging you — it just mimics popular patterns.  
Popular doesn’t always mean correct.

---

## 10. Make it “study” like a real dev — force it to read docs first

Easiest way to update its knowledge before coding.

### Example

```
Before coding, read the React 19 changelog
and use the latest syntax for useActionState.
```

Or paste the docs directly:

```
Here’s the Next.js 15 release note:
https://nextjs.org/blog/next-15

Update the login module to Server Actions.
```

It’s basically telling your intern: “Read the doc, then code.”

---

## 11. Right context + narrow prompt = sharp code

I’ve tested this:

- GPT-4: paste five files → refactor → forgets imports, tests fail.
- Claude 4.5: paste the whole `/auth` folder → refactor cleanly, tests pass.
- Gemini: read an entire monorepo → understands the structure, but outputs long, fuzzy code.

Conclusion:

**Better model ≠ better code.**  
**Enough context + precise question = better code.**

---

## 12. Want a real-world walkthrough?

This post is about how AI works inside.  
If you want to see **how I ship 10× faster with AI and still pass senior review**, read part one of the series 👉 [Dev × AI Orchestrator](/en/blog/post/dev-ai-orchestrator/)

---

## TL;DR

- AI doesn’t “understand,” it **predicts the most likely token.**
- It remembers within a **context window** — when it’s full, it forgets.
- Want it to “learn”? Use **RAG** or force it to read docs.
- Chunking + embeddings make retrieval work, but prompts get diluted when overloaded.
- Narrow context → sharper code.
- And remember: **security, tests, review are on you, not the model.**

---

## Wrapping up — when devs understand how AI thinks

If [Dev × AI Orchestrator](/en/blog/post/dev-ai-orchestrator/) is about _working with AI like a teammate_,  
this article is about _understanding that teammate’s brain._

Once you know:

- how it **predicts**,
- how it **forgets**,
- and how to **force it to study** like a real dev,

you’re no longer “using AI” — you’re **conducting an invisible dev team.**

> “You don’t need a fancy prompt — you need to define the rules of the game.”

---

## Something to try today

1. Pick an old task.
2. Feed it the latest changelog or docs.
3. Tell your assistant to update the feature to the new syntax.
4. Review it like a senior reviewing an intern.

If the code looks cleaner and reasoning clearer — congrats,  
you just leveled up your Dev × AI game.

---

**Written by Hien Nguyen** — full-stack dev using AI to build faster, learn more, and still get a full night’s sleep.
