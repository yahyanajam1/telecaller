import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const appointments = [
  ["Harbor Loft", "Maya Chen", "Today 10:30", "Confirmed"],
  ["Cedar Residences", "Jordan Alvarez", "Today 13:00", "Pending"],
  ["Northline Tower", "Elena Brooks", "Tomorrow 16:15", "Reminded"],
];

export default function AppointmentsPage() {
  return (
    <AppShell title="Appointments" subtitle="Visits and scheduling" breadcrumb={["Workspace", "Appointments"]}>
      <SectionCard title="Upcoming visits" subtitle="Schedule across projects and agents">
        <DataTable columns={["Project", "Lead", "Time", "Status"]} rows={appointments} />
      </SectionCard>
      <SectionCard title="Calendar" subtitle="Daily and weekly scheduling views">
        <EmptyState title="Calendar ready" message="A calendar experience for agents and broker teams will live here." />
      </SectionCard>
    </AppShell>
  );
}
