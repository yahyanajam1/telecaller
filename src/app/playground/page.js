import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";

export default function PlaygroundPage() {
  return (
    <AppShell title="Conversation Playground" subtitle="Test AI behavior" breadcrumb={["Workspace", "Playground"]}>
      <div className="gridTwo">
        <SectionCard title="Live prompt test" subtitle="Simulate user input and AI responses">
          <EmptyState title="Test console ready" message="Run prompt variations and inspect responses in a sandbox environment." />
        </SectionCard>
        <SectionCard title="Test AI" subtitle="Evaluate accuracy and compliance">
          <EmptyState title="Evaluation tools ready" message="Compare versions, test edge cases, and review quality scores here." />
        </SectionCard>
      </div>
    </AppShell>
  );
}
