"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Plus,
  RefreshCw,
  Warehouse,
  Ticket,
  LayoutTemplate,
  ClipboardList,
} from "lucide-react";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { Card, CardHeader } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { PageHeader } from "@/components/admin/page-header";
import { adminService, AdminDashboardMetrics } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminDashboardOverview() {
  const [metrics, setMetrics] = useState<AdminDashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartRange, setChartRange] = useState<"7D" | "30D" | "90D">("7D");
  const [activeOrderTab, setActiveOrderTab] = useState("ALL");

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const data = await adminService.getDashboardOverview();
      setMetrics(data);
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const formatNGN = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  const orderColumns: Column<any>[] = [
    {
      key: "orderNumber",
      header: "Order",
      render: (item) => (
        <span className="font-mono text-sm font-medium text-foreground">
          {item.orderNumber}
        </span>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      render: (item) => (
        <div>
          <div className="font-medium text-foreground">{item.customerName}</div>
          <div className="text-xs text-muted-foreground">{item.customerEmail}</div>
        </div>
      ),
    },
    {
      key: "totalAmount",
      header: "Amount",
      render: (item) => (
        <span className="font-semibold text-foreground">
          {formatNGN(item.totalAmount)}
        </span>
      ),
    },
    {
      key: "paymentMethod",
      header: "Payment",
      render: (item) => (
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          {item.paymentMethod}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "createdAt",
      header: "Date",
      render: (item) => (
        <span className="text-xs text-muted-foreground">{item.createdAt}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      render: (item) => (
        <Link
          href={`/admin/orders/${item.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
        >
          View
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      ),
    },
  ];

  if (loading || !metrics) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading dashboard…</p>
      </div>
    );
  }

  const filteredOrders = metrics.recentOrders.filter((o) => {
    if (activeOrderTab === "ALL") return true;
    if (activeOrderTab === "PENDING") return o.status === "PAID" || o.status === "PROCESSING";
    if (activeOrderTab === "DISPATCHED") return o.status === "SHIPPED";
    if (activeOrderTab === "COMPLETED") return o.status === "DELIVERED";
    return true;
  });

  const maxRevenue = Math.max(...metrics.revenueChartData.map((d) => d.revenue), 1000000);

  const quickLinks = [
    { href: "/admin/orders", label: "Process Orders", icon: ClipboardList },
    { href: "/admin/inventory", label: "Stock Audit", icon: Warehouse },
    { href: "/admin/promotions", label: "Create Promo", icon: Ticket },
    { href: "/admin/cms", label: "Store Banner", icon: LayoutTemplate },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <PageHeader
        eyebrow="Store Command"
        title="Overview"
        description="Ado-Ekiti Flagship Hub and Lagos Distribution Depot are operational. Paystack gateway is active."
        actions={
          <>
            <button
              onClick={fetchOverview}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </Link>
          </>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title="Gross Revenue (YTD)"
          value={formatNGN(metrics.totalRevenue)}
          icon={DollarSign}
          variant="orange"
          trend={{ value: "+18.4%", direction: "up", label: "vs previous period" }}
        />
        <AdminStatCard
          title="Fulfilled Orders"
          value={metrics.totalOrders}
          icon={ShoppingBag}
          variant="navy"
          trend={{ value: "+12.1%", direction: "up", label: "fulfillment rate" }}
        />
        <AdminStatCard
          title="Active SKUs"
          value={metrics.activeProducts}
          icon={Package}
          variant="blue"
          trend={{ value: "All hubs", direction: "up", label: "synchronized" }}
        />
        <AdminStatCard
          title="Reorder Alerts"
          value={`${metrics.lowStockCount} SKUs`}
          icon={AlertTriangle}
          variant="crimson"
          trend={{ value: "Action needed", direction: "down", label: "low stock" }}
        />
      </div>

      {/* Chart + side widgets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <Card className="flex flex-col lg:col-span-2">
          <CardHeader
            title="Revenue & Order Volume"
            description="Daily order performance across the Ado-Ekiti & Lagos corridors"
            actions={
              <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/60 p-1">
                {(["7D", "30D", "90D"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setChartRange(range)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      chartRange === range
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            }
          />

          {/* Bar visualization */}
          <div className="mt-6 flex-1">
            <div className="grid h-52 grid-cols-7 items-end gap-3 px-1 sm:h-64">
              {metrics.revenueChartData.map((d, index) => {
                const barHeightPercent = Math.min(
                  100,
                  Math.max(6, (d.revenue / maxRevenue) * 100)
                );
                return (
                  <div
                    key={index}
                    className="group flex h-full flex-col items-center justify-end gap-2"
                  >
                    <div className="pointer-events-none mb-1 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-center text-[10px] font-medium text-background opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
                      <div>{formatNGN(d.revenue)}</div>
                      <div className="text-slate-300">{d.orders} orders</div>
                    </div>
                    <div className="flex h-full w-full max-w-[40px] items-end justify-center overflow-hidden rounded-md bg-muted">
                      <div
                        style={{ height: `${barHeightPercent}%` }}
                        className="w-full rounded-md bg-primary/80 transition-all duration-500 group-hover:bg-primary"
                      />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {d.date}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-sm bg-primary/80" />
                <span>Daily gross revenue</span>
              </div>
              <Link
                href="/admin/reports"
                className="flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-hover"
              >
                <span>Full financial report</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Card>

        {/* Side column */}
        <div className="space-y-6">
          {/* Hub status */}
          <Card>
            <CardHeader
              title="Flagship Hub Status"
              icon={<ShieldCheck className="h-[18px] w-[18px]" />}
              actions={<StatusBadge status="ACTIVE" tone="success" dot />}
            />
            <div className="mt-4 space-y-2.5 text-sm">
              {[
                {
                  name: "Ado-Ekiti Flagship Hub",
                  detail: "75 Ureje Road, Opposite FUTA Gate",
                  state: "Active",
                },
                {
                  name: "Lagos Distribution Depot",
                  detail: "Victoria Island Logistics Corridor",
                  state: "Active",
                },
                {
                  name: "Paystack Live Gateway",
                  detail: "Webhook TLS & 3D Secure verification",
                  state: "Connected",
                },
              ].map((hub) => (
                <div
                  key={hub.name}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 p-3"
                >
                  <div className="min-w-0">
                    <div className="truncate font-medium text-foreground">
                      {hub.name}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {hub.detail}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {hub.state}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick links */}
          <Card>
            <CardHeader title="Quick Actions" />
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {quickLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background p-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted/60"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{label}</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent orders */}
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold text-foreground">Recent Orders</h2>
            <p className="text-xs text-muted-foreground">
              Latest purchases across customer accounts
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span>View all orders</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        <AdminTable
          data={filteredOrders}
          columns={orderColumns}
          keyField="id"
          tabs={[
            { id: "ALL", label: "All Orders", count: metrics.recentOrders.length },
            {
              id: "PENDING",
              label: "Pending",
              count: metrics.recentOrders.filter(
                (o) => o.status === "PAID" || o.status === "PROCESSING"
              ).length,
            },
            {
              id: "DISPATCHED",
              label: "Shipped",
              count: metrics.recentOrders.filter((o) => o.status === "SHIPPED").length,
            },
            {
              id: "COMPLETED",
              label: "Delivered",
              count: metrics.recentOrders.filter((o) => o.status === "DELIVERED").length,
            },
          ]}
          activeTab={activeOrderTab}
          onTabChange={setActiveOrderTab}
        />
      </div>
    </div>
  );
}
