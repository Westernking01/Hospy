"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Plus,
  Bell,
  ChevronRight,
  Box,
  ShoppingBag,
  Warehouse,
  FileText,
  X,
  ExternalLink,
} from "lucide-react";

const SEGMENT_LABELS: Record<string, string> = {
  products: "Products",
  new: "Add New",
  categories: "Categories",
  brands: "Brand Partners",
  inventory: "Warehouse & Stock",
  orders: "Orders",
  customers: "Customers",
  reviews: "Product Reviews",
  promotions: "Promotions & Coupons",
  cms: "Storefront CMS",
  reports: "Enterprise Reports",
  analytics: "Deep Analytics",
  notifications: "Notifications",
  settings: "Store Settings",
  "activity-logs": "Audit Logs",
  audit: "Audit Logs",
};

function formatSegment(seg: string) {
  return (
    SEGMENT_LABELS[seg] ??
    seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ")
  );
}

export function AdminHeader({
  onOpenMobileSidebar,
}: {
  onOpenMobileSidebar: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const pathSegments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "admin");

  const currentTitle =
    pathSegments.length > 0
      ? formatSegment(pathSegments[pathSegments.length - 1])
      : "Overview";

  // Cmd/Ctrl+K opens the quick search palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    router.push(`/admin/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const quickLinks = [
    { href: "/admin/products", label: "All Products", icon: Box },
    { href: "/admin/orders", label: "All Orders", icon: ShoppingBag },
    { href: "/admin/inventory", label: "Warehouse Stock", icon: Warehouse },
    { href: "/admin/reports", label: "Export Reports", icon: FileText },
  ];

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
        {/* Left: menu + breadcrumbs / title */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <nav
              aria-label="Breadcrumb"
              className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex"
            >
              <Link href="/admin" className="transition-colors hover:text-foreground">
                Home
              </Link>
              {pathSegments.map((segment, idx) => {
                const url = `/admin/${pathSegments.slice(0, idx + 1).join("/")}`;
                const isLast = idx === pathSegments.length - 1;
                return (
                  <React.Fragment key={url}>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
                    {isLast ? (
                      <span className="font-medium text-foreground">
                        {formatSegment(segment)}
                      </span>
                    ) : (
                      <Link
                        href={url}
                        className="transition-colors hover:text-foreground"
                      >
                        {formatSegment(segment)}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
            <h2 className="truncate text-sm font-semibold text-foreground sm:hidden">
              {currentTitle}
            </h2>
          </div>
        </div>

        {/* Center: search trigger */}
        <div className="mx-2 hidden max-w-md flex-1 md:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="group flex w-full items-center justify-between rounded-lg border border-border bg-muted/60 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Search orders, products, customers…</span>
            </span>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/admin/products/new"
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover sm:flex"
          >
            <Plus className="h-4 w-4" />
            <span>New Product</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            title="View live storefront"
            className="rounded-lg border border-border bg-background p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="View live storefront"
          >
            <ExternalLink className="h-[18px] w-[18px]" />
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen((v) => !v)}
              className="relative rounded-lg border border-border bg-background p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-background bg-primary" />
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 z-40 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <span className="text-sm font-semibold text-foreground">
                      Notifications
                    </span>
                    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-semibold text-primary">
                      3 new
                    </span>
                  </div>
                  <div className="max-h-72 divide-y divide-border overflow-y-auto">
                    {[
                      {
                        title: "Low stock alert",
                        body: "Sony WH-1000XM5 dropped below reorder threshold.",
                        time: "2m ago",
                      },
                      {
                        title: "New order received",
                        body: "Order #HP-10482 awaiting fulfillment.",
                        time: "18m ago",
                      },
                      {
                        title: "Review needs moderation",
                        body: "A new 2-star review was flagged.",
                        time: "1h ago",
                      },
                    ].map((n) => (
                      <div
                        key={n.title}
                        className="px-4 py-3 transition-colors hover:bg-muted/60"
                      >
                        <p className="text-sm font-medium text-foreground">
                          {n.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {n.body}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground/70">
                          {n.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/admin/notifications"
                    onClick={() => setNotificationsOpen(false)}
                    className="block border-t border-border px-4 py-2.5 text-center text-xs font-medium text-primary transition-colors hover:bg-muted/60"
                  >
                    View all notifications
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <Link
            href="/admin/settings"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            title="Administrator"
            aria-label="Account settings"
          >
            A
          </Link>
        </div>
      </header>

      {/* Quick search command palette */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-24">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="animate-in zoom-in-95 relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-popover shadow-xl duration-150">
            <form
              onSubmit={handleQuickSearchSubmit}
              className="flex items-center gap-3 border-b border-border p-3"
            >
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by SKU, product, order # or customer…"
                autoFocus
                className="w-full border-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </form>

            <div className="p-3">
              <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
                Quick navigation
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-2 rounded-lg border border-border bg-background p-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted/60"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
