"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  CheckCircle2,
  Truck,
  Printer,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { AdminModal } from "@/components/admin/admin-modal";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminService, AdminOrderItem } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminOrdersDirectoryPage() {
  const [orders, setOrders] = useState<AdminOrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await adminService.getOrders(activeTab, searchQuery);
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab, searchQuery]);

  const formatNGN = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleUpdateStatus = (orderId: string, newStatus: any) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    setToastMessage(`Order dispatch status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const columns: Column<AdminOrderItem>[] = [
    {
      key: "orderNumber",
      header: "Order & Reference",
      render: (item) => (
        <div className="font-mono">
          <Link
            href={`/admin/orders/${item.id}`}
            className="font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <span>{item.orderNumber}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
          </Link>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            Ref: {item.paymentReference || "N/A"}
          </div>
        </div>
      ),
    },
    {
      key: "customerName",
      header: "Customer & Destination",
      render: (item) => (
        <div>
          <div className="font-semibold text-foreground text-sm">
            {item.customerName}
          </div>
          <div className="text-xs text-muted-foreground">
            {item.shippingAddress?.city || "Ado-Ekiti"}, {item.shippingAddress?.state || "Ekiti State"}
          </div>
        </div>
      ),
    },
    {
      key: "items",
      header: "Manifest Items",
      render: (item) => (
        <span className="font-mono text-xs font-medium text-foreground">
          {item.items.reduce((acc, i) => acc + i.quantity, 0)} units ({item.items.length} SKUs)
        </span>
      ),
    },
    {
      key: "totalAmount",
      header: "Gross Amount",
      render: (item) => (
        <span className="font-semibold text-foreground font-mono text-sm">
          {formatNGN(item.totalAmount)}
        </span>
      ),
    },
    {
      key: "paymentMethod",
      header: "Payment Channel",
      render: (item) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
          <CheckCircle2 className="w-3 h-3 shrink-0" />
          <span>{item.paymentMethod}</span>
        </span>
      ),
    },
    {
      key: "status",
      header: "Fulfillment Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      header: "Timestamp",
      render: (item) => <span className="text-xs text-muted-foreground">{item.createdAt}</span>,
    },
    {
      key: "actions",
      header: "Waybill & Actions",
      align: "right",
      render: (item) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setSelectedOrder(item);
              setIsModalOpen(true);
            }}
            title="Inspect & Waybill"
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <Link
            href={`/admin/orders/${item.id}`}
            className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-medium flex items-center gap-1 transition-colors"
          >
            <span>Waybill</span>
            <Printer className="w-3.5 h-3.5" />
          </Link>
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

      {/* Top Header */}
      <PageHeader
        title="Enterprise Order Management Directory"
        description="Authoritative order dispatch, customer waybills, and Paystack receipt verification across all hubs"
        actions={
          <button
            onClick={() => alert("Exporting 1,284 enterprise orders to CSV manifest")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Manifest CSV</span>
          </button>
        }
      />

      {/* Filter Toolbar */}
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by order number (e.g. ORD-HPZ-8891), customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </Card>

      {/* Main Orders Table */}
      <Card>
        <AdminTable
          data={orders}
          columns={columns}
          keyField="id"
          tabs={[
            { id: "ALL", label: "All Orders", count: orders.length },
            { id: "PAID", label: "Paid / Verified", count: orders.filter((o) => o.status === "PAID").length },
            { id: "PROCESSING", label: "Processing", count: orders.filter((o) => o.status === "PROCESSING").length },
            { id: "SHIPPED", label: "In Transit / Shipped", count: orders.filter((o) => o.status === "SHIPPED").length },
            { id: "DELIVERED", label: "Delivered", count: orders.filter((o) => o.status === "DELIVERED").length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Card>

      {/* Quick Inspect & Status Update Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedOrder ? `Order Manifest: ${selectedOrder.orderNumber}` : "Order Details"}
        size="lg"
      >
        {selectedOrder && (
          <div className="space-y-6 text-xs">
            {/* Summary Top Banner */}
            <div className="p-4 rounded-lg bg-muted/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-base text-foreground font-mono">
                  {selectedOrder.orderNumber}
                </div>
                <div className="text-muted-foreground mt-0.5">
                  Placed by <strong className="text-foreground">{selectedOrder.customerName}</strong> ({selectedOrder.customerEmail})
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-semibold text-foreground font-mono">
                  {formatNGN(selectedOrder.totalAmount)}
                </div>
                <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Payment: {selectedOrder.paymentMethod} (Verified)
                </div>
              </div>
            </div>

            {/* Shipping Destination */}
            <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-1">
              <span className="font-medium text-muted-foreground uppercase tracking-wider text-[11px]">
                Shipping Waybill Destination
              </span>
              <div className="font-semibold text-foreground text-sm">
                {selectedOrder.shippingAddress?.recipientName}
              </div>
              <div className="text-muted-foreground">
                {selectedOrder.shippingAddress?.addressLine1}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}, {selectedOrder.shippingAddress?.country}
              </div>
            </div>

            {/* Itemized Manifest */}
            <div className="space-y-2">
              <span className="font-medium text-muted-foreground uppercase tracking-wider text-[11px]">
                Manifest Items ({selectedOrder.items.length})
              </span>
              <div className="rounded-lg border border-border overflow-hidden divide-y divide-border">
                {selectedOrder.items.map((it) => (
                  <div key={it.id} className="p-3 flex items-center justify-between bg-card">
                    <div>
                      <div className="font-semibold text-foreground">{it.productName}</div>
                      <div className="text-[11px] text-muted-foreground font-mono">SKU: {it.sku}</div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="font-semibold text-foreground">
                        {it.quantity}x @ {formatNGN(it.unitPrice)}
                      </div>
                      <div className="text-foreground font-semibold">{formatNGN(it.subtotal)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dispatch Status Update Actions */}
            <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-3">
              <span className="font-medium text-muted-foreground uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>Update Dispatch / Fulfillment Stage</span>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {(["PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedOrder.id, st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedOrder.status === st
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                  >
                    {st === selectedOrder.status ? `${st} (Current)` : st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Close Inspect
              </button>
              <Link
                href={`/admin/orders/${selectedOrder.id}`}
                className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Full Waybill Manifest Printable View →</span>
              </Link>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
