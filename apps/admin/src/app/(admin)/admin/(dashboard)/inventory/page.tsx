"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowUpDown,
  CheckCircle2,
  Search,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { AdminModal } from "@/components/admin/admin-modal";
import { PageHeader } from "@/components/admin/page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { AdminInventoryItem, AdminInventoryLogItem } from "@hopsy/commerce/src/admin/admin.types";
import { getInventoryAction } from "@hopsy/commerce/src/admin/admin.actions";


export default function AdminInventoryPage() {
  const [stockItems, setStockItems] = useState<AdminInventoryItem[]>([]);
  const [movementLogs, setMovementLogs] = useState<AdminInventoryLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"STOCK" | "LOGS">("STOCK");
  const [searchQuery, setSearchQuery] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("ALL");

  // Modal & adjustment state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminInventoryItem | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"RESTOCK" | "PURCHASE" | "DAMAGE" | "MANUAL_ADJUSTMENT">("RESTOCK");
  const [adjustmentQty, setAdjustmentQty] = useState<number>(10);
  const [adjustmentReason, setAdjustmentReason] = useState("Factory direct shipment received at Ado-Ekiti Hub");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const data = await getInventoryAction();
    setStockItems(data.stockItems);
    setMovementLogs(data.movementLogs);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdjust = (item: AdminInventoryItem) => {
    setSelectedItem(item);
    setAdjustmentType("RESTOCK");
    setAdjustmentQty(10);
    setAdjustmentReason(`Factory direct replenishment for ${item.sku}`);
    setIsModalOpen(true);
  };

  const handleSubmitAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const delta = adjustmentType === "DAMAGE" ? -Math.abs(adjustmentQty) : Math.abs(adjustmentQty);
    const prevStock = selectedItem.stockQuantity;
    const newStock = Math.max(0, prevStock + delta);

    // Update stock item
    setStockItems((prev) =>
      prev.map((i) =>
        i.id === selectedItem.id
          ? {
              ...i,
              stockQuantity: newStock,
              status: newStock <= 0 ? "OUT_OF_STOCK" : newStock < i.reorderThreshold ? "LOW_STOCK" : "IN_STOCK",
              lastUpdated: "Just now",
            }
          : i
      )
    );

    // Add movement log
    const newLog: AdminInventoryLogItem = {
      id: "mov_" + Date.now(),
      productName: selectedItem.productName,
      sku: selectedItem.sku,
      movementType: adjustmentType,
      quantityChange: delta,
      previousStock: prevStock,
      newStock: newStock,
      reason: adjustmentReason,
      adminName: "Super Administrator (Audit)",
      createdAt: "Just now",
    };

    setMovementLogs((prev) => [newLog, ...prev]);
    setIsModalOpen(false);
    setToastMessage(`Stock for ${selectedItem.sku} updated to ${newStock} units (${delta >= 0 ? "+" : ""}${delta})`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredStock = stockItems.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHub =
      warehouseFilter === "ALL" ||
      (warehouseFilter === "ADO_EKITI" && item.warehouseLocation.includes("Ado-Ekiti")) ||
      (warehouseFilter === "LAGOS" && item.warehouseLocation.includes("Lagos"));
    return matchesSearch && matchesHub;
  });

  const filteredLogs = movementLogs.filter((log) =>
    log.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (log.reason && log.reason.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stockColumns: Column<AdminInventoryItem>[] = [
    {
      key: "productName",
      header: "Product SKU & Warehouse Hub",
      render: (item) => (
        <div>
          <div className="font-medium text-foreground text-sm">{item.productName}</div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-0.5">
            <span className="text-primary font-medium">{item.sku}</span>
            <span>•</span>
            <span>{item.warehouseLocation}</span>
          </div>
        </div>
      ),
    },
    {
      key: "stockQuantity",
      header: "Available Stock",
      render: (item) => (
        <span className="font-mono text-base font-semibold text-foreground">
          {item.stockQuantity} <span className="text-xs font-normal text-muted-foreground">units</span>
        </span>
      ),
    },
    {
      key: "reservedQuantity",
      header: "Reserved (Orders)",
      render: (item) => (
        <span className="font-mono text-xs font-medium text-muted-foreground">
          {item.reservedQuantity} units
        </span>
      ),
    },
    {
      key: "reorderThreshold",
      header: "Safety Limit",
      render: (item) => (
        <span className="font-mono text-xs font-medium text-muted-foreground">
          Min: {item.reorderThreshold} units
        </span>
      ),
    },
    {
      key: "status",
      header: "Inventory Health",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "lastUpdated",
      header: "Last Audit",
      render: (item) => <span className="text-xs text-muted-foreground">{item.lastUpdated}</span>,
    },
    {
      key: "actions",
      header: "Stock Adjustment",
      align: "right",
      render: (item) => (
        <button
          onClick={() => handleOpenAdjust(item)}
          className="rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 ml-auto transition-colors"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>Adjust Stock</span>
        </button>
      ),
    },
  ];

  const logColumns: Column<AdminInventoryLogItem>[] = [
    {
      key: "productName",
      header: "SKU & Movement Type",
      render: (item) => (
        <div>
          <div className="font-medium text-foreground text-sm">{item.productName}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-xs text-primary font-medium">{item.sku}</span>
            <span className="text-muted-foreground">•</span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded border ${
                item.movementType === "SALE" || item.movementType === "DAMAGE"
                  ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900"
              }`}
            >
              {item.movementType}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "quantityChange",
      header: "Qty Change",
      render: (item) => (
        <span
          className={`font-mono font-semibold text-sm ${
            item.quantityChange >= 0
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {item.quantityChange >= 0 ? `+${item.quantityChange}` : item.quantityChange}
        </span>
      ),
    },
    {
      key: "previousStock",
      header: "Previous -> New",
      render: (item) => (
        <span className="font-mono text-xs text-muted-foreground">
          {item.previousStock} → <strong className="text-foreground">{item.newStock}</strong>
        </span>
      ),
    },
    {
      key: "reason",
      header: "Audit Rationale & Waybill Reference",
      render: (item) => (
        <span className="text-xs text-muted-foreground max-w-md block">
          {item.reason || "Scheduled inventory count check"}
        </span>
      ),
    },
    {
      key: "adminName",
      header: "Auditing Officer",
      render: (item) => <span className="text-xs font-medium text-foreground">{item.adminName}</span>,
    },
    {
      key: "createdAt",
      header: "Timestamp",
      render: (item) => <span className="text-xs text-muted-foreground">{item.createdAt}</span>,
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
        title="Warehouse Inventory & Stock Control"
        description="Authoritative multi-hub inventory tracking and `InventoryMovement` audit log across Ado-Ekiti & Lagos corridors"
        actions={
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("STOCK")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "STOCK"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Active Warehouse Stock ({stockItems.length})
            </button>
            <button
              onClick={() => setActiveTab("LOGS")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "LOGS"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Movement Audit Logs ({movementLogs.length})
            </button>
          </div>
        }
      />

      {/* Search and Hub Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search SKU or product name across warehouses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 rounded-lg border border-border bg-background py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {activeTab === "STOCK" && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Warehouse Location:</span>
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="ALL">All Flagship Hubs ({stockItems.length})</option>
              <option value="ADO_EKITI">Ado-Ekiti Flagship Hub (Zone A)</option>
              <option value="LAGOS">Lagos Distribution Center (Depot 2)</option>
            </select>
          </div>
        )}
      </div>

      {/* Content Table */}
      <div className="rounded-xl bg-card border border-border p-5 sm:p-6 shadow-sm">
        {activeTab === "STOCK" ? (
          <AdminTable
            data={filteredStock}
            columns={stockColumns}
            keyField="id"
            tabs={[
              { id: "ALL", label: "All Stock Items", count: filteredStock.length },
              {
                id: "LOW",
                label: "Low Stock Alerts",
                count: filteredStock.filter((i) => i.status === "LOW_STOCK" || i.status === "OUT_OF_STOCK").length,
              },
            ]}
            activeTab="ALL"
            onTabChange={() => {}}
          />
        ) : (
          <AdminTable
            data={filteredLogs}
            columns={logColumns}
            keyField="id"
            tabs={[
              { id: "ALL", label: "All Movement Logs", count: filteredLogs.length },
            ]}
            activeTab="ALL"
            onTabChange={() => {}}
          />
        )}
      </div>

      {/* Stock Adjustment Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem ? `Adjust Stock: ${selectedItem.sku}` : "Stock Adjustment"}
        size="md"
      >
        {selectedItem && (
          <form onSubmit={handleSubmitAdjustment} className="space-y-4 text-xs">
            <div className="p-3.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground text-sm">
                  {selectedItem.productName}
                </div>
                <div className="text-muted-foreground font-mono mt-0.5">
                  Current Hub Stock: <strong className="text-primary">{selectedItem.stockQuantity} units</strong> ({selectedItem.warehouseLocation})
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-medium uppercase tracking-wider text-muted-foreground">
                Movement Type *
              </label>
              <select
                value={adjustmentType}
                onChange={(e) => setAdjustmentType(e.target.value as any)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="RESTOCK">RESTOCK (Factory Direct Delivery to Hub)</option>
                <option value="PURCHASE">PURCHASE (Direct Supplier PO Check-in)</option>
                <option value="DAMAGE">DAMAGE / SHRINKAGE (Deduct Stock)</option>
                <option value="MANUAL_ADJUSTMENT">MANUAL_ADJUSTMENT (Auditor Count Reconciliation)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-medium uppercase tracking-wider text-muted-foreground">
                Quantity Change *
              </label>
              <input
                type="number"
                min={1}
                required
                value={adjustmentQty}
                onChange={(e) => setAdjustmentQty(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-medium uppercase tracking-wider text-muted-foreground">
                Audit Reason / Waybill Reference *
              </label>
              <textarea
                rows={3}
                required
                value={adjustmentReason}
                onChange={(e) => setAdjustmentReason(e.target.value)}
                placeholder="e.g. Shipment #SH-9921 arrived at Ado-Ekiti Flagship Hub from Apple Supplier"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
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
                Log Movement & Update Stock
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
