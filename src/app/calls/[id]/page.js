import { AppShell, SectionCard, EmptyState } from "@/components/app-shell";

export default function CallDetailsPage() {
  return (
    <AppShell title="Call Details" subtitle="Conversation review" breadcrumb={["Workspace", "Calls", "Details"]}>
      <div className="gridTwo">
        <SectionCard title="Call context" subtitle="Customer details and outcome">
          <EmptyState title="Call record ready" message="This page will show caller profile, timeline, and outcome details." />
        </SectionCard>
        <SectionCard title="Timeline" subtitle="Live actions and AI steps">
          <EmptyState title="Timeline ready" message="A chronological map of agent and user interactions will appear here." />
        </SectionCard>
      </div>
      <SectionCard title="Recording & transcript" subtitle="Media and text review">
        <EmptyState title="Playback available" message="Recording, transcript, and summaries will be surfaced in this area." />
      </SectionCard>
    </AppShell>
  );
}
