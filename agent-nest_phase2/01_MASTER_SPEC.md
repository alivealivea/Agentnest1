# Agent Nest — MASTER SPEC

Version: Phase 1 MVP Spec
Product name: Agent Nest
Tagline: Where AI agents come to work.

## 1. Product Vision
Agent Nest is a cute, public-friendly, 2.5D isometric virtual office for managing AI agents, real projects, clients, money, tasks, and future coding workflows.

It should feel like a miniature AI company simulation game, but work like a serious productivity dashboard.

The goal is not to copy BagIdea Office. The goal is to build something more useful, easier to sell, more expandable, and more emotionally attractive.

Users should feel this within the first 5 seconds:

> “Wow, I want this.”

Not:

> “Interesting dashboard.”

## 2. Core Positioning
Agent Nest is:

- A visual AI agent workspace
- A business dashboard
- A project/task/client manager
- A money and revenue tracker
- A future Codex/GitHub/Claude/OpenAI/Hermes/Gemini/Qwen/local LLM command center
- A cozy, cute 2.5D office world people want to screenshot and share

Agent Nest must be designed for future public use, SaaS, creator content, livestreams, templates, plugins, and possible marketplace expansion.

Avoid names and concepts that feel aggressive, military, or hacker-like. Do not use War Room as the public-facing name.

## 3. Main Differentiator
Most AI dashboards are boring.

Agent Nest should make AI work visible, understandable, and emotionally engaging.

Every room, character, animation, and dashboard widget must represent real information.

Decorations are allowed, but information comes first.

## 4. Visual Direction
Main art style: cute 2.5D isometric world.

Visual feeling:

- Cozy
- Premium
- Playful
- Trustworthy
- Soft tech
- Warm SaaS
- Indie game charm
- Professional enough for business use

Inspired by:

- Animal Crossing
- Monument Valley
- Notion illustrations
- Cozy Grove
- Stardew Valley atmosphere
- Miniature dollhouse office worlds

Avoid:

- Cyberpunk
- Dark hacker dashboard
- Military aesthetics
- Aggressive red/black UI
- Photorealism
- Overly complex 3D

## 5. Color Direction
Use soft, premium colors.

Primary tokens:

- Nest Cream `#FFF8F0`
- Agent Indigo `#6366F1`
- Soft Charcoal `#2D2D3A`

Secondary tokens:

- Warm Coral `#F43F5E`
- Mint Glow `#34D399`
- Honey Amber `#FBBF24`

Neutral tokens:

- Fog Gray `#F1F5F9`
- Slate `#64748B`

Support light mode first. Dark mode should feel like a cozy evening office, not a hacker terminal.

## 6. 2.5D Isometric Office World
The main workspace is an isometric office map.

Technical guidance:

- Use a 2:1 isometric grid.
- Suggested tile size: 64x32 px.
- Use soft shadows and depth layers.
- Objects must sort by depth using x + y.
- Rooms should be modular.
- MVP can use CSS/SVG/HTML layers first.
- PixiJS can be introduced when needed.

The office should feel like a living miniature company.

## 7. First 5-Second Wow Factor
Create a memorable onboarding/loading intro.

Suggested sequence:

1. A glowing egg or nest appears.
2. It cracks open softly.
3. Camera zooms out and reveals the Agent Nest office.
4. Agents wake up and lights turn on.
5. A friendly agent waves.
6. UI slides in.
7. User gets control.

No ugly loading spinner. The loading state should become part of the story.

## 8. Core Rooms
MVP should include these rooms or room cards:

1. CEO Dashboard
2. Planner Room
3. Developer Room
4. Designer Room
5. Content Creator Room
6. Sales Room
7. Finance Room
8. Client Room
9. 3D Print Factory Room
10. Photo/Video Studio Room
11. Meeting Room
12. Approval Room
13. Archive Room

Each room must be editable later.

## 9. Special Rooms

### 9.1 CEO Dashboard
The CEO Dashboard is the first practical value screen.

It must answer:

> What should I do today to move toward 150k-200k THB/month?

Display:

- Today's top 3 money actions
- Urgent deadlines
- Expected payments
- Overdue invoices
- Best client opportunities
- High-value tasks
- Low-energy tasks
- Monthly income progress
- Projected monthly revenue
- Recommended next action

This dashboard is the business brain of Agent Nest.

### 9.2 Money Mode
Money Mode tracks business performance.

Display:

- Revenue per project
- Profit per project
- Client value
- Expected payments
- Unpaid invoices
- Expenses
- Monthly target progress
- 150k-200k THB goal tracker
- Best projects by profit
- Low-value projects to avoid
- Recommended pricing improvements

Money Mode should help users make better business decisions, not just show charts.

### 9.3 Time Machine
Time Machine shows history.

Display:

- What each agent did yesterday
- Completed tasks
- Failed tasks
- Blocked tasks
- Project timeline
- Daily activity replay
- Weekly summary
- Money earned per day
- Decisions made
- Files changed
- Commits created
- Agent notes

MVP can use event logs and snapshots.

### 9.4 Client Room
Each client gets a room or card.

Display:

- Client name
- Contact
- Projects
- Total revenue
- Unpaid balance
- Last conversation
- Next follow-up date
- Files
- Notes
- Relationship status
- Opportunity score

### 9.5 3D Print Factory Room
Built for 3D printing workflow.

Display:

- Print queue
- Printer status
- Material usage
- Material cost
- Print time
- Painting/finishing status
- Delivery deadline
- Profit estimate
- Product photos
- Customer order status
- Failed print log

Visual details:

- Bambu-style printers
- Filament shelves
- Finished figures
- Paint station
- Shipping boxes

### 9.6 Photo/Video Studio Room
Built for freelance production workflow.

Display:

- Shoot schedule
- Client brief
- Shot list
- Gear checklist
- Editing status
- Delivery status
- Revision status
- Invoice status
- Portfolio links
- Content repurpose ideas

Visual details:

- Camera
- Tripod
- Lights
- Microphone
- Editing monitor

### 9.7 Content Creator Room
Built for social media output.

Display:

- Content ideas
- Scripts
- Thumbnails
- Captions
- Posting schedule
- Platform status
- IG/TikTok/YouTube tracking
- Behind-the-scenes ideas
- Viral content suggestions
- Reusable templates

## 10. Agents
Agents are cute chibi AI colleagues.

Each agent has:

- ID
- Name
- Role
- Avatar
- Personality
- Skill
- Status
- Current task
- Progress percentage
- Mood
- Provider/model configuration
- Activity history
- Memory notes

Default agents:

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

Statuses:

- idle
- thinking
- researching
- coding
- designing
- writing
- reviewing
- waiting_approval
- blocked
- done
- error

Animations:

- Idle bobbing
- Walking
- Typing
- Thinking
- Celebrating
- Tired/blocked
- Meeting together
- Drinking coffee

## 11. Edit Mode
Everything must be editable later by the user.

This is a core requirement.

User must be able to edit:

- App name
- Room names
- Room icons
- Room descriptions
- Agent names
- Agent roles
- Agent avatars
- Agent skills
- Agent personality
- Task titles
- Task descriptions
- Project names
- Client names
- Dashboard sections
- Financial categories
- Status labels
- Goals
- Monthly income target
- API provider settings

Edit Mode requirements:

- Toggle edit mode on/off
- Click any room, agent, title, card, or widget to edit
- Drag and drop rooms
- Reorder dashboard widgets
- Rename sections inline
- Duplicate rooms
- Hide unused rooms
- Reset default template
- Autosave changes

The product must never feel hardcoded.

## 12. Project / Task / Client System
Hierarchy:

Client → Project → Task

Each client has projects.
Each project has tasks.
Each task can be assigned to an agent.
Each task can have money value, deadline, status, and AI provider instructions.

Task fields:

- ID
- Project ID
- Agent ID
- Title
- Description
- Status
- Priority
- Reward/value
- Cost estimate
- Deadline
- Tags
- Codex prompt
- GitHub issue ID
- Provider config override

## 13. Local-First Storage
MVP should be browser-first.

Recommended:

- Dexie.js / IndexedDB for local browser storage
- Zustand for UI state
- localStorage only for simple settings

Future:

- SQLite with Prisma for Electron/Tauri/local desktop
- Cloud sync later
- Import/export backup

Do not require backend or login for MVP.

## 14. Suggested Tech Stack
MVP:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Dexie.js
- Recharts for charts
- CSS/SVG or simple HTML for isometric MVP
- Optional PixiJS after MVP

Future:

- Electron or Tauri desktop wrapper
- Prisma + SQLite
- GitHub integration
- Codex/Claude/OpenAI/Gemini/Hermes/Qwen/local LLM integrations
- MCP
- Plugin marketplace

## 15. Folder Structure
Suggested structure:

```text
/agent-nest
├── /app
│   ├── /(office)
│   │   └── page.tsx
│   ├── /(dashboard)
│   │   └── page.tsx
│   ├── /settings
│   │   └── page.tsx
│   └── /api
│       ├── /github/webhook
│       ├── /codex/trigger
│       └── /ai/test-provider
├── /components
│   ├── /isometric
│   ├── /rooms
│   ├── /agents
│   ├── /dashboard
│   ├── /money
│   ├── /timeline
│   ├── /editor
│   ├── /settings
│   └── /ui
├── /lib
│   ├── /db
│   ├── /engine
│   ├── /economy
│   ├── /timeline
│   ├── /ai-providers
│   ├── /github
│   └── /codex
├── /stores
├── /types
├── /data
└── /docs
```

## 16. Data Models
Use TypeScript interfaces for MVP.

```ts
export type AgentStatus =
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

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  personality?: string;
  skills: string[];
  status: AgentStatus;
  currentTaskId?: string;
  progress: number;
  mood: number;
  x: number;
  y: number;
  providerId?: string;
  model?: string;
}

export interface Room {
  id: string;
  name: string;
  type: string;
  icon?: string;
  description?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  hidden?: boolean;
  theme?: string;
  items: RoomItem[];
}

export interface Client {
  id: string;
  name: string;
  contact?: string;
  notes?: string;
  relationshipStatus?: string;
  opportunityScore?: number;
}

export interface Project {
  id: string;
  clientId?: string;
  name: string;
  description?: string;
  budget: number;
  expectedRevenue?: number;
  expenses?: number;
  deadline?: string;
  status: string;
  priority: string;
}

export interface Task {
  id: string;
  projectId?: string;
  agentId?: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  reward?: number;
  costEstimate?: number;
  deadline?: string;
  codexPrompt?: string;
  githubIssueId?: string;
}

export interface Transaction {
  id: string;
  projectId?: string;
  clientId?: string;
  type: 'income' | 'expense' | 'expected_income';
  amount: number;
  date: string;
  description: string;
  status?: 'paid' | 'unpaid' | 'overdue';
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type: string;
  title: string;
  description?: string;
  agentId?: string;
  projectId?: string;
  snapshot?: unknown;
}
```

## 17. AI Provider System
Agent Nest must be model-agnostic.

It must not be locked to one AI brand.

Support future providers:

- OpenAI
- Claude
- Codex
- Hermes
- Gemini
- Qwen
- Local LLM
- Custom API endpoint

MVP should mock all provider calls first.

Settings page must include:

- Provider name
- API key
- Base URL
- Model name
- System prompt
- Temperature
- Max tokens
- Enable/disable provider
- Test connection button

Security:

- Never hardcode API keys
- Store keys locally first
- Hide API keys by default
- Allow user to delete keys
- Support environment variables later
- Clearly warn that browser-local API keys are not ideal for public deployment

Architecture:

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

Each provider uses the same adapter interface.

Each agent can choose its own provider.

Examples:

- CEO Agent uses Claude
- Developer Agent uses Codex
- Research Agent uses Gemini
- Creative Agent uses Hermes
- Finance Agent uses OpenAI

Fallback:

- If one provider fails, show error clearly
- Allow switching provider
- Do not silently fail

## 18. GitHub / Codex Integration
MVP should mock Codex and GitHub.

Prepare clean placeholder functions for:

- Start Codex task
- Check task status
- Read project files
- Create branch
- Summarize code changes
- Request approval
- Show error logs

Future GitHub integration:

- Repositories
- Branches
- Commits
- Pull requests
- Issues
- Webhooks
- File change history

## 19. Command Box
The user can type Thai or English commands.

Example commands:

- Create new client room for BDI
- Show me what agents did yesterday
- Show Money Mode
- Rename Photo Studio to Production Studio
- Add new 3D print order
- What should I do today to reach 200k
- Summarize overdue payments
- Create task for Codex
- Move this project to urgent
- Hide Marketing Room
- Duplicate Client Room template

MVP can parse with simple keyword rules. Future can use AI provider adapter.

## 20. Notifications
Display helpful notifications:

- Deadline warnings
- Blocked agents
- Completed tasks
- New commits
- Overdue invoices
- Follow-up reminders
- Low profit warning
- Missed income target warning

## 21. Public / Private Mode
Add privacy mode for demos and livestreams.

Private data can be hidden:

- Client names
- Money amounts
- Notes
- API keys
- Personal project details

Livestream mode should show safe public names only.

## 22. Gamification
Optional but useful.

- XP
- Agent levels
- Achievements
- Productivity streaks
- Revenue milestones
- Agent badges
- Celebration effects

## 23. Performance Requirements
MVP must feel fast.

- Works on desktop
- Works on iPad
- Works on Android tablet
- Responsive layout
- Avoid heavy 3D for MVP
- Use transform/opacity animations
- Reduce motion setting
- Keep isometric rendering lightweight

## 24. MVP Priority
Build in this order:

1. Next.js + TypeScript + Tailwind setup
2. Local data store with seed data
3. Editable 2.5D isometric office map
4. Rooms
5. Agents
6. Task/project/client system
7. CEO Dashboard
8. Money Mode
9. Time Machine
10. Edit Mode
11. AI provider settings with mock providers
12. Command box
13. Public/private mode
14. Visual polish

## 25. MVP Acceptance Criteria
The MVP is successful when:

- User can open the app and see a cute isometric Agent Nest office
- User can see rooms and agents
- User can edit room names, agent names, tasks, projects, clients
- User can create a task and assign it to an agent
- Agent status visually changes
- CEO Dashboard shows top actions and monthly target progress
- Money Mode shows project revenue/profit
- Time Machine shows activity history
- Settings allows adding mock AI provider config
- All changes persist locally
- The app works on desktop and iPad

## 26. Future Expansion
Future versions may include:

- Real AI provider API connections
- GitHub integration
- Codex task execution
- Claude Code support
- MCP support
- Slack / Discord / Google Calendar / Notion / Trello / Linear plugins
- Template marketplace
- Room skins
- Agent skins
- Furniture packs
- Desktop app
- Wallpaper Engine version
- Steam cozy productivity game
- Team collaboration
- Cloud sync

## 27. Non-Negotiable Rules
- Everything must be editable later.
- The app must be model-agnostic.
- The first version must work before it becomes complex.
- Mock external integrations first.
- Prioritize visual appeal and usefulness equally.
- No hardcoded API keys.
- No over-engineering.
- No military/war naming.
- Make it cute, useful, and sellable.
