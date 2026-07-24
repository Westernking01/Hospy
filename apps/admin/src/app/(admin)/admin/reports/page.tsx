"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  CheckCircle2,
  RefreshCw,
  Plus,
  BarChart3,
  FileSpreadsheet,
} from "lucide-react";
import { AdminTable, Column } from "@/components/admin/admin-table";
import { AdminModal } from "@/components/admin/admin-modal";
import { PageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/admin/card";
import { StatusBadge } from "@/components/admin/status-badge";

interface ReportItem {
  id: string;
  reportName: string;
  category: "FINANCIAL" | "INVENTORY" | "LOGISTICS" | "SALES_TAX";
  dateRange: string;
  generatedBy: string;
  fileSize: string;
  status: "READY" | "GENERATING";
  createdAt: string;
}

const initialReports: ReportItem[] = [
  {
    id: "rep_1",
    reportName: "Sales Tax & VAT Compliance Ledger (7.5% Standard Rate)",
    category: "FINANCIAL",
    dateRange: "Q2 2026 (Apr 1 - Jun 30)",
    generatedBy: "System Auditor (Automated Cron)",
    fileSize: "2.4 MB (CSV + PDF)",
    status: "READY",
    createdAt: "Today, 06:00 AM",
  },
  {
    id: "rep_2",
    reportName: "Warehouse Inventory Shrinkage & Damage Reconciliation",
    category: "INVENTORY",
    dateRange: "Last 30 Days",
    generatedBy: "Tunde Bakare (Auditing Officer)",
    fileSize: "840 KB (CSV)",
    status: "READY",
    createdAt: "Yesterday, 04:15 PM",
  },
  {
    id: "rep_3",
    reportName: "Ado-Ekiti Flagship Hub Daily Waybill & Courier Manifest",
    category: "LOGISTICS",
    dateRange: "July 16, 2026",
    generatedBy: "Logistics Command Desk",
    fileSize: "1.1 MB (PDF)",
    status: "READY",
    createdAt: "Jul 16, 2026",
  },
  {
    id: "rep_4",
    reportName: "VIP Corporate Account Volume Rebates & LTV Summary",
    category: "SALES_TAX",
    dateRange: "YTD 2026 (Jan 1 - Jul 15)",
    generatedBy: "Chief Adebayo Williams (Self-Serve)",
    fileSize: "3.8 MB (CSV)",
    status: "READY",
    createdAt: "Jul 14, 2026",
  },
];

export default function AdminReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>(initialReports);
  const [activeTab, setActiveTab] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New report form state
  const [reportType, setReportType] = useState<ReportItem["category"]>("FINANCIAL");
  const [customName, setCustomName] = useState("Gross Sales & Net Profit Margin Analysis");
  const [datePeriod, setDatePeriod] = useState("Last 7 Days");

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: ReportItem = {
      id: "rep_" + Date.now(),
      reportName: customName,
      category: reportType,
      dateRange: datePeriod,
      generatedBy: "Current Super Administrator",
      fileSize: "Calculating...",
      status: "GENERATING",
      createdAt: "Just now",
    };

    setReports((prev) => [newReport, ...prev]);
    setIsModalOpen(false);
    setToastMessage(`Report '${customName}' generation queued.`);

    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) => (r.id === newReport.id ? { ...r, status: "READY", fileSize: "1.5 MB (CSV)" } : r))
      );
      setToastMessage(`Report '${customName}' is ready for download!`);
      setTimeout(() => setToastMessage(null), 3500);
    }, 2500);
  };

  const handleDownload = (name: string) => {
    setToastMessage(`Downloading authoritative report: ${name}...`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filtered = activeTab === "ALL" ? reports : reports.filter((r) => r.category === activeTab);

  const columns: Column<ReportItem>[] = [
    {
      key: "reportName",
      header: "Authoritative Report Name & Category",
      render: (item) => (
        <div>
          <div className="font-semibold text-foreground text-sm flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-primary shrink-0" />
            <span>{item.reportName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-1">
            <span className="font-medium text-foreground">
              {item.category.replace(/_/g, " ")}
            </span>
            <span>•</span>
            <span>Period: {item.dateRange}</span>
          </div>
        </div>
      ),
    },
    {
      key: "generatedBy",
      header: "Requested / Audited By",
      render: (item) => (
        <span className="text-xs font-medium text-foreground">
          {item.generatedBy}
        </span>
      ),
    },
    {
      key: "fileSize",
      header: "Format & Size",
      render: (item) => <span className="font-mono text-xs text-muted-foreground">{item.fileSize}</span>,
    },
    {
      key: "status",
      header: "Compilation Status",
      render: (item) => (
        <StatusBadge
          status={item.status}
          tone={item.status === "READY" ? "success" : "warning"}
          icon={
            item.status === "READY" ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            )
          }
        />
      ),
    },
    {
      key: "createdAt",
      header: "Generated Date",
      render: (item) => <span className="text-xs text-muted-foreground">{item.createdAt}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (item) => (
        <button
          onClick={() => handleDownload(item.reportName)}
          disabled={item.status !== "READY"}
          className={`rounded-lg px-3 py-2 text-xs font-medium flex items-center gap-1.5 ml-auto transition-colors ${
            item.status === "READY"
              ? "bg-primary text-primary-foreground hover:bg-primary-hover"
              : "bg-muted/40 text-muted-foreground cursor-not-allowed"
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Statement</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-foreground text-background shadow-lg border border-border flex items-center gap-2 text-xs font-medium animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <PageHeader
        title={
          <span className="flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-primary" />
            <span>Enterprise Financial & Compliance Reports</span>
          </span>
        }
        description="Authoritative VAT statements, stock count reconciliations, and executive intelligence CSVs"
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Compile New Audit Report</span>
          </button>
        }
      />

      {/* Main Table */}
      <Card flush className="p-6">
        <AdminTable
          data={filtered}
          columns={columns}
          keyField="id"
          tabs={[
            { id: "ALL", label: "All Statements", count: reports.length },
            { id: "FINANCIAL", label: "Financial & Tax", count: reports.filter((r) => r.category === "FINANCIAL").length },
            { id: "INVENTORY", label: "Inventory Audit", count: reports.filter((r) => r.category === "INVENTORY").length },
            { id: "LOGISTICS", label: "Waybill Manifests", count: reports.filter((r) => r.category === "LOGISTICS").length },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </Card>

      {/* Compile Report Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Compile Authoritative Audit Statement"
        size="md"
      >
        <form onSubmit={handleCreateReport} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Report Category *
            </label>
            <select
              value={reportType}
              onChange={(e) => {
                const val = e.target.value as any;
                setReportType(val);
                if (val === "FINANCIAL") setCustomName("Gross Revenue & Paystack Settlement Statement");
                if (val === "INVENTORY") setCustomName("Flagship Hub Stock Balance & Safety Reorder Report");
                if (val === "LOGISTICS") setCustomName("Daily Courier Dispatch & Delivery SLA Manifest");
              }}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="FINANCIAL">FINANCIAL (Sales Tax, VAT & Paystack Settlements)</option>
              <option value="INVENTORY">INVENTORY (Stock Valuation & Shrinkage Check)</option>
              <option value="LOGISTICS">LOGISTICS (Ado-Ekiti & Lagos Waybill Manifests)</option>
              <option value="SALES_TAX">SALES_TAX (Corporate VIP Rebate Computations)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Custom Statement Title *
            </label>
            <input
              type="text"
              required
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-medium uppercase tracking-wider text-muted-foreground">
              Reporting Time Window *
            </label>
            <select
              value={datePeriod}
              onChange={(e) => setDatePeriod(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Today (Current Shift)">Today (Current Shift)</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Q2 2026 (Apr 1 - Jun 30)">Q2 2026 (Apr 1 - Jun 30)</option>
              <option value="YTD 2026 (Jan 1 - Present)">YTD 2026 (Jan 1 - Present)</option>
            </select>
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
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-1.5"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Compile Statement</span>
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
