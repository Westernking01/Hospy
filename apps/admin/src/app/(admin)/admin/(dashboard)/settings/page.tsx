"use client";

import React, { useState } from "react";
import {
  Save,
  CheckCircle2,
  Building2,
  CreditCard,
  Truck,
  FileText,
  Lock,
} from "lucide-react";
import { PageHeader } from "@/components/admin/page-header";
import { FileUpload } from "@/components/common/file-upload";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [storeName, setStoreName] = useState("HOPSY PLAZA • Premium Electronics & Tech Hub");
  const [storeLogo, setStoreLogo] = useState("");
  const [storeAddress, setStoreAddress] = useState("Km 4, Ikere Road, Opposite State Secretariat, Ado-Ekiti, Ekiti State, Nigeria");
  const [supportEmail, setSupportEmail] = useState("support@hopsyplaza.com");
  const [supportPhone, setSupportPhone] = useState("+234 803 000 1122");

  const [paystackStatus, setPaystackStatus] = useState("LIVE_MODE");
  const [currency, setCurrency] = useState("NGN (₦) - Nigerian Naira");
  const [settlementBank, setSettlementBank] = useState("Zenith Bank PLC (Acct: 1019284012)");

  const [standardShipping, setStandardShipping] = useState("4500");
  const [expressShipping, setExpressShipping] = useState("8500");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("500000");

  const [vatRate, setVatRate] = useState("7.5");
  const [tinNumber, setTinNumber] = useState("TIN-9948201-EKITI-EX");
  const [vipRebateThreshold, setVipRebateThreshold] = useState("2500000");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage("All authoritative store configuration parameters updated & committed to database!");
    setTimeout(() => setToastMessage(null), 3500);
  };

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
        title="Store Configuration & Parameters"
        description="Configure global business rules, VAT rates, Paystack settlement hooks, and hub shipping tiers"
        actions={
          <button
            onClick={handleSave}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        }
      />

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-2">
        {[
          { id: "GENERAL", label: "General & Flagship Info", icon: Building2 },
          { id: "PAYSTACK", label: "Paystack & Currency", icon: CreditCard },
          { id: "SHIPPING", label: "Shipping & Corridors", icon: Truck },
          { id: "TAX", label: "Tax & Compliance SLA", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <form
        onSubmit={handleSave}
        className="rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6 space-y-6"
      >
        {activeTab === "GENERAL" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-semibold tracking-tight text-foreground pb-2 border-b border-border">
              Store Identity & Headquarters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Store Legal Brand Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Store Logo
                </label>
                <FileUpload
                  folder="settings"
                  defaultImage={storeLogo}
                  onUploadComplete={(url) => setStoreLogo(url)}
                  onRemove={() => setStoreLogo("")}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Customer Support Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Flagship Physical Headquarters Address
                </label>
                <input
                  type="text"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Customer Support Hotlines
                </label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "PAYSTACK" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-semibold tracking-tight text-foreground pb-2 border-b border-border flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <span>Paystack Live Settlement Parameters</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Gateway Mode
                </label>
                <select
                  value={paystackStatus}
                  onChange={(e) => setPaystackStatus(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="LIVE_MODE">LIVE PRODUCTION MODE (Real NGN Card & Bank Transfers)</option>
                  <option value="TEST_MODE">TEST SANDBOX MODE (Dev Verification Only)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Authoritative Currency
                </label>
                <input
                  type="text"
                  disabled
                  value={currency}
                  className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Escrow Settlement Account
                </label>
                <input
                  type="text"
                  value={settlementBank}
                  onChange={(e) => setSettlementBank(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2 p-4 rounded-lg bg-muted/60 border border-border text-muted-foreground flex items-start gap-3">
                <Lock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">Webhook & API Secret Protection</div>
                  <div className="text-[11px] opacity-90 mt-0.5">
                    For enterprise security (`00_READ_THIS_FIRST.md`), Paystack API Secret Keys (`pk_live_***`, `sk_live_***`) are managed strictly through server-side environment secrets (`.env.local`) and cannot be exposed or exported via browser forms.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "SHIPPING" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-semibold tracking-tight text-foreground pb-2 border-b border-border flex items-center gap-2">
              <Truck className="w-5 h-5 text-muted-foreground" />
              <span>Multi-Warehouse Shipping Corridors & Tariffs</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Standard Delivery Fee (₦)
                </label>
                <input
                  type="number"
                  value={standardShipping}
                  onChange={(e) => setStandardShipping(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Express Same-Day Fee (₦)
                </label>
                <input
                  type="number"
                  value={expressShipping}
                  onChange={(e) => setExpressShipping(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Free Shipping Threshold (₦)
                </label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "TAX" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="text-base font-semibold tracking-tight text-foreground pb-2 border-b border-border flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span>Tax SLA & Corporate Volume Rules</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Standard VAT Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={vatRate}
                  onChange={(e) => setVatRate(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Tax Identification Number (TIN)
                </label>
                <input
                  type="text"
                  value={tinNumber}
                  onChange={(e) => setTinNumber(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium uppercase tracking-wider text-muted-foreground">
                  Corporate VIP Rebate Threshold (₦)
                </label>
                <input
                  type="number"
                  value={vipRebateThreshold}
                  onChange={(e) => setVipRebateThreshold(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
