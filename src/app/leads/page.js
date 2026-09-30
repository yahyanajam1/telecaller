"use client";

import { useState } from "react";
import { AppShell, SectionCard, StatGrid } from "@/components/app-shell";
import { RecordTable } from "@/components/record-table";

const initialLeads = [
  { id: "lina-patel", name: "Lina Patel", project: "Aurelia Tower", intent: "Ready to tour", score: "95", stage: "New", channel: "Voice" },
  { id: "noah-kim", name: "Noah Kim", project: "Sage Villas", intent: "Pricing request", score: "74", stage: "Follow-up", channel: "WhatsApp" },
  { id: "alicia-gomez", name: "Alicia Gomez", project: "Cedar Residences", intent: "High intent", score: "91", stage: "New", channel: "Inbound" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState(initialLeads);
  const qualifiedCount = leads.filter((lead) => Number(lead.score) >= 85).length;

  return (
    <AppShell title="Lead Management" subtitle="CRM and qualification" breadcrumb={["Workspace", "Leads"]}>
      <StatGrid items={[
        { value: leads.length, label: "Active leads", change: "Across all channels" },
        { value: qualifiedCount, label: "Qualified", change: "Score 85 or higher" },
        { value: leads.filter((lead) => lead.stage === "Follow-up").length, label: "Needs follow-up", change: "Next action due" },
        { value: "18.6%", label: "Conversion", change: "+2.4% this month" },
      ]} />
      <SectionCard title="Lead pipeline" subtitle="Open a profile or mark a lead for follow-up">
        <RecordTable
          records={leads}
          statusKey="stage"
          columns={[{ key: "name", label: "Lead" }, { key: "project", label: "Project" }, { key: "intent", label: "Intent" }, { key: "score", label: "Score" }, { key: "stage", label: "Stage" }, { key: "channel", label: "Channel" }]}
          detailHref={(lead) => `/leads/${lead.id}`}
          searchPlaceholder="Search leads or projects"
          actionLabel={(lead) => lead.stage === "Contacted" ? null : "Mark contacted"}
          onAction={(selected) => setLeads((current) => current.map((lead) => lead.id === selected.id ? { ...lead, stage: "Contacted" } : lead))}
        />
      </SectionCard>
    </AppShell>
  );
}
