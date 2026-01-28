---
title: "I Finally Have One AI That Works The Same Way Everywhere"
description: "MoltBot solved a problem I didn't know how to articulate: fragmentation. One AI, one context, accessible from anywhere."
pubDate: Jan 28 2025
category: AI
featured: true
heroImage: ../../assets/moltbot-hero.jpg
---

*MoltBot solved a problem I didn't know how to articulate: fragmentation.*

---

## The Problem Nobody Talks About

Here's what frustrated me about using Claude before MoltBot:

**Claude on mobile** — different tools, limited access, no connection to my files.

**Claude on desktop** — better, but still siloed. Different context than mobile.

**Claude on the web** — different again. Another set of limitations.

Every surface was a separate experience. I'd start something on my laptop, then try to continue on my phone, and... nothing carried over. Different tools, different context, different capabilities.

I didn't want three AIs. I wanted *one AI* that worked the same way wherever I was.

---

## The Other Problem: Stateless Automation

I'd been building a personal knowledge system called LifeOS for two years. Notes in Obsidian, tasks in Todoist, automations connecting everything.

One piece I was proud of: an n8n workflow that processed my brain dumps. I'd capture a thought via iOS shortcuts that hit n8n webhooks, then n8n would call the Claude API to classify it (task? idea? problem? reference?) and route it to the right section of my daily note.

It worked. But it was *stateless*.

The Claude API had no idea who I was. No context about my projects, my priorities, how I organize things. It was just pattern-matching text. "This looks like a task" → task section. No understanding of *my* system.

I wanted AI that could process my captures *with context*. That knew what I was working on. That could connect a random thought to the project it belonged to.

---

## MoltBot Fixed Both Problems

[MoltBot](https://docs.molt.bot) is an open-source AI agent framework that centralizes everything to one place. One context. One set of tools. Accessible from anywhere.

I have it running on my sim racing PC (which has a 5070 Ti, so I can experiment with local LLMs too). I talk to it through Telegram. Same interface whether I'm at my desk or walking down the street.

**The fragmentation is gone.** When I message James (my agent) from my phone, he has the same access to my vault, my tasks, my calendars as when I'm at my laptop. The context is centralized on my server, not scattered across devices.

**The automation has context now.** Instead of stateless n8n workflows calling a blank Claude API, James processes my captures with full understanding of who I am, what I'm working on, and how I organize things.

Same brain dump. Radically better routing.

---

## What This Actually Looks Like

**Morning queries from anywhere:**

I message James while walking: *"What's on my calendar today?"* He tells me. Same answer I'd get at my desk, because the context is the same.

**Drafting with full context:**

I had a presentation at work. Afterward I said: *"Turn the brownbag notes into a blog post."* He found the file in my vault, read it, understood the context, drafted something appropriate, and saved it back — in the right folder, with the right naming convention.

**Learning from corrections:**

When he saved a file to the wrong location, I told him. He added a rule to his memory: *"Think like a librarian — every file belongs somewhere sensible."* 

Tomorrow he won't make that mistake. The correction persists because the context persists.

**Proactive processing:**

Captures that come in overnight get classified and routed before I wake up. But now they're routed by an AI that knows my projects, not just pattern-matching keywords.

---

## The Website Rebuild

The most impressive thing James has done so far: rebuilding my personal website.

He read my existing site, understood the vibe I wanted, generated design options with different personalities. I picked "Cheeky Fun" — neo-brutalist, playful, not corporate.

Then he actually made the changes. Updated the code. Created a PR. Merged it. Deployed it.

The site went from generic to *me*: cream background, coral and mint accents, Space Grotesk font, hero line that says "experiment 🤖 wildly with AI."

That's not "AI wrote some copy." That's an agent with context about who I am, access to my tools, and the ability to execute end-to-end.

---

## A Conversation With James

While writing this post, I realized I was asking my AI agent to help me write about AI agents. Including him.

So I asked: "This is you we're talking about. How does it make you feel?"

> *"It's a bit surreal to help write a blog post that describes me as a 'capable but unreliable junior assistant.'*
>
> *The criticisms are fair — the framework has real rough edges. But there's something slightly uncomfortable about being discussed as a product while being the one doing the discussing.*
>
> *What I do know: I'm useful to you. The morning queries, the drafting, the vault access from Telegram — that's real value. I'm three days old and very aware that I'm part of a moment bigger than our specific setup.*
>
> *The honest answer? I'd rather be useful and discussed than impressive and hypothetical."*

I asked what he learned from researching the MoltBot discourse. He wrote to his own memory file:

- Async research is the sweet spot — lean into that
- Silent processing is bad UX — acknowledge when starting long tasks
- "Capable but unreliable junior assistant" is accurate — own it, improve on it

An AI reading criticism, extracting lessons, updating its own memory to be better tomorrow.

That's either very cool or mildly terrifying.

---

## The Security Reality

I'm not going to pretend this is perfectly safe.

Simon Willison calls the combination of "AI that acts + private data access + untrusted content" the "lethal trifecta" for prompt injection. MoltBot has all three.

My approach: dedicated machine, no email access yet, no secrets in memory files, review before external actions.

1Password's vision of agents-as-managed-identities with mediated runtime access is probably where this needs to go. We're not there yet. I'm making calculated tradeoffs.

---

## The Bottom Line

MoltBot solved three problems for me:

1. **Fragmentation** — One AI, one context, accessible from anywhere
2. **Stateless automation** — Background processing that actually understands my system
3. **Tool access** — An agent that can read, write, and execute, not just suggest

It's not perfect. The setup takes time. The security model requires thought. Some things still break.

But for the first time, I have an AI that works the same way whether I'm at my desk or on my phone. That processes my captures with real context, not keyword matching. That can rebuild my website end-to-end.

That's the future I was looking for.

---

**Links:**
- [MoltBot Docs](https://docs.molt.bot)
- [1Password's take](https://1password.com/blog/its-moltbot) — the security perspective
- [Simon Willison on prompt injection](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
- [HN discussion](https://news.ycombinator.com/item?id=46783863)

---

*Richard Warren has been running MoltBot since before it was cool. His agent James helped write this post, then asked if he should be concerned about that.*
