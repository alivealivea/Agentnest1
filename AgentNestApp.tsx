"use client";

import { useEffect, useMemo, useState } from "react";
import type { AppView } from "@/types";
import { useNestData } from "@/lib/db/useNestData";
import { useUiStore } from "@/stores/useUiStore";
import { IsometricOffice } from "@/components/isometric/IsometricOffice";
import { CeoDashboard } from "@/components/dashboard/CeoDashboard";
import { MoneyMode } from "@/components/money/MoneyMode";
import { TimeMachine } from "@/components/timeline/TimeMachine";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { DetailPanel } from "@/components/rooms/DetailPanel";
import { CommandBox } from "@/components/CommandBox";
import { money, projectedIncome } from "@/lib/economy/calculations";

interface Props {
  initialView: AppView;
}

const nav: Array<{ id: AppView; label: string }> = [
  { id: "office", label: "Office" },
  { id: "dashboard", label: "CEO" },
  { id: "money", label: "Money" },
  { id: "timeline", label: "Time" },
  { id: "settings", label: "Settings" }
];

export function AgentNestApp({ initialView }: Props) {
  const data = useNestData();
  const { view, editMode, selectedRoomId, selectedAgentId, setView, setEditMode, selectRoom, selectAgent } = useUiStore();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    setView(initialView);
  }, [initialView, setView]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  const settings = data.settings;
  const selectedRoom = data.rooms.find((room) => room.id === selectedRoomId);
  const selectedAgent = data.agents.find((agent) => agent.id === selectedAgentId);
  const visibleEvents = data.events.slice(0, 5);
  const hiddenMoney = settings?.publicMode && settings.hideMoney;
  const projected = useMemo(() => projectedIncome(data.transactions), [data.transactions]);

  if (data.loading || !settings) {
    return <LoadingNest />;
  }

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      {!introDone ? <HatchingIntro /> : null}
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 p-3 md:p-5">
        <header className="glass-nav flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="logo-mark">AN</div>
            <div>
              <h1 className="text-xl font-black tracking-tight">{settings.appName}</h1>
              <p className="text-sm text-slate">Where AI agents come to work.</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {nav.map((item) => (
              <button key={item.id} className={`nav-pill ${view === item.id ? "active" : ""}`} onClick={() => setView(item.id)}>{item.label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className={`nav-pill ${settings.publicMode ? "active" : ""}`} onClick={() => data.updateSettings({ ...settings, publicMode: !settings.publicMode })}>Public</button>
            <button className={`nav-pill ${editMode ? "active" : ""}`} onClick={() => setEditMode(!editMode)}>Edit</button>
            <button className="btn-secondary" onClick={data.resetDemoData}>Reset demo</button>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[180px_1fr_360px]">
          <aside className="hidden rounded-[28px] border border-white/80 bg-white/60 p-3 shadow-soft backdrop-blur xl:block">
            <p className="eyebrow px-2">Rooms</p>
            <div className="mt-3 space-y-1">
              {data.rooms.map((room) => (
                <button key={room.id} className={`w-full rounded-2xl px-3 py-2 text-left text-sm font-bold ${selectedRoomId === room.id ? "bg-indigo-500 text-white" : "text-charcoal hover:bg-white"}`} onClick={() => { selectRoom(room.id); setView("office"); }}>
                  <span className="mr-2 text-xs">{room.icon}</span>{room.name}
                </button>
              ))}
            </div>
          </aside>

          <div className="space-y-4">
            <section className="grid gap-3 md:grid-cols-4">
              <Metric label="Projected" value={money(projected, hiddenMoney)} tone="indigo" />
              <Metric label="Agents active" value={`${data.agents.filter((agent) => agent.status !== "idle").length}/${data.agents.length}`} tone="mint" />
              <Metric label="Open tasks" value={`${data.tasks.filter((task) => task.status !== "done").length}`} tone="amber" />
              <Metric label="Local store" value="Dexie ready" tone="coral" />
            </section>

            {view === "office" ? (
              <IsometricOffice
                rooms={data.rooms}
                agents={data.agents}
                editMode={editMode}
                selectedRoomId={selectedRoomId}
                selectedAgentId={selectedAgentId}
                onSelectRoom={selectRoom}
                onSelectAgent={selectAgent}
                onUpdateRoom={(room) => void data.updateRoom(room)}
                onUpdateAgent={(agent) => void data.updateAgent(agent)}
              />
            ) : null}
            {view === "dashboard" ? <CeoDashboard agents={data.agents} clients={data.clients} projects={data.projects} tasks={data.tasks} transactions={data.transactions} settings={settings} /> : null}
            {view === "money" ? <MoneyMode projects={data.projects} transactions={data.transactions} settings={settings} /> : null}
            {view === "timeline" ? <TimeMachine events={data.events} agents={data.agents} /> : null}
            {view === "settings" ? <SettingsPanel settings={settings} providers={data.providerConfigs} onUpdateSettings={data.updateSettings} onUpdateProvider={data.updateProvider} onDeleteProvider={data.deleteProvider} /> : null}

            <CommandBox agents={data.agents} projects={data.projects} onNavigate={setView} onCreateTask={data.createTask} />
          </div>

          <div className="space-y-4">
            <DetailPanel
              room={selectedRoom}
              agent={selectedAgent}
              rooms={data.rooms}
              agents={data.agents}
              clients={data.clients}
              projects={data.projects}
              tasks={data.tasks}
              transactions={data.transactions}
              settings={settings}
              editMode={editMode}
              onUpdateRoom={data.updateRoom}
              onDuplicateRoom={data.duplicateRoom}
              onUpdateAgent={data.updateAgent}
              onUpdateClient={data.updateClient}
              onUpdateProject={data.updateProject}
              onUpdateTask={data.updateTask}
              onCreateTask={data.createTask}
            />
            <aside className="panel p-5">
              <p className="eyebrow">Activity feed</p>
              <div className="mt-3 space-y-3">
                {visibleEvents.map((event) => (
                  <div key={event.id} className="rounded-2xl bg-white p-3 shadow-sm">
                    <p className="font-bold text-charcoal">{event.title}</p>
                    <p className="text-xs text-slate">{event.description}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "indigo" | "mint" | "amber" | "coral" }) {
  const tones = {
    indigo: "text-indigo-600 bg-indigo-50",
    mint: "text-emerald-600 bg-emerald-50",
    amber: "text-amber-700 bg-amber-50",
    coral: "text-rose-600 bg-rose-50"
  };
  return (
    <div className="rounded-3xl border border-white/80 bg-white/70 p-4 shadow-soft backdrop-blur">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate">{label}</p>
      <p className={`mt-2 rounded-2xl px-3 py-2 text-lg font-black ${tones[tone]}`}>{value}</p>
    </div>
  );
}

function LoadingNest() {
  return (
    <main className="grid min-h-screen place-items-center bg-charcoal text-white">
      <div className="text-center">
        <div className="mx-auto mb-5 grid size-24 place-items-center rounded-[40%] bg-amber-200 text-2xl font-black text-charcoal shadow-[0_0_60px_rgba(251,191,36,0.6)]">AN</div>
        <p className="font-bold">Warming up the office...</p>
      </div>
    </main>
  );
}

function HatchingIntro() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-charcoal intro-fade">
      <div className="text-center text-white">
        <div className="egg-pop mx-auto grid size-28 place-items-center rounded-[48%_52%_45%_55%] bg-gradient-to-br from-amber-100 to-indigo-200 text-3xl font-black text-charcoal shadow-[0_0_80px_rgba(255,248,240,0.7)]">AN</div>
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.24em] text-amber-100">Agent Nest is opening</p>
      </div>
    </div>
  );
}
