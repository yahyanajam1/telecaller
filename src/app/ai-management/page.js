"use client";

import { useMemo, useState } from "react";
import {
  Brain,
  Bot,
  CheckCircle2,
  Clock3,
  Copy,
  Eye,
  Mic,
  MessageCircleMore,
  PanelRightClose,
  Play,
  Sparkles,
  Volume2,
  Wand2,
} from "lucide-react";
import { AppShell, SectionCard } from "@/components/app-shell";
import styles from "./page.module.css";

const agents = [
  { id: 1, name: "Harbor Leasing Agent", voice: "Aria", language: "English", model: "GPT-4.1", confidence: "95%" },
  { id: 2, name: "Cedar Concierge", voice: "Milo", language: "English", model: "GPT-4o", confidence: "92%" },
  { id: 3, name: "Northline Follow-up", voice: "Lina", language: "Spanish", model: "GPT-4.1", confidence: "90%" },
];

const rules = ["Keep answers concise", "Ask for appointment only when qualified", "Use property facts from knowledge", "Never reveal pricing prematurely"];
const knowledgeSources = ["Property database", "Pricing sheets", "FAQ docs", "Call transcripts"];
const versions = [
  { label: "v3.4", note: "Improved fallback handling", active: true },
  { label: "v3.3", note: "Added Spanish phrasing", active: false },
  { label: "v3.2", note: "Stronger objection handling", active: false },
];
const history = [
  { topic: "Tour request", outcome: "Booked", confidence: "97%", time: "2 min ago" },
  { topic: "Pricing question", outcome: "Answered", confidence: "94%", time: "11 min ago" },
  { topic: "Unknown property", outcome: "Transferred", confidence: "88%", time: "24 min ago" },
];

export default function AiManagementPage() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [activeTab, setActiveTab] = useState("Build");
  const [temperature, setTemperature] = useState(0.7);
  const [responseLength, setResponseLength] = useState(180);
  const [voiceSpeed, setVoiceSpeed] = useState(1.1);

  const agentSummary = useMemo(() => selectedAgent, [selectedAgent]);

  return (
    <AppShell title="AI Management" subtitle="Agent administration" breadcrumb={["Workspace", "AI Management"]}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button className="btn btn-primary"><Bot size={16} /> Create agent</button>
          <button className="btn btn-secondary"><Copy size={16} /> Clone</button>
          <button className="btn btn-ghost"><Sparkles size={16} /> Publish</button>
        </div>
        <div className={styles.badgeRow}>
          <span className="badge success">Live</span>
          <span className="badge">3 active agents</span>
        </div>
      </div>

      <div className={styles.heroCard}>
        <div>
          <p className="kicker">Operational control center</p>
          <h2>Design, tune, and test voice agents without leaving the workspace.</h2>
          <p>Create new personalities, wire up knowledge, and improve outcomes with instant feedback.</p>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}><strong>95%</strong><span>Average confidence</span></div>
          <div className={styles.heroStat}><strong>87%</strong><span>Success rate</span></div>
        </div>
      </div>

      <div className={styles.tabs}>
        {(["Build", "Test", "History"]).map((tab) => (
          <button key={tab} className={`${styles.tabButton} ${activeTab === tab ? styles.tabButtonActive : ""}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.gridTwo}>
        <SectionCard title="Agent library" subtitle="Select or create an AI agent">
          <div className={styles.agentList}>
            {agents.map((agent) => (
              <button key={agent.id} className={`${styles.agentItem} ${selectedAgent.id === agent.id ? styles.agentItemActive : ""}`} onClick={() => setSelectedAgent(agent)}>
                <div>
                  <strong>{agent.name}</strong>
                  <p>{agent.voice} • {agent.language}</p>
                </div>
                <span className="badge">{agent.confidence}</span>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Agent overview" subtitle="Current behavior profile">
          <div className={styles.overviewCard}>
            <div className={styles.overviewHeader}>
              <div>
                <strong>{agentSummary.name}</strong>
                <p>Assigned to {agentSummary.language} • {agentSummary.model}</p>
              </div>
              <span className="badge success">{agentSummary.confidence}</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}><Mic size={14} /> Voice</span>
              <span className={styles.metricValue}>{agentSummary.voice}</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}><Brain size={14} /> Model</span>
              <span className={styles.metricValue}>{agentSummary.model}</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}><Clock3 size={14} /> Response cadence</span>
              <span className={styles.metricValue}>Instant</span>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className={styles.gridTwo}>
        <SectionCard title="Core configuration" subtitle="Voice, language, prompt, personality">
          <div className={styles.formGrid}>
            <label className="form-group">
              <span className="label">Agent name</span>
              <input className="input" defaultValue={agentSummary.name} />
            </label>
            <label className="form-group">
              <span className="label">Voice</span>
              <select className="select" defaultValue={agentSummary.voice}>
                <option>Aria</option>
                <option>Milo</option>
                <option>Lina</option>
              </select>
            </label>
            <label className="form-group">
              <span className="label">Language</span>
              <select className="select" defaultValue={agentSummary.language}>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </label>
            <label className="form-group">
              <span className="label">Model selection</span>
              <select className="select" defaultValue={agentSummary.model}>
                <option>GPT-4.1</option>
                <option>GPT-4o</option>
                <option>Claude 3.5</option>
              </select>
            </label>
            <label className="form-group" style={{ gridColumn: "1 / -1" }}>
              <span className="label">Prompt</span>
              <textarea className="textarea" rows={4} defaultValue="You are a polished real-estate leasing assistant. Guide callers with warmth, ask one question at a time, and book tours when the lead is qualified." />
            </label>
            <label className="form-group" style={{ gridColumn: "1 / -1" }}>
              <span className="label">Personality</span>
              <textarea className="textarea" rows={3} defaultValue="Warm, articulate, calm, and slightly premium. Avoid robotic phrasing and keep the tone reassuring." />
            </label>
          </div>
        </SectionCard>

        <SectionCard title="Behavior tuning" subtitle="Conversation rules and response controls">
          <div className={styles.ruleList}>
            {rules.map((rule) => (
              <label key={rule} className={styles.ruleItem}><input className="checkbox" type="checkbox" defaultChecked={rule.includes("Ask") || rule.includes("Use") ? true : false} />{rule}</label>
            ))}
          </div>
          <div className={styles.formGrid}>
            <label className="form-group">
              <span className="label">Greeting</span>
              <input className="input" defaultValue="Hello, this is Harbor Leasing. How can I help you today?" />
            </label>
            <label className="form-group">
              <span className="label">Fallback rules</span>
              <input className="input" defaultValue="Offer to transfer to a human agent" />
            </label>
            <label className="form-group">
              <span className="label">Business hours</span>
              <input className="input" defaultValue="Mon–Fri 8am–8pm" />
            </label>
            <label className="form-group">
              <span className="label">Transfer rules</span>
              <input className="input" defaultValue="After 2 unsuccessful attempts" />
            </label>
            <label className="form-group">
              <span className="label">Temperature</span>
              <input type="range" min="0" max="1" step="0.1" value={temperature} onChange={(event) => setTemperature(Number(event.target.value))} />
              <span className={styles.metricValue}>{temperature.toFixed(1)}</span>
            </label>
            <label className="form-group">
              <span className="label">Response length</span>
              <input type="range" min="60" max="320" step="20" value={responseLength} onChange={(event) => setResponseLength(Number(event.target.value))} />
              <span className={styles.metricValue}>{responseLength} chars</span>
            </label>
            <label className="form-group">
              <span className="label">Voice speed</span>
              <input type="range" min="0.7" max="1.6" step="0.1" value={voiceSpeed} onChange={(event) => setVoiceSpeed(Number(event.target.value))} />
              <span className={styles.metricValue}>{voiceSpeed.toFixed(1)}x</span>
            </label>
            <label className="form-group">
              <span className="label">Speaking style</span>
              <select className="select" defaultValue="Confident">
                <option>Confident</option>
                <option>Calm</option>
                <option>Friendly</option>
              </select>
            </label>
          </div>
        </SectionCard>
      </div>

      <div className={styles.gridTwo}>
        <SectionCard title="Knowledge sources" subtitle="Connected context for smarter answers">
          <div className={styles.sourceList}>
            {knowledgeSources.map((source) => (
              <div key={source} className={styles.sourceItem}><span>{source}</span><span className="badge success">Connected</span></div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Prompt versioning" subtitle="Roll back or promote revisions">
          <div className={styles.versionList}>
            {versions.map((version) => (
              <div key={version.label} className={styles.versionItem}>
                <div>
                  <strong>{version.label}</strong>
                  <p>{version.note}</p>
                </div>
                <span className={`badge ${version.active ? "success" : ""}`}>{version.active ? "Active" : "Draft"}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className={styles.gridTwo}>
        <SectionCard title="Testing playground" subtitle="Preview the conversation flow">
          <div className={styles.playgroundCard}>
            <div className={styles.playgroundBubble}><strong>Caller</strong><p>Hi, I’m interested in a two-bedroom property.</p></div>
            <div className={styles.playgroundBubbleActive}><strong>Agent</strong><p>Absolutely — I can help with available units and schedule a tour.</p></div>
            <div className={styles.playgroundFooter}>
              <button className="btn btn-primary"><Play size={14} /> Run test</button>
              <div className={styles.scorePill}><Eye size={14} /> AI confidence 95%</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Conversation history" subtitle="Recent outcomes and confidence">
          <div className={styles.historyList}>
            {history.map((entry) => (
              <div key={entry.topic} className={styles.historyItem}>
                <div>
                  <strong>{entry.topic}</strong>
                  <p>{entry.time}</p>
                </div>
                <div className={styles.historyMeta}>
                  <span className="badge success">{entry.outcome}</span>
                  <span className={styles.scorePill}>{entry.confidence}</span>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
