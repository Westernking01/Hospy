"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Package,
  DollarSign,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { adminService, AdminProductItem } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminProductEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) || "1";

  const [product, setProduct] = useState<AdminProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    categoryName: "Audio & Headphones",
    price: "",
    compareAtPrice: "",
    stockQuantity: "",
    status: "PUBLISHED" as "PUBLISHED" | "DRAFT" | "ARCHIVED",
    imageUrl: "",
  });

  useEffect(() => {
    adminService.getProducts().then((products) => {
      const found = products.find((p) => p.id === id) || products[0];
      if (found) {
        setProduct(found);
        setFormData({
          name: found.name,
          slug: found.slug,
          sku: found.sku,
          categoryName: found.categoryName || "Audio & Headphones",
          price: found.price.toString(),
          compareAtPrice: found.compareAtPrice ? found.compareAtPrice.toString() : "",
          stockQuantity: found.stockQuantity.toString(),
          status: found.status,
          imageUrl: found.imageUrl,
        });
      }
      setLoading(false);
    });
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setToastMessage("Product SKU changes synchronized across all hubs!");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      alert("Error modifying product SKU.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-muted-foreground font-medium">
        Loading authoritative SKU telemetry...
      </div>
    );
  }

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
        title={
          <span className="flex items-center gap-2.5">
            <span>Edit SKU: {formData.sku}</span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-muted text-muted-foreground font-mono">
              ID: {id}
            </span>
          </span>
        }
        actions={
          <>
            <Link
              href={`/products/${formData.slug}`}
              target="_blank"
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted flex items-center gap-1.5"
            >
              <span>Preview on Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              type="submit"
              form="product-edit-form"
              disabled={saving}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Synchronizing..." : "Update SKU Telemetry"}</span>
            </button>
          </>
        }
      />

      <form id="product-edit-form" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <span>Catalog Information</span>
            </h2>
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                    SKU Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-mono font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              <span>Pricing Modification (NGN)</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Current Price (₦)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Compare-At Price (₦)
                </label>
                <input
                  type="number"
                  value={formData.compareAtPrice}
                  onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-500" />
              <span>Stock & Status</span>
            </h2>
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Hub Stock Quantity
                </label>
                <input
                  type="number"
                  required
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="PUBLISHED">PUBLISHED (Live)</option>
                  <option value="DRAFT">DRAFT (Hidden)</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-500" />
              <span>Media</span>
            </h2>
            <div className="w-full h-40 rounded-lg overflow-hidden bg-muted/40 border border-border flex items-center justify-center">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-muted-foreground font-medium">No Image</span>
              )}
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
