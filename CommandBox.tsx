"use client";

import { useState } from "react";
import type { Agent, AppView, Project, Task } from "@/types";

interface Props {
  agents: Agent[];
  projects: Project[];
  onNavigate: (view: AppView) => void;
  onCreateTask: (task: Task) => Promise<void>;
}

export function CommandBox({ agents, projects, onNavigate, onCreateTask }: Props) {
  const [command, setCommand] = useState("");
  const [reply, setReply] = useState("Try: show money mode, create task, show time machine, what should I do today.");

  async function run() {
    const lower = command.toLowerCase();
    if (lower.includes("money") || lower.includes("invoice") || lower.includes("payment")) {
      onNavigate("money");
      setReply("Opened Money Mode. Start with unpaid payments and high-profit projects.");
    } else if (lower.includes("time") || lower.includes("yesterday") || lower.includes("history")) {
      onNavigate("timeline");
      setReply("Opened Time Machine. Your agents left a useful trail.");
    } else if (lower.includes("setting") || lower.includes("provider") || lower.includes("api")) {
      onNavigate("settings");
      setReply("Opened Settings. Providers are mocked and stored locally.");
    } else if (lower.includes("create task") || lower.includes("new task") || lower.includes("task")) {
      await onCreateTask({
        id: `task-${Date.now()}`,
        projectId: projects[0]?.id,
        agentId: agents[0]?.id,
        title: command || "New command task",
        description: "Created from the command box with simple keyword parsing.",
        status: "todo",
        priority: "medium",
        reward: 8000,
        deadline: new Date().toISOString().slice(0, 10)
      });
      setReply("Created a local editable task and logged it in Time Machine.");
    } else if (lower.includes("today") || lower.includes("150") || lower.includes("200")) {
      onNavigate("dashboard");
      setReply("Today: collect NHA payment, send BDI premium offer, pitch a corporate retainer.");
    } else {
      setReply("I understood the command, but this MVP only routes and creates tasks with simple keyword rules.");
    }
    setCommand("");
  }

  return (
    <div className="rounded-3xl border border-white/80 bg-white/75 p-3 shadow-soft backdrop-blur">
      <div className="flex flex-col gap-2 md:flex-row">
        <input
          className="input flex-1"
          placeholder="Type a command in English or Thai-style keywords..."
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") void run();
          }}
        />
        <button className="btn" onClick={() => void run()}>Run</button>
      </div>
      <p className="mt-2 text-sm text-slate">{reply}</p>
    </div>
  );
}
