"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { AdminModal } from "@/components/admin/admin-modal";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminService } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Category State
  const [newCat, setNewCat] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
  });

  const loadCategories = async () => {
    setLoading(true);
    const data = await adminService.getCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: "cat_" + Date.now(),
      name: newCat.name,
      slug: newCat.slug || newCat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: newCat.description,
      imageUrl: newCat.imageUrl,
      itemCount: 0,
      status: "ACTIVE",
    };
    setCategories((prev) => [created, ...prev]);
    setIsModalOpen(false);
    setNewCat({ name: "", slug: "", description: "", imageUrl: "" });
    setToastMessage(`Category '${created.name}' added successfully!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove category '${name}'?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setToastMessage(`Category '${name}' removed.`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Category & Visual",
      render: (item) => (
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <Layers className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <div className="font-semibold text-foreground text-sm">{item.name}</div>
            <div className="text-xs text-muted-foreground font-mono mt-0.5">/{item.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (item) => (
        <span className="text-xs text-muted-foreground max-w-md line-clamp-2">
          {item.description || "Enterprise category collection"}
        </span>
      ),
    },
    {
      key: "itemCount",
      header: "Assigned SKUs",
      render: (item) => (
        <span className="font-mono font-semibold text-foreground text-xs">
          {item.itemCount} SKUs
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => <StatusBadge status={item.status || "ACTIVE"} />,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (item) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => alert(`Edit category: ${item.name}`)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Edit Category"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item.id, item.name)}
            className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
            title="Delete Category"
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

      <PageHeader
        title="Store Categories Directory"
        description="Organize catalog SKUs into clear, structured navigation hierarchies for enterprise buyers"
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Category</span>
          </button>
        }
      />

      {/* Search */}
      <Card className="flex items-center gap-3 max-w-md p-4">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Filter categories by title or slug..."
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
            { id: "ALL", label: "All Categories", count: filtered.length },
          ]}
          activeTab="ALL"
          onTabChange={() => {}}
        />
      </Card>

      {/* Create Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Store Category"
      >
        <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={newCat.name}
              onChange={(e) => {
                const val = e.target.value;
                setNewCat({
                  ...newCat,
                  name: val,
                  slug: val.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                });
              }}
              placeholder="e.g. Enterprise Networking Equipment"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={newCat.slug}
              onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Description
            </label>
            <textarea
              rows={3}
              value={newCat.description}
              onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Banner / Icon URL
            </label>
            <input
              type="url"
              value={newCat.imageUrl}
              onChange={(e) => setNewCat({ ...newCat, imageUrl: e.target.value })}
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
              Save Category
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
