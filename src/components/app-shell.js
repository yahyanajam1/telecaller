"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  Brain,
  Building2,
  CalendarDays,
  ChartColumn,
  CreditCard,
  FileText,
  KeyRound,
  LayoutGrid,
  Mic,
  PhoneCall,
  PlayCircle,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
  Workflow,
  Zap,
} from "lucide-react";
import styles from "./app-shell.module.css";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/analytics", label: "Analytics", icon: ChartColumn },
  { href: "/calls", label: "Calls", icon: PhoneCall },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/projects", label: "Projects", icon: Building2 },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/prompts", label: "Prompts", icon: Wand2 },
  { href: "/voice", label: "Voice", icon: Mic },
  { href: "/playground", label: "Playground", icon: PlayCircle },
  { href: "/unknown-questions", label: "Unknown Questions", icon: Sparkles },
  { href: "/continuous-learning", label: "Learning", icon: Zap },
  { href: "/integrations", label: "Integrations", icon: Workflow },
  { href: "/api-keys", label: "API Keys", icon: KeyRound },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/organization", label: "Organization", icon: ShieldCheck },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/design-system", label: "Design System", icon: Sparkles },
  { href: "/ai-management", label: "AI Management", icon: Brain },
  { href: "/support", label: "Support", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export function AppShell({
  title,
  subtitle,
  breadcrumb = [],
  searchPlaceholder = "Search across the platform",
  children,
  primaryActionLabel = "New campaign",
  onPrimaryAction,
}) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentPath = useMemo(() => pathname || "/dashboard", [pathname]);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandBlock}>
          <div className={styles.brandMark}>A</div>
          <div>
            <strong>Aurelia Voice</strong>
            <p>Enterprise AI calling</p>
          </div>
        </div>

        <div className={styles.sidebarSection}>
          <button className={styles.primaryButton} onClick={onPrimaryAction || (() => setDialogOpen(true))}>
            <PlayCircle size={16} /> {primaryActionLabel}
          </button>
        </div>

        <nav className={styles.navList}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.href;
            return (
              <Link key={item.href} href={item.href} className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}>
                <Icon size={16} />
                <span>{item.label}</span>
                <ArrowRight size={14} />
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.pill}>24/7 orchestration</div>
          <p>Secure AI voice operations for real estate teams.</p>
        </div>
      </aside>

      <div className={styles.mainPanel}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumbs}>
            <span>Workspace</span>
            {breadcrumb.length > 0 ? breadcrumb.map((item, index) => <span key={item}>{index > 0 ? " / " : ""}{item}</span>) : <span> / {title}</span>}
          </div>
          <div className={styles.topbarActions}>
            <label className={styles.searchBox}>
              <Search size={16} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} />
            </label>
            <button className={styles.ghostButton} onClick={() => setDialogOpen(true)}>
              <Bell size={16} /> Notify
            </button>
          </div>
        </header>

        <section className={styles.pageHeader}>
          <div>
            <p className={styles.kicker}>{subtitle}</p>
            <h1>{title}</h1>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.ghostButton}>Filters</button>
            <button className={styles.primaryButton}>Export</button>
          </div>
        </section>

        <main className={styles.content}>{children}</main>
      </div>

      {dialogOpen ? (
        <div className={styles.modalOverlay} onClick={() => setDialogOpen(false)}>
          <div className={styles.modalCard} onClick={(event) => event.stopPropagation()}>
            <h3>Confirm action</h3>
            <p>This action will trigger the selected workflow and notify the team. Continue?</p>
            <div className={styles.modalActions}>
              <button className={styles.ghostButton} onClick={() => setDialogOpen(false)}>Cancel</button>
              <button className={styles.primaryButton} onClick={() => setDialogOpen(false)}>Continue</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SectionCard({ title, subtitle, children, action }) {
  return (
    <section className={styles.sectionCard}>
      <div className={styles.sectionHead}>
        <div>
          <h3>{title}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function StatGrid({ items }) {
  return (
    <div className={styles.statGrid}>
      {items.map((item) => (
        <div key={item.label} className={styles.statCard}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
          <small>{item.change}</small>
        </div>
      ))}
    </div>
  );
}

export function DataTable({ columns, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`}>
              {row.map((cell) => (
                <td key={`${cell}-${index}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyState({ title, message }) {
  return (
    <div className={styles.emptyState}>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className={styles.loadingState}>
      <div />
      <div />
      <div />
    </div>
  );
}

export function ChipRow({ items }) {
  return (
    <div className={styles.chipRow}>
      {items.map((item) => (
        <span key={item} className={styles.chip}>{item}</span>
      ))}
    </div>
  );
}
