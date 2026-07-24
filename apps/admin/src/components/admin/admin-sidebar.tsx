"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/common/brand-logo";
import {
  LayoutDashboard,
  Box,
  Tags,
  Award,
  Warehouse,
  ShoppingBag,
  Users,
  MessageSquare,
  Ticket,
  FileText,
  BarChart3,
  TrendingUp,
  Bell,
  Settings,
  History,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    title: "Store Command",
    items: [
      { name: "Overview Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Catalog Management",
    items: [
      { name: "Products", href: "/admin/products", icon: Box, badge: 42 },
      { name: "Categories", href: "/admin/categories", icon: Tags },
      { name: "Brand Partners", href: "/admin/brands", icon: Award },
      {
        name: "Warehouse & Stock",
        href: "/admin/inventory",
        icon: Warehouse,
        badge: "3",
        badgeColor: "alert",
      },
    ],
  },
  {
    title: "Sales & Customers",
    items: [
      {
        name: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
        badge: "12",
        badgeColor: "warn",
      },
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Product Reviews", href: "/admin/reviews", icon: MessageSquare, badge: 4 },
      { name: "Promotions & Coupons", href: "/admin/promotions", icon: Ticket },
    ],
  },
  {
    title: "Content & Insights",
    items: [
      { name: "Storefront CMS", href: "/admin/cms", icon: FileText },
      { name: "Enterprise Reports", href: "/admin/reports", icon: BarChart3 },
      { name: "Deep Analytics", href: "/admin/analytics", icon: TrendingUp },
      { name: "Notifications", href: "/admin/notifications", icon: Bell },
    ],
  },
  {
    title: "System Administration",
    items: [
      { name: "Store Settings", href: "/admin/settings", icon: Settings },
      { name: "Audit Logs", href: "/admin/activity-logs", icon: History },
    ],
  },
];

function NavBadge({
  badge,
  badgeColor,
}: {
  badge: string | number;
  badgeColor?: string;
}) {
  const tone =
    badgeColor === "alert"
      ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
      : badgeColor === "warn"
        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
  return (
    <span
      className={cn(
        "ml-auto min-w-[1.25rem] shrink-0 rounded-md px-1.5 py-0.5 text-center text-[11px] font-semibold tabular-nums",
        tone
      )}
    >
      {badge}
    </span>
  );
}

export function AdminSidebar({
  isCollapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch {
      window.location.href = "/admin/login";
    }
  };

  const renderNavContent = (collapsed: boolean) => (
    <div className="flex h-full select-none flex-col bg-sidebar">
      {/* Brand */}
      <div
        className={cn(
          "flex h-[72px] shrink-0 items-center justify-between gap-2 border-b border-sidebar-border overflow-hidden transition-all duration-300",
          collapsed ? "px-2" : "px-4 sm:px-5"
        )}
      >
        <Link
          href="/admin"
          className="flex min-w-0 flex-1 items-center overflow-hidden rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={onCloseMobile}
        >
          <BrandLogo
            variant={collapsed ? "icon" : "horizontal"}
            size={collapsed ? "sm" : "md"}
            className="shrink-0 dark:hidden"
          />
          <BrandLogo
            variant={collapsed ? "icon" : "horizontal-white"}
            size={collapsed ? "sm" : "md"}
            className="hidden shrink-0 dark:inline-flex"
          />
        </Link>

        {/* Toggle / Close */}
        <div className="flex shrink-0 items-center">
          <button
            onClick={onToggleCollapse}
            className={cn(
              "hidden h-8 w-8 shrink-0 items-center justify-center rounded-md text-sidebar-muted outline-none transition-all duration-300 hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary md:flex",
              collapsed ? "rotate-180" : "rotate-0"
            )}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={onCloseMobile}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sidebar-muted outline-none transition-colors hover:bg-sidebar-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
        {ADMIN_NAV_GROUPS.map((group) => (
          <div key={group.title} className="mb-5 last:mb-0">
            {!collapsed && (
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted">
                {group.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onCloseMobile}
                      title={collapsed ? item.name : undefined}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        collapsed && "justify-center",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary" />
                      )}
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0",
                          isActive
                            ? "text-primary"
                            : "text-sidebar-muted group-hover:text-foreground"
                        )}
                      />
                      {!collapsed && (
                        <>
                          <span className="truncate">{item.name}</span>
                          {item.badge != null && (
                            <NavBadge
                              badge={item.badge}
                              badgeColor={item.badgeColor}
                            />
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer: profile + logout */}
      <div className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                Administrator
              </p>
              <p className="truncate text-xs text-sidebar-muted">Full access</p>
            </div>
            <button
              onClick={handleLogout}
              className="shrink-0 rounded-lg p-2 text-sidebar-muted transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center rounded-lg p-2 text-sidebar-muted transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "z-30 hidden shrink-0 border-r border-sidebar-border transition-all duration-300 md:block",
          isCollapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        {renderNavContent(isCollapsed)}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <aside className="animate-in slide-in-from-left relative z-10 flex h-full w-72 max-w-[85vw] flex-col border-r border-sidebar-border shadow-xl duration-200">
            {renderNavContent(false)}
          </aside>
        </div>
      )}
    </>
  );
}
