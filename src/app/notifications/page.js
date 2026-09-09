import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const notifications = [
  ["New inbound call", "Harbor Loft", "2 min ago"],
  ["Lead scored highly", "Cedar Residences", "14 min ago"],
  ["Knowledge update approved", "Northline Tower", "1 hour ago"],
];

export default function NotificationsPage() {
  return (
    <AppShell title="Notifications" subtitle="Inbox and alerts" breadcrumb={["Workspace", "Notifications"]}>
      <SectionCard title="Activity center" subtitle="Warnings, updates, and follow-ups">
        <DataTable columns={["Event", "Project", "Time"]} rows={notifications} />
      </SectionCard>
      <SectionCard title="Preferences" subtitle="Alert routing and sensitivity">
        <EmptyState title="Preferences ready" message="Notification channels and threshold settings can be configured here." />
      </SectionCard>
    </AppShell>
  );
}
