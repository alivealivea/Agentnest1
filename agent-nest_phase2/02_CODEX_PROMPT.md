# Agent Nest — CODEX PROMPT

You are building the MVP of Agent Nest.

Read and follow this prompt carefully.

## Product
Agent Nest is a cute 2.5D isometric virtual office where AI agents work on real projects, clients, tasks, money tracking, and future coding workflows.

It should look like a cozy miniature company simulation game, but function like a serious productivity dashboard.

Use this positioning:

- Public-friendly SaaS
- Cute 2.5D isometric office
- Local-first productivity dashboard
- Model-agnostic AI provider system
- Future-ready for Codex, Claude, OpenAI, Hermes, Gemini, Qwen, and local LLMs

Do not use War Room as a public-facing name.

## MVP Goal
Build a working MVP first.

Do not over-engineer.

Mock all external integrations first.

The MVP must include:

1. Next.js + TypeScript + Tailwind
2. Editable 2.5D isometric office
3. Rooms
4. Agents
5. Task/project/client system
6. CEO Dashboard
7. Money Mode
8. Time Machine
9. Edit Mode
10. Local persistence
11. Mock AI Provider System
12. Settings page for API/provider configuration

## Tech Stack
Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Dexie.js / IndexedDB
- Recharts
- CSS/SVG/HTML for the first isometric MVP

Do not add PixiJS unless it is truly needed. Keep the first version simple and working.

## Visual Style
The app must look beautiful from the first screen.

Art direction:

- Cute 2.5D isometric
- Cozy tech
- Soft SaaS
- Premium but playful
- Animal Crossing meets Notion meets Monument Valley

Use soft colors:

- Nest Cream `#FFF8F0`
- Agent Indigo `#6366F1`
- Soft Charcoal `#2D2D3A`
- Warm Coral `#F43F5E`
- Mint Glow `#34D399`
- Honey Amber `#FBBF24`
- Fog Gray `#F1F5F9`
- Slate `#64748B`

Avoid cyberpunk, hacker, military, aggressive red/black design.

## First Screen
When opened, the app should show:

- Agent Nest logo
- Cute isometric office map
- Several rooms
- Several agents
- CEO Dashboard summary
- Command box
- Activity feed

The first impression must be:

> “Wow, I want this.”

## Routes
Create routes:

```text
/
/office
/dashboard
/money
/timeline
/settings
```

If this is too much for the first pass, make `/` the main app and use tabs inside it.

## Folder Structure
Create clean modular structure:

```text
/app
/components/isometric
/components/rooms
/components/agents
/components/dashboard
/components/money
/components/timeline
/components/editor
/components/settings
/components/ui
/lib/db
/lib/engine
/lib/economy
/lib/timeline
/lib/ai-providers
/lib/mock
/stores
/types
/data
/docs
```

## Data Types
Create TypeScript types for:

- Agent
- Room
- RoomItem
- Client
- Project
- Task
- Transaction
- TimelineEvent
- AIProvider
- AIProviderConfig

Use these statuses:

```ts
type AgentStatus =
  | 'idle'
  | 'thinking'
  | 'researching'
  | 'coding'
  | 'designing'
  | 'writing'
  | 'reviewing'
  | 'waiting_approval'
  | 'blocked'
  | 'done'
  | 'error';
```

## Seed Data
Create useful seed data:

Rooms:

- CEO Dashboard
- Planner Room
- Developer Room
- Designer Room
- Content Creator Room
- Sales Room
- Finance Room
- Client Room
- 3D Print Factory Room
- Photo/Video Studio Room
- Meeting Room
- Approval Room
- Archive Room

Agents:

- CEO Agent
- Planner Agent
- Developer Agent
- Designer Agent
- Content Agent
- Sales Agent
- Finance Agent
- 3D Print Agent
- Photo/Video Agent
- Client Success Agent

Sample clients/projects:

- BDI booth/game project
- NHA content project
- TCL promotion visuals
- 3D print life-size figure order
- Photo/video corporate shoot

Use realistic Thai baht values in examples.

## 2.5D Isometric Office
Implement a simple isometric office map.

Requirements:

- Isometric grid feel
- Rooms as cute cards/tiles
- Agents as small chibi-like icons/characters
- Soft shadows
- Hover effects
- Status badges
- Click room to view details
- Click agent to view/edit details
- Must work on desktop and iPad

MVP can use CSS transforms and divs. Do not spend too much time on game engine complexity.

## Edit Mode
Everything must be editable later.

Implement Edit Mode toggle.

In Edit Mode, user can:

- Rename rooms
- Rename agents
- Edit task names
- Edit project names
- Edit client names
- Change monthly income target
- Hide rooms
- Duplicate a room template if simple
- Reorder dashboard cards if simple

Persist edits locally.

Non-negotiable:

> Do not hardcode user-facing names in a way that cannot be edited.

## CEO Dashboard
Build dashboard cards showing:

- Monthly income target: 150k-200k THB
- Current projected income
- Today's top 3 money actions
- Urgent deadlines
- Expected payments
- Overdue invoices
- Best client opportunities
- High-value tasks
- Recommended next action

This dashboard must be immediately useful.

## Money Mode
Build Money Mode page or tab showing:

- Revenue per project
- Expenses
- Profit estimate
- Expected payments
- Unpaid/overdue invoices
- Monthly target progress
- Best projects by profit
- Low-value projects warning

Use Recharts for at least one chart.

Keep the data editable or seeded from local store.

## Time Machine
Build Time Machine page or tab.

MVP:

- Activity history list
- Filter by date
- Show what agents did yesterday/today
- Show completed/blocked/error tasks
- Show money events
- Show project events

Future-ready:

- Add event snapshots later
- Add replay slider later

For MVP, event log is enough.

## Client Room
Client Room should show:

- Client cards
- Projects per client
- Total revenue
- Unpaid balance
- Next follow-up
- Notes
- Opportunity score

## 3D Print Factory Room
Create a special room panel showing:

- Print queue
- Material cost
- Print time
- Finishing status
- Delivery deadline
- Profit estimate
- Failed print log placeholder

## Photo/Video Studio Room
Create a special room panel showing:

- Shoot schedule
- Client brief
- Shot list
- Gear checklist
- Editing status
- Delivery status
- Revision status
- Invoice status

## Content Creator Room
Create a special room panel showing:

- Content ideas
- Scripts
- Captions
- Thumbnails
- Posting schedule
- Platform status

## AI Provider System
Build a model-agnostic AI provider settings system.

Do not connect real APIs yet.

Create adapter structure for:

- OpenAI
- Claude
- Codex
- Hermes
- Gemini
- Qwen
- Local LLM
- Custom endpoint

Settings page must allow user to add/edit:

- Provider name
- API key
- Base URL
- Model name
- System prompt
- Temperature
- Max tokens
- Enabled/disabled

Security rules:

- Never hardcode API keys
- Hide API key values by default
- Store locally only for MVP
- Allow deleting keys
- Add warning that browser-local API keys are not ideal for public deployment

Create interface:

```ts
export interface AIProvider {
  id: string;
  name: string;
  models: string[];
  sendMessage(input: AIMessageInput): Promise<AIMessageResult>;
  streamMessage?(input: AIMessageInput): AsyncIterable<AIMessageChunk>;
  testConnection(config: AIProviderConfig): Promise<boolean>;
  estimateCost?(input: AIMessageInput): Promise<number>;
}
```

Create mock providers that return fake success responses.

Each agent should be able to choose provider/model.

## Command Box
Create a command box.

MVP can use simple keyword matching.

Support commands like:

- show money mode
- show time machine
- create task
- rename room
- add client
- what should I do today
- show overdue invoices
- add 3d print order

Thai/English support is nice, but simple matching is enough for MVP.

## Local Persistence
Use Dexie.js / IndexedDB for:

- Rooms
- Agents
- Clients
- Projects
- Tasks
- Transactions
- Timeline events
- Provider configs
- Settings

Seed data on first launch.

Persist all user edits.

Add reset demo data button.

## Public / Private Mode
Add a toggle:

- Private mode shows all data
- Public mode hides sensitive data

Hide:

- API keys
- Client names if selected
- Money amounts if selected
- Personal notes

This is important for livestreams and screenshots.

## Activity Feed
Show natural language updates:

Examples:

- Designer Agent is creating thumbnails.
- Developer Agent is preparing a Codex task.
- Finance Agent found 2 overdue invoices.
- 3D Print Agent estimated material cost.
- CEO Agent recommends following up with BDI today.

## Responsive Behavior
Desktop:

- Full isometric office
- Side navigation
- Dashboard cards
- Activity feed

Ipad/tablet:

- Isometric office still visible
- Collapsible side nav
- Bottom sheet or panels

Mobile:

- List/card view is acceptable
- Avoid tiny canvas-only UI

## Acceptance Criteria
Stop when the MVP meets this:

- App runs locally
- User sees cute isometric Agent Nest office
- User can switch between dashboard/money/timeline/settings
- User can edit rooms, agents, clients, projects, tasks
- User can create tasks
- Agent statuses update visually
- Money Mode shows revenue/profit/target progress
- Time Machine shows activity history
- AI provider settings exist with mock test connection
- Data persists locally
- UI looks polished enough for a demo screenshot

## Implementation Rules
- Make it work first.
- Keep code modular.
- Do not over-engineer.
- Mock external APIs.
- No hardcoded API keys.
- Avoid backend complexity.
- Use clean TypeScript.
- Use reusable components.
- Keep the visual design cute and sellable.
- Prioritize iPad usability.

## Final Output Expected
After implementation, provide:

- Setup instructions
- How to run locally
- What features are complete
- What is mocked
- What to build next
- Any known issues

Begin by creating the project structure and implementing the MVP.
