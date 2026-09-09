"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Globe2,
  KeyRound,
  LayoutGrid,
  Menu,
  Mic,
  PhoneCall,
  PlayCircle,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
  Warehouse,
} from "lucide-react";
import { useState } from "react";
import styles from "./page.module.css";

const navigation = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "calls", label: "Voice Calls", icon: PhoneCall },
  { id: "conversations", label: "Conversations", icon: Mic },
  { id: "leads", label: "Leads & CRM", icon: Users },
  { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
  { id: "prompts", label: "Prompt Studio", icon: Wand2 },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const overviewCards = [
  { label: "Live calls today", value: "184", change: "+18% vs yesterday" },
  { label: "Qualified leads", value: "73", change: "+11% this week" },
  { label: "Tour bookings", value: "29", change: "+24% from campaigns" },
  { label: "Avg. response time", value: "8.2s", change: "Under SLA" },
];

const activeCalls = [
  { name: "Maya Chen", property: "Harbor Loft", status: "Qualification", score: 93 },
  { name: "Jordan Alvarez", property: "Cedar Residences", status: "Tour booking", score: 88 },
  { name: "Elena Brooks", property: "Northline Tower", status: "Follow-up", score: 79 },
];

const conversationItems = [
  { title: "Spanish inbound inquiry", time: "2 min ago", outcome: "Qualified + tour scheduled" },
  { title: "Project FAQ handoff", time: "14 min ago", outcome: "Escalated to leasing rep" },
  { title: "New luxury listing follow-up", time: "41 min ago", outcome: "WhatsApp sent" },
];

const leadRows = [
  { name: "Lina Patel", project: "Aurelia Tower", intent: "Ready to tour", score: 95, channel: "Voice" },
  { name: "Noah Kim", project: "Sage Villas", intent: "Needs pricing", score: 74, channel: "WhatsApp" },
  { name: "Alicia Gomez", project: "Cedar Residences", intent: "High intent", score: 91, channel: "Inbound" },
];

const knowledgeItems = [
  { title: "Amenity package guide", owner: "Marketing", updated: "2h ago" },
  { title: "Lease eligibility rules", owner: "Operations", updated: "Today" },
  { title: "Neighborhood walkthrough", owner: "Sales", updated: "Yesterday" },
];

const promptTemplates = [
  { name: "Luxury leasing intro", tone: "Warm", usage: "142 runs" },
  { name: "Objection handling", tone: "Confident", usage: "89 runs" },
  { name: "Tour booking flow", tone: "Direct", usage: "216 runs" },
];

const analyticsBars = [
  { label: "Call completion", value: 92 },
  { label: "Lead quality", value: 87 },
  { label: "Tour conversion", value: 41 },
  { label: "Follow-up success", value: 78 },
];

const billingPlans = [
  { name: "Growth", price: "$349", detail: "For teams scaling across 3 projects" },
  { name: "Enterprise", price: "$899", detail: "Multi-agent orchestration + SLA" },
];

const integrations = [
  { name: "Salesforce CRM", status: "Connected" },
  { name: "HubSpot", status: "Connected" },
  { name: "WhatsApp Business", status: "Syncing" },
  { name: "Zapier", status: "Configured" },
];

const languages = ["English", "Spanish", "Arabic", "French", "Hindi"];

function BookOpen(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H18a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 0 4 18.5Z" />
      <path d="M8 7h8" />
      <path d="M8 11h5" />
    </svg>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case "calls":
        return (
          <div className={styles.stack}>
            <section className={styles.panelIntro}>
              <div>
                <p className={styles.kicker}>Voice operations</p>
                <h2>Run outbound and inbound campaigns with full control.</h2>
              </div>
              <button className={styles.primaryButton}>Create campaign</button>
            </section>

            <div className={styles.gridTwo}>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Agent queue</p>
                    <h3>Multi-agent orchestration</h3>
                  </div>
                  <span className={styles.badge}>7 agents online</span>
                </div>
                <div className={styles.listBlock}>
                  {activeCalls.map((call) => (
                    <div key={call.name} className={styles.listRow}>
                      <div>
                        <strong>{call.name}</strong>
                        <p>{call.property}</p>
                      </div>
                      <div className={styles.rowMeta}>
                        <span>{call.status}</span>
                        <strong>{call.score}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Voice configuration</p>
                    <h3>Language, tone, and voice style</h3>
                  </div>
                </div>
                <div className={styles.configGrid}>
                  <div className={styles.metricBox}>English • Premium</div>
                  <div className={styles.metricBox}>Spanish • Conversational</div>
                  <div className={styles.metricBox}>Arabic • Formal</div>
                  <div className={styles.metricBox}>French • Friendly</div>
                </div>
              </section>
            </div>
          </div>
        );
      case "conversations":
        return (
          <div className={styles.stack}>
            <section className={styles.panelIntro}>
              <div>
                <p className={styles.kicker}>Conversation intelligence</p>
                <h2>Review transcripts, recordings, and next-best actions.</h2>
              </div>
              <button className={styles.secondaryButton}>Export archive</button>
            </section>
            <div className={styles.gridTwo}>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Latest calls</p>
                    <h3>Audit trail and summaries</h3>
                  </div>
                </div>
                <div className={styles.listBlock}>
                  {conversationItems.map((item) => (
                    <div key={item.title} className={styles.listRow}>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.time}</p>
                      </div>
                      <span className={styles.badge}>{item.outcome}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Unknown questions</p>
                    <h3>Flag and improve continuously</h3>
                  </div>
                </div>
                <div className={styles.unknownList}>
                  <div>
                    <strong>“Can I bring a pet?”</strong>
                    <p>New question added to knowledge base</p>
                  </div>
                  <div>
                    <strong>“What about parking for guests?”</strong>
                    <p>Awaiting policy answer</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
      case "leads":
        return (
          <div className={styles.stack}>
            <section className={styles.panelIntro}>
              <div>
                <p className={styles.kicker}>CRM + lead scoring</p>
                <h2>Connect every interaction to a revenue signal.</h2>
              </div>
              <button className={styles.primaryButton}>Sync CRM</button>
            </section>
            <section className={styles.panelCard}>
              <div className={styles.cardHeader}>
                <div>
                  <p className={styles.cardLabel}>Pipeline</p>
                  <h3>High-intent leads and next actions</h3>
                </div>
                <div className={styles.toolbar}>Search leads</div>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Lead</th>
                      <th>Project</th>
                      <th>Intent</th>
                      <th>Score</th>
                      <th>Channel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadRows.map((row) => (
                      <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>{row.project}</td>
                        <td>{row.intent}</td>
                        <td>{row.score}</td>
                        <td>{row.channel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        );
      case "knowledge":
        return (
          <div className={styles.stack}>
            <section className={styles.panelIntro}>
              <div>
                <p className={styles.kicker}>Knowledge system</p>
                <h2>Keep project facts, policies, and FAQs always current.</h2>
              </div>
              <button className={styles.primaryButton}>Add article</button>
            </section>
            <div className={styles.gridTwo}>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Knowledge base</p>
                    <h3>Managed sources</h3>
                  </div>
                </div>
                <div className={styles.listBlock}>
                  {knowledgeItems.map((item) => (
                    <div key={item.title} className={styles.listRow}>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.owner}</p>
                      </div>
                      <span className={styles.badge}>{item.updated}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Continuous learning</p>
                    <h3>Auto-suggested updates</h3>
                  </div>
                </div>
                <div className={styles.unknownList}>
                  <div>
                    <strong>New FAQ from 14 unanswered questions</strong>
                    <p>Recommended by the learning engine</p>
                  </div>
                  <div>
                    <strong>Policy refinement</strong>
                    <p>Needs review from operations lead</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
      case "prompts":
        return (
          <div className={styles.stack}>
            <section className={styles.panelIntro}>
              <div>
                <p className={styles.kicker}>Prompt management</p>
                <h2>Shape tone, logic, and brand voice across every project.</h2>
              </div>
              <button className={styles.primaryButton}>Create prompt</button>
            </section>
            <div className={styles.gridTwo}>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Live prompts</p>
                    <h3>Reusable prompt library</h3>
                  </div>
                </div>
                <div className={styles.listBlock}>
                  {promptTemplates.map((template) => (
                    <div key={template.name} className={styles.listRow}>
                      <div>
                        <strong>{template.name}</strong>
                        <p>{template.tone}</p>
                      </div>
                      <span className={styles.badge}>{template.usage}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Guardrails</p>
                    <h3>Compliance and escalation controls</h3>
                  </div>
                </div>
                <div className={styles.unknownList}>
                  <div><strong>Disclosure policy</strong><p>Required before tour booking</p></div>
                  <div><strong>Escalation trigger</strong><p>Route to broker for legal phrasing</p></div>
                </div>
              </section>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className={styles.stack}>
            <section className={styles.panelIntro}>
              <div>
                <p className={styles.kicker}>Performance analytics</p>
                <h2>Monitor every channel with executive-ready insights.</h2>
              </div>
              <button className={styles.secondaryButton}>Share report</button>
            </section>
            <div className={styles.gridTwo}>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Executive summary</p>
                    <h3>KPI snapshot</h3>
                  </div>
                </div>
                <div className={styles.metricRow}>
                  <div className={styles.metricBox}>Conversion 12.4%</div>
                  <div className={styles.metricBox}>Avg. deal velocity 21d</div>
                  <div className={styles.metricBox}>NPS 4.8/5</div>
                </div>
              </section>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Channel performance</p>
                    <h3>Signal strength by motion</h3>
                  </div>
                </div>
                <div className={styles.barChart}>
                  {analyticsBars.map((bar) => (
                    <div key={bar.label} className={styles.barItem}>
                      <div className={styles.barLabelRow}>
                        <span>{bar.label}</span>
                        <strong>{bar.value}%</strong>
                      </div>
                      <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ width: `${bar.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );
      case "billing":
        return (
          <div className={styles.stack}>
            <section className={styles.panelIntro}>
              <div>
                <p className={styles.kicker}>Billing & subscriptions</p>
                <h2>Protect scale with flexible plans and usage controls.</h2>
              </div>
              <button className={styles.primaryButton}>Manage plan</button>
            </section>
            <div className={styles.gridTwo}>
              {billingPlans.map((plan) => (
                <section key={plan.name} className={styles.panelCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <p className={styles.cardLabel}>Plan</p>
                      <h3>{plan.name}</h3>
                    </div>
                    <span className={styles.badge}>{plan.price}/mo</span>
                  </div>
                  <p className={styles.panelText}>{plan.detail}</p>
                  <ul className={styles.listCheck}>
                    <li><CheckCircle2 size={16} /> 8 active projects</li>
                    <li><CheckCircle2 size={16} /> 12 AI agents</li>
                    <li><CheckCircle2 size={16} /> Premium support</li>
                  </ul>
                </section>
              ))}
            </div>
          </div>
        );
      case "settings":
        return (
          <div className={styles.stack}>
            <section className={styles.panelIntro}>
              <div>
                <p className={styles.kicker}>Organization control center</p>
                <h2>Manage teams, API access, and system integrations.</h2>
              </div>
              <button className={styles.primaryButton}>Save changes</button>
            </section>
            <div className={styles.gridTwo}>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Security</p>
                    <h3>Roles, permissions, and API keys</h3>
                  </div>
                </div>
                <div className={styles.unknownList}>
                  <div><strong>Admin</strong><p>Full platform, billing, and audit access</p></div>
                  <div><strong>Broker</strong><p>Project, lead, and workflow visibility</p></div>
                  <div><strong>Ops analyst</strong><p>Reports and conversation analytics only</p></div>
                </div>
                <div className={styles.apiRow}><KeyRound size={16} /> API key • sk_live_...8Xb9</div>
              </section>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Integrations</p>
                    <h3>Connected systems</h3>
                  </div>
                </div>
                <div className={styles.listBlock}>
                  {integrations.map((integration) => (
                    <div key={integration.name} className={styles.listRow}>
                      <strong>{integration.name}</strong>
                      <span className={styles.badge}>{integration.status}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <section className={styles.panelCard}>
              <div className={styles.cardHeader}>
                <div>
                  <p className={styles.cardLabel}>Global configuration</p>
                  <h3>Languages, projects, and voice profiles</h3>
                </div>
              </div>
              <div className={styles.metricRow}>
                {languages.map((language) => (
                  <div key={language} className={styles.metricBox}>{language}</div>
                ))}
              </div>
              <div className={styles.metricRow}>
                <div className={styles.metricBox}>3 active projects</div>
                <div className={styles.metricBox}>2 voice personas</div>
                <div className={styles.metricBox}>24/7 coverage</div>
              </div>
            </section>
          </div>
        );
      default:
        return (
          <div className={styles.stack}>
            <section className={styles.heroPanel}>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}>AI Real Estate Voice Platform</p>
                <h2>Enterprise-grade automation for sales calls, lead qualification, and leasing operations.</h2>
                <p>
                  Orchestrate inbound and outbound calls, support multiple projects and agents, unify CRM data, and ship personalized WhatsApp follow-ups from one premium workspace.
                </p>
                <div className={styles.heroActions}>
                  <button className={styles.primaryButton}>Launch live agent</button>
                  <button className={styles.secondaryButton}>View analytics</button>
                </div>
              </div>
              <div className={styles.heroStats}>
                {overviewCards.map((item) => (
                  <div key={item.label} className={styles.statCard}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                    <small>{item.change}</small>
                  </div>
                ))}
              </div>
            </section>

            <div className={styles.gridTwo}>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Agent activity</p>
                    <h3>Today&apos;s live operations</h3>
                  </div>
                  <span className={styles.badge}>All systems healthy</span>
                </div>
                <div className={styles.listBlock}>
                  {activeCalls.map((call) => (
                    <div key={call.name} className={styles.listRow}>
                      <div>
                        <strong>{call.name}</strong>
                        <p>{call.property}</p>
                      </div>
                      <span className={styles.badge}>{call.status}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section className={styles.panelCard}>
                <div className={styles.cardHeader}>
                  <div>
                    <p className={styles.cardLabel}>Projects</p>
                    <h3>Multi-project deployment</h3>
                  </div>
                </div>
                <div className={styles.projectList}>
                  <div className={styles.projectItem}><Building2 size={16} /> <span>Harbor Loft</span><strong>Active</strong></div>
                  <div className={styles.projectItem}><Warehouse size={16} /> <span>Cedar Residences</span><strong>Active</strong></div>
                  <div className={styles.projectItem}><Globe2 size={16} /> <span>Northline Tower</span><strong>Paused</strong></div>
                </div>
              </section>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.page}>
      <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brandWrap}>
          <div className={styles.brandMark}>A</div>
          <div>
            <strong>Aurelia Voice</strong>
            <p>AI calling platform</p>
          </div>
        </div>

        <button className={styles.primaryButton} style={{ width: "100%", justifyContent: "center" }}>
          <PlayCircle size={16} /> New campaign
        </button>

        <nav className={styles.navList} aria-label="Platform navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`${styles.navItem} ${activeView === item.id ? styles.navItemActive : ""}`}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileNavOpen(false);
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                <ChevronRight size={14} />
              </button>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerPill}>
            <Sparkles size={16} />
            <span>Live 24/7 orchestration</span>
          </div>
          <p>Enterprise-grade AI voice workflows for real estate operators.</p>
        </div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <button className={styles.iconButton} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <Menu size={18} />
          </button>
          <div className={styles.searchBar}>
            <Search size={16} />
            <input placeholder="Search calls, leads, prompts, or projects" />
          </div>
          <div className={styles.topbarActions}>
            <span className={styles.liveBadge}><Activity size={14} />Live</span>
            <button className={styles.secondaryButton}>Invite team</button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.main
            key={activeView}
            className={styles.content}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
