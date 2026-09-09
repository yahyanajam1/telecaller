import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const supportRequests = [
  ["Integration issue", "Open", "Today"],
  ["Billing question", "Queued", "Yesterday"],
  ["Agent tuning", "Resolved", "2 days ago"],
];

export default function SupportPage() {
  return (
    <AppShell title="Support" subtitle="Assistance and service" breadcrumb={["Workspace", "Support"]}>
      <SectionCard title="Support requests" subtitle="Open tickets and service history">
        <DataTable columns={["Request", "Status", "Updated"]} rows={supportRequests} />
      </SectionCard>
      <SectionCard title="System status" subtitle="Service health and incident updates">
        <EmptyState title="Status center ready" message="Live operational status, incident history, and support links will be shown here." />
      </SectionCard>
    </AppShell>
  );
}
