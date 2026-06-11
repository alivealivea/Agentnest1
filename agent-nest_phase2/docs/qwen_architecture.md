qwen_architecture.md
Here is the complete technical architecture specification for **Agent Nest**, designed for a Next.js local-first application with a cute 2.5D isometric interface.


---


# Technical Architecture Specification: Agent Nest


## 1. Folder Structure (Next.js App Router)
```text
/agent-nest
├── /app
│   ├── /(office)             # Main 2.5D Isometric View Route
│   │   └── page.tsx
│   ├── /(dashboard)          # CEO Dashboard Route
│   │   └── page.tsx
│   ├── /api                  # Local API routes (for SQLite sync/webhooks)
│   │   ├── /github/webhook
│   │   └── /codex/trigger
├── /components
│   ├── /isometric            # 2.5D rendering components (Grid, Tiles, Agents, Furniture)
│   ├── /ui                   # Dashboard charts, modals, edit mode toolbars
│   └── /editor               # Drag-and-drop placement, grid snapping logic
├── /lib
│   ├── /db                   # Prisma client or Dexie.js (IndexedDB) initialization
│   ├── /engine               # Agent state machine, game loop, Time Machine logic
│   └── /economy              # Money Mode calculation and ledger logic
├── /types                    # Global TypeScript interfaces
├── /prisma                   # SQLite schema and migrations
└── next.config.js
```


## 2. Data Model (Prisma / SQLite Schema)
Local-first relational database to manage the office ecosystem.
```prisma
model Client {
  id        String    @id @default(uuid())
  name      String
  projects  Project[]
}


model Project {
  id          String   @id @default(uuid())
  clientId    String
  client      Client   @relation(fields: [clientId], references: [id])
  name        String
  budget      Int
  tasks       Task[]
}


model Task {
  id          String   @id @default(uuid())
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id])
  agentId     String?
  agent       Agent?   @relation(fields: [agentId], references: [id])
  title       String
  status      TaskStatus @default(PENDING)
  reward      Int      // Money Mode: income upon completion
}


model Agent {
  id            String     @id @default(uuid())
  name          String
  role          String
  x             Int        // Isometric grid coordinate
  y             Int
  mood          Int        @default(100) // 0-100
  productivity  Float      @default(1.0)
  tasks         Task[]
}


model RoomItem {
  id        String   @id @default(uuid())
  type      String   // "desk", "plant", "coffee_machine"
  x         Int
  y         Int
  z         Int      // Elevation for 2.5D depth sorting
}


model Transaction {
  id          String   @id @default(uuid())
  type        TxType   // INCOME, EXPENSE
  amount      Int
  date        DateTime @default(now())
  description String
}


model TimelineEvent {
  id          String   @id @default(uuid())
  timestamp   DateTime @default(now())
  action      String   // "AGENT_MOVED", "TASK_COMPLETED", "ITEM_PLACED"
  snapshot    Json     // Full state snapshot for Time Machine rewinding
}
```


## 3. Room System
* **Grid-Based Coordinate System**: Uses a 2D array `(x, y)` mapped to isometric screen coordinates `(screenX, screenY)` using standard isometric projection math:  
  `screenX = (x - y) * tileWidth / 2`  
  `screenY = (x + y) * tileHeight / 2`
* **Z-Indexing**: Items and agents are sorted by `(x + y)` to ensure correct 2.5D depth occlusion (painters algorithm).
* **Collision Map**: A boolean grid tracking occupied tiles to prevent overlapping placements in Edit Mode.


## 4. Agent System
* **State Machine**: Each agent runs a finite state machine (FSM): `IDLE` → `MOVING` → `WORKING` → `RESTING`.
* **Autonomy**: Agents periodically query the `/lib/engine` for available `PENDING` tasks. Priority is based on agent `productivity` and `mood`.
* **Visual Feedback**: Isometric sprite/3D model changes based on state (e.g., typing animation at desk, sleeping at a couch, happy/sad emotes based on `mood`).


## 5. Task / Project / Client System
* **Hierarchy**: `Client` → `Project` → `Task`.
* **Assignment Logic**: Tasks are auto-assigned to available agents. If no agent is available, the task remains in the "Office Queue" visible on the CEO Dashboard.
* **Completion**: When a task is done, it triggers a `Transaction` (INCOME) and updates the Agent's `mood` and `productivity` stats.


## 6. Edit Mode
* **Toggle State**: A global UI state `isEditMode: boolean`.
* **Interaction**: Disables agent autonomy. Enables drag-and-drop for `RoomItem` placement.
* **Grid Snapping**: Mouse coordinates are translated back to isometric grid `(x, y)` using inverse projection math, snapping to the nearest valid, unoccupied tile.
* **Persistence**: On "Save", the new `RoomItem` array is written to SQLite/IndexedDB.


## 7. Time Machine
* **Event Sourcing Pattern**: Instead of just saving the current state, every significant action pushes a `TimelineEvent` with a JSON `snapshot` of the affected entities.
* **Rewind UI**: A slider component on the dashboard. Moving the slider filters `TimelineEvent` by `timestamp <= selectedDate` and reconstructs the office state (agent positions, completed tasks, room layout) from the snapshots.
* **Performance**: Snapshots are compressed and stored in SQLite. For smooth UI, cache the last 50 snapshots in memory (Zustand/Redux).


## 8. Money Mode
* **Virtual Economy Loop**: 
  - **Income**: Generated when `Task.status` transitions to `COMPLETED` (adds to `Transaction`).
  - **Expenses**: Daily/weekly deductions for agent "salaries", room maintenance, or purchasing new `RoomItem` furniture.
* **Bankruptcy Check**: If `balance < 0`, agents enter `RESTING` or `UNHAPPY` states, and productivity drops to 0 until the user completes high-reward tasks.


## 9. CEO Dashboard
* **Route**: `/(dashboard)/page.tsx` (Overlay or separate tab).
* **Metrics (using Recharts or Chart.js)**:
  - Line chart: Net Income over time (Money Mode).
  - Bar chart: Agent productivity and mood distribution.
  - Kanban board: Active Projects and Tasks.
* **Real-time Sync**: Dashboard reads from the same local SQLite/IndexedDB store, reacting to state changes via hooks or Zustand.


## 10. Local Storage / SQLite Strategy
* **Recommended Approach**: **Prisma + `better-sqlite3`** (if running as a local Electron/Tauri desktop wrapper) OR **Dexie.js (IndexedDB)** for a pure browser-based Next.js app.
* **Browser-First Choice**: Use `Dexie.js` for zero-config, offline-first persistence. It handles JSON snapshots for the Time Machine efficiently and syncs seamlessly with React hooks.
* **Fallback**: `localStorage` for simple settings (e.g., `isEditMode`, `theme`), but avoid it for relational data due to the 5MB limit.


## 11. Future Codex / GitHub Integration
* **Data Mapping**: Extend the `Task` model with `githubIssueId` and `codexPrompt` fields.
* **GitHub Webhook (`/api/github/webhook`)**: 
  - Listens to `issues.opened` or `pull_requests.merged`.
  - Automatically creates a new `Task` in the local DB, assigning it to the "Developer" agent role.
* **Codex AI Trigger (`/api/codex/trigger`)**:
  - When an agent starts a "Coding" task, the app sends the task description to the Codex API.
  - The agent's isometric animation switches to "typing furiously".
  - Upon API success, the task auto-completes, granting a large `Money Mode` bonus and a "Code Generated" visual effect in the office.


---


### Next Steps for Implementation:
1. Initialize Next.js project with TypeScript and Tailwind CSS.
2. Set up Dexie.js (or Prisma) and define the initial schema.
3. Build the core isometric grid renderer and coordinate translation utilities.
4. Implement the Agent State Machine and connect it to the Task queue.