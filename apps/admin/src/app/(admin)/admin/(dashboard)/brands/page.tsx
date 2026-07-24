"use client";

import React, { useState, useEffect } from "react";
import {
  Award,
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminService } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    adminService.getBrands().then((data) => {
      setBrands(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove official brand partnership with '${name}'?`)) {
      setBrands((prev) => prev.filter((b) => b.id !== id));
      setToastMessage(`Brand partnership '${name}' archived.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.slug.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Brand Partner & Official Logo",
      render: (item) => (
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-11 rounded-lg bg-card p-1.5 border border-border flex items-center justify-center shrink-0 shadow-sm">
            {item.logoUrl ? (
              <img
                src={item.logoUrl}
                alt={item.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <Award className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              <span>{item.name}</span>
              <span title="Verified Factory Direct Partner">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              </span>
            </div>
            <div className="text-xs text-muted-foreground font-mono mt-0.5">/{item.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: "partnershipTier",
      header: "Partnership SLA Tier",
      render: (item) => (
        <StatusBadge
          status={`${item.partnershipTier} TIER`}
          tone={item.partnershipTier === "PLATINUM" ? "purple" : "warning"}
        />
      ),
    },
    {
      key: "productCount",
      header: "Active Catalog SKUs",
      render: (item) => (
        <span className="font-mono font-semibold text-foreground text-xs">
          {item.productCount} SKUs
        </span>
      ),
    },
    {
      key: "isVerifiedPartner",
      header: "Verification",
      render: () => (
        <StatusBadge
          status="Factory Direct Verified"
          tone="success"
          icon={<CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (item) => (
        <button
          onClick={() => handleDelete(item.id, item.name)}
          className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
          title="Remove Brand Partner"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-foreground text-background shadow-lg border border-border flex items-center gap-2 text-xs font-medium animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <PageHeader
        title="Official Brand Partners Directory"
        description="Authoritative factory-direct partners (`00_READ_THIS_FIRST.md` - strictly official brand logos only)"
        actions={
          <button
            onClick={() => alert("Brand onboarding workflow initiated")}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Brand Partner</span>
          </button>
        }
      />

      {/* Search */}
      <Card className="flex items-center gap-3 max-w-md p-4">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search brand partners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </Card>

      {/* Table */}
      <Card flush className="p-6">
        <AdminTable
          data={filtered}
          columns={columns}
          keyField="id"
          tabs={[
            { id: "ALL", label: "All Brand Partners", count: filtered.length },
          ]}
          activeTab="ALL"
          onTabChange={() => {}}
        />
      </Card>
    </div>
  );
}
