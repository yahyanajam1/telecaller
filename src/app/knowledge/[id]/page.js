import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";

export default function KnowledgeEditorPage() {
  return (
    <AppShell title="Knowledge Editor" subtitle="Authoring experience" breadcrumb={["Workspace", "Knowledge", "Editor"]}>
      <SectionCard title="Article editor" subtitle="Write, review, and publish content">
        <EmptyState title="Editor canvas ready" message="A full markdown-style editor with versioning and approvals will be built here." />
      </SectionCard>
    </AppShell>
  );
}
