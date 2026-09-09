import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";

export default function LoginPage() {
  return (
    <AppShell title="Login" subtitle="Secure access" breadcrumb={["Auth", "Login"]}>
      <SectionCard title="Sign in" subtitle="Authenticate to continue to the workspace">
        <EmptyState title="Authentication ready" message="Login form, SSO, and recovery actions will be implemented here." />
      </SectionCard>
    </AppShell>
  );
}
