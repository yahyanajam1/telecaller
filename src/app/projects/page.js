import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const projects = [
  ["Harbor Loft", "Luxury", "3 agents", "Active"],
  ["Cedar Residences", "Mid-rise", "2 agents", "Active"],
  ["Northline Tower", "Commercial", "1 agent", "Paused"],
];

export default function ProjectsPage() {
  return (
    <AppShell title="Projects" subtitle="Multi-project operations" breadcrumb={["Workspace", "Projects"]}>
      <SectionCard title="Project portfolio" subtitle="Deploy AI agents by project">
        <DataTable columns={["Project", "Type", "Agents", "Status"]} rows={projects} />
      </SectionCard>
      <SectionCard title="Project health" subtitle="Performance and readiness">
        <EmptyState title="Project insights ready" message="Each project will show its active campaigns, knowledge coverage, and conversion signals." />
      </SectionCard>
    </AppShell>
  );
}
