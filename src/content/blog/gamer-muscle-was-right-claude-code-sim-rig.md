---
title: 'Gamer Muscle Was Right. I Just Needed an AI to Get There.'
description: "How I used Claude Code to properly configure my Assetto Corsa triple-screen setup after years of putting it off — and why OG AC still wins."
pubDate: 'Feb 20 2026'
category: 'Sim Racing'
---

There's been a debate running through sim racing YouTube for a while now. Everyone's playing the shiny new releases — Le Mans Ultimate, Assetto Corsa Evo — and then there's a contingent, Gamer Muscle chief among them, making the same argument over and over: the original Assetto Corsa, properly set up with the right mods, is still one of the best experiences you can have.

I've owned AC for years. I've dabbled. But every time I thought about going back in properly, the same thing stopped me: the setup tax. Anyone who's been down the AC rabbit hole knows what I mean — Custom Shaders Patch, Pure, triple screen geometry, ini files, version compatibility, hours of forum posts. I'd rather just boot up something that works.

Then I thought: what if I let Claude Code deal with all of that?

## The Diagnosis

Before touching anything, it went looking. Not me describing the problem — it actually crawled the filesystem. Found two AC installations (I'd apparently put it on both D: and E: drives at some point because past-me was chaotic). Identified the active one. Checked mod versions by reading DLL file sizes and manifest files.

What it found: Custom Shaders Patch was already on the latest stable build. But Pure — the weather and lighting mod that makes AC look photorealistic — was on version 1.15. The current version is 3.10. I'd been running a mod that was years out of date without knowing.

This is exactly what I'd been dreading: hours of checking what version of what is installed, cross-referencing forum posts about compatibility. Done in seconds.

## The Fix

Pure needed a manual download (Patreon — fair enough, I'll pay the person making it look this good). I did that bit. Everything else Claude Code handled directly: reading config files, making precise changes, verifying the edits landed correctly.

The thing that genuinely surprised me: it didn't just change values blindly. It explained *why* each change mattered.

- `FILTER = pureLinear` — because the default AC filter breaks Pure LCS visuals
- `FACES_PER_FRAME = 2` — reduces cubemap reflection cost; CSP's reprojection fills in the rest
- `ALLOW_IN_TRIPLE = 1` — because Extra FX effects silently do nothing on triple screens without this flag

That last one had been silently breaking my setup. A single ini value set to 0, making an entire graphics module completely inactive. No error, no warning, just nothing working. Found and fixed in seconds.

## The FOV Calculation

This is the bit that made me put my coffee down.

I gave it my physical measurements: 32" screens, 600mm eye distance, side screens at 45 degrees. It calculated the mathematically correct FOV from scratch — not "try 60 degrees", actual trigonometry.

```
FOV = 2 × arctan(screen_width / 2 / distance)
    = 2 × arctan(349 / 600)
    = 60 degrees
```

Then it calculated the triple screen geometry — the exact coordinates for where each screen edge sits in 3D space, derived from my physical measurements. Specific to my rig, not a generic preset lifted from a forum.

My previous FOV was 56. Set by me eyeballing it years ago. Four degrees off. Doesn't sound like much until you're trying to judge a braking point at 150mph and something feels slightly wrong but you can't explain why.

## The Performance Tuning

Enabling all the graphics effects on a 7680x1440 triple setup hurt — FPS dropped from ~100 to ~60. This is where the session got interesting.

Rather than handing me a "perfect config" upfront, Claude Code went back in iteratively. Shadow maps down, screen-space reflections at half resolution, ambient occlusion off entirely (the single most expensive effect at triple screen resolution). Asked me to test after each change.

It felt like sitting next to someone who actually knew what they were doing and was patiently working through it with me. Not frustrating. Actually enjoyable.

## What This Changes

The bit I want to be honest about: this isn't magic. AC and CSP store everything in plaintext ini files — that's why it worked so well. Claude Code read them, understood them, changed them precisely, and verified the changes. The knowledge of what to change came from its training. The execution was file editing.

What changed for me was the process. Instead of spending an evening getting increasingly annoyed at forum posts and version conflicts, I had a conversation. I described my setup, answered questions, tested results, reported back. The mundane part — the ini file archaeology — wasn't mine to deal with.

It took about 90 minutes. I'd been putting this off for three years.

## The Verdict

The setup that came out the other end:

- **Pure 3.10** replacing a version years out of date
- **Correct FOV** calculated from my actual physical measurements
- **Extra FX enabled** on triples (had been silently off)
- **AA stack** that actually makes sense: MSAA → TAA → SMAA Ultra → FidelityFX CAS
- **Extended physics** on (better tyre model I should have had ages ago)

Does it look better than AC Evo right now? Yes. Does it feel better to drive? Also yes — the mod ecosystem has fifteen years of polish behind it.

Gamer Muscle: you were right. I just needed an AI to lower the barrier enough to actually find out.
