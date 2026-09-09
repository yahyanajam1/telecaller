import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const keys = [
  ["Production key", "sk_live_...8Xb9", "Active"],
  ["Sandbox key", "sk_test_...7P1q", "Active"],
  ["Webhook key", "whsec_...9W1k", "Rotating"],
];

export default function ApiKeysPage() {
  return (
    <AppShell title="API Keys" subtitle="Secure integrations" breadcrumb={["Workspace", "API Keys"]}>
      <SectionCard title="Access keys" subtitle="Issue and rotate developer credentials">
        <DataTable columns={["Label", "Key", "Status"]} rows={keys} />
      </SectionCard>
      <SectionCard title="Permissions" subtitle="Scope and access control">
        <EmptyState title="Policies ready" message="The API framework can expose scope, permissions, and expiry policies here." />
      </SectionCard>
    </AppShell>
  );
}
