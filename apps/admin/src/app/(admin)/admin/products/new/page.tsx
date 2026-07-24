"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Package,
  DollarSign,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { adminService } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminProductCreatePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    sku: "HPZ-SKU-" + Math.floor(1000 + Math.random() * 9000),
    categoryName: "Audio & Headphones",
    price: "",
    compareAtPrice: "",
    costPrice: "",
    stockQuantity: "25",
    reorderThreshold: "5",
    warehouseLocation: "Ado-Ekiti Flagship Hub (Zone A)",
    status: "PUBLISHED",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    description: "Enterprise-grade professional audio and networking hardware engineered for corporate deployments.",
  });

  useEffect(() => {
    adminService.getCategories().then((data) => setCategories(data));
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, title: val, slug: autoSlug }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      setToastMessage("Product SKU published successfully across enterprise hubs!");
      setTimeout(() => {
        router.push("/admin/products");
      }, 1200);
    } catch (err) {
      alert("Error saving product SKU.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate profit margin %
  const priceNum = parseFloat(formData.price) || 0;
  const costNum = parseFloat(formData.costPrice) || 0;
  const marginPercent = priceNum > 0 ? Math.round(((priceNum - costNum) / priceNum) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-lg bg-foreground text-background shadow-lg border border-border flex items-center gap-2.5 text-xs font-medium animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <PageHeader
        eyebrow={
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors normal-case tracking-normal"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog Directory</span>
          </Link>
        }
        title="Create New Product SKU"
        actions={
          <>
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="product-create-form"
              disabled={loading}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Publishing SKU...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save & Publish SKU</span>
                </>
              )}
            </button>
          </>
        }
      />

      <form id="product-create-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Basic Information & Pricing */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Basic Info */}
          <Card className="space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <span>1. Basic Product Information</span>
            </h2>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Sony WH-1000XM5 Wireless Noise-Canceling Headphones"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Stock Keeping Unit (SKU) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Product Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </Card>

          {/* Section 2: Pricing & Profit Margin */}
          <Card className="space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <span>2. Pricing & Cost Margin Analysis</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Selling Price (₦) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 450000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Compare-At Price (₦)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 520000"
                  value={formData.compareAtPrice}
                  onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Unit Cost Price (₦)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 360000"
                  value={formData.costPrice}
                  onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {priceNum > 0 && costNum > 0 && (
              <div className="p-3.5 rounded-lg bg-muted/60 border border-border flex items-center justify-between text-xs font-medium">
                <span className="text-foreground">
                  Calculated Gross Profit Margin:
                </span>
                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                  {marginPercent}% (₦{(priceNum - costNum).toLocaleString()})
                </span>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Inventory Hub, Category & Media */}
        <div className="space-y-6">
          {/* Section 3: Organization & Category */}
          <Card className="space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              <span>3. Catalog & Hub Assignment</span>
            </h2>

            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Primary Category *
                </label>
                <select
                  value={formData.categoryName}
                  onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="Audio & Headphones">Audio & Headphones</option>
                  <option value="Enterprise Servers & IT">Enterprise Servers & IT</option>
                  <option value="High-Performance Laptops">High-Performance Laptops</option>
                  <option value="Displays & Monitors">Displays & Monitors</option>
                  <option value="Smart Wearables & IoT">Smart Wearables & IoT</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Assigned Flagship Warehouse Hub
                </label>
                <select
                  value={formData.warehouseLocation}
                  onChange={(e) => setFormData({ ...formData, warehouseLocation: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="Ado-Ekiti Flagship Hub (Zone A)">Ado-Ekiti Flagship Hub (Zone A)</option>
                  <option value="Lagos Distribution Center (Depot 2)">Lagos Distribution Center (Depot 2)</option>
                  <option value="Abuja Corporate Dispatch Facility">Abuja Corporate Dispatch Facility</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Low Alert Limit
                  </label>
                  <input
                    type="number"
                    value={formData.reorderThreshold}
                    onChange={(e) => setFormData({ ...formData, reorderThreshold: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 4: Media & Status */}
          <Card className="space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-500" />
              <span>4. Product Media Preview</span>
            </h2>

            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Image URL (Unsplash / CDN)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Preview Box */}
              <div className="w-full h-44 rounded-lg bg-muted/40 border border-dashed border-border overflow-hidden relative flex items-center justify-center">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground font-medium">No Image URL</span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-border space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Publishing Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: "PUBLISHED" })}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors ${
                    formData.status === "PUBLISHED"
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  PUBLISHED
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: "DRAFT" })}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors ${
                    formData.status === "DRAFT"
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-background border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  DRAFT (Review)
                </button>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
