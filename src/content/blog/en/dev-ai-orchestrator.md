---
title: "I ship 10× faster with AI — and still pass senior review"
description: "How modern devs use AI agents (Cursor, ChatGPT Codex…) to build faster, keep the code clean, and stay in control of their codebase."
pubDate: "2025-10-27"
published: true
tags:
  [
    "AI",
    "developer",
    "workflow",
    "productivity",
    "system design",
    "chatgpt",
    "claude",
    "orchestrator",
  ]
---

# I ship 10× faster with AI — and still pass senior review

> "AI doesn’t replace developers — it replaces people who don’t know what they’re doing."

---

## The familiar story

You’ve probably seen this (or been this person):

### Scene 1: Thien – tosses the entire spec into AI and waits for magic

He pastes a 200-line project plan into Cursor: “here’s everything, handle it.”  
→ The model nods, produces an app that *runs* with silky UI — yet the **“Save” button opens a “Delete” modal, and fixing one bug spawns ten more.**

Why does that happen?  
Because an AI only “understands” whatever fits in its current context; it can’t hold the full system flow like a real engineer.  
When you pile five or six features into one prompt, later instructions overwrite earlier ones, the logic tangles, and the model has to **invent code that merely looks plausible inside the sliver it still remembers**.  
Cue the domino effect of bugs.

👉 Bigger prompt, blurrier context.  
Want reliable output? Split features, feed back prior context, and make the AI “think in steps” like a teammate.

---

### Scene 2: Sang from the anti-AI camp

> “AI is dumb; the code is garbage.”  
> → Meanwhile the entire prompt was: “build an online store.”

Sound familiar? AI isn’t dumb — you just haven’t learned how to work with it yet.

---

## Reality check: AI behaves like a hyper-fast junior team

What it excels at:

- Codes at lightning speed
- Never needs a break
- Doesn’t ask for a raise

What it needs from you:

- Clear goals
- Honest review
- Guidance toward the right solution

That’s how I use AI every day. Here’s the workflow that keeps me in the driver’s seat.

---

## Three steps to steer AI (instead of getting dragged around)

### Step 1: Talk to AI like you’re clarifying requirements with a client

Before touching code, I ask ChatGPT or Claude to surface the real problem.

Example:

```
You: "I want to build a price-tracking feature for any product URL."

AI: "Okay, a few questions:
- Personal tracking only, or shared for many users?
- Do you need real-time alerts?
- Which domains must be supported?
- Scheduled crawling (e.g., every 6h) or on-demand when users visit?
- Target scale: 100 URLs, 10,000, or 1,000,000?"
```

I let the model interrogate me — those five minutes usually help me:

- Spot edge cases
- Choose the right approach
- Avoid heading down the wrong path

> Tip: ask AI, “What should I clarify before building this feature?”

---

### Step 2: Have the AI draft the plan — then review it like a tech lead

Once I’ve chosen a direction, I prompt:

```
"Create a detailed task list for the login feature.
Each task must include:
- Clear input/output
- Concrete acceptance criteria
- Required test cases"
```

AI spits out something like:

```
Task 1: Design the user database schema
Task 2: Implement the JWT service
Task 3: Create the login API endpoint
...
```

Now comes the *human* part: put on your tech-lead hat and sanity-check the plan.

- Is it actually feasible?
- Does it rely on missing or shaky assumptions?
- Will it survive review from another engineer?

This is where most people slip — they accept the list verbatim. Instead, grill the AI:

```
"This looks okay, but how exactly are you queuing background jobs?"
"Is that library stable?"
"If we swap this piece for Graphile Worker, does the logic stay intact?"
```

If one segment feels weak, ask for alternatives:

“This cron job won’t deploy well on Cloud Run. Give me another approach that still ensures periodic execution.”

> AI can propose a plan — you decide if it gets approved.

---

### 🧱 Before coding: set the foundation and the rules for your AI agents

Don’t ask **Cursor** or **ChatGPT Codex** to “build feature X” when your project is a blank folder.  
Before the first line of product code, lay the groundwork:

1. **Bootstrap the project with a clear architecture** — DDD or solid modular boundaries.
2. **Install the quality gate:** ESLint, Prettier, Husky, lint-staged — with strict rules (no `any`, no random `console.log`, no loose casting).
3. **Document your principles:** DRY, KISS, SOLID — so the AI writes in *your* style.
4. **Create a README** explaining goals and coding guidelines — when you say “read the codebase,” the agent has something concrete to latch onto.

> Lay down the rules, and the AI plays by them. Skip this, and the agent codes according to its own imagination — that’s when bugs start reproducing.

---

### 💾 Commit like checkpoints — don’t let Cursor “die without respawning”

After every feature, **commit to GitHub**.  
Why? Because **Cursor** or **Codex** can misread a prompt or lose context, drifting off-track before you even notice.

With clean commits:

- If the AI goes rogue → roll back to the latest “checkpoint” like it’s a save slot.
- A fresh AI session can understand the codebase faster thanks to clear history.

> Treat each commit as a safe save. If you crash, reload — don’t replay the level.

---

### 🧪 Test every module — make AI prove its own work

When a module or feature is done, don’t sprint to the next one.  
**Ask Cursor or Codex to write tests** (unit, integration, or E2E depending on scope).

Example prompt:  
“Write Jest tests for the auth module (login, register, refresh token). Cover error cases and edge cases.”

Then:

- Review the tests — are any cases missing?
- Run the suite — does the AI truly understand the logic it wrote?
- If it fails, feed the failures back as context and have it refactor.

> This forces the AI to own its output. Tests become living docs — and you avoid “fix one bug, spawn two.”

---

### 🔄 When context overflows — reset and retrain the agent

Long chats make **Cursor** or **Codex** forget earlier logic. That means the context window is saturated.

**Fix it properly:**

1. Start a fresh chat.
2. Tell the agent to reread the relevant module:  
   “Review the worker module in project A.”
3. Ask it to summarize the current flow (e.g., “So it’s a → b → c, right?”).
4. Only continue once you agree on the recap.

> Like loading a saved game — make sure the AI knows exactly where you’re standing.

---

### Step 3: Code with AI agents — but keep your hands on the wheel

This is the crucial part: never approve code you don’t understand.

Whenever AI writes code, I always:

#### Ask follow-up questions

```
"Which hashing algorithm fits this checksum?"
"This 'get all products' query might load thousands of items into RAM — how do we prevent that?"
```

#### Demand explanations

```
"Explain this DOM-parsing function step by step."
"Should this be pipelined? Why?"
```

#### Force refactors

```
"The async handling is messy — rewrite it with Lodash and RxJS for readability."
"Extract this util function; it doesn’t belong in the service."
"This search module isn’t SOLID; outline a refactor plan so I can review it."
```

The payoff: I keep learning, the code stays clean, and the system flow lives in my head.

---

## Mindset shift: from “coder” to “system designer”

**Before (no AI):**

- Writing every line yourself
- Drowning in repetitive code
- Googling syntax all day

**Now (with AI):**

- Focus on architecture and system design
- Outsource the grunt work to AI agents
- You still own logic, security, and testing

> You’re no longer the builder — you’re the architect and supervisor.

---

## Three things you must never do with AI

Copy code without reading — bugs will pile up.  
Trust AI blindly — it will hallucinate APIs or resurrect dinosaur-era patterns.  
Skip tests — AI-written code without tests is a ticking bomb.

---

## Human skills still win the war

AI boosts your velocity, but it can’t replace:

1. Systems thinking — understanding how everything connects
2. Debugging — finding and fixing issues
3. Security mindset — spotting vulnerabilities
4. Code review — telling good code from bad
5. Testing — ensuring stability and safety

> These all depend on human judgment. AI doesn’t have that.

---

## A workflow you can copy today

```text
1. Receive the requirement → Ask AI "What should I ask before starting?"

2. Brainstorm → List 2–3 feasible approaches

3. Pick the best path → Explain the context back to AI

4. Ask AI to produce a detailed task list

5. Code:
   - AI drafts
   - You review and question
   - Refactor if needed
   - Test thoroughly

6. Let AI propose test cases

7. AI drafts the docs → You refine them

8. Final review → Commit
```

---

## Bottom line

> AI doesn’t replace you — it levels you up.

**People who win with AI:**

- Have solid fundamentals (code, databases, systems)
- Ask sharp questions
- Learn from AI daily
- Keep final ownership

**People who lose:**

- Copy without understanding
- Don’t test
- Refuse to keep learning

Which side are you on?

---

## Try it on your next task

Next time you start coding, try this:

1. Don’t Google immediately  
2. Ask AI: “Here’s the problem — help me understand it before solving.”  
3. Let AI question you back  
4. Pick an approach → Have AI draft → Review carefully

Trust me — you’ll feel the difference immediately.

---

P.S. If this helped, share it with your teammates. The more devs who use AI responsibly, the stronger our community becomes.

Written by Hien Nguyen — full-stack engineer using AI to build faster, learn more, and still get a full night’s sleep.
