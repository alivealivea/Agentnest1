# Agent Nest

Agent Nest is a cute 2.5D isometric virtual office where AI agents work on real projects, clients, tasks, money tracking, Time Machine history, and future AI coding workflows.

## Phase 2 Repo Starter

This package contains the two core files for starting the project in Codex:

- `01_MASTER_SPEC.md` — full product and system specification
- `02_CODEX_PROMPT.md` — implementation prompt for Codex

Supporting source documents are in `/docs`:

- `kimi_design.md`
- `qwen_architecture.md`

## How to use with Codex

1. Create a new GitHub repo named `agent-nest`.
2. Upload these files to the repo root.
3. Open the repo with Codex.
4. Paste this instruction:

```text
Read 01_MASTER_SPEC.md and 02_CODEX_PROMPT.md.

Build Agent Nest MVP.

Follow the specifications exactly.

Start with:

1. Next.js + TypeScript + Tailwind
2. Editable 2.5D isometric office
3. Rooms
4. Agents
5. Task/project/client system
6. CEO Dashboard
7. Money Mode
8. Time Machine
9. Edit Mode
10. Local database / Dexie.js
11. Mock AI Provider System
12. Settings page for API/provider configuration

Do not over-engineer.
Mock everything first.
Prioritize visual appeal, modular architecture, and future scalability.
Every object must be editable later.
Keep the code clean and scalable.
```

## Important rules

- Do not use War Room as a public name.
- Everything must be editable later.
- Mock all external APIs first.
- Never hardcode API keys.
- Make the first version cute, useful, and sellable.
