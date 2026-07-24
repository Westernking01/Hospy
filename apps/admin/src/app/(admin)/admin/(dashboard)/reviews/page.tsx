"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  CheckCircle2,
  Search,
  Check,
  X,
  ExternalLink,
  Send,
  ShieldCheck,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { AdminModal } from "@/components/admin/admin-modal";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminService, AdminReviewItem } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState<AdminReviewItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminResponseText, setAdminResponseText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    const data = await adminService.getReviews(activeTab);
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [activeTab]);

  const handleUpdateStatus = (id: string, newStatus: any) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedReview && selectedReview.id === id) {
      setSelectedReview({ ...selectedReview, status: newStatus });
    }
    setToastMessage(`Review #${id.slice(-4)} moderation status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReview || !adminResponseText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === selectedReview.id
          ? { ...r, status: "APPROVED", comment: `${r.comment}\n\n[Official Admin Response: ${adminResponseText}]` }
          : r
      )
    );
    setIsModalOpen(false);
    setAdminResponseText("");
    setToastMessage(`Official reply posted for review by ${selectedReview.customerName}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = reviews.filter((r) =>
    r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-3.5 h-3.5 ${
              s <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    );
  };

  const columns: Column<AdminReviewItem>[] = [
    {
      key: "productName",
      header: "Product & Rating",
      render: (item) => (
        <div className="max-w-xs">
          <div className="font-semibold text-foreground text-sm truncate">
            {item.productName}
          </div>
          <div className="flex items-center gap-2 mt-1">
            {renderStars(item.rating)}
            <span className="text-xs font-mono font-medium text-muted-foreground">
              ({item.rating}.0)
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "customerName",
      header: "Customer Partner",
      render: (item) => (
        <div>
          <div className="font-semibold text-foreground text-xs flex items-center gap-1.5">
            <span>{item.customerName}</span>
          </div>
          {item.isVerifiedPurchase && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Buyer</span>
            </span>
          )}
        </div>
      ),
    },
    {
      key: "comment",
      header: "Review Excerpt",
      render: (item) => (
        <span className="text-xs text-muted-foreground line-clamp-2 max-w-sm block">
          {item.comment}
        </span>
      ),
    },
    {
      key: "status",
      header: "Moderation Status",
      render: (item) => (
        <StatusBadge
          status={item.status}
          tone={item.status === "REPORTED" ? "purple" : undefined}
        />
      ),
    },
    {
      key: "createdAt",
      header: "Timestamp",
      render: (item) => <span className="text-xs text-muted-foreground">{item.createdAt}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (item) => (
        <div className="flex items-center justify-end gap-1.5">
          {item.status !== "APPROVED" && (
            <button
              onClick={() => handleUpdateStatus(item.id, "APPROVED")}
              title="Approve Review"
              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          {item.status !== "REJECTED" && (
            <button
              onClick={() => handleUpdateStatus(item.id, "REJECTED")}
              title="Reject / Hide Review"
              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => {
              setSelectedReview(item);
              setAdminResponseText("");
              setIsModalOpen(true);
            }}
            title="Inspect & Reply"
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted flex items-center gap-1"
          >
            <span>Reply</span>
            <ExternalLink className="w-3 h-3" />
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
        title="Product Reviews Moderation Center"
        description="Authoritative moderation, response publishing, and verification of customer feedback"
      />

      {/* Search Toolbar */}
      <Card className="flex items-center gap-3 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search reviews by SKU, customer name or review text..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
            { id: "ALL", label: "All Reviews", count: filtered.length },
            { id: "PENDING", label: "Pending Moderation", count: filtered.filter((r) => r.status === "PENDING").length },
            { id: "APPROVED", label: "Approved / Live", count: filtered.filter((r) => r.status === "APPROVED").length },
            { id: "REPORTED", label: "Flagged / Reported", count: filtered.filter((r) => r.status === "REPORTED").length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Card>

      {/* Inspect & Response Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedReview ? `Review Inspection: #${selectedReview.id}` : "Review Details"}
        size="md"
      >
        {selectedReview && (
          <div className="space-y-5 text-xs">
            {/* Top Review Excerpt */}
            <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-foreground text-sm">
                  {selectedReview.productName}
                </div>
                {renderStars(selectedReview.rating)}
              </div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-2">
                <span>By: <strong className="text-foreground">{selectedReview.customerName}</strong></span>
                <span>•</span>
                <span>{selectedReview.createdAt}</span>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border text-muted-foreground leading-relaxed whitespace-pre-wrap">
                "{selectedReview.comment}"
              </div>
            </div>

            {/* Quick Status Toggles */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border font-medium">
              <span className="text-foreground">Quick Moderation Status:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedReview.id, "APPROVED")}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-medium hover:bg-emerald-700 transition-colors flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedReview.id, "REJECTED")}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-medium hover:bg-red-700 transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reject</span>
                </button>
              </div>
            </div>

            {/* Official Reply Form */}
            <form onSubmit={handleSendResponse} className="space-y-3 pt-2">
              <label className="font-medium uppercase tracking-wider text-muted-foreground block">
                Post Official Admin Response (Public)
              </label>
              <textarea
                rows={3}
                required
                value={adminResponseText}
                onChange={(e) => setAdminResponseText(e.target.value)}
                placeholder={`Thank you ${selectedReview.customerName} for choosing factory direct with HOPSY PLAZA...`}
                className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex justify-end gap-2 pt-2">
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
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Official Reply</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
