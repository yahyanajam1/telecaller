import {
  Bell,
  BookOpen,
  CalendarDays,
  FileText,
  ImagePlus,
  Mic,
  MoreHorizontal,
  PhoneCall,
  Search,
  Sparkles,
  Upload,
  UserRound,
  Wand2,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import styles from "./page.module.css";

export default function DesignSystemPage() {
  return (
    <AppShell title="Design System" subtitle="Premium enterprise UI kit" breadcrumb={["Workspace", "Design System"]}>
      <section className={`${styles.hero} surface-panel`}>
        <div>
          <p className="kicker">Design language</p>
          <h2>Consistent tokens, thoughtful elevation, and premium interaction patterns.</h2>
          <p>
            This system unifies typography, spacing, surfaces, controls, and feedback states across the platform.
          </p>
        </div>
        <div className={styles.heroChips}>
          <span className="badge">Token-driven</span>
          <span className="badge success">Accessible</span>
          <span className="badge warning">Enterprise-ready</span>
        </div>
      </section>

      <section className={styles.gridTwo}>
        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "14px" }}>
          <h3>Typography scale</h3>
          <h1>Display heading</h1>
          <h2>Section heading</h2>
          <h3>Card heading</h3>
          <p>Body copy uses a calm, editorial rhythm with clear hierarchy and generous spacing.</p>
        </div>

        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "12px" }}>
          <h3>Buttons</h3>
          <div className={styles.buttonRow}>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-danger">Danger</button>
          </div>
        </div>
      </section>

      <section className={styles.gridTwo}>
        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "12px" }}>
          <h3>Inputs & controls</h3>
          <label className="form-group">
            <span className="label">Workspace name</span>
            <input className="input" placeholder="Aurelia Voice" />
          </label>
          <label className="form-group">
            <span className="label">Select project</span>
            <select className="select">
              <option>Harbor Loft</option>
              <option>Cedar Residences</option>
            </select>
          </label>
          <div className={styles.controlRow}>
            <label className={styles.inlineControl}><input className="checkbox" type="checkbox" defaultChecked /> Enable auto follow-up</label>
            <label className={styles.inlineControl}><input className="radio" type="radio" name="mode" defaultChecked /> Voice-first</label>
          </div>
          <label className="form-group">
            <span className="label">Schedule</span>
            <div className="datepicker">
              <input className="input" type="date" defaultValue="2026-08-14" />
            </div>
          </label>
        </div>

        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "12px" }}>
          <h3>Badges, avatars, tabs</h3>
          <div className={styles.inlineRow}>
            <span className="badge">Live</span>
            <span className="badge success">Healthy</span>
            <span className="badge warning">Needs review</span>
            <span className="badge danger">Alert</span>
          </div>
          <div className={styles.inlineRow}>
            <div className="avatar">AM</div>
            <div className="avatar">JS</div>
            <div className="avatar">KT</div>
          </div>
          <div className="tabs">
            <button className="tab active">Overview</button>
            <button className="tab">Calls</button>
            <button className="tab">Analytics</button>
          </div>
        </div>
      </section>

      <section className={styles.gridTwo}>
        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "14px" }}>
          <h3>Cards & progress</h3>
          <div className="card" style={{ padding: "16px", display: "grid", gap: "10px" }}>
            <div className={styles.inlineRow}><strong>Lead quality</strong><span className="badge success">87%</span></div>
            <div className="progress"><div className="progress-bar" style={{ width: "87%" }} /></div>
            <div className={styles.inlineRow}><strong>Tour conversion</strong><span className="badge">41%</span></div>
            <div className="progress"><div className="progress-bar" style={{ width: "41%" }} /></div>
          </div>
        </div>

        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "14px" }}>
          <h3>Status & timeline</h3>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker" />
              <div>
                <strong>Inbound call accepted</strong>
                <p>AI agent started qualification flow.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker" />
              <div>
                <strong>Appointment proposed</strong>
                <p>Next step slipped into calendar and CRM.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gridTwo}>
        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "14px" }}>
          <h3>Tables & breadcrumbs</h3>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/dashboard">Workspace</a>
            <span>/</span>
            <a href="/projects">Projects</a>
            <span>/</span>
            <span>Harbor Loft</span>
          </nav>
          <div className="table-shell">
            <table>
              <thead>
                <tr><th>Lead</th><th>Project</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>Ava</td><td>Harbor Loft</td><td><span className="badge success">Ready</span></td></tr>
                <tr><td>Omar</td><td>Cedar</td><td><span className="badge warning">Pending</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "14px" }}>
          <h3>File upload & empty state</h3>
          <div className="upload-dropzone">
            <Upload size={20} />
            <strong>Drop files to attach</strong>
            <p>Knowledge documents, property sheets, and call assets.</p>
          </div>
          <div className="empty-state">
            <Sparkles size={20} />
            <strong>No data yet</strong>
            <p>Upload content or connect a workflow to populate this state.</p>
          </div>
        </div>
      </section>

      <section className={styles.gridTwo}>
        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "12px" }}>
          <h3>Toast, tooltip, dialog</h3>
          <div className="toast">Follow-up reminder scheduled successfully.</div>
          <div className="tooltip">Conversation synced to CRM</div>
          <div className="dialog" style={{ padding: "16px", display: "grid", gap: "10px" }}>
            <strong>Confirm deployment</strong>
            <p>Deploy this prompt version to the selected project agents?</p>
            <div className={styles.buttonRow}>
              <button className="btn btn-secondary">Cancel</button>
              <button className="btn btn-primary">Deploy</button>
            </div>
          </div>
        </div>

        <div className="surface-panel" style={{ padding: "20px", display: "grid", gap: "12px" }}>
          <h3>Skeleton loaders & illustration</h3>
          <div className="skeleton">
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-block" />
          </div>
          <div className="illustration-card" style={{ padding: "16px", display: "grid", gap: "10px" }}>
            <div className={styles.inlineRow}><Mic size={18} /><strong>Voice playground</strong></div>
            <div className={styles.inlineRow}><PhoneCall size={18} /><span>Live agent ready</span></div>
            <div className={styles.inlineRow}><BookOpen size={18} /><span>Knowledge synced</span></div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
