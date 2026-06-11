"use client";

import type { Agent, AppSettings, Client, Project, Room, Task, Transaction } from "@/types";
import { money, clientRevenue } from "@/lib/economy/calculations";

interface Props {
  room?: Room;
  agent?: Agent;
  rooms: Room[];
  agents: Agent[];
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  transactions: Transaction[];
  settings: AppSettings;
  editMode: boolean;
  onUpdateRoom: (room: Room) => Promise<void>;
  onDuplicateRoom: (room: Room) => Promise<void>;
  onUpdateAgent: (agent: Agent) => Promise<void>;
  onUpdateClient: (client: Client) => Promise<void>;
  onUpdateProject: (project: Project) => Promise<void>;
  onUpdateTask: (task: Task) => Promise<void>;
  onCreateTask: (task: Task) => Promise<void>;
}

export function DetailPanel({ room, agent, agents, clients, projects, tasks, transactions, settings, editMode, onUpdateRoom, onDuplicateRoom, onUpdateAgent, onUpdateClient, onUpdateProject, onUpdateTask, onCreateTask }: Props) {
  const hiddenMoney = settings.publicMode && settings.hideMoney;

  if (agent) {
    const currentTask = tasks.find((task) => task.id === agent.currentTaskId) ?? tasks.find((task) => task.agentId === agent.id);
    return (
      <aside className="panel p-5">
        <p className="eyebrow">Selected agent</p>
        <div className="mt-3 flex items-start gap-3">
          <div className="grid size-14 place-items-center rounded-2xl bg-indigo-100 font-black text-indigo-600">{agent.avatar}</div>
          <div className="min-w-0 flex-1">
            <input className="input font-black" disabled={!editMode} value={agent.name} onChange={(event) => onUpdateAgent({ ...agent, name: event.target.value })} />
            <input className="input mt-2" disabled={!editMode} value={agent.role} onChange={(event) => onUpdateAgent({ ...agent, role: event.target.value })} />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="label">Status<select className="input" disabled={!editMode} value={agent.status} onChange={(event) => onUpdateAgent({ ...agent, status: event.target.value as Agent["status"] })}>{["idle", "thinking", "researching", "coding", "designing", "writing", "reviewing", "waiting_approval", "blocked", "done", "error"].map((status) => <option key={status}>{status}</option>)}</select></label>
          <label className="label">Progress<input className="input" disabled={!editMode} type="number" value={agent.progress} onChange={(event) => onUpdateAgent({ ...agent, progress: Number(event.target.value) })} /></label>
        </div>
        <p className="mt-4 text-sm text-slate">{agent.personality ?? "A helpful AI colleague."}</p>
        <div className="mt-4 rounded-2xl bg-white p-3 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate">Current task</p>
          <p className="mt-1 font-bold text-charcoal">{currentTask?.title ?? "Available for assignment"}</p>
        </div>
      </aside>
    );
  }

  if (!room) {
    return (
      <aside className="panel p-5">
        <p className="eyebrow">Context</p>
        <h3 className="mt-2 text-xl font-black text-charcoal">Tap a room or agent</h3>
        <p className="mt-2 text-sm text-slate">The selected object becomes editable here. The app never treats the office as fixed scenery.</p>
      </aside>
    );
  }

  const roomProjects = room.type === "client" ? projects : projects.filter((project) => project.description?.toLowerCase().includes(room.type) || project.name.toLowerCase().includes(room.type));

  return (
    <aside className="panel p-5">
      <p className="eyebrow">Selected room</p>
      <input className="input mt-3 text-lg font-black" disabled={!editMode} value={room.name} onChange={(event) => onUpdateRoom({ ...room, name: event.target.value })} />
      <textarea className="input mt-3 min-h-20" disabled={!editMode} value={room.description ?? ""} onChange={(event) => onUpdateRoom({ ...room, description: event.target.value })} />
      <div className="mt-3 flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={() => onUpdateRoom({ ...room, hidden: !room.hidden })}>{room.hidden ? "Show room" : "Hide room"}</button>
        <button className="btn-secondary" onClick={() => onDuplicateRoom(room)}>Duplicate room</button>
      </div>

      {room.type === "client" ? (
        <div className="mt-5 space-y-3">
          <p className="eyebrow">Client cards</p>
          {clients.map((client) => (
            <div key={client.id} className="rounded-2xl bg-white p-3 shadow-sm">
              <input className="input font-bold" disabled={!editMode} value={settings.publicMode && settings.hideClientNames ? "Public Client" : client.name} onChange={(event) => onUpdateClient({ ...client, name: event.target.value })} />
              <p className="mt-2 text-sm text-slate">Revenue: {money(clientRevenue(client, projects, transactions), hiddenMoney)} / Opportunity {client.opportunityScore}%</p>
              <textarea className="input mt-2 min-h-16" disabled={!editMode} value={client.notes ?? ""} onChange={(event) => onUpdateClient({ ...client, notes: event.target.value })} />
            </div>
          ))}
        </div>
      ) : null}

      {room.type === "print" ? <SpecialList title="3D Print Factory" items={["Print queue: life-size figure parts", "Material cost: filament, paint, support waste", "Finishing: sanding and paint station", "Delivery deadline and failed print log placeholders"]} /> : null}
      {room.type === "studio" ? <SpecialList title="Photo/Video Studio" items={["Shoot schedule and client brief", "Shot list and gear checklist", "Editing, revisions, delivery, invoice status", "Portfolio and content repurpose ideas"]} /> : null}
      {room.type === "content" ? <SpecialList title="Content Creator Room" items={["Content ideas and short scripts", "Thumbnails, captions, and posting schedule", "IG/TikTok/YouTube platform status", "Reusable templates and viral angles"]} /> : null}

      <div className="mt-5 space-y-3">
        <p className="eyebrow">Projects and tasks</p>
        {roomProjects.slice(0, 3).map((project) => (
          <div key={project.id} className="rounded-2xl bg-white p-3 shadow-sm">
            <input className="input font-bold" disabled={!editMode} value={project.name} onChange={(event) => onUpdateProject({ ...project, name: event.target.value })} />
            <p className="mt-2 text-xs text-slate">{money(project.expectedRevenue ?? project.budget, hiddenMoney)} / {project.status}</p>
          </div>
        ))}
        <button
          className="btn w-full"
          onClick={() => onCreateTask({
            id: `task-${Date.now()}`,
            projectId: projects[0]?.id,
            agentId: agents[0]?.id,
            title: "New editable task",
            description: "Created from Agent Nest MVP.",
            status: "todo",
            priority: "medium",
            reward: 8000,
            deadline: new Date().toISOString().slice(0, 10)
          })}
        >
          Create task
        </button>
        {tasks.slice(0, 4).map((task) => (
          <div key={task.id} className="rounded-2xl bg-indigo-50 p-3">
            <input className="input font-bold" disabled={!editMode} value={task.title} onChange={(event) => onUpdateTask({ ...task, title: event.target.value })} />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <select className="input" disabled={!editMode} value={task.status} onChange={(event) => onUpdateTask({ ...task, status: event.target.value })}>
                {["todo", "in_progress", "review", "waiting_approval", "blocked", "done"].map((status) => <option key={status}>{status}</option>)}
              </select>
              <select className="input" disabled={!editMode} value={task.agentId ?? ""} onChange={(event) => onUpdateTask({ ...task, agentId: event.target.value })}>
                {agents.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function SpecialList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5 rounded-2xl bg-amber-50 p-4">
      <p className="font-black text-amber-800">{title}</p>
      <ul className="mt-2 space-y-1 text-sm text-amber-800">
        {items.map((item) => <li key={item}>- {item}</li>)}
      </ul>
    </div>
  );
}
