"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Edit3,
  Globe,
  Link as LinkIcon,
  Save,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { AdminModal } from "@/components/admin/admin-modal";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";

interface CMSItem {
  id: string;
  section: "HERO_BANNER" | "PROMO_STRIP" | "TRUST_BADGES" | "ANNOUNCEMENT";
  title: string;
  subtitle: string;
  badgeText: string;
  ctaText: string;
  ctaUrl: string;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  lastModified: string;
}

const initialCMSItems: CMSItem[] = [
  {
    id: "cms_1",
    section: "HERO_BANNER",
    title: "Next-Gen Sony Alpha & Apple Silicon M3 Workstations",
    subtitle: "Experience factory direct pricing with authentic brand warranties across Ado-Ekiti & Lagos Flagship Hubs.",
    badgeText: "🔥 AUTHORITATIVE ENTERPRISE LAUNCH",
    ctaText: "Shop Flagship Catalog →",
    ctaUrl: "/products",
    status: "ACTIVE",
    lastModified: "Today, 09:14 AM",
  },
  {
    id: "cms_2",
    section: "PROMO_STRIP",
    title: "Corporate Bulk Order & VIP Partner Discount SLA",
    subtitle: "Register your corporate organization today to unlock up to 20% volume rebates on computing & audiovisual gear.",
    badgeText: "💎 VIP CORPORATE ACCESS",
    ctaText: "Explore VIP Rebates",
    ctaUrl: "/corporate",
    status: "ACTIVE",
    lastModified: "Yesterday",
  },
  {
    id: "cms_3",
    section: "ANNOUNCEMENT",
    title: "Same-Day Logistics Hub Now Live in Ado-Ekiti (Zone A)",
    subtitle: "All orders confirmed before 2 PM receive guaranteed same-day waybill dispatch to your doorstep.",
    badgeText: "🚚 EXPRESS WAYBILL",
    ctaText: "Track Your Order",
    ctaUrl: "/orders",
    status: "ACTIVE",
    lastModified: "3 days ago",
  },
  {
    id: "cms_4",
    section: "TRUST_BADGES",
    title: "Official Factory Direct Brand SLA & Warranty Guarantee",
    subtitle: "Every item dispatched carries 100% genuine manufacturer seal and verified replacement insurance.",
    badgeText: "🛡️ FACTORY DIRECT SEAL",
    ctaText: "Read Policy (`00_READ_THIS_FIRST.md`)",
    ctaUrl: "/warranty",
    status: "ACTIVE",
    lastModified: "Jul 12, 2026",
  },
];

export default function AdminCMSPage() {
  const [items, setItems] = useState<CMSItem[]>(initialCMSItems);
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<CMSItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editable fields in modal
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  const [editBadge, setEditBadge] = useState("");
  const [editCtaText, setEditCtaText] = useState("");
  const [editCtaUrl, setEditCtaUrl] = useState("");

  const handleOpenEdit = (item: CMSItem) => {
    setSelectedItem(item);
    setEditTitle(item.title);
    setEditSubtitle(item.subtitle);
    setEditBadge(item.badgeText);
    setEditCtaText(item.ctaText);
    setEditCtaUrl(item.ctaUrl);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "DRAFT" : "ACTIVE";
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: nextStatus as any, lastModified: "Just now" } : i))
    );
    setToastMessage(`CMS component status updated to ${nextStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setItems((prev) =>
      prev.map((i) =>
        i.id === selectedItem.id
          ? {
              ...i,
              title: editTitle,
              subtitle: editSubtitle,
              badgeText: editBadge,
              ctaText: editCtaText,
              ctaUrl: editCtaUrl,
              lastModified: "Just now (Modified)",
            }
          : i
      )
    );
    setIsModalOpen(false);
    setToastMessage(`Storefront section '${selectedItem.section}' published live to website!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = activeTab === "ALL" ? items : items.filter((i) => i.section === activeTab);

  const columns: Column<CMSItem>[] = [
    {
      key: "section",
      header: "Storefront Section & Placement",
      render: (item) => (
        <div>
          <span className="font-mono text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-foreground border border-border">
            {item.section.replace(/_/g, " ")}
          </span>
          <div className="text-[11px] text-muted-foreground mt-1">Updated: {item.lastModified}</div>
        </div>
      ),
    },
    {
      key: "title",
      header: "Headline & Subtitle Content",
      render: (item) => (
        <div className="max-w-md">
          <div className="font-semibold text-foreground text-sm">
            {item.title}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {item.subtitle}
          </div>
          {item.badgeText && (
            <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {item.badgeText}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "ctaText",
      header: "CTA Button & Link",
      render: (item) => (
        <div>
          <div className="font-medium text-foreground text-xs">
            {item.ctaText}
          </div>
          <div className="text-[11px] text-primary font-mono flex items-center gap-1 mt-0.5">
            <LinkIcon className="w-3 h-3" />
            <span>{item.ctaUrl}</span>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Publish State",
      render: (item) => (
        <StatusBadge
          status={item.status}
          icon={
            item.status === "ACTIVE" ? (
              <Eye className="w-3 h-3" />
            ) : (
              <EyeOff className="w-3 h-3" />
            )
          }
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleToggleStatus(item.id, item.status)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            {item.status === "ACTIVE" ? "Unpublish" : "Publish Live"}
          </button>
          <button
            onClick={() => handleOpenEdit(item)}
            className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-foreground text-background shadow-lg border border-border flex items-center gap-2 text-xs font-medium animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <PageHeader
        title="Storefront CMS & Banner Content Manager"
        description="Authoritative control over homepage hero carousels, promo strips, and trust badges"
        actions={
          <a
            href="/"
            target="_blank"
            className="rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90 flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span>Preview Live Storefront →</span>
          </a>
        }
      />

      {/* Main Table */}
      <Card flush className="p-6">
        <AdminTable
          data={filtered}
          columns={columns}
          keyField="id"
          tabs={[
            { id: "ALL", label: "All CMS Placements", count: items.length },
            { id: "HERO_BANNER", label: "Hero Banner", count: items.filter((i) => i.section === "HERO_BANNER").length },
            { id: "PROMO_STRIP", label: "Promo Strips", count: items.filter((i) => i.section === "PROMO_STRIP").length },
            { id: "ANNOUNCEMENT", label: "Announcements", count: items.filter((i) => i.section === "ANNOUNCEMENT").length },
            { id: "TRUST_BADGES", label: "Trust Badges", count: items.filter((i) => i.section === "TRUST_BADGES").length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Card>

      {/* Edit Component Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem ? `Edit Section: ${selectedItem.section}` : "Edit CMS Content"}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Badge Tag / Eyebrow Text
            </label>
            <input
              type="text"
              required
              value={editBadge}
              onChange={(e) => setEditBadge(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Main Headline Title *
            </label>
            <input
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Supporting Subtitle / Description *
            </label>
            <textarea
              rows={3}
              required
              value={editSubtitle}
              onChange={(e) => setEditSubtitle(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-medium uppercase tracking-wider text-muted-foreground">
                CTA Button Text *
              </label>
              <input
                type="text"
                required
                value={editCtaText}
                onChange={(e) => setEditCtaText(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-medium uppercase tracking-wider text-muted-foreground">
                Target URL / Route *
              </label>
              <input
                type="text"
                required
                value={editCtaUrl}
                onChange={(e) => setEditCtaUrl(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Publish Changes Live</span>
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
