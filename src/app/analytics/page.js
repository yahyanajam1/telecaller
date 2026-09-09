import { AppShell, SectionCard, StatGrid, EmptyState } from "@/components/app-shell";

const stats = [
  { value: "12.4%", label: "Conversion rate", change: "+1.2%" },
  { value: "94%", label: "Call completion", change: "+4%" },
  { value: "4.8/5", label: "Customer satisfaction", change: "+0.3" },
  { value: "41%", label: "Tour conversion", change: "+6%" },
];

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics" subtitle="Performance insights" breadcrumb={["Workspace", "Analytics"]}>
      <StatGrid items={stats} />
      <div className="gridTwo">
        <SectionCard title="Channel performance" subtitle="Performance by acquisition channel">
          <EmptyState title="Charts ready" message="Add reporting datasets to visualize call, lead, and conversion trends." />
        </SectionCard>
        <SectionCard title="Executive summary" subtitle="Most important business signals">
          <EmptyState title="Weekly summary" message="Leads, campaigns, and AI outcomes are grouped here for rapid review." />
        </SectionCard>
      </div>
    </AppShell>
  );
}
