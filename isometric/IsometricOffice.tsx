"use client";

import type { Agent, Room } from "@/types";
import { EditableText } from "@/components/ui/EditableText";

const themeClass: Record<string, string> = {
  indigo: "from-indigo-200 to-indigo-50 border-indigo-200",
  coral: "from-rose-200 to-rose-50 border-rose-200",
  mint: "from-emerald-200 to-emerald-50 border-emerald-200",
  amber: "from-amber-200 to-amber-50 border-amber-200",
  slate: "from-slate-200 to-slate-50 border-slate-200"
};

const statusClass: Record<string, string> = {
  idle: "bg-slate-300",
  thinking: "bg-indigo-400",
  researching: "bg-cyan-400",
  coding: "bg-amber-400",
  designing: "bg-rose-400",
  writing: "bg-purple-400",
  reviewing: "bg-blue-400",
  waiting_approval: "bg-orange-400",
  blocked: "bg-red-400",
  done: "bg-emerald-400",
  error: "bg-red-600"
};

function iso(x: number, y: number) {
  return {
    left: 390 + (x - y) * 54,
    top: 40 + (x + y) * 28
  };
}

interface IsometricOfficeProps {
  rooms: Room[];
  agents: Agent[];
  editMode: boolean;
  selectedRoomId?: string;
  selectedAgentId?: string;
  onSelectRoom: (id: string) => void;
  onSelectAgent: (id: string) => void;
  onUpdateRoom: (room: Room) => void;
  onUpdateAgent: (agent: Agent) => void;
}

export function IsometricOffice({ rooms, agents, editMode, selectedRoomId, selectedAgentId, onSelectRoom, onSelectAgent, onUpdateRoom, onUpdateAgent }: IsometricOfficeProps) {
  const visibleRooms = rooms.filter((room) => !room.hidden).sort((a, b) => a.x + a.y - (b.x + b.y));
  const visibleAgents = agents.sort((a, b) => a.x + a.y - (b.x + b.y));

  return (
    <section className="relative min-h-[580px] overflow-hidden rounded-[32px] border border-white/80 bg-gradient-to-br from-[#FFF8F0] via-[#F8FBFF] to-[#EDEBFF] shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(251,191,36,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(99,102,241,0.18),transparent_26%)]" />
      <div className="absolute left-8 top-8 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-charcoal shadow-sm">2.5D editable office</div>
      <div className="absolute right-10 top-8 flex gap-2">
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate">Depth sort x + y</span>
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate">64 x 32 grid feel</span>
      </div>
      <div className="isometric-stage absolute left-1/2 top-1/2 h-[720px] w-[1000px] -translate-x-1/2 -translate-y-1/2">
        <div className="iso-floor absolute left-[220px] top-[40px] h-[520px] w-[700px]" />
        {visibleRooms.map((room) => {
          const pos = iso(room.x, room.y);
          return (
            <button
              key={room.id}
              className={`iso-room absolute border bg-gradient-to-br ${themeClass[room.theme ?? "indigo"]} ${selectedRoomId === room.id ? "selected-iso" : ""}`}
              style={{ left: pos.left, top: pos.top, width: room.width * 86, height: room.height * 58, zIndex: 10 + room.x + room.y }}
              onClick={() => onSelectRoom(room.id)}
            >
              <span className="room-badge">{room.icon}</span>
              <span className="mt-5 block text-center text-sm font-extrabold text-charcoal">
                <EditableText value={room.name} editable={editMode} onChange={(name) => onUpdateRoom({ ...room, name })} />
              </span>
              <span className="mx-auto mt-2 block max-w-[170px] text-center text-[11px] leading-snug text-slate">{room.description}</span>
              <span className="room-shadow" />
            </button>
          );
        })}
        {visibleAgents.map((agent) => {
          const pos = iso(agent.x, agent.y);
          return (
            <button
              key={agent.id}
              className={`agent-buddy absolute ${selectedAgentId === agent.id ? "selected-agent" : ""}`}
              style={{ left: pos.left + 38, top: pos.top - 24, zIndex: 80 + agent.x + agent.y }}
              onClick={() => onSelectAgent(agent.id)}
            >
              <span className="agent-aura" />
              <span className="agent-face">{agent.avatar}</span>
              <span className={`status-dot ${statusClass[agent.status]}`} />
              <span className="agent-label">
                <EditableText value={agent.name} editable={editMode} onChange={(name) => onUpdateAgent({ ...agent, name })} />
              </span>
            </button>
          );
        })}
      </div>
      <div className="pointer-events-none absolute bottom-5 left-6 right-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl bg-white/75 p-3 shadow-sm backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-500">Live office</p>
          <p className="text-sm text-charcoal">Agents show status, progress, room context, and editable names.</p>
        </div>
        <div className="rounded-2xl bg-white/75 p-3 shadow-sm backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500">Money brain</p>
          <p className="text-sm text-charcoal">Every room is connected to clients, tasks, and projected revenue.</p>
        </div>
        <div className="rounded-2xl bg-white/75 p-3 shadow-sm backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-500">Edit mode</p>
          <p className="text-sm text-charcoal">Rename, hide, duplicate, and save locally with Dexie.</p>
        </div>
      </div>
    </section>
  );
}
