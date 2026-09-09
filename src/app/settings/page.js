import { AppShell, SectionCard, EmptyState, ChipRow } from "@/components/app-shell";

const settingsItems = ["Profile", "Security", "Notifications", "Preferences", "Theme"];

export default function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Platform preferences" breadcrumb={["Workspace", "Settings"]}>
      <div className="gridTwo">
        <SectionCard title="Profile" subtitle="Personal account details">
          <EmptyState title="Profile ready" message="Edit profile information, avatar, and personal preferences here." />
        </SectionCard>
        <SectionCard title="Security" subtitle="Password and MFA controls">
          <EmptyState title="Security controls ready" message="Manage MFA and account recovery options here." />
        </SectionCard>
      </div>
      <SectionCard title="Global preferences" subtitle="App experience and notification defaults">
        <ChipRow items={settingsItems} />
      </SectionCard>
    </AppShell>
  );
}
