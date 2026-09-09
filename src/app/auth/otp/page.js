import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";

export default function OtpPage() {
  return (
    <AppShell title="OTP Verification" subtitle="Two-step verification" breadcrumb={["Auth", "OTP"]}>
      <SectionCard title="Enter verification code" subtitle="Secure confirmation flow">
        <EmptyState title="OTP step ready" message="The verification experience will live here with resend and recovery actions." />
      </SectionCard>
    </AppShell>
  );
}
