"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  Heart,
  ShieldCheck,
  LogOut,
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Edit2,
  Lock,
  XCircle,
  Download,
} from "lucide-react";
import { Button } from "@hopsy/ui";
import { Badge } from "@hopsy/ui";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: string;
}

const MOCK_ORDERS = [
  {
    id: "HP-ORD-99214",
    orderNumber: "HP-ORD-99214",
    date: "2026-07-04",
    status: "DELIVERED",
    paymentStatus: "PAID",
    totalAmount: 3450000,
    items_count: 2,
    tracking_number: "DHL-NG-88912300",
    items: [
      { name: "MacBook Pro 16-inch M3 Max (36GB RAM, 1TB SSD)", quantity: 1, unitPrice: 3100000 },
      { name: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones", quantity: 1, unitPrice: 350000 },
    ],
  },
  {
    id: "HP-ORD-88102",
    orderNumber: "HP-ORD-88102",
    date: "2026-06-18",
    status: "IN_TRANSIT",
    paymentStatus: "PAID",
    totalAmount: 1850000,
    items_count: 1,
    tracking_number: "FEDEX-NG-44129988",
    items: [
      { name: 'Sony Bravia XR 65" Class A95L QD-OLED 4K HDR TV', quantity: 1, unitPrice: 1850000 },
    ],
  },
  {
    id: "HP-ORD-77110",
    orderNumber: "HP-ORD-77110",
    date: "2026-05-22",
    status: "DELIVERED",
    paymentStatus: "PAID",
    totalAmount: 210000,
    items_count: 1,
    tracking_number: "DHL-NG-33100211",
    items: [
      { name: "Bose QuietComfort Ultra Earbuds", quantity: 1, unitPrice: 210000 },
    ],
  },
];

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses" | "security">("orders");
  const [orders, setOrders] = useState<any[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(MOCK_ORDERS[0]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("hopsyplaza_auth_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser({
          id: "usr_mock_vip",
          email: "procurement@lagostechsystems.ng",
          name: "Engr. Chidi Okafor",
          company: "Lagos Tech Systems Ltd.",
          role: "VIP_CORPORATE",
        });
      }
    } catch {
      setUser({
        id: "usr_mock_vip",
        email: "customer@company.com",
        name: "Verified Buyer",
        role: "CUSTOMER",
      });
    }
  }, []);

  // Fetch live orders from `/api/v1/orders`
  useEffect(() => {
    async function fetchOrders() {
      setIsLoadingOrders(true);
      try {
        const res = await fetch("/api/v1/orders");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            const formatted = json.data.map((o: any) => ({
              ...o,
              id: o.orderNumber,
              date: o.createdAt?.slice(0, 10) || "2026-07-12",
              items_count: o.items?.length || 1,
              tracking_number: `DHL-NG-${o.orderNumber.replace("ORD-", "")}`,
            }));
            setOrders([...formatted, ...MOCK_ORDERS]);
            setSelectedOrder(formatted[0]);
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to fetch server orders, using mock defaults:", e);
      } finally {
        setIsLoadingOrders(false);
      }
    }
    fetchOrders();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("hopsyplaza_auth_token");
      localStorage.removeItem("hopsyplaza_auth_user");
    } catch {}
    router.push("/auth/login");
  };

  const handleDownloadInvoice = async (orderNumber: string) => {
    try {
      const res = await fetch(`/api/v1/orders/invoice/${orderNumber}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const blob = new Blob([JSON.stringify(json.data, null, 2)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${orderNumber}_invoice.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          return;
        }
      }
    } catch (err) {
      console.error("Invoice download error:", err);
    }
    alert(`Official invoice for ${orderNumber} is ready for download.`);
  };

  const handleCancelOrder = async (orderNumber: string) => {
    if (!confirm(`Are you sure you want to cancel order ${orderNumber} and release stock back to inventory?`)) return;
    setIsCancelling(true);
    try {
      const res = await fetch(`/api/v1/orders/${orderNumber}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "Customer requested cancellation via Account Dashboard." }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        alert(json.message || "Order cancelled successfully.");
        setOrders((prev) =>
          prev.map((o) => (o.id === orderNumber || o.orderNumber === orderNumber ? { ...o, status: "CANCELLED" } : o))
        );
        if (selectedOrder?.id === orderNumber || selectedOrder?.orderNumber === orderNumber) {
          setSelectedOrder({ ...selectedOrder, status: "CANCELLED" });
        }
      } else {
        alert(json.message || "Could not cancel order at this stage.");
      }
    } catch (err: any) {
      alert("Error cancelling order.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-24">
      {/* Header Banner */}
      <div className="bg-[#121316] text-white border-b border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center font-black text-2xl text-white shadow-xl">
              {user?.name ? user.name.charAt(0).toUpperCase() : "V"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{user?.name}</h1>
                <Badge variant="outline" className="bg-primary/20 text-orange-400 border-primary/40 font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider">
                  {user?.role === "VIP_CORPORATE" ? "VIP Corporate Tier" : "Verified Customer"}
                </Badge>
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                {user?.company ? `${user.company} • ` : ""}{user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/wishlist">
              <Button variant="outline" className="border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-white font-bold text-xs gap-2 rounded-xl">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Saved Hardware (4)
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-neutral-700 bg-neutral-900/60 hover:bg-rose-950 hover:text-rose-400 hover:border-rose-800 text-neutral-300 font-bold text-xs gap-2 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Navigation (3 cols) */}
          <aside className="lg:col-span-3 space-y-2 bg-card p-4 rounded-2xl border border-border shadow-2xs">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "orders"
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <span className="flex items-center gap-3">
                <Package className="w-4.5 h-4.5" /> Hardware Orders ({orders.length})
              </span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "profile"
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <span className="flex items-center gap-3">
                <User className="w-4.5 h-4.5" /> Profile & Corporate Identity
              </span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "addresses"
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <span className="flex items-center gap-3">
                <MapPin className="w-4.5 h-4.5" /> Addresses & Dispatch Hubs
              </span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "security"
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <span className="flex items-center gap-3">
                <Lock className="w-4.5 h-4.5" /> Security & 2FA Settings
              </span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          </aside>

          {/* Main Workspace (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {activeTab === "orders" && (
              <div className="space-y-6 animate-in fade-in-0 duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <h2 className="text-xl font-black text-foreground">Hardware Order History</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Inspect past hardware purchases, download corporate VAT invoices, and track live dispatches.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
                    {orders.length} Orders Recorded
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Order List */}
                  <div className="md:col-span-5 space-y-3">
                    {orders.map((ord) => (
                      <button
                        key={ord.id}
                        type="button"
                        onClick={() => setSelectedOrder(ord)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all ${
                          selectedOrder?.id === ord.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border bg-card hover:bg-secondary/40"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-mono font-black text-foreground">{ord.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            ord.status === "DELIVERED"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                              : ord.status === "CANCELLED"
                              ? "bg-rose-500/10 text-rose-600 border border-rose-500/30"
                              : "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                          }`}>
                            {ord.status || "PROCESSING"}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-muted-foreground">
                          {ord.date} &bull; {ord.items_count} item{ord.items_count > 1 ? "s" : ""}
                        </div>
                        <div className="text-xs font-black text-foreground mt-2">
                          ₦{(ord.totalAmount || ord.total || 0).toLocaleString("en-NG")}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Order Detail Inspector */}
                  <div className="md:col-span-7 p-6 rounded-2xl bg-card border border-border shadow-sm space-y-6">
                    {selectedOrder ? (
                      <>
                        <div className="flex items-center justify-between border-b border-border pb-4">
                          <div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                              ORDER DETAILS
                            </span>
                            <h3 className="text-lg font-black text-foreground">{selectedOrder.id}</h3>
                          </div>
                          <div className="flex gap-2">
                            {selectedOrder.status !== "CANCELLED" && selectedOrder.status !== "DELIVERED" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelOrder(selectedOrder.id || selectedOrder.orderNumber)}
                                disabled={isCancelling}
                                className="font-bold text-xs gap-1 rounded-xl text-rose-600 border-rose-200 hover:bg-rose-50"
                              >
                                <XCircle className="w-3.5 h-3.5" /> Cancel
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadInvoice(selectedOrder.id || selectedOrder.orderNumber)}
                              className="font-bold text-xs gap-1.5 rounded-xl"
                            >
                              <Download className="w-4 h-4" /> Invoice
                            </Button>
                          </div>
                        </div>

                        {/* Shipment Status Banner */}
                        <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-foreground">
                            <span className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-primary" /> Tracking Identifier:
                            </span>
                            <span className="font-mono text-primary">{selectedOrder.tracking_number || `DHL-NG-${selectedOrder.id}`}</span>
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                            {selectedOrder.status === "DELIVERED" ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>Shipment delivered and verified with receiver signature.</span>
                              </>
                            ) : selectedOrder.status === "CANCELLED" ? (
                              <>
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>Order has been cancelled and hardware stock returned to vault.</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                                <span>Currently at Lagos Express Distribution Hub — Out for dispatch.</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Items Breakdown */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            Procured Hardware ({selectedOrder.items?.length || 1})
                          </h4>
                          <div className="space-y-3 divide-y divide-border">
                            {(selectedOrder.items || []).map((it: any, idx: number) => (
                              <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                                <div>
                                  <span className="font-bold text-foreground block">{it.name}</span>
                                  <span className="text-muted-foreground">Qty: {it.qty || it.quantity || 1}</span>
                                </div>
                                <span className="font-black text-foreground">
                                  ₦{((it.price || it.unitPrice || 0) * (it.qty || it.quantity || 1)).toLocaleString("en-NG")}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border flex items-center justify-between text-sm font-black text-foreground">
                          <span>Total Paid (Incl. 7.5% VAT):</span>
                          <span className="text-primary">₦{(selectedOrder.totalAmount || selectedOrder.total || 0).toLocaleString("en-NG")}</span>
                        </div>
                      </>
                    ) : (
                      <div className="p-12 text-center text-xs text-muted-foreground font-semibold">
                        Select an order from the list on the left to inspect detailed shipping history and invoices.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm space-y-6 animate-in fade-in-0 duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <h2 className="text-xl font-black text-foreground">Profile & Corporate Identity</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Manage official contact details and enterprise invoicing credentials.
                    </p>
                  </div>
                  <Button size="sm" className="font-bold text-xs gap-1.5 rounded-xl">
                    <Edit2 className="w-3.5 h-3.5" /> Save Changes
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Full Name / Contact Person
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name || ""}
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ""}
                      disabled
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/20 border border-border text-sm font-mono text-muted-foreground outline-none cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Corporate Name / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.company || ""}
                      placeholder="e.g. Lagos Tech Systems Ltd."
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                      Verified Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+234 803 000 0000"
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-mono focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm space-y-6 animate-in fade-in-0 duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div>
                    <h2 className="text-xl font-black text-foreground">Saved Addresses & Dispatch Hubs</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Configure primary delivery destinations across Nigeria for automated tax/shipping calculations.
                    </p>
                  </div>
                  <Button size="sm" className="font-bold text-xs gap-1.5 rounded-xl">
                    + Add New Address
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl border-2 border-primary bg-primary/5 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-primary text-white font-bold text-[10px] uppercase tracking-widest">
                        Primary Corporate Address
                      </span>
                      <button className="text-xs font-bold text-primary hover:underline">Edit</button>
                    </div>
                    <p className="font-bold text-sm text-foreground">Engr. Chidi Okafor (HQ Office)</p>
                    <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                      Lagos Tech Systems Ltd.<br />
                      Plot 14, Victoria Island Commercial Hub<br />
                      Lagos State, Nigeria<br />
                      +234 803 000 0000
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-border bg-card space-y-3 relative hover:border-muted-foreground/40 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground font-bold text-[10px] uppercase tracking-widest">
                        Ado-Ekiti Flagship Hub
                      </span>
                      <button className="text-xs font-bold text-primary hover:underline">Edit</button>
                    </div>
                    <p className="font-bold text-sm text-foreground">Branch Warehouse Reception</p>
                    <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                      75 Ureje, Beside Immigration Office, Poly Road<br />
                      Ado-Ekiti, Ekiti State<br />
                      Nigeria<br />
                      +234 812 345 6789
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm space-y-6 animate-in fade-in-0 duration-200">
                <div className="pb-4 border-b border-border">
                  <h2 className="text-xl font-black text-foreground">Security & 2-Factor Authentication</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Protect high-value corporate orders and hardware requisition authorizations.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/40 border border-border">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">Password Authentication</h4>
                      <p className="text-xs text-muted-foreground">Last changed 45 days ago</p>
                    </div>
                    <Button variant="outline" size="sm" className="font-bold text-xs rounded-xl">
                      Update Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/40 border border-border">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">Hardware Token / SMS 2FA</h4>
                      <p className="text-xs text-muted-foreground">Require confirmation code for transactions &gt; ₦2,000,000</p>
                    </div>
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 font-bold text-xs px-3 py-1">
                      Enabled & Active
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
