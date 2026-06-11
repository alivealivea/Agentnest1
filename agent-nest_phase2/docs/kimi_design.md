# Agent Nest — UI/UX Design Specification

## 1. Visual Style: "Cozy Tech"

**Core Aesthetic:** A warm, approachable 2.5D isometric world that softens the "coldness" of AI infrastructure. Think *Animal Crossing* meets *Notion* meets *Monument Valley*.

| Element | Direction |
|---|---|
| **Dimensionality** | 2.5D isometric (30° angle, no perspective distortion). Clean vector edges with soft depth shadows. |
| **Rendering** | Flat-shaded with subtle gradients (no photorealism). Matte surfaces, not glossy. |
| **Line Work** | 1.5px rounded strokes on characters and interactive objects; strokeless environment for immersion. |
| **Texture** | Minimal noise grain (3% opacity) on backgrounds only. No textures on UI chrome. |
| **Scale** | Macro world feel — agents are ~50px tall, rooms are dollhouse-like, furniture is chunky and huggable. |

---

## 2. Mood Board

**Keywords:** Playful productivity, sentient stationery, warm neon, organized chaos, digital coziness.

**Visual References:**
- *Animal Crossing: New Horizons* — furniture proportions, seasonal lighting
- *Monument Valley* — impossible architecture, pastel geometry
- *Notion* — clean information hierarchy, whitespace confidence
- *Cozy Grove* — soft vignette lighting, hand-drawn warmth
- *SaaS References:* Linear (motion), Figma (collaborative cursors), Loom (friendly faces)

**Atmospheric Rules:**
- Always show depth: foreground plants, midground agents, background windows
- Weather states inside the office: sunny (productive), rainy (focus mode), sunset (wrap-up)
- Floating particles: dust motes in sunbeams, coffee steam, notification bubbles

---

## 3. Color Palette

### Primary
| Token | Hex | Usage |
|---|---|---|
| **Nest Cream** | `#FFF8F0` | Primary background, card surfaces |
| **Agent Indigo** | `#6366F1` | Primary actions, agent auras, links |
| **Soft Charcoal** | `#2D2D3A` | Primary text, dark mode surfaces |

### Secondary
| Token | Hex | Usage |
|---|---|---|
| **Warm Coral** | `#F43F5E` | Alerts, urgent tasks, agent "busy" state |
| **Mint Glow** | `#34D399` | Success, online status, growth metrics |
| **Honey Amber** | `#FBBF24` | Warnings, highlights, coffee cups |

### Neutrals
| Token | Hex | Usage |
|---|---|---|
| **Fog Gray** | `#F1F5F9` | Secondary backgrounds, dividers |
| **Slate** | `#64748B` | Tertiary text, inactive states |

### Dark Mode Inversion
- Nest Cream → Soft Charcoal
- Fog Gray → `#1E1E2E`
- All accent colors gain 15% luminosity for glow effects

### Gradient Accents
- **Agent Aura:** `radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)`
- **Selection Glow:** `box-shadow: 0 0 20px rgba(99,102,241,0.3)`

---

## 4. Room Design (The "Nest")

### Layout Structure
```
[Sky/Weather Layer]
    ↓
[Back Wall — windows, whiteboards, shelves]
    ↓
[Mid Floor — desks, collaboration pods, plants]
    ↓
[Front Floor — agent spawn points, welcome mat]
    ↓
[Foreground — UI chrome, chat bubbles, tooltips]
```

### Room Types
| Room | Vibe | Key Furniture |
|---|---|---|
| **Hub** | Central lobby, always active | Circular sofa, holographic roadmap, coffee bar |
| **Focus Pods** | Individual deep work | Soundproof booths, bonsai trees, "Do Not Disturb" lamps |
| **War Room** | Team sprinting | Standing desks, sticky note walls, countdown timer |
| **Archive** | Knowledge base | Infinite scrolling bookshelves, search crystal |
| **Garden** | Break/ideation | Floating islands, idea seeds that bloom into projects |

### Isometric Grid
- Tile size: 64×32px (2:1 ratio)
- Wall height: 96px
- Furniture snaps to grid but agents move freely with pathfinding
- Dynamic shadows cast based on "time of day" setting

---

## 5. Character Design (The Agents)

### Anatomy
- **Height:** 48–56px (chibi proportions: 2.5 heads tall)
- **Shape:** Rounded rectangles with soft corners — no sharp angles
- **Face:** Minimal — two dot eyes + curved line mouth. Expression changes via eye shape (^^, > <, ◠ ◠)
- **Body:** Simple robe/coat that changes color based on agent "type"
- **Accessories:** Tiny floating tools (wrench, pen, magnifying glass) orbit the agent

### Agent Types
| Type | Color | Aura | Accessory | Personality |
|---|---|---|---|---|
| **Orchestrator** | Indigo | Pulsing rings | Clipboard | Confident, center-stage |
| **Researcher** | Teal | Page-flutter | Floating book | Curious, slightly distracted |
| **Coder** | Amber | Matrix rain | Keyboard hologram | Focused, coffee-dependent |
| **Creative** | Coral | Paint splatter | Brush wand | Energetic, chaotic good |
| **Analyst** | Mint | Sparkline graph | Magnifying glass | Precise, pattern-seeking |

### States
- **Idle:** Gentle bobbing (sine wave, 2s cycle), blinking
- **Walking:** Waddle-hop with tool trailing
- **Working:** Accessory glows, occasional "!" pop-up
- **Collaborating:** Agents face each other, speech bubbles connect with a dotted line
- **Celebrating:** Jump spin, confetti burst, aura expands

---

## 6. Dashboard Layout

### Desktop (1440px+)
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Hub ▼  [Breadcrumb: Hub > War Room > Sprint 42]    │  ← 56px, glassmorphism
├──────────┬────────────────────────────────────────────────┤
│          │                                                  │
│  ROOM    │         ISOMETRIC CANVAS (main stage)            │
│  NAV     │                                                  │
│  (160px) │    ┌─────┐      ┌─────┐      ┌─────┐           │
│          │   / Agent \    / Agent \    / Agent \          │
│  [Hub]   │  [  Pod   ]  [  Pod   ]  [  Pod   ]          │
│  [War]   │                                                  │
│  [Focus] │         [Floating Command Bar]                   │
│  [Garden]│                                                  │
│          │                                                  │
├──────────┴────────────────────────────────────────────────┤
│  [Agent Roster]  [Live Activity Stream]  [Quick Actions]  │  ← 240px bottom drawer
└─────────────────────────────────────────────────────────────┘
```

### Key Components
- **Floating Command Bar:** Center-bottom, 48px height, `backdrop-filter: blur(12px)`. Appears on hover/shortcut. Commands: "Spawn agent," "New task," "Change room."
- **Agent Roster:** Horizontal scroll of agent cards. Click to focus camera on agent.
- **Activity Stream:** Reverse-chronological, icon + text, auto-collapses after 5s.
- **Context Panel:** Slide-out right (320px) when object/agent selected. Shows stats, chat, settings.

---

## 7. Mobile / iPad Layout

### iPad (Landscape)
- Collapse left nav to icon-only rail (72px)
- Isometric canvas fills remaining space
- Bottom drawer becomes swipe-up sheet (peek at 80px, full at 60% screen)
- Touch: tap to select, long-press for context menu, two-finger pan to move camera

### Mobile (Portrait)
- **View Mode:** Auto-follow active agent (cinematic camera)
- **Room Switcher:** Bottom sheet with room thumbnails
- **Agent Interaction:** Tap agent → full-screen modal with chat + actions
- **Dashboard:** Stacked cards, vertical scroll, no isometric view (switches to list view with agent avatars)

**Breakpoint Logic:**
- <768px: List view + modals
- 768–1024px: Simplified isometric + bottom sheet
- 1024px+: Full experience

---

## 8. First 5-Second Wow Factor

**The "Hatching" Sequence:**

| Time | Action |
|---|---|
| **0.0s** | Black screen. Single egg shape glows center. |
| **0.5s** | Egg cracks with a soft *pop* sound. Light spills out. |
| **1.0s** | Camera pulls back fast — the egg was a desk lamp. We reveal the entire Hub room in a single fluid zoom-out. |
| **1.5s** | Agents "wake up" — lights turn on sequentially, like a string of fairy lights. |
| **2.0s** | First agent (Orchestrator) turns to camera, waves. Speech bubble: "Welcome to Agent Nest! 🐣" |
| **2.5s** | UI chrome slides in from edges (nav left, command bar bottom). |
| **3.0s** | A task notification floats in: "You have 3 agents ready to work." |
| **4.0s** | Ambient music fades in (lo-fi, soft synth, occasional notification chime). |
| **5.0s** | User has full control. Camera gently bobs. A firefly cursor trail appears. |

**Critical:** No loading spinners. The egg *is* the loading state. Progress is narrative.

---

## 9. Animation Ideas

### Micro-interactions
| Trigger | Animation |
|---|---|
| Agent spawns | Pop from a tiny egg, bounces once, settles |
| Task complete | Agent jumps, green checkmark rises, confetti (subtle, 12 particles) |
| New message | Speech bubble inflates with a *boing*, agent tilts head |
| Room change | Camera dolly-zoom through a "doorway" transition (0.4s) |
| Hover on agent | Gentle levitation + aura pulse |
| Drag-and-drop | Agent becomes "ghost" version (50% opacity), original stays until drop |
| Error state | Agent sweats (///), shrugs, red question mark |

### Environmental
- **Day cycle:** 20-minute real-time loop. Sunrise → noon → sunset → night. Lighting shifts from warm gold → cool blue.
- **Weather:** Rain on windows (Focus mode), snow in Garden (winter event), cherry blossoms (spring).
- **Background life:** A tiny robot vacuum moves across the floor every 90 seconds. A cat agent naps in a sunbeam.

### Performance
- All animations under 300ms for responsiveness
- `transform` and `opacity` only for 60fps
- Reduce motion: All movement becomes instant fades, no bounces

---

## 10. Public-Friendly SaaS Branding

### Naming & Voice
- **Product:** Agent Nest
- **Tagline:** "Where AI agents come to work."
- **Agents are "colleagues," not "tools"**
- **Voice:** Warm, slightly whimsical, never robotic. "Your Researcher found something interesting!" not "Task #2847 complete."

### Logo
- Wordmark: Rounded sans-serif (similar to Quicksand or Nunito)
- Icon: Simplified isometric egg/nest, 3 lines suggesting a roof + base
- Favicon: Agent face (◠ ◠) in a circle

### Marketing Site → App Continuity
- Marketing hero: The same isometric Hub room, but frozen in a "golden hour" moment
- CTA button: "Step Inside" — clicking it zooms *into* the hero image, which becomes the actual app
- Same color palette, same agent characters appear in both marketing and product

### Trust Signals (without breaking vibe)
- Security badges styled as "certificates on the wall" in the Hub background
- Uptime status as a "server plant" — green leaves = healthy, wilting = issue
- Pricing page designed as a "real estate office" — each tier is a different room size

---

## Summary: The "Agent Nest" Feeling

> *You don't manage AI agents. You visit them at work. They have desks, moods, and coffee cups. The office is alive, warm, and weirdly comforting. When your Researcher agent finds a breakthrough, you see them jump for joy. When your Coder is stuck, you see them faceplant on the desk. It's infrastructure with a soul.*

**One-line test:** If a screenshot looks like it could be from a cozy indie game, we're on the right track.
