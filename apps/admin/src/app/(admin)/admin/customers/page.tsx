"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Mail,
  CheckCircle2,
  ExternalLink,
  UserCheck,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { AdminModal } from "@/components/admin/admin-modal";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";
import { adminService, AdminCustomerItem } from "@hopsy/commerce/src/admin/admin.service";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomerItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    adminService.getCustomers().then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  const formatNGN = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "VIP" ? "ACTIVE" : currentStatus === "ACTIVE" ? "VIP" : "ACTIVE";
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus as any } : c))
    );
    if (selectedCustomer && selectedCustomer.id === id) {
      setSelectedCustomer({ ...selectedCustomer, status: nextStatus as any });
    }
    setToastMessage(`Account status updated to ${nextStatus}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.phone && c.phone.includes(searchQuery))
  );

  const totalOrders = customers.reduce((acc, c) => acc + c.ordersCount, 0);
  const totalLTV = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const vipCount = customers.filter((c) => c.status === "VIP").length;

  const columns: Column<AdminCustomerItem>[] = [
    {
      key: "name",
      header: "Customer Name & Email",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-foreground text-sm shrink-0">
            {item.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-foreground text-sm flex items-center gap-1.5">
              <span>{item.name}</span>
              {item.status === "VIP" && <StatusBadge status="VIP" tone="purple" />}
            </div>
            <div className="text-xs text-muted-foreground font-mono flex items-center gap-1 mt-0.5">
              <Mail className="w-3 h-3" />
              <span>{item.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone Contact",
      render: (item) => (
        <span className="font-mono text-xs text-muted-foreground">
          {item.phone || "+234 803 000 8891"}
        </span>
      ),
    },
    {
      key: "ordersCount",
      header: "Orders Placed",
      render: (item) => (
        <span className="font-mono font-semibold text-foreground text-sm">
          {item.ordersCount} <span className="text-xs font-normal text-muted-foreground">orders</span>
        </span>
      ),
    },
    {
      key: "totalSpent",
      header: "Lifetime Value (LTV)",
      render: (item) => (
        <span className="font-mono font-semibold text-sm text-foreground">
          {formatNGN(item.totalSpent)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Account Standing",
      render: (item) => (
        <StatusBadge
          status={item.status}
          tone={item.status === "VIP" ? "purple" : undefined}
        />
      ),
    },
    {
      key: "joinedAt",
      header: "Registered Date",
      render: (item) => <span className="text-xs text-muted-foreground">{item.joinedAt}</span>,
    },
    {
      key: "actions",
      header: "Account Profile",
      align: "right",
      render: (item) => (
        <button
          onClick={() => {
            setSelectedCustomer(item);
            setIsModalOpen(true);
          }}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted ml-auto flex items-center gap-1.5"
        >
          <span>Inspect</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
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

      {/* Header Banner */}
      <PageHeader
        title="Customers & Enterprise Accounts Directory"
        description="Authoritative registry of corporate clients, retail buyers, and VIP lifetime standing"
        actions={
          <button
            onClick={() => alert("Initiating VIP Corporate Onboarding workflow")}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Onboard Corporate Account</span>
          </button>
        }
      />

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Total Customers
          </span>
          <div className="text-2xl font-semibold tracking-tight font-mono text-foreground">
            {customers.length}
          </div>
        </Card>

        <Card className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            VIP Enterprise Accounts
          </span>
          <div className="text-2xl font-semibold tracking-tight font-mono text-foreground">
            {vipCount} accounts
          </div>
        </Card>

        <Card className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Cumulative LTV Generated
          </span>
          <div className="text-2xl font-semibold tracking-tight font-mono text-foreground">
            {formatNGN(totalLTV)}
          </div>
        </Card>

        <Card className="space-y-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Average Order Frequency
          </span>
          <div className="text-2xl font-semibold tracking-tight font-mono text-foreground">
            {(totalOrders / (customers.length || 1)).toFixed(1)} orders / user
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="flex items-center gap-3 max-w-md">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search by customer name, email address or phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </Card>

      {/* Main Customers Table */}
      <Card>
        <AdminTable
          data={filtered}
          columns={columns}
          keyField="id"
          tabs={[
            { id: "ALL", label: "All Customers", count: filtered.length },
            { id: "VIP", label: "VIP Accounts", count: filtered.filter((c) => c.status === "VIP").length },
            { id: "ACTIVE", label: "Active Retail", count: filtered.filter((c) => c.status === "ACTIVE").length },
          ]}
          activeTab="ALL"
          onTabChange={() => {}}
        />
      </Card>

      {/* Customer Profile Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCustomer ? `Customer Profile: ${selectedCustomer.name}` : "Customer Details"}
        size="md"
      >
        {selectedCustomer && (
          <div className="space-y-6 text-xs">
            {/* Top Card */}
            <div className="p-5 rounded-lg bg-muted/40 border border-border flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-2xl shrink-0">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {selectedCustomer.name}
                  </h3>
                  <StatusBadge
                    status={selectedCustomer.status}
                    tone={selectedCustomer.status === "VIP" ? "purple" : undefined}
                  />
                </div>
                <div className="font-mono text-muted-foreground">{selectedCustomer.email}</div>
                <div className="font-mono text-muted-foreground">Tel: {selectedCustomer.phone || "+234 803 000 8891"}</div>
              </div>
            </div>

            {/* Standing summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-1">
                <span className="font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                  Total Orders Placed
                </span>
                <div className="text-xl font-semibold font-mono text-foreground">
                  {selectedCustomer.ordersCount} orders
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-1">
                <span className="font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                  Cumulative LTV
                </span>
                <div className="text-xl font-semibold font-mono text-foreground">
                  {formatNGN(selectedCustomer.totalSpent)}
                </div>
              </div>
            </div>

            {/* Action Bar inside modal */}
            <div className="p-4 rounded-lg bg-muted/40 border border-border flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">Manage Account Standing</div>
                <div className="text-[11px] text-muted-foreground">
                  Toggle between Standard Active and Enterprise VIP status
                </div>
              </div>
              <button
                onClick={() => handleToggleStatus(selectedCustomer.id, selectedCustomer.status)}
                className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Toggle Status ({selectedCustomer.status === "VIP" ? "Set Active" : "Promote to VIP"})
              </button>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Close Profile
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
