import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";

export default function RegisterPage() {
  return (
    <AppShell title="Register" subtitle="Create account" breadcrumb={["Auth", "Register"]}>
      <SectionCard title="Create organization" subtitle="Set up your workspace and team">
        <EmptyState title="Onboarding form ready" message="Registration, plan selection, and org setup will be handled here." />
      </SectionCard>
    </AppShell>
  );
}
