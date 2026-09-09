import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";

export default function LeadDetailsPage() {
  return (
    <AppShell title="Lead Details" subtitle="Qualification context" breadcrumb={["Workspace", "Leads", "Details"]}>
      <div className="gridTwo">
        <SectionCard title="Lead profile" subtitle="Contact and intent details">
          <EmptyState title="Lead profile ready" message="This screen will show the customer’s information and qualification summary." />
        </SectionCard>
        <SectionCard title="Activity timeline" subtitle="Call, SMS, and CRM events">
          <EmptyState title="Timeline ready" message="History and next-best actions will be shown here." />
        </SectionCard>
      </div>
    </AppShell>
  );
}
