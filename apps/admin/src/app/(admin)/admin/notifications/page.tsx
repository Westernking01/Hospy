"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Info,
  Trash2,
  CheckCheck,
  Clock,
  ExternalLink,
  ShieldAlert,
  Package,
  CreditCard,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/admin/page-header";

interface NotificationItem {
  id: string;
  type: "ALERT" | "SUCCESS" | "INFO" | "WARNING";
  category: "INVENTORY" | "PAYMENT" | "CUSTOMER" | "SECURITY";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif_1",
    type: "WARNING",
    category: "INVENTORY",
    title: "Low Stock Alert: Sony Alpha a7 IV Body (`SKU-SNY-A7M4`)",
    message: "Ado-Ekiti Flagship Hub inventory has fallen below the minimum safety threshold of 5 units (Current stock: 3 units).",
    timestamp: "10 minutes ago",
    read: false,
    actionUrl: "/admin/inventory",
    actionText: "Restock Inventory",
  },
  {
    id: "notif_2",
    type: "SUCCESS",
    category: "PAYMENT",
    title: "Paystack Settlement Credited: Batch #SET-2026-0716",
    message: "Authoritative NGN settlement of ₦14,480,000 across 28 waybills has been verified and deposited to Zenith Bank Escrow.",
    timestamp: "1 hour ago",
    read: false,
    actionUrl: "/admin/orders",
    actionText: "Verify Orders",
  },
  {
    id: "notif_3",
    type: "INFO",
    category: "CUSTOMER",
    title: "New Corporate VIP Application: Dr. Ngozi Okafor",
    message: "Uploaded company registration documents for volume discount eligibility on hospital diagnostic workstation monitors.",
    timestamp: "3 hours ago",
    read: true,
    actionUrl: "/admin/customers",
    actionText: "Inspect Account",
  },
  {
    id: "notif_4",
    type: "ALERT",
    category: "SECURITY",
    title: "Unauthorized Access Attempt Blocked",
    message: "An unauthenticated request to modify warehouse stock balance without a valid administrator session was intercepted and logged (`00_READ_THIS_FIRST.md` security guard).",
    timestamp: "Yesterday",
    read: true,
    actionUrl: "/admin/audit",
    actionText: "View Security Logs",
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "WARNING">("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setToastMessage("All system notifications marked as read.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleClearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
    setToastMessage("Cleared all resolved read notifications.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const filtered = notifications.filter((n) => {
    if (filter === "UNREAD") return !n.read;
    if (filter === "WARNING") return n.type === "WARNING" || n.type === "ALERT";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

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
        title={
          <span className="flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-primary" />
            <span>System Notifications & Security Alerts</span>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {unreadCount} new
              </span>
            )}
          </span>
        }
        description="Authoritative real-time telemetry on warehouse stock alerts, financial settlements, and RBAC logs"
        actions={
          <>
            <button
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className={`rounded-lg border border-border px-3 py-2 text-sm font-medium flex items-center gap-1.5 transition-colors ${
                unreadCount > 0
                  ? "bg-background text-foreground hover:bg-muted"
                  : "bg-muted/40 text-muted-foreground cursor-not-allowed"
              }`}
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark All Read</span>
            </button>
            <button
              onClick={handleClearRead}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-muted flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Read</span>
            </button>
          </>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-muted p-1 rounded-lg max-w-md">
        {(["ALL", "UNREAD", "WARNING"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors ${
              filter === t
                ? "bg-card text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "ALL" && `All Logs (${notifications.length})`}
            {t === "UNREAD" && `Unread (${unreadCount})`}
            {t === "WARNING" && `Warnings / Alerts`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-card border border-border shadow-sm space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <div className="font-semibold text-foreground text-base">
              All Clear! No Notifications Found
            </div>
            <p className="text-xs text-muted-foreground">
              Your system telemetry queue is completely caught up with 0 active alerts.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const icons = {
              INVENTORY: <Package className="w-5 h-5 text-amber-500" />,
              PAYMENT: <CreditCard className="w-5 h-5 text-emerald-500" />,
              CUSTOMER: <UserPlus className="w-5 h-5 text-blue-500" />,
              SECURITY: <ShieldAlert className="w-5 h-5 text-red-500" />,
            };

            return (
              <div
                key={item.id}
                className={`p-5 rounded-xl border shadow-sm transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  !item.read
                    ? "bg-card border-primary/40 ring-1 ring-primary/20"
                    : "bg-muted/40 border-border"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border ${
                      !item.read ? "bg-primary/10 border-primary/30" : "bg-muted border-border"
                    }`}
                  >
                    {icons[item.category] || <Info className="w-5 h-5 text-muted-foreground" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">
                        {item.title}
                      </span>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
                      {item.message}
                    </p>
                    <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-1.5 pt-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.timestamp}</span>
                      <span>•</span>
                      <span className="font-medium">{item.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleToggleRead(item.id)}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
                  >
                    {item.read ? "Mark Unread" : "Dismiss"}
                  </button>
                  {item.actionUrl && (
                    <Link
                      href={item.actionUrl}
                      className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground flex items-center gap-1.5 transition-colors hover:bg-primary-hover"
                    >
                      <span>{item.actionText || "View details"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
