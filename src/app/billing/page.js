import { AppShell, SectionCard, EmptyState, DataTable } from "@/components/app-shell";

const invoices = [
  ["INV-1042", "July 2026", "$3,490", "Paid"],
  ["INV-1037", "June 2026", "$3,490", "Paid"],
  ["INV-1028", "May 2026", "$3,490", "Pending"],
];

export default function BillingPage() {
  return (
    <AppShell title="Billing" subtitle="Plans and invoices" breadcrumb={["Workspace", "Billing"]}>
      <div className="gridTwo">
        <SectionCard title="Subscription" subtitle="Current plan and seat allocation">
          <EmptyState title="Enterprise plan active" message="Manage billing cadence, allocation, and renewal options here." />
        </SectionCard>
        <SectionCard title="Usage" subtitle="Voice minutes and agent usage">
          <EmptyState title="Usage overview ready" message="Real-time usage and consumption thresholds can be shown here." />
        </SectionCard>
      </div>
      <SectionCard title="Invoices" subtitle="Invoice history and payment status">
        <DataTable columns={["Invoice", "Month", "Amount", "Status"]} rows={invoices} />
      </SectionCard>
    </AppShell>
  );
}
