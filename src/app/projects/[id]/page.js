import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";

export default function ProjectDetailsPage() {
  return (
    <AppShell title="Project Details" subtitle="Project operating view" breadcrumb={["Workspace", "Projects", "Details"]}>
      <div className="gridTwo">
        <SectionCard title="Project overview" subtitle="Configuration and deployment state">
          <EmptyState title="Project view ready" message="This workspace will expose connected agents, content, settings, and performance here." />
        </SectionCard>
        <SectionCard title="Knowledge coverage" subtitle="Articles available to the AI agent">
          <EmptyState title="Coverage ready" message="Knowledge articles and prompt versions will be attached to each project." />
        </SectionCard>
      </div>
    </AppShell>
  );
}
