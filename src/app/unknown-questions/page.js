import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const unknown = [
  ["Can I bring a pet?", "New", "Needs article"],
  ["What about guest parking?", "Reviewed", "Suggested answer"],
  ["Is there a move-in fee?", "Pending", "Awaiting policy"]
];

export default function UnknownQuestionsPage() {
  return (
    <AppShell title="Unknown Questions" subtitle="Learning and review" breadcrumb={["Workspace", "Unknown Questions"]}>
      <SectionCard title="Unanswered prompts" subtitle="Questions the AI could not resolve confidently">
        <DataTable columns={["Question", "Status", "Action"]} rows={unknown} />
      </SectionCard>
      <SectionCard title="Continuous learning" subtitle="Improve the knowledge base over time">
        <EmptyState title="Learning queue ready" message="Questions can be converted into knowledge items and prompt updates." />
      </SectionCard>
    </AppShell>
  );
}
