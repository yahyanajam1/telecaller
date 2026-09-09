import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const calls = [
  ["Inbound Lead", "Northline Tower", "Live", "Qualified"],
  ["Outbound Follow-up", "Cedar Residences", "Queued", "Pending"],
  ["Spanish Inquiry", "Harbor Loft", "Completed", "Booked"],
];

export default function CallsPage() {
  return (
    <AppShell title="Calls" subtitle="Voice operations" breadcrumb={["Workspace", "Calls"]}>
      <SectionCard title="Call queue" subtitle="Live and scheduled voice activity">
        <DataTable columns={["Campaign", "Project", "Status", "Outcome"]} rows={calls} />
      </SectionCard>
      <SectionCard title="Voice controls" subtitle="Agent status and routing policies">
        <EmptyState title="Routing configured" message="Incoming and outbound call policy can be managed here." />
      </SectionCard>
    </AppShell>
  );
}
