---
title: "Prompt Engineering is Dead"
description: "Everyone's obsessed with prompts. They're optimising the wrong thing. Context engineering is the skill that actually matters."
pubDate: Feb 06 2026
category: AI
featured: true
---

*The skill everyone's teaching is already obsolete.*

---

Everyone's obsessed with prompts.

"Use this magic phrase." "Start with 'You are an expert...'" "Add 'think step by step' at the end."

I've got news: you're optimising the wrong thing.

A mediocre prompt with rich context beats a perfect prompt with no context. Every time.

## The Shift Nobody's Talking About

Here's what Gartner says:

> "Agentic AI suffers high failure rates due to misalignment and poor coordination. Context engineering addresses this by curating and sharing dynamic contexts — which prompt engineering is incapable of."

Let that sink in. Prompt engineering is *incapable* of solving the actual problem.

Phil Schmid (who builds this stuff for a living) puts it more directly:

> "Building powerful AI Agents is becoming less about finding a magic prompt. It is about engineering context — providing the right information and tools, in the right format, at the right time."

The prompt is what you say. The context is what the AI knows *before* you say anything.

One of these matters a lot more than the other.

## Three Levels of AI Leverage

When I run AI training at work, I frame it as three levels:

### Level 1: Context

This is table stakes. Before you ask anything, give the AI what it needs:
- The document you're working on
- The email thread you're responding to
- The data you're analysing
- The style you want to match

Most people skip this. They type a question into an empty chat and wonder why the output is generic garbage.

### Level 2: Tools

This is where it gets interesting. AI that can *do things* — not just write things.

Create a Jira ticket. Send a Slack message. Query a database. Update a spreadsheet.

I built an MCP (Model Context Protocol) integration for ProductBoard in a weekend. Is it perfect code? No. Does it work? Yes. Now I can ask Claude to update our product backlog while I focus on thinking.

If a PM can build this, imagine what an engineer could do.

### Level 3: Skills

This is the unlock most people never reach.

A skill is a reusable instruction set. It tells the AI:
- What role it's playing
- What steps to follow
- What "good" looks like
- What to avoid
- Examples of the output you want

Here's the thing about skills: they're company IP.

When someone leaves, their prompts leave with them. But skills? Skills live in your system. They encode institutional knowledge. They're the difference between "we had someone who was good at that" and "we have a process that works."

## What Goes in a Skill File

Keep it under 500 tokens. Structure it like this:

**Identity** — What is this skill for? One sentence.

**Workflow** — Sequential steps. Be specific.

**Quality Criteria** — What does "good" look like? What does "bad" look like?

**Examples** — Show, don't just tell.

**Guardrails** — What should the AI never do?

That's it. No magic. Just clarity.

## The Jagged Frontier (Or: When AI Makes You Worse)

Here's the stat that should scare you:

A Harvard/BCG study found that consultants using AI improved quality by 40% and speed by 25% — *when working within AI's capability frontier*.

But when they used AI on tasks *outside* that frontier? They were 19 percentage points LESS likely to produce correct solutions than people working without AI at all.

Read that again.

AI doesn't just fail to help on hard problems. It actively makes you worse. Because you trust output you shouldn't trust.

This is why context engineering matters. You need to know what AI is good at (drafting, summarising, transforming, first passes) and what it's bad at (judgment calls, novel situations, anything requiring ground truth it doesn't have).

Skills help here too. A good skill file includes guardrails: "Don't guess. If you're uncertain, say so."

## The 80% Problem

Nate B Jones tracked AI tool adoption across companies. His finding:

**80% of workers abandon AI tools within 3 weeks.**

Not because the tools don't work. Because people don't know how to use them properly.

They try prompting. It's hit or miss. They give up.

The 20% who stick with it? They figured out context. They built skills. They stopped treating AI as a magic oracle and started treating it as a capable but inexperienced team member.

## Getting Started

Here's what I tell people:

1. **Pick one project.** Not your whole workflow. One thing.

2. **Identify one chore.** Something you can describe in 30 seconds but takes 20 minutes to do properly.

3. **Build one skill.** Write down how you do it. What you check. What good looks like. Put it in a file.

4. **Use it for a week.** Refine as you go. Notice what works and what doesn't.

That's it. One project. One chore. One skill.

After a month, you'll have a library. After three months, you'll wonder how you worked any other way.

## The Real Risk

People worry AI will take their job.

That's the wrong worry.

The risk isn't that AI takes your job. The risk is that someone who uses AI well takes your job.

The gap between "knows how to prompt" and "knows how to engineer context and build skills" is about to become very visible.

Which side do you want to be on?
