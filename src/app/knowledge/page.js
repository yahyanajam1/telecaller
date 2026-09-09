"use client";

import { useState } from "react";
import { BookOpen, FileText, ImageIcon, Layers3, MessageSquareQuote, PlayCircle, Search, Sparkles, Tag, Upload, Video } from "lucide-react";
import { AppShell, SectionCard } from "@/components/app-shell";
import styles from "./page.module.css";

const categories = ["Projects", "FAQs", "Documents", "Pricing", "Amenities", "Location", "Legal Information", "Developers"];
const contentItems = ["Project overview", "FAQ: deposit requirements", "Pricing sheet", "Neighborhood map"];
const versions = [
  { label: "v4.2", status: "Published" },
  { label: "v4.1", status: "Pending Approval" },
  { label: "v4.0", status: "Draft" },
];
const tags = ["Luxury", "New Launch", "ROI", "Escrow", "Schools", "Hospitals", "Metro"];
const suggestions = ["Add pricing FAQ for financing", "Add nearby school comparison", "Expand legal disclosures"];

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState("Projects");

  return (
    <AppShell title="Knowledge Base" subtitle="Trusted content hub" breadcrumb={["Workspace", "Knowledge"]}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button className="btn btn-primary"><BookOpen size={16} /> New article</button>
          <button className="btn btn-secondary"><Upload size={16} /> Upload assets</button>
          <button className="btn btn-ghost"><Sparkles size={16} /> Auto improve</button>
        </div>
        <div className={styles.badgeRow}>
          <span className="badge success">Publishing enabled</span>
          <span className="badge">7 pending approvals</span>
        </div>
      </div>

      <div className={styles.heroCard}>
        <div>
          <p className="kicker">Knowledge operations</p>
          <h2>Unify projects, FAQs, documents, media, pricing, legal details, and location context.</h2>
          <p>Support the AI assistant with structured, searchable, and governable content.</p>
        </div>
        <div className={styles.badgeRow}>
          <span className="badge">Search ready</span>
          <span className="badge success">Approval workflow live</span>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}><span className={styles.statLabel}>Articles</span><span className={styles.statValue}>184</span></div>
        <div className={styles.statCard}><span className={styles.statLabel}>PDFs</span><span className={styles.statValue}>43</span></div>
        <div className={styles.statCard}><span className={styles.statLabel}>Images</span><span className={styles.statValue}>128</span></div>
        <div className={styles.statCard}><span className={styles.statLabel}>Videos</span><span className={styles.statValue}>16</span></div>
      </div>

      <div className={styles.gridTwo}>
        <SectionCard title="Categories & search" subtitle="Browse content by domain">
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <button key={category} className={styles.categoryItem} onClick={() => setActiveCategory(category)} style={activeCategory === category ? { borderColor: "var(--color-primary)", boxShadow: "0 0 0 3px var(--color-primary-soft)" } : undefined}>
                <span>{category}</span>
                <span className="badge">{category === activeCategory ? "Active" : "Open"}</span>
              </button>
            ))}
          </div>
          <div className={styles.previewPane}>
            <div className={styles.toolbarGroup}>
              <Search size={16} />
              <strong>Search in {activeCategory}</strong>
            </div>
            <p>Search across projects, pricing, legal notes, neighborhood details, and more.</p>
          </div>
        </SectionCard>

        <SectionCard title="Content library" subtitle="Structured assets for voice and support agents">
          <div className={styles.contentList}>
            {contentItems.map((item) => (
              <div key={item} className={styles.contentItem}>
                <div>
                  <strong>{item}</strong>
                  <p>Linked to {activeCategory}</p>
                </div>
                <span className="badge success">Ready</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className={styles.gridTwo}>
        <SectionCard title="Knowledge editor" subtitle="Create, edit, and publish content">
          <div className={styles.editorCard}>
            <label className="form-group">
              <span className="label">Title</span>
              <input className="input" defaultValue="Harbor Loft pricing overview" />
            </label>
            <label className="form-group">
              <span className="label">Summary</span>
              <textarea className="textarea" rows={4} defaultValue="Explain pricing tiers, payment plans, and financing options for prospects." />
            </label>
            <div className={styles.formGrid}>
              <label className="form-group">
                <span className="label">Category</span>
                <select className="select" defaultValue="Pricing">
                  <option>Pricing</option>
                  <option>Projects</option>
                  <option>Location</option>
                  <option>Legal Information</option>
                </select>
              </label>
              <label className="form-group">
                <span className="label">Audience</span>
                <select className="select" defaultValue="Agents">
                  <option>Agents</option>
                  <option>Customers</option>
                  <option>Ops Team</option>
                </select>
              </label>
            </div>
            <div className={styles.toolbarGroup}>
              <button className="btn btn-primary"><FileText size={16} /> Save draft</button>
              <button className="btn btn-secondary"><Layers3 size={16} /> Version</button>
              <button className="btn btn-ghost"><Sparkles size={16} /> Publish</button>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Assets & metadata" subtitle="Documents, media, tags, and approvals">
          <div className={styles.categoryList}>
            <div className={styles.categoryItem}><span><FileText size={15} /> PDFs</span><span className="badge">12</span></div>
            <div className={styles.categoryItem}><span><ImageIcon size={15} /> Images</span><span className="badge">45</span></div>
            <div className={styles.categoryItem}><span><Video size={15} /> Videos</span><span className="badge">8</span></div>
            <div className={styles.categoryItem}><span><MessageSquareQuote size={15} /> FAQ</span><span className="badge success">Live</span></div>
            <div className={styles.categoryItem}><span><PlayCircle size={15} /> Media preview</span><span className="badge">Ready</span></div>
          </div>
        </SectionCard>
      </div>

      <div className={styles.gridTwo}>
        <SectionCard title="Versioning & approval" subtitle="Track updates and governance">
          <div className={styles.versionList}>
            {versions.map((version) => (
              <div key={version.label} className={styles.versionItem}>
                <div><strong>{version.label}</strong><p>{version.status}</p></div>
                <span className={`badge ${version.status === "Published" ? "success" : version.status === "Pending Approval" ? "" : ""}`}>{version.status}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Tags & suggestions" subtitle="Improve relevance and retrieval">
          <div className={styles.tagList}>
            {tags.map((tag) => (
              <div key={tag} className={styles.tagItem}><span>{tag}</span><span className="badge">Tag</span></div>
            ))}
          </div>
          <div className={styles.ruleList}>
            {suggestions.map((suggestion) => (
              <div key={suggestion} className={styles.ruleItem}><span>{suggestion}</span><span className="badge success">Suggested</span></div>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
