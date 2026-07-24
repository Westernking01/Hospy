"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  Copy,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { AdminModal } from "@/components/admin/admin-modal";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminService, AdminPromotionItem } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<AdminPromotionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [newCode, setNewCode] = useState("HPZ-FLASHSALE-2026");
  const [newDesc, setNewDesc] = useState("Exclusive Factory Direct flash sale on Sony Alpha & Apple Silicon");
  const [newType, setNewType] = useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
  const [newValue, setNewValue] = useState<number>(15);
  const [newMinOrder, setNewMinOrder] = useState<number>(100000);
  const [newMaxUses, setNewMaxUses] = useState<number>(200);

  useEffect(() => {
    adminService.getPromotions().then((data) => {
      setPromotions(data);
      setLoading(false);
    });
  }, []);

  const formatNGN = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "EXPIRED" : "ACTIVE";
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: nextStatus as any } : p))
    );
    setToastMessage(`Coupon status toggled to ${nextStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = (id: string, code: string) => {
    if (confirm(`Revoke discount code '${code}' immediately?`)) {
      setPromotions((prev) => prev.filter((p) => p.id !== id));
      setToastMessage(`Coupon '${code}' revoked and archived.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const newPromo: AdminPromotionItem = {
      id: "promo_" + Date.now(),
      code: newCode.toUpperCase(),
      description: newDesc,
      discountType: newType,
      discountValue: newValue,
      minOrderAmount: newMinOrder,
      usageCount: 0,
      currentUses: 0,
      maxUses: newMaxUses,
      validUntil: "2026-12-31",
      expiresAt: "2026-12-31",
      status: "ACTIVE",
      isActive: true,
    };

    setPromotions((prev) => [newPromo, ...prev]);
    setIsModalOpen(false);
    setToastMessage(`Promotion coupon ${newPromo.code} created successfully!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = promotions.filter((p) =>
    p.code.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<AdminPromotionItem>[] = [
    {
      key: "code",
      header: "Coupon Code & Details",
      render: (item) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-muted text-foreground font-mono font-semibold text-sm border border-border">
              {item.code}
            </span>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(item.code);
                setToastMessage(`Copied ${item.code} to clipboard`);
                setTimeout(() => setToastMessage(null), 2000);
              }}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              title="Copy Coupon Code"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-xs text-muted-foreground mt-1 max-w-sm leading-snug">
            {item.description}
          </div>
        </div>
      ),
    },
    {
      key: "discountValue",
      header: "Discount SLA",
      render: (item) => (
        <span className="font-mono font-semibold text-foreground text-sm">
          {item.discountType === "PERCENTAGE" ? `${item.discountValue}% OFF` : `${formatNGN(item.discountValue)} OFF`}
        </span>
      ),
    },
    {
      key: "minOrderAmount",
      header: "Min Order Req",
      render: (item) => (
        <span className="font-mono text-xs text-muted-foreground">
          {formatNGN(item.minOrderAmount)}
        </span>
      ),
    },
    {
      key: "usageCount",
      header: "Redemptions",
      render: (item) => (
        <div>
          <div className="font-mono font-medium text-foreground text-xs">
            {item.usageCount} / {item.maxUses}
          </div>
          <div className="w-24 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min(100, (item.usageCount / item.maxUses) * 100)}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "validUntil",
      header: "Validity Period",
      render: (item) => <span className="text-xs text-muted-foreground font-mono">Until {item.validUntil}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (item) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleToggleStatus(item.id, item.status)}
            className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            {item.status === "ACTIVE" ? "Expire" : "Activate"}
          </button>
          <button
            onClick={() => handleDelete(item.id, item.code)}
            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            title="Delete Coupon"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
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

      {/* Header */}
      <PageHeader
        title="Promotions & Coupon Code Manager"
        description="Create, audit, and throttle percentage and fixed-amount promotional vouchers"
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Promotion Code</span>
          </button>
        }
      />

      {/* Search */}
      <Card className="flex items-center gap-3 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search by code (e.g. HPZ-WELCOME-2026) or campaign name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </Card>

      {/* Main Table */}
      <Card>
        <AdminTable
          data={filtered}
          columns={columns}
          keyField="id"
          tabs={[
            { id: "ALL", label: "All Coupons", count: filtered.length },
            { id: "ACTIVE", label: "Active Vouchers", count: filtered.filter((p) => p.status === "ACTIVE").length },
            { id: "EXPIRED", label: "Expired / Archived", count: filtered.filter((p) => p.status === "EXPIRED").length },
          ]}
          activeTab="ALL"
          onTabChange={() => {}}
        />
      </Card>

      {/* Create Promotion Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Promotion Code"
        size="md"
      >
        <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Voucher Code *
            </label>
            <input
              type="text"
              required
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              placeholder="e.g. VIP-FLASHSALE-50"
              className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border font-mono font-semibold text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Campaign Description *
            </label>
            <input
              type="text"
              required
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Exclusive 15% off Sony Alpha and MacBook Pro M3"
              className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-medium uppercase tracking-wider text-muted-foreground">
                Discount Type *
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (₦ NGN)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-medium uppercase tracking-wider text-muted-foreground">
                Discount Value *
              </label>
              <input
                type="number"
                min={1}
                required
                value={newValue}
                onChange={(e) => setNewValue(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-medium uppercase tracking-wider text-muted-foreground">
                Min Purchase Requirement (₦)
              </label>
              <input
                type="number"
                min={0}
                required
                value={newMinOrder}
                onChange={(e) => setNewMinOrder(parseInt(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-medium uppercase tracking-wider text-muted-foreground">
                Max Redemption Limit
              </label>
              <input
                type="number"
                min={1}
                required
                value={newMaxUses}
                onChange={(e) => setNewMaxUses(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Deploy Voucher Code
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
