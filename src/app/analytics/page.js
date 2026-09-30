"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell, SectionCard, StatGrid } from "@/components/app-shell";
import styles from "./page.module.css";

const stats = [
  { value: "12.4%", label: "Conversion rate", change: "+1.2%" },
  { value: "94%", label: "Call completion", change: "+4%" },
  { value: "4.8/5", label: "Customer satisfaction", change: "+0.3" },
  { value: "41%", label: "Tour conversion", change: "+6%" },
];

const channelData = {
  "7d": [
    { channel: "Inbound voice", calls: 84, conversion: 42 },
    { channel: "Outbound voice", calls: 67, conversion: 31 },
    { channel: "WhatsApp", calls: 51, conversion: 26 },
  ],
  "30d": [
    { channel: "Inbound voice", calls: 92, conversion: 48 },
    { channel: "Outbound voice", calls: 76, conversion: 34 },
    { channel: "WhatsApp", calls: 61, conversion: 29 },
  ],
  "90d": [
    { channel: "Inbound voice", calls: 87, conversion: 44 },
    { channel: "Outbound voice", calls: 81, conversion: 38 },
    { channel: "WhatsApp", calls: 69, conversion: 32 },
  ],
};

export default function AnalyticsPage() {
  const [range, setRange] = useState("30d");
  const [activeChannel, setActiveChannel] = useState("Inbound voice");
  const downloadReport = () => {
    const rows = ["Channel,Call completion,Conversion", ...channelData[range].map((item) => `${item.channel},${item.calls}%,${item.conversion}%`)];
    const file = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aurelia-analytics-${range}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell title="Analytics" subtitle="Performance insights" breadcrumb={["Workspace", "Analytics"]}>
      <StatGrid items={stats} />
      <div className="gridTwo">
        <SectionCard title="Channel performance" subtitle="Compare completion across acquisition channels">
          <div className={styles.reportToolbar}>
            <div className={styles.rangeSwitch} role="group" aria-label="Reporting period">
              {["7d", "30d", "90d"].map((item) => <button key={item} className={`${styles.rangeButton} ${range === item ? styles.rangeButtonActive : ""}`} aria-pressed={range === item} onClick={() => setRange(item)}>{item}</button>)}
            </div>
            <button className="btn btn-secondary" onClick={downloadReport}>Export report</button>
          </div>
          <div className={styles.channelList}>
            {channelData[range].map((item) => (
              <button key={item.channel} className={`${styles.channelRow} ${activeChannel === item.channel ? styles.channelRowActive : ""}`} onClick={() => setActiveChannel(item.channel)} aria-pressed={activeChannel === item.channel}>
                <span className={styles.channelLabel}>{item.channel}</span>
                <span className={styles.channelTrack}><span style={{ width: `${item.calls}%` }} /></span>
                <strong>{item.calls}%</strong>
              </button>
            ))}
          </div>
          <p className={styles.channelSummary}>{activeChannel} leads with {channelData[range].find((item) => item.channel === activeChannel)?.conversion}% lead conversion in the selected period.</p>
        </SectionCard>
        <SectionCard title="Executive summary" subtitle="Most important business signals">
          <div className={styles.summaryList}>
            <p><strong>Lead quality is improving.</strong><span>Qualified lead volume is up 11% over the prior period.</span></p>
            <p><strong>Voice remains the strongest channel.</strong><span>Inbound voice converts 14 points above the workspace average.</span></p>
            <p><strong>Follow-up is the clearest opportunity.</strong><span>Evening coverage is recommended during the 6–8 PM peak.</span></p>
          </div>
          <div className={styles.quickLinks}>
            <Link href="/calls">Review calls</Link>
            <Link href="/leads">Open lead pipeline</Link>
            <Link href="/appointments">View appointments</Link>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
