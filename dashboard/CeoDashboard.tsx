"use client";

import type { Agent, AppSettings, Client, Project, Task, Transaction } from "@/types";
import { money, projectedIncome, topMoneyActions, unpaid } from "@/lib/economy/calculations";
import { ProgressRing } from "@/components/ui/ProgressRing";

interface Props {
  agents: Agent[];
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  transactions: Transaction[];
  settings: AppSettings;
}

export function CeoDashboard({ agents, clients, projects, tasks, transactions, settings }: Props) {
  const hidden = settings.publicMode && settings.hideMoney;
  const projected = projectedIncome(transactions);
  const percent = (projected / settings.monthlyTargetMin) * 100;
  const actions = topMoneyActions(tasks, transactions, projects);
  const urgent = tasks.filter((task) => task.priority === "urgent" || task.priority === "high").slice(0, 4);
  const opportunities = clients.slice().sort((a, b) => (b.opportunityScore ?? 0) - (a.opportunityScore ?? 0)).slice(0, 3);

  return (
    <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">CEO Dashboard</p>
            <h2 className="text-2xl font-black text-charcoal">What moves you toward 150k-200k THB this month?</h2>
          </div>
          <ProgressRing value={percent} label={`${money(projected, hidden)} projected`} />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {actions.map((action, index) => (
            <div key={action.id} className="rounded-2xl border border-indigo-100 bg-indigo-50/80 p-4">
              <p className="text-xs font-black text-indigo-500">Money Action {index + 1}</p>
              <h3 className="mt-2 font-bold text-charcoal">{action.title}</h3>
              <p className="mt-3 text-sm font-semibold text-emerald-600">{money(action.value, hidden)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-charcoal p-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Recommended next action</p>
          <p className="mt-2 text-lg font-bold">Follow up NHA payment first, then send the BDI premium offer today.</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="panel p-5">
          <p className="eyebrow">Urgent deadlines</p>
          <div className="mt-3 space-y-3">
            {urgent.map((task) => (
              <div key={task.id} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                <div>
                  <p className="font-bold text-charcoal">{task.title}</p>
                  <p className="text-xs text-slate">{task.deadline ?? "No deadline"} / {task.priority}</p>
                </div>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-600">{money(task.reward ?? 0, hidden)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-5">
          <p className="eyebrow">Best client opportunities</p>
          <div className="mt-3 grid gap-3">
            {opportunities.map((client) => (
              <div key={client.id} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                <div>
                  <p className="font-bold text-charcoal">{settings.publicMode && settings.hideClientNames ? "Public Client" : client.name}</p>
                  <p className="text-xs text-slate">Next follow-up: {client.nextFollowUp}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-600">{client.opportunityScore}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-5">
          <p className="eyebrow">Agent health</p>
          <p className="mt-2 text-sm text-slate">{agents.filter((agent) => agent.status === "blocked" || agent.status === "error").length} blocked/error agents. {unpaid(transactions).length} payments need attention.</p>
        </div>
      </div>
    </section>
  );
}
