import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const leads = [
  ["Lina Patel", "Aurelia Tower", "Ready to tour", "95"],
  ["Noah Kim", "Sage Villas", "Pricing request", "74"],
  ["Alicia Gomez", "Cedar Residences", "High intent", "91"],
];

export default function LeadsPage() {
  return (
    <AppShell title="Lead Management" subtitle="CRM and qualification" breadcrumb={["Workspace", "Leads"]}>
      <SectionCard title="All leads" subtitle="Cross-channel lead management">
        <DataTable columns={["Lead", "Project", "Intent", "Score"]} rows={leads} />
      </SectionCard>
      <div className="gridTwo">
        <SectionCard title="Qualified leads" subtitle="High-confidence conversions">
          <EmptyState title="No review yet" message="Qualified leads will be surfaced here for fast follow-up." />
        </SectionCard>
        <SectionCard title="Rejected leads" subtitle="Declined or low-fit opportunities">
          <EmptyState title="Nothing to review" message="Rejected or disqualified leads can be audited and archived here." />
        </SectionCard>
      </div>
    </AppShell>
  );
}
