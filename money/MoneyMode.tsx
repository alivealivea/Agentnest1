"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AppSettings, Project, Transaction } from "@/types";
import { expenses, money, projectProfit, projectedIncome, unpaid } from "@/lib/economy/calculations";

interface Props {
  projects: Project[];
  transactions: Transaction[];
  settings: AppSettings;
}

export function MoneyMode({ projects, transactions, settings }: Props) {
  const hidden = settings.publicMode && settings.hideMoney;
  const chartData = projects.map((project) => ({
    name: project.name.replace(" project", ""),
    revenue: project.expectedRevenue ?? project.budget,
    profit: projectProfit(project)
  }));
  const projected = projectedIncome(transactions);
  const spent = expenses(transactions);

  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="panel p-5">
        <p className="eyebrow">Money Mode</p>
        <h2 className="text-2xl font-black text-charcoal">Revenue, profit, and cashflow decisions</h2>
        <div className="mt-5 h-[330px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(value) => hidden ? "" : `${Number(value) / 1000}k`} />
              <Tooltip formatter={(value) => money(Number(value), hidden)} />
              <Bar dataKey="revenue" fill="#6366F1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="profit" fill="#34D399" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="panel p-5">
          <p className="eyebrow">Monthly target</p>
          <h3 className="mt-1 text-3xl font-black text-charcoal">{money(projected, hidden)}</h3>
          <p className="text-sm text-slate">Target range: {money(settings.monthlyTargetMin, hidden)} - {money(settings.monthlyTargetMax, hidden)}</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${Math.min(100, (projected / settings.monthlyTargetMin) * 100)}%` }} />
          </div>
        </div>
        <div className="panel p-5">
          <p className="eyebrow">Expenses</p>
          <h3 className="mt-1 text-3xl font-black text-rose-500">{money(spent, hidden)}</h3>
          <p className="text-sm text-slate">Fixed monthly pressure is the main risk to smooth out.</p>
        </div>
        <div className="panel p-5">
          <p className="eyebrow">Unpaid / overdue</p>
          <div className="mt-3 space-y-2">
            {unpaid(transactions).map((tx) => (
              <div key={tx.id} className="rounded-xl bg-white p-3 text-sm shadow-sm">
                <p className="font-bold text-charcoal">{tx.description}</p>
                <p className="text-slate">{money(tx.amount, hidden)} / {tx.status}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-black text-amber-700">Pricing improvement</p>
          <p className="mt-2 text-sm text-amber-800">Push more work into milestone packages and retainers. Avoid one-off low-margin tasks while debt payments are fixed.</p>
        </div>
      </div>
    </section>
  );
}
