"use client";

import { useMemo, useState } from "react";
import type { Agent, TimelineEvent } from "@/types";

interface Props {
  events: TimelineEvent[];
  agents: Agent[];
}

export function TimeMachine({ events, agents }: Props) {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => events.filter((event) => filter === "all" || event.type === filter), [events, filter]);

  return (
    <section className="panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Time Machine</p>
          <h2 className="text-2xl font-black text-charcoal">History, decisions, blocked work, and money events</h2>
        </div>
        <select className="input max-w-[190px]" value={filter} onChange={(event) => setFilter(event.target.value)}>
          {["all", "money", "task", "project", "agent", "edit", "mock", "settings"].map((type) => <option key={type}>{type}</option>)}
        </select>
      </div>
      <div className="mt-5 grid gap-3">
        {filtered.map((event) => {
          const agent = agents.find((item) => item.id === event.agentId);
          return (
            <article key={event.id} className="grid gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-[160px_1fr_140px]">
              <time className="text-sm font-semibold text-slate">{new Date(event.timestamp).toLocaleString()}</time>
              <div>
                <p className="font-black text-charcoal">{event.title}</p>
                <p className="text-sm text-slate">{event.description ?? "Snapshot saved for future replay."}</p>
              </div>
              <div className="flex items-center justify-start gap-2 md:justify-end">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">{event.type}</span>
                {agent ? <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{agent.avatar}</span> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
