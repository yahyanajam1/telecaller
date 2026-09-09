import { AppShell, SectionCard, EmptyState, ChipRow } from "@/components/app-shell";

const languages = ["English", "Spanish", "Arabic", "French", "Hindi"];

export default function VoicePage() {
  return (
    <AppShell title="Voice Configuration" subtitle="Voice and language controls" breadcrumb={["Workspace", "Voice"]}>
      <div className="gridTwo">
        <SectionCard title="Voice personas" subtitle="Tone, pacing, and persona selection">
          <EmptyState title="Voice profiles ready" message="Switch between premium, friendly, or formal voice settings here." />
        </SectionCard>
        <SectionCard title="Supported languages" subtitle="Global voice support">
          <ChipRow items={languages} />
        </SectionCard>
      </div>
      <SectionCard title="Voice policy" subtitle="Guardrails, escalation, and disclosure logic">
        <EmptyState title="Policy controls ready" message="Configure how agents respond, escalate, and disclose critical information." />
      </SectionCard>
    </AppShell>
  );
}
