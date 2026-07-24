"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Button } from "@hopsy/ui";
import { Badge } from "@hopsy/ui";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("procurement");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Contact & Support Channels</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-3 py-1">
            24/7 DEDICATED ASSISTANCE
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">
            Get in Touch with Hopsy Plaza
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Whether inquiring about corporate tender quotes, verifying hardware serial numbers, or booking an executive showroom demonstration, our customer experience officers are ready to assist.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-foreground">Corporate Hotline & Sales</h3>
              <p className="text-xs text-muted-foreground mt-1">Direct voice connection to our procurement desk and warranty engineers.</p>
            </div>
            <div className="space-y-1 text-xs font-mono font-bold text-foreground pt-2">
              <div>+234 (0) 803 123 4567 (Main Office)</div>
              <div>+234 (0) 909 888 7766 (Abuja Branch)</div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-foreground">Email Support Channels</h3>
              <p className="text-xs text-muted-foreground mt-1">Fast 2-hour response turnaround on business days for formal RFQs.</p>
            </div>
            <div className="space-y-1 text-xs font-mono font-bold text-foreground pt-2">
              <div>enterprise@hopsyplaza.com (B2B / RFQ)</div>
              <div>support@hopsyplaza.com (Warranty & Help)</div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 hover:border-primary transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-foreground">Operating Showroom Hours</h3>
              <p className="text-xs text-muted-foreground mt-1">Walk-ins and scheduled corporate hardware testing sessions.</p>
            </div>
            <div className="space-y-1 text-xs font-semibold text-foreground pt-2">
              <div>Monday &ndash; Friday: 8:00 AM &ndash; 6:30 PM</div>
              <div>Saturday: 9:00 AM &ndash; 4:00 PM (Lagos only)</div>
            </div>
          </div>
        </div>

        {/* Contact Form & Office Locations Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">DIRECT INQUIRY</span>
              <h3 className="text-2xl font-black text-foreground">Send a Message to Our Team</h3>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-center space-y-4 animate-in fade-in-0 duration-300">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
                <h4 className="text-lg font-black">Inquiry Ticket #HP-88910 Dispatched</h4>
                <p className="text-xs sm:text-sm text-emerald-600/90 leading-relaxed">
                  Thank you, <span className="font-bold">{name}</span>. We have assigned a support engineer to review your message regarding <span className="font-bold uppercase">{subject}</span>. You will receive an email response shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 font-bold text-xs"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Chidi Okafor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                    Inquiry Department / Subject *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-secondary/40 border border-border text-xs font-bold text-foreground focus:border-primary outline-none"
                  >
                    <option value="procurement">Corporate B2B Quotations & Tender Requirements</option>
                    <option value="warranty">Factory Warranty Claim & Hardware RMA Support</option>
                    <option value="showroom">Showroom Demonstration & Executive Booking</option>
                    <option value="general">General Order Status & Shipping Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                    Detailed Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide specific details regarding your inquiry, required hardware quantities, or tracking number..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-secondary/40 border border-border text-sm font-semibold focus:border-primary outline-none resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-13 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg gap-2 mt-2"
                >
                  <Send className="w-4 h-4" /> Dispatch Message to Support Desk
                </Button>
              </form>
            )}
          </div>

          {/* Office Showrooms Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-secondary/40 border border-border space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-foreground">Lagos Flagship Experience Center</h4>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">SHOWROOM & WAREHOUSE</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Plot 14, Victoria Island Commercial Zone, Admiralty Way, Lekki Phase 1, Lagos State, Nigeria.
              </p>

              <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between text-xs font-bold text-foreground">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> GPS Coordinates: 6.4311° N, 3.4215° E</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-secondary/40 border border-border space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-foreground">Abuja Central Procurement Hub</h4>
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">GOVERNMENT & VIP DESK</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Suit C12, Silverbird Plaza Commercial Hub, Central Business District, Abuja, Federal Capital Territory.
              </p>

              <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between text-xs font-bold text-foreground">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-500" /> GPS Coordinates: 9.0579° N, 7.4951° E</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
