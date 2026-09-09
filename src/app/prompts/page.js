import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const prompts = [
  ["Luxury leasing intro", "Warm", "142 runs", "Live"],
  ["Objection handling", "Confident", "89 runs", "Live"],
  ["Tour booking flow", "Direct", "216 runs", "Draft"],
];

export default function PromptsPage() {
  return (
    <AppShell title="AI Prompt Editor" subtitle="Prompt management" breadcrumb={["Workspace", "Prompts"]}>
      <SectionCard title="Prompt library" subtitle="Reusable conversation logic and guardrails">
        <DataTable columns={["Prompt", "Tone", "Usage", "Status"]} rows={prompts} />
      </SectionCard>
      <SectionCard title="Prompt testing" subtitle="Sandbox, evaluation, and deploy flow">
        <EmptyState title="Test harness ready" message="Prompt variations can be simulated and tested before deployment." />
      </SectionCard>
    </AppShell>
  );
}
