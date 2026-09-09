import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const integrations = [
  ["Salesforce CRM", "Connected", "Live"],
  ["HubSpot", "Connected", "Live"],
  ["WhatsApp Business", "Syncing", "Pending"],
];

export default function IntegrationsPage() {
  return (
    <AppShell title="CRM Integrations" subtitle="Connected systems" breadcrumb={["Workspace", "Integrations"]}>
      <SectionCard title="Integration hub" subtitle="Connect CRM, messaging, and workflow platforms">
        <DataTable columns={["Integration", "Status", "State"]} rows={integrations} />
      </SectionCard>
      <SectionCard title="WhatsApp integration" subtitle="Follow-up messaging and notifications">
        <EmptyState title="Messaging ready" message="WhatsApp templates, messaging status, and delivery controls can be managed here." />
      </SectionCard>
    </AppShell>
  );
}
