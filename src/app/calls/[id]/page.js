"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AppShell, SectionCard } from "@/components/app-shell";

const calls = {
  "inbound-lead": { campaign: "Inbound Lead", project: "Northline Tower", status: "Live", outcome: "Qualified", caller: "Maya Chen", duration: "04:18" },
  "outbound-follow-up": { campaign: "Outbound Follow-up", project: "Cedar Residences", status: "Queued", outcome: "Pending", caller: "Jordan Alvarez", duration: "--" },
  "spanish-inquiry": { campaign: "Spanish Inquiry", project: "Harbor Loft", status: "Completed", outcome: "Booked", caller: "Elena Brooks", duration: "06:42" },
};

export default function CallDetailsPage() {
  const { id } = useParams();
  const call = calls[id] ?? calls["inbound-lead"];
  const isQueued = call.status === "Queued";

  return (
    <AppShell title={call.campaign} subtitle="Conversation review" breadcrumb={["Workspace", "Calls", "Details"]}>
      <p className="callSampleNotice">Sample call record · status shown for workflow reference only. No live call or audio recording is connected.</p>
      <div className="gridTwo">
        <SectionCard title="Call context" subtitle="Customer details and outcome">
          <div className="detailFacts">
            <p><span>Caller</span><strong>{call.caller}</strong></p>
            <p><span>Project</span><strong>{call.project}</strong></p>
            <p><span>Status</span><strong>{call.status}</strong></p>
            <p><span>Outcome</span><strong>{call.outcome}</strong></p>
            <p><span>Duration</span><strong>{call.duration}</strong></p>
          </div>
        </SectionCard>
        <SectionCard title="Timeline" subtitle="Live actions and AI steps">
          <ol className="detailTimeline">
            {isQueued ? <>
              <li><strong>Call prepared</strong><span>{call.campaign} is waiting in the sample queue.</span></li>
              <li><strong>Provider connection required</strong><span>No phone number will be dialed from this demo workspace.</span></li>
              <li><strong>Next step</strong><span>Connect a telephony provider to enable calling.</span></li>
            </> : <>
              <li><strong>{call.status === "Live" ? "Example call connected" : "Example call completed"}</strong><span>AI agent greeted {call.caller}</span></li>
              <li><strong>Needs identified</strong><span>Discussed availability and preferred move-in timing</span></li>
              <li><strong>Next step</strong><span>{call.outcome === "Booked" ? "Property tour scheduled" : "Follow-up assigned to leasing team"}</span></li>
            </>}
          </ol>
        </SectionCard>
      </div>
      <SectionCard title="Transcript preview" subtitle="Sample text only · no recording attached">
        <blockquote className="transcriptQuote">“I&apos;m interested in learning more about the available homes and would like to arrange a visit.”</blockquote>
        <div className="sectionLinkRow"><Link className="btn btn-secondary" href="/leads/lina-patel">Open lead profile</Link><Link className="btn btn-ghost" href="/calls">Back to call queue</Link></div>
      </SectionCard>
    </AppShell>
  );
}
