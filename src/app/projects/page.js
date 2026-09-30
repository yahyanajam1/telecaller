"use client";

import { useState } from "react";
import { AppShell, SectionCard, StatGrid } from "@/components/app-shell";
import { RecordTable } from "@/components/record-table";

const initialProjects = [
  { id: "harbor-loft", project: "Harbor Loft", type: "Luxury", agents: 3, status: "Active", calls: 284 },
  { id: "cedar-residences", project: "Cedar Residences", type: "Mid-rise", agents: 2, status: "Active", calls: 216 },
  { id: "northline-tower", project: "Northline Tower", type: "Commercial", agents: 1, status: "Paused", calls: 92 },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const activeCount = projects.filter((project) => project.status === "Active").length;

  return (
    <AppShell title="Projects" subtitle="Multi-project operations" breadcrumb={["Workspace", "Projects"]}>
      <StatGrid items={[
        { value: projects.length, label: "Projects", change: "In this workspace" },
        { value: activeCount, label: "Active", change: "Running campaigns" },
        { value: projects.reduce((total, project) => total + project.agents, 0), label: "Assigned agents", change: "Across the portfolio" },
        { value: projects.reduce((total, project) => total + project.calls, 0), label: "Calls", change: "This month" },
      ]} />
      <SectionCard title="Project portfolio" subtitle="Search the portfolio and pause or resume deployments">
        <RecordTable
          records={projects}
          columns={[{ key: "project", label: "Project" }, { key: "type", label: "Type" }, { key: "agents", label: "Agents" }, { key: "calls", label: "Calls this month" }, { key: "status", label: "Status" }]}
          searchPlaceholder="Search projects"
          actionLabel={(project) => project.status === "Active" ? "Pause" : "Resume"}
          onAction={(selected) => setProjects((current) => current.map((project) => project.id === selected.id ? { ...project, status: project.status === "Active" ? "Paused" : "Active" } : project))}
        />
      </SectionCard>
    </AppShell>
  );
}
