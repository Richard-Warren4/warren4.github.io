---
title: "Building Reflection Skills: How I Automated the Boring Part of Journaling"
description: Four Claude skills that handle daily, weekly, monthly, and yearly reflections - reducing the friction between scattered notes and actual insight.
pubDate: Jan 05 2025
category: Product Management
---

I've been using Obsidian for my PM work for about a year now. Daily notes, project documentation, decisions - all the usual stuff. But I kept running into the same problem: the end of the day would arrive, and I'd stare at my notes wondering what actually happened.

The data was there. My calendar knew where I'd been. My meeting notes app had transcripts. My Obsidian vault had files I'd modified. But pulling it all together into something useful? That was the friction point.

So I built a system. Four Claude skills that handle daily, weekly, monthly, and yearly reflections. Not as a replacement for thinking - but as a way to gather context so I can actually reflect instead of spending twenty minutes hunting through files.

## What the Skills Actually Do

### Daily Reflection

The daily skill runs at the end of my workday. It pulls together:

- Today's calendar events
- Recent Claude conversations (yes, it can search its own chat history)
- My Obsidian daily note
- Meeting notes from Granola (synced via Google Drive)
- Files I modified in my vault

Then it generates a summary for me to review. Not a polished report - just the raw material. Here's what we discussed. Here's what got done. Here's what didn't. Any gaps I missed?

After I confirm or correct, it creates tomorrow's daily note with my calendar already populated and carry-forward actions listed. Then it writes a short first-person reflection that gets appended to today's note.

The voice matters. I spent time tuning this. No superlatives. No corporate speak. No "great progress was made today" nonsense. Just honest, direct observations in my own voice.

### Weekly Reflection

Every Friday (or Monday morning if I forget), the weekly skill reads my daily notes from the week and synthesises them into a retrospective. What got done. What went well. What didn't. Key learning.

The output is 400-600 words. Concrete and specific. If I mention a project, I mention the actual ticket number or the person involved. The goal is something I can skim in six months and actually remember what happened.

### Monthly Reflection

The monthly skill pulls weekly reviews and metrics. It's more strategic - looking at patterns across weeks, checking project health, tracking decisions made. This is where I spot things like "I've been blocked on the same thing for three weeks" or "every review mentions energy being low."

800-1,200 words. Includes a P0/P1/P2 priority list for next month. Forces me to think about what I'm letting go of, not just what I'm adding.

### Yearly Reflection

The big one. Quarter-by-quarter summary. Role evolution. Skills developed. Relationships built. What went well and didn't across the whole year. Lessons about work and about myself.

This one takes longer - often split across two sessions. The skill gathers twelve months of monthly reviews (or falls back to weekly/daily notes for gaps), pulls metrics, and prompts me with reflection questions. Then it synthesises everything into a proper year-in-review document.

1,500-2,500 words. The kind of thing I'd never write from scratch but genuinely value having.

## Why This Works

The problem with reflection isn't motivation. It's activation energy. At the end of a long day, the last thing I want to do is hunt through four different apps to piece together what happened.

These skills reduce that friction to almost nothing. I type "let's do the reflection" and the system does the gathering. All I have to do is confirm, correct, and think.

The hierarchical structure matters too. Daily notes feed into weekly reviews. Weekly reviews feed into monthly. Monthly into yearly. Nothing gets lost. Patterns emerge that I'd never spot day-to-day.

And because the outputs are files in my Obsidian vault, they're searchable, linkable, and mine. Not locked in some app that might disappear. Plain markdown I can read in any text editor.

## The Technical Bits

Each skill is a markdown file with a structured format Claude understands. It specifies:

- **Trigger phrases** - when to use this skill
- **Paths** - where files live (vault locations, Google Drive folders)
- **Workflow** - step-by-step process with tool calls
- **Output format** - templates with clear structure
- **Voice rules** - how the output should read
- **Edge cases** - what to do when data is missing

The skills chain together. Meeting notes review feeds into daily reflection. Daily reflection creates files that weekly picks up. It's all file-based, which means it's robust. If something breaks, I can fix it manually or just run the skill again.

## What I'd Do Differently

If I were starting over, I'd build the weekly skill first. Daily is nice but weekly is where the real value compounds. You can skip a few daily reflections and still have a useful week. You can't skip several weeks and expect to remember anything by month-end.

I'd also simplify the metrics integration. Pulling KPIs from separate files adds complexity. For most people, the qualitative reflection is 80% of the value.

And I'd spend more time on the voice guide earlier. Getting the output to sound like me - not like a corporate summarisation engine - took more iteration than expected. But it's worth it. If the output feels generic, you won't read it.

## Try It Yourself

The pattern is portable. You don't need my exact setup. You need:

1. A place to store daily notes (Obsidian, Notion, plain files)
2. A way to give Claude access to those files (MCP, filesystem access)
3. Skills that define your workflow and voice

Start with weekly. One skill. See if it helps. Then expand.

The goal isn't a perfect system. It's reducing the friction between data and insight so you actually do the reflection you know you should be doing.

---

*I wrote about my broader PM operating system [previously](/blog/the-ai-pm-operating-system/). This post covers one specific piece of that system in more detail.*
