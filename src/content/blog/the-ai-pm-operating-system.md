---
title: "How I Stopped Losing Context: A PM Operating System That Actually Works"
description: Your PM work should live in files you own, not scattered across browser tabs. Here's how I built an operating system using Claude Code and Obsidian that compounds daily.
pubDate: Nov 02 2024
category: Product Management
featured: true
heroImage: '/images/obsidian-and-claude.png'
---

## The Problem Every PM Knows

Every conversation ends. You draft a product strategy with Claude, copy it to Confluence, paste metrics into the chat, explain your context again. By your fifth browser tab, you've lost track of what you asked where. The work is scattered. The context resets.

I've been through this evolution: copy-paste hell, then Master Prompts, then MCP in the web interface (which genuinely transformed how I work - automating Jira tickets and Confluence pages). But something fundamental was still wrong.

Then I watched a NetworkChuck video that changed everything.

## The Insight I'd Missed

I knew about Claude Code but dismissed it as a developer tool. [NetworkChuck's video](https://youtu.be/MsQACpcuTkU) wasn't about writing code - he was researching, writing, managing projects. The key insight: Claude Code gives you **agents** and **direct file access**.

But the line that landed: "Everything you're doing lives as files on YOUR hard drive. Copy that folder anywhere. Use any AI tomorrow. It's yours."

That's when I saw it. My entire Master Prompt, my projects, my decision frameworks - they could all be files. The AI doesn't own my context. I do.

What if I combined this with Obsidian? What if I applied it to Product Management work? What if this could be my PM Operating System?

## The File System: Eight Folders That Run Everything

An operating system needs a file structure. Mine is an Obsidian vault stored in iCloud:

- **Dashboard/** - My daily hub (my focus, this week's snapshot, project health)
- **Decisions/** - Decision log, pending decisions, frameworks
- **Metrics/** - KPIs across all products
- **Communications/** - Templates for stakeholder updates, 3P reports, team comms
- **Strategy/** - Vision, quarterly priorities, roadmap
- **Problems/** - Active issues, risks, lessons learned
- **Knowledge/** - PM playbooks and frameworks
- **Research/** - User insights, competitive analysis, experiments

Each project gets its own subfolder with dedicated Claude Code context.

The two-level structure is key:

**Master Level**: Launch Claude Code at the top for cross-project visibility. "Show me all blockers." "Generate a 3P report for this week." "What decisions are pending?"

**Project Level**: Right-click a project folder in Finder → Open Terminal → launch Claude Code with full project context. Deep work happens here.

It all syncs via iCloud. Mac, iPad, phone - same files everywhere. Obsidian's wiki-style links connect everything. Every conversation, every decision, every insight is preserved and searchable.

My morning routine now takes 10 minutes: check My Focus, review This Week's snapshot, scan Active Issues. That's it. Before? Thirty-minute scramble across Slack, Jira, Confluence, memory. "What was I working on Friday?"

Weekly reviews follow a playbook template. Communication templates are ready to go. MCP creates Jira tickets and Confluence pages directly from conversations.

The setup took an afternoon. The value compounds daily.

## The Processes: Agents That Run in Parallel

Every operating system needs processes that can run independently. In this one, they're called agents.

I first thought of agents as replacements for Skills from the web interface. NetworkChuck's video revealed the real power: **fresh context windows**.

When you deploy an agent, Claude spins up a completely separate process with its own fresh 200,000 token context window. It's like a coworker walking over: "Hey, you busy? Here's some work."

Why this matters:

**Context Protection**: Your main conversation stays lean. An agent can burn through 40,000 tokens on research while your main chat only uses 4,000 more to coordinate.

**Unbiased Review**: When I need brutal feedback on a product strategy, I deploy my "brutal-critic" agent. Fresh eyes, no bias from our conversation, pure evaluation against my PM frameworks. Invaluable.

**Parallel Workstreams**: Launch multiple agents simultaneously. One researching competitors, another analysing user feedback, a third drafting a stakeholder update - all running in parallel while I focus on strategic decisions.

Here's what this looks like in practice: Last week I needed competitive analysis on file transfer solutions and their PLG approaches. I deployed my research agent with: "Compare WeTransfer, Dropbox Transfer, and SendAnywhere - how do they drive product-led growth, what's free vs paid, conversion tactics." While it ran (about 15 minutes), I kept working on the Q4 roadmap. When it finished, a full comparison document sat in Research/competitive-analysis.md, ready to reference.

I've built several:
- **pm-partner**: Strategic product advice
- **jira-manager**: Ticket creation and tracking across projects
- **message-crafter**: Drafts communications using my templates
- **brutal-critic**: Unbiased review against my frameworks

Some are tied to specific projects, others are personal agents I call from anywhere.

As a PM, my job is coordinating multiple workstreams. Agents don't just automate tasks - they distribute cognitive load while keeping my main context clean and focused. It's like having a team, not just a tool.

## The APIs: MCP Connects Everything

Every operating system needs APIs to connect to external systems. Mine uses Model Context Protocol (MCP).

This is where the OS moves from answering questions to completing work.

MCP is bidirectional - reading, updating, automating:

**Reading & Context**:
- Pull metrics reports directly into conversations
- Load Confluence documentation for context
- Fetch Jira ticket status across projects
- Access user research from connected tools

**Creation & Updates**:
- Draft a feature spec, create the Jira ticket directly
- Generate documentation, publish to Confluence
- Update existing pages with new information
- Modify tickets as requirements evolve

I can ask: "What's the status of our infrastructure migration across all products?" Claude pulls real data from Confluence and Jira. Then: "Create a stakeholder update about this and publish it to Confluence." Done.

One frustration: some PM tools (Mixpanel, Intercom) only have MCP servers for USA instances - European or APAC instances still require copy-paste. But MCP integration with what *does* work (Jira, Confluence, GitHub) has been game-changing. Reading context, modifying content, automating workflows in a single conversation - that's the compounding value.

## The Runtime: What This Looks Like Daily

**Morning Routine (10 min)**:
1. Open Dashboard/My Focus
2. Check Dashboard/This Week
3. Review Problems/Active Issues
4. Set today's top 3 priorities

**Deep Work**: Right-click a project folder in Finder → Open Terminal → launch Claude Code. Full project context loaded from CLAUDE.md. No re-explaining "what is this project."

**Cross-Project Coordination**: Launch Claude Code at master level. Ask: "Show me all blockers across projects." Deploy agents for ticket updates and communications. Generate 3P reports pulling from all contexts.

**Throughout the Day**: Capture notes (syncs to iCloud). Review agent outputs, add my thinking, create wiki links. Mobile: iPad/iPhone for reviewing outputs, adding notes, referencing docs anywhere.

**End of Day (5 min)**: Update project status. Log wins or learnings. Preview tomorrow.

**Weekly Review (60-90 min, every Monday)**: Follow the playbook in Knowledge/playbooks/. Update dashboards, check metrics, draft stakeholder updates. MCP creates Confluence pages and Jira tickets from the conversation.

The seamlessness is the point. No context-switching between tools. No copy-paste. No scattered browser tabs. Just files, synced everywhere, with AI that can read them, edit them, and act on them.

## How to Replicate This (Start Simple)

My first attempt failed. I created 50 files and folders, spent three hours on structure, never opened it again. Too much ceremony, not enough utility.

Here's what actually worked (detailed process at the end):

### The Basics (30 minutes)

**Step 1: Create the folder**

On Mac, navigate to `~/Library/Mobile Documents/com~apple~CloudDocs/` (that's your iCloud Drive). Create a new folder called "PM-Operating-System" or whatever you want to call it. Only put it in iCloud if you want mobile access - I'm an Apple devotee, so that's my path. Other systems are available, but you'll have to figure that out yourself.

**Step 2: Open Terminal there**

Right-click the folder → Services → New Terminal at Folder (or just drag the folder to Terminal).

**Step 3: Install Claude Code**

```bash
npm install -g @anthropic-ai/claude-code
```

Then launch it:

```bash
claude
```

**Step 4: Ask Claude to build your structure** (see the prompt below)

**Step 5: Open it in Obsidian**

In Obsidian: Open folder as vault → select your PM-Operating-System folder.

Why this works beautifully: Claude Code works with markdown (.md) files. Obsidian works with markdown files. They're literally reading and writing the same files. Win-win.

### The Secret: Start With Your Master Prompt

If you've been using Claude with a Master Prompt, that's gold. It knows your role, projects, stakeholders, priorities.

Use this prompt:

```
Here's my Master Prompt from the web interface:

[PASTE YOUR MASTER PROMPT]

Create a PM Operating System in this Obsidian vault:
- Dashboard/ (index.md, my-focus.md, this-week.md, project-health.md)
- Decisions/ (decision-log.md, pending-decisions.md, frameworks.md)
- Metrics/ (kpis.md)
- Communications/templates/ (3p-report, stakeholder-update, team-update)
- Strategy/ (vision.md, priorities.md, roadmap.md)
- Problems/ (active-issues.md, risks.md, lessons-learned.md)
- Knowledge/playbooks/ and Knowledge/frameworks/
- Research/
- projects/

Populate with context from my Master Prompt. Customise to MY work.
```

Claude builds an operating system that already knows your products, stakeholders, current priorities.

### Then Expand Week by Week

- **Week 1**: Use Dashboard daily. Just my-focus.md and this-week.md.
- **Week 2**: Add your first project folder. Practice master vs project-level Claude.
- **Week 3**: Set up MCP (the APIs) for Jira/Confluence.
- **Week 4**: Build custom agents (the processes) for your workflows.

Let Claude build your OS. You focus on running it.

## How I Actually Built This

I didn't manually create everything. Claude did most of the heavy lifting.

I described my process, my preferences, my projects. Claude generated the file structure and initial content. I tweaked. We iterated. It took an afternoon, not a week.

The real accelerator? I already had context. Months of using Claude on the web. Master Prompts. Project histories. MCP integrations. I pulled that existing context into the new OS - project descriptions, stakeholder information, decision frameworks, communication templates.

Within hours, my operating system was rich with actual information, not empty templates.

**If you have existing context, use it.** Your Master Prompt from the web. Your project docs. Your Confluence pages. Feed them to Claude Code and say "build my operating system from this." You'll get something useful immediately.

**If you're starting fresh, build carefully.** Don't create 50 folders and files day one. Start with Dashboard/my-focus.md. Use it for a week. Add Problems/active-issues.md. Use both for a week. Then add your first project folder. Let utility drive structure.

The warning either way: quality in, quality out. Vague project descriptions produce vague outputs. Specific stakeholder context produces useful drafts. Generic frameworks gather dust. Frameworks you actually use compound value.

## Why This Changes Everything

The shift from using AI as a tool to running AI as an operating system for PM work is significant. It's not about replacing thinking - it's about augmenting how we capture, process, and act on information.

An operating system has persistent state. Files that don't disappear. Processes that can run in parallel. APIs that connect to external systems. Multiple instances for different contexts. It's not ephemeral conversations - it's infrastructure.

Every project adds to the file system. Every agent run creates artifacts you reference later. Every note links to other notes, building a web of context. The OS compounds daily.

The installation takes an afternoon. The muscle memory takes 2-3 weeks. The compounding value? That's forever.

---

*What's your biggest PM context management pain point? I'm curious what patterns others have found. [Let me know](mailto:richard@warren4.co.uk).*