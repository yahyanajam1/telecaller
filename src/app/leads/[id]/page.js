"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { AppShell, SectionCard, StatGrid } from "@/components/app-shell";

const leads = {
  "lina-patel": { name: "Lina Patel", project: "Aurelia Tower", intent: "Ready to tour", score: "95", channel: "Voice", phone: "+1 (415) 555-0138" },
  "noah-kim": { name: "Noah Kim", project: "Sage Villas", intent: "Pricing request", score: "74", channel: "WhatsApp", phone: "+1 (415) 555-0172" },
  "alicia-gomez": { name: "Alicia Gomez", project: "Cedar Residences", intent: "High intent", score: "91", channel: "Inbound", phone: "+1 (415) 555-0194" },
};

export default function LeadDetailsPage() {
  const { id } = useParams();
  const lead = leads[id] ?? leads["lina-patel"];
  const [contacted, setContacted] = useState(false);

  return (
    <AppShell title={lead.name} subtitle="Lead profile" breadcrumb={["Workspace", "Leads", lead.name]}>
      <StatGrid items={[
        { value: lead.score, label: "Qualification score", change: "High intent" },
        { value: lead.project, label: "Interested in", change: "Project match" },
        { value: lead.channel, label: "First touch", change: "Acquisition channel" },
        { value: contacted ? "Contacted" : "Open", label: "Follow-up status", change: contacted ? "Updated just now" : "Action due" },
      ]} />
      <div className="gridTwo">
        <SectionCard title="Lead profile" subtitle="Contact and intent details">
          <div className="detailFacts">
            <p><span>Phone</span><strong>{lead.phone}</strong></p>
            <p><span>Project</span><strong>{lead.project}</strong></p>
            <p><span>Intent</span><strong>{lead.intent}</strong></p>
            <p><span>Source</span><strong>{lead.channel}</strong></p>
          </div>
          <div className="sectionLinkRow">
            <button className="btn btn-primary" onClick={() => setContacted(true)} disabled={contacted}>{contacted ? "Contacted" : "Mark contacted"}</button>
            <Link className="btn btn-secondary" href="/appointments">Schedule tour</Link>
          </div>
        </SectionCard>
        <SectionCard title="Activity timeline" subtitle="Call, message, and CRM events">
          <ol className="detailTimeline">
            <li><strong>New inquiry received</strong><span>{lead.channel} · Today, 09:42</span></li>
            <li><strong>Interest qualified</strong><span>{lead.intent} · AI confidence {lead.score}%</span></li>
            <li><strong>Next step recommended</strong><span>Personal follow-up from the leasing team</span></li>
          </ol>
        </SectionCard>
      </div>
    </AppShell>
  );
}
