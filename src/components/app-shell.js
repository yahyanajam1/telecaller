"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Workflow,
  X,
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
  headerActionLabel,
  onHeaderAction,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const currentPath = useMemo(() => pathname || "/dashboard", [pathname]);
  const matchingPages = useMemo(() => navItems.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5), [query]);

  const exportTable = () => {
    const table = document.querySelector(".content table");
    if (!table) {
      window.print();
      return;
    }
    const csv = [...table.rows].map((row) => [...row.cells].map((cell) => `"${cell.innerText.replaceAll('"', '""')}"`).join(",")).join("\n");
    const file = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/dashboard" className={styles.brandBlock} aria-label="Aurelia Voice home" title="Go to dashboard">
          <div className={styles.brandMark}>A</div>
          <div>
            <strong>Aurelia Voice</strong>
            <p>Enterprise AI calling</p>
          </div>
        </Link>

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
            <button className={styles.mobileNavToggle} aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileNavOpen} aria-controls="mobile-navigation" onClick={() => setMobileNavOpen((open) => !open)}>
              {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
              <span>{mobileNavOpen ? "Close" : "Menu"}</span>
            </button>
            <div className={styles.searchWrap}>
              <label className={styles.searchBox}>
                <Search size={16} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} />
              </label>
              {query.trim() ? <div className={styles.searchResults}>
                {matchingPages.length ? matchingPages.map((item) => <Link key={item.href} href={item.href} className={styles.searchResult} onClick={() => setQuery("")}>{item.label}</Link>) : <span className={styles.searchResultEmpty}>No matching pages</span>}
              </div> : null}
            </div>
            <Link className={styles.ghostButton} href="/notifications">
              <Bell size={16} /> Notify
            </Link>
          </div>
        </header>

        {mobileNavOpen ? <nav id="mobile-navigation" className={styles.mobileNavList} aria-label="Platform navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.href;
            return <Link key={item.href} href={item.href} className={`${styles.mobileNavItem} ${active ? styles.navItemActive : ""}`} onClick={() => setMobileNavOpen(false)}><Icon size={16} /><span>{item.label}</span></Link>;
          })}
        </nav> : null}

        <section className={styles.pageHeader}>
          <div>
            <p className={styles.kicker}>{subtitle}</p>
            <h1>{title}</h1>
          </div>
          <div className={styles.headerActions}>
            {headerActionLabel ? <button className={styles.primaryButton} onClick={onHeaderAction}><PlayCircle size={16} /> {headerActionLabel}</button> : <>
              <Link className={styles.ghostButton} href="/analytics"><ChartColumn size={16} /> Analytics</Link>
              <button className={styles.primaryButton} onClick={exportTable}><FileText size={16} /> Export</button>
            </>}
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
              <button className={styles.primaryButton} onClick={() => { setDialogOpen(false); router.push("/calls"); }}>Open call queue</button>
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
