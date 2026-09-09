import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";

export default function ForgotPasswordPage() {
  return (
    <AppShell title="Forgot Password" subtitle="Account recovery" breadcrumb={["Auth", "Forgot Password"]}>
      <SectionCard title="Recover access" subtitle="Reset your password securely">
        <EmptyState title="Recovery flow ready" message="Email verification and password reset steps will be implemented here." />
      </SectionCard>
    </AppShell>
  );
}
