import type { Agent } from "@/types";

export function getActiveAgentCount(agents: Agent[]) {
  return agents.filter((agent) => agent.status !== "idle").length;
}
