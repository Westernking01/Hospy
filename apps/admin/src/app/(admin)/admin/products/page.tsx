"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Package,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Download,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { AdminModal } from "@/components/admin/admin-modal";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminService, AdminProductItem } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminProductsDirectoryPage() {
  const [products, setProducts] = useState<AdminProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<AdminProductItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await adminService.getProducts(searchQuery, activeTab);
      setProducts(data);
    } catch (err) {
      console.error("Failed to load catalog SKUs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, activeTab]);

  const formatNGN = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleStatusChange = (productId: string, newStatus: "PUBLISHED" | "DRAFT" | "ARCHIVED") => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: newStatus } : p))
    );
    setToastMessage(`Product status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to archive and remove this SKU from active store inventory?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setToastMessage("Product SKU archived successfully");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const columns: Column<AdminProductItem>[] = [
    {
      key: "name",
      header: "Product SKU & Title",
      render: (item) => (
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <Package className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <Link
              href={`/admin/products/${item.id}`}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-0.5">
              <span>{item.sku}</span>
              <span>•</span>
              <span>{item.categoryName}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      header: "Pricing (NGN)",
      render: (item) => (
        <div>
          <div className="font-semibold text-foreground">
            {formatNGN(item.price)}
          </div>
          {item.compareAtPrice && (
            <div className="text-xs text-muted-foreground line-through">
              {formatNGN(item.compareAtPrice)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "stockQuantity",
      header: "Hub Stock Level",
      render: (item) => {
        const isLow = item.stockQuantity < 5;
        const isOut = item.stockQuantity <= 0;
        return (
          <div className="flex items-center gap-2">
            <span
              className={`font-mono font-semibold px-2.5 py-1 rounded-md text-xs ${
                isOut
                  ? "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                  : isLow
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                  : "bg-muted text-foreground"
              }`}
            >
              {item.stockQuantity} units
            </span>
            {isLow && !isOut && (
              <span title="Low Stock Warning">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      header: "Created Date",
      render: (item) => <span className="text-xs text-muted-foreground">{item.createdAt}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (item) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => {
              setSelectedProduct(item);
              setIsModalOpen(true);
            }}
            title="Quick Inspect"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <Link
            href={`/admin/products/${item.id}`}
            title="Edit SKU"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => handleDeleteProduct(item.id)}
            title="Archive Product"
            className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-foreground text-background shadow-lg border border-border flex items-center gap-2 text-xs font-medium animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <PageHeader
        title="Catalog Products Directory"
        description="Authoritative SKU catalog across Ado-Ekiti Flagship Hub & Lagos distribution centers"
        actions={
          <>
            <button
              onClick={() => alert("CSV Export triggered for current catalog view")}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Catalog CSV</span>
            </button>
            <Link
              href="/admin/products/new"
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New SKU</span>
            </Link>
          </>
        }
      />

      {/* Filter Toolbar */}
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by SKU, product name, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </span>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="ALL">All SKUs ({products.length})</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Drafts & Review</option>
            <option value="ARCHIVED">Archived / Hidden</option>
          </select>
        </div>
      </Card>

      {/* Main Table Section */}
      <Card flush className="p-6">
        <AdminTable
          data={products}
          columns={columns}
          keyField="id"
          tabs={[
            { id: "ALL", label: "All Products", count: products.length },
            { id: "PUBLISHED", label: "Published", count: products.filter((p) => p.status === "PUBLISHED").length },
            { id: "DRAFT", label: "Drafts", count: products.filter((p) => p.status === "DRAFT").length },
            { id: "ARCHIVED", label: "Archived", count: products.filter((p) => p.status === "ARCHIVED").length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </Card>

      {/* Quick Inspect Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProduct ? `SKU Inspection: ${selectedProduct.sku}` : "SKU Details"}
        size="lg"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/40 border border-border">
              <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden shrink-0">
                <img
                  src={selectedProduct.imageUrl || "/branding/placeholder-square.jpg"}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-foreground">
                  {selectedProduct.name}
                </h3>
                <div className="text-xs text-muted-foreground font-mono">
                  SKU: {selectedProduct.sku} | Category: {selectedProduct.categoryName}
                </div>
                <div className="text-sm font-semibold text-primary pt-1">
                  {formatNGN(selectedProduct.price)}
                  {selectedProduct.compareAtPrice && (
                    <span className="text-xs text-muted-foreground line-through ml-2 font-normal">
                      {formatNGN(selectedProduct.compareAtPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg bg-muted/40 border border-border space-y-1">
                <span className="text-muted-foreground">Warehouse Stock (Zone A & Depot)</span>
                <div className="text-sm font-semibold text-foreground font-mono">
                  {selectedProduct.stockQuantity} units available
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-muted/40 border border-border space-y-1">
                <span className="text-muted-foreground">Current Catalog Status</span>
                <div className="pt-0.5">
                  <StatusBadge status={selectedProduct.status} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(selectedProduct.id, "PUBLISHED")}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Publish SKU
                </button>
                <button
                  onClick={() => handleStatusChange(selectedProduct.id, "DRAFT")}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Set as Draft
                </button>
              </div>
              <Link
                href={`/admin/products/${selectedProduct.id}`}
                className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Full Edit Form →
              </Link>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
