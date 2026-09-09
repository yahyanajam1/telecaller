"use client";

import { useMemo, useState } from "react";
import { Activity, AlertTriangle, ArrowUpRight, BarChart3, Brain, CalendarClock, Clock3, CreditCard, MessageSquareText, Mic, PhoneCall, Sparkles, TrendingUp, Users, Waves } from "lucide-react";
import { AppShell, SectionCard } from "@/components/app-shell";
import styles from "./page.module.css";

const statCards = [
  { label: "Total Calls", value: "2,184", trend: "+12%", tone: "primary" },
  { label: "Calls Today", value: "184", trend: "+18%", tone: "success" },
  { label: "Average Duration", value: "4m 18s", trend: "-6%", tone: "neutral" },
  { label: "Answered Calls", value: "91%", trend: "+4%", tone: "success" },
  { label: "Missed Calls", value: "29", trend: "-8%", tone: "warning" },
  { label: "Qualified Leads", value: "73", trend: "+11%", tone: "primary" },
  { label: "Conversion Rate", value: "18.6%", trend: "+2.4%", tone: "success" },
  { label: "Meetings Booked", value: "42", trend: "+24%", tone: "primary" },
];

const pipelineItems = [
  { name: "Harbor Loft", stage: "Negotiation", value: "$184K" },
  { name: "Cedar Residences", stage: "Proposal", value: "$96K" },
  { name: "Northline Tower", stage: "Follow-up", value: "$42K" },
];

const activityFeed = [
  { title: "Maya confirmed a tour", time: "2 min ago", tone: "success" },
  { title: "Unknown question escalated", time: "11 min ago", tone: "warning" },
  { title: "Agent Sofia completed 12 calls", time: "24 min ago", tone: "primary" },
];

const alerts = [
  { title: "Call drop rate spike", detail: "3.8% over baseline", tone: "warning" },
  { title: "Credit balance low", detail: "1,240 remaining", tone: "danger" },
  { title: "Voice prompt needs review", detail: "2 flagged intents", tone: "primary" },
];

const recs = [
  { title: "Deploy a follow-up prompt", detail: "Improve lead capture by 7%", tone: "success" },
  { title: "Shift staffing to evening", detail: "Peak volume from 6–8 PM", tone: "primary" },
  { title: "Reinforce objection handling", detail: "Higher miss rate on financing", tone: "warning" },
];

const heatmapDays = [
  { day: "Mon", value: 72 },
  { day: "Tue", value: 84 },
  { day: "Wed", value: 91 },
  { day: "Thu", value: 76 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 81 },
];

const topProjects = [
  { name: "Harbor Loft", value: "28 calls", change: "+14%" },
  { name: "Cedar Residences", value: "21 calls", change: "+9%" },
  { name: "Northline Tower", value: "17 calls", change: "+6%" },
];

const topAgents = [
  { name: "Sofia Chen", value: "93% answer rate", change: "+12%" },
  { name: "Darius Patel", value: "88% success", change: "+8%" },
  { name: "Mina Alvarez", value: "91% confidence", change: "+5%" },
];

export default function DashboardPage() {
  const [range, setRange] = useState("30d");
  const [activeMetric, setActiveMetric] = useState("Calls Today");

  const selectedMetric = useMemo(() => statCards.find((card) => card.label === activeMetric) ?? statCards[0], [activeMetric]);

  return (
    <AppShell title="Executive Dashboard" subtitle="Leadership view" breadcrumb={["Workspace", "Dashboard"]}>
      <div className={styles.toolbar}>
        <div className={styles.rangeSwitch}>
          {(["7d", "30d", "90d"]).map((item) => (
            <button key={item} className={`${styles.rangeButton} ${range === item ? styles.rangeButtonActive : ""}`} onClick={() => setRange(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className={styles.summaryChip}><Sparkles size={14} /> Live AI orchestration • 24/7</div>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((card) => (
          <button key={card.label} className={`${styles.statCard} ${activeMetric === card.label ? styles.statCardActive : ""}`} onClick={() => setActiveMetric(card.label)}>
            <span className={styles.statLabel}>{card.label}</span>
            <span className={styles.statValue}>{card.value}</span>
            <span className={styles.statTrend}><ArrowUpRight size={14} /> {card.trend}</span>
          </button>
        ))}
      </div>

      <div className={styles.mainGrid}>
        <SectionCard title="Performance overview" subtitle="Interactive snapshot for the current focus">
          <div className={styles.chartCard}>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}><span className={styles.legendDot} /> Calls</span>
              <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.legendDotSecondary}`} /> Qualified leads</span>
            </div>
            <div style={{ display: "grid", gap: "10px" }}>
              {[68, 82, 74, 90, 86, 94, 78].map((value, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "var(--color-text-muted)", minWidth: "48px" }}>{["M", "T", "W", "T", "F", "S", "S"][index]}</span>
                  <div style={{ flex: 1, height: "10px", borderRadius: "999px", background: "var(--color-surface-raised)", overflow: "hidden" }}>
                    <div style={{ width: `${value}%`, height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, var(--color-primary), var(--color-primary-strong))" }} />
                  </div>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className={styles.metricStack}>
              <div className={styles.metricRow}><span className={styles.metricTitle}><BarChart3 size={14} /> Focus metric</span><span className={styles.metricValue}>{selectedMetric.label}</span></div>
              <div className={styles.metricRow}><span className={styles.metricTitle}><TrendingUp size={14} /> Current value</span><span className={styles.metricValue}>{selectedMetric.value}</span></div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Executive KPIs" subtitle="Operational health at a glance">
          <div className={styles.metricStack}>
            <div className={styles.metricRow}><span className={styles.metricTitle}><PhoneCall size={14} /> Revenue pipeline</span><span className={styles.metricValue}>$322K</span></div>
            <div className={styles.metricRow}><span className={styles.metricTitle}><Brain size={14} /> AI Confidence</span><span className={styles.metricValue}>94.2%</span></div>
            <div className={styles.metricRow}><span className={styles.metricTitle}><Activity size={14} /> Call success rate</span><span className={styles.metricValue}>87.4%</span></div>
            <div className={styles.metricRow}><span className={styles.metricTitle}><MessageSquareText size={14} /> Sentiment analysis</span><span className={styles.metricValue}>Positive 76%</span></div>
            <div className={styles.metricRow}><span className={styles.metricTitle}><Mic size={14} /> Voice usage</span><span className={styles.metricValue}>82 hrs</span></div>
            <div className={styles.metricRow}><span className={styles.metricTitle}><CreditCard size={14} /> Monthly cost</span><span className={styles.metricValue}>$6,320</span></div>
            <div className={styles.metricRow}><span className={styles.metricTitle}><Waves size={14} /> Credits remaining</span><span className={styles.metricValue}>1,240</span></div>
          </div>
        </SectionCard>
      </div>

      <div className={styles.mainGrid}>
        <SectionCard title="Activity heatmap" subtitle="Interactive engagement intensity">
          <div className={styles.heatmap}>
            {heatmapDays.map((item) => (
              <button key={item.day} className={`${styles.heatCell} ${item.value > 85 ? styles.heatCellActive : ""}`}>
                <div style={{ fontSize: "0.74rem", color: "var(--color-text-muted)" }}>{item.day}</div>
                <div style={{ fontWeight: 700 }}>{item.value}</div>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent activity" subtitle="Latest actions across the org">
          <div className={styles.activityList}>
            {activityFeed.map((item) => (
              <div key={item.title} className={styles.activityItem}>
                <div className={styles.activityMeta}>
                  <strong>{item.title}</strong>
                  <span style={{ color: "var(--color-text-secondary)", fontSize: "0.84rem" }}>{item.time}</span>
                </div>
                <span className={`${styles.badgePill} ${item.tone === "warning" ? styles.badgePillWarning : item.tone === "success" ? styles.badgePillSuccess : ""}`}>{item.tone === "warning" ? "Needs review" : item.tone === "success" ? "Healthy" : "Live"}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className={styles.mainGrid}>
        <SectionCard title="Top projects" subtitle="Most active property campaigns">
          <div className={styles.projectList}>
            {topProjects.map((project) => (
              <div key={project.name} className={styles.projectItem}>
                <div className={styles.projectMeta}><strong>{project.name}</strong><span style={{ color: "var(--color-text-secondary)", fontSize: "0.84rem" }}>{project.value}</span></div>
                <span className={styles.badgePill}>{project.change}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Top agents" subtitle="Best performance this week">
          <div className={styles.agentList}>
            {topAgents.map((agent) => (
              <div key={agent.name} className={styles.agentItem}>
                <div className={styles.agentMeta}><strong>{agent.name}</strong><span style={{ color: "var(--color-text-secondary)", fontSize: "0.84rem" }}>{agent.value}</span></div>
                <span className={styles.badgePillSuccess}>{agent.change}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className={styles.mainGrid}>
        <SectionCard title="Alerts" subtitle="Actionable issues and watchpoints">
          <div className={styles.alertList}>
            {alerts.map((alert) => (
              <div key={alert.title} className={styles.alertItem}>
                <div className={styles.activityMeta}><strong>{alert.title}</strong><span style={{ color: "var(--color-text-secondary)", fontSize: "0.84rem" }}>{alert.detail}</span></div>
                <span className={`${styles.badgePill} ${alert.tone === "warning" ? styles.badgePillWarning : alert.tone === "danger" ? styles.badgePillDanger : ""}`}>{alert.tone === "warning" ? "Watch" : alert.tone === "danger" ? "Urgent" : "Review"}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recommendations" subtitle="Suggested improvements for the team">
          <div className={styles.recList}>
            {recs.map((rec) => (
              <div key={rec.title} className={styles.recItem}>
                <div className={styles.activityMeta}><strong>{rec.title}</strong><span style={{ color: "var(--color-text-secondary)", fontSize: "0.84rem" }}>{rec.detail}</span></div>
                <span className={`${styles.badgePill} ${rec.tone === "warning" ? styles.badgePillWarning : rec.tone === "success" ? styles.badgePillSuccess : ""}`}>{rec.tone === "warning" ? "Improve" : rec.tone === "success" ? "Great" : "Act"}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
