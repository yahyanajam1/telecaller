import { AppShell, SectionCard, DataTable, EmptyState } from "@/components/app-shell";

const members = [
  ["Ava Martinez", "Admin", "Operations"],
  ["Chris Allen", "Broker", "Leasing"],
  ["Nadia Singh", "Analyst", "Insights"],
];

export default function OrganizationPage() {
  return (
    <AppShell title="Organization" subtitle="Team and governance" breadcrumb={["Workspace", "Organization"]}>
      <SectionCard title="Team members" subtitle="People and access management">
        <DataTable columns={["Name", "Role", "Team"]} rows={members} />
      </SectionCard>
      <div className="gridTwo">
        <SectionCard title="Roles" subtitle="Permission groups and scope">
          <EmptyState title="Role matrix ready" message="Permissions can be grouped by administrator, broker, analyst, and support roles." />
        </SectionCard>
        <SectionCard title="Audit logs" subtitle="Operational and administrative history">
          <EmptyState title="Audit log ready" message="Security and configuration changes will be presented here." />
        </SectionCard>
      </div>
    </AppShell>
  );
}
