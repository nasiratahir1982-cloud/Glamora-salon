"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Receipt, 
  BarChart3, 
  Wallet, 
  Plus, 
  Download, 
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  PoundSterling,
  PieChart,
  UserCheck,
  CheckCircle2,
  Edit2,
  X,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Overview", icon: BarChart3 },
  { name: "Billing & Invoices", icon: Receipt },
  { name: "Expenses", icon: Wallet },
  { name: "Staff Payouts", icon: PoundSterling },
];

const initialPayouts = [
  { id: "PAY-001", name: "Alexander Vance", role: "Master Artisan", base: 2200, commission: 450, status: "Paid", date: "2024-05-01" },
  { id: "PAY-002", name: "Olivia Sterling", role: "Senior Stylist", base: 1800, commission: 320, status: "Paid", date: "2024-05-01" },
  { id: "PAY-003", name: "Dmitri Petrov", role: "Color Expert", base: 1900, commission: 280, status: "Pending", date: "2024-05-01" },
  { id: "PAY-004", name: "Zara Hayes", role: "Spa Therapist", base: 1600, commission: 150, status: "Paid", date: "2024-05-01" },
  { id: "PAY-005", name: "Marcus Thorne", role: "Artisan Stylist", base: 1750, commission: 400, status: "Pending", date: "2024-05-01" },
];

const initialExpenses = [
  { id: "EXP-5501", name: "Premium Hair Dyes & Care", category: "Inventory", amount: 850.00, date: "2024-05-08", status: "Approved" },
  { id: "EXP-5502", name: "Dyson Blow-Dryer replacements", category: "Equipment", amount: 1200.00, date: "2024-05-07", status: "Approved" },
  { id: "EXP-5503", name: "May Salon Rent", category: "Rent", amount: 1500.00, date: "2024-05-01", status: "Approved" },
  { id: "EXP-5504", name: "Social Media Ads Campaign", category: "Marketing", amount: 480.00, date: "2024-05-09", status: "Pending" },
  { id: "EXP-5505", name: "Water & Electricity Bills", category: "Utilities", amount: 300.00, date: "2024-05-04", status: "Pending" },
];

const initialInvoices = [
  { id: "INV-8901", customer: "Sophia Reynolds", date: "2024-05-10", amount: 4500.00, status: "Paid", method: "Card" },
  { id: "INV-8902", customer: "Marcus Thorne", date: "2024-05-09", amount: 1200.00, status: "Pending", method: "Cash" },
  { id: "INV-8903", customer: "Isabella Vane", date: "2024-05-08", amount: 3850.00, status: "Paid", method: "Card" },
  { id: "INV-8904", customer: "Arthur Dent", date: "2024-05-08", amount: 900.00, status: "Cancelled", method: "-" },
  { id: "INV-8905", customer: "Elena Gilbert", date: "2024-05-07", amount: 2900.00, status: "Paid", method: "Transfer" },
];

export default function FinanceManagement() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [timeframe, setTimeframe] = useState("Last 6 Months");
  const [payouts, setPayouts] = useState(initialPayouts);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [deleteConfirmInvoiceId, setDeleteConfirmInvoiceId] = useState<string | null>(null);
  const [deleteConfirmExpenseId, setDeleteConfirmExpenseId] = useState<string | null>(null);

  const handlePayStaff = (id: string) => {
    setPayouts(payouts.map(p => p.id === id ? { ...p, status: "Paid" } : p));
  };

  const handleApproveExpense = (id: string) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...exp, status: "Approved" } : exp));
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  // Dynamic statistics calculations
  const totalRevenue = useMemo(() => {
    return invoices
      .filter(inv => inv.status !== 'Cancelled')
      .reduce((sum, inv) => sum + inv.amount, 0);
  }, [invoices]);

  const pendingBillsVal = useMemo(() => {
    return invoices
      .filter(inv => inv.status === 'Pending')
      .reduce((sum, inv) => sum + inv.amount, 0);
  }, [invoices]);

  const operationalCostsVal = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  const netProfitVal = useMemo(() => {
    return totalRevenue - operationalCostsVal;
  }, [totalRevenue, operationalCostsVal]);

  // Filtering Logic
  const filteredInvoices = invoices.filter(inv => 
    inv.customer.toLowerCase().includes(search.toLowerCase()) || 
    inv.id.toLowerCase().includes(search.toLowerCase()) ||
    inv.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
  };

  const updateStatus = (id: string, status: string) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status } : inv));
  };

  const exportReport = () => {
    // Logic for generating a "Coloured Report" or CSV
    alert("Generating premium coloured billing report... Highlighting fields and calculating totals.");
  };

  const chartData = timeframe === "5 Year Strategic Plan" ? [
    { label: "2023", val: 60, amt: "£92k" },
    { label: "2024", val: 75, amt: "£115k" },
    { label: "2025", val: 85, amt: "£140k" },
    { label: "2026", val: 90, amt: "£185k" },
    { label: "2027", val: 95, amt: "£220k" },
    { label: "2028", val: 100, amt: "£265k" },
  ] : [
    { label: "Dec", val: 40, amt: "£4.8k" },
    { label: "Jan", val: 65, amt: "£7.8k" },
    { label: "Feb", val: 45, amt: "£5.4k" },
    { label: "Mar", val: 90, amt: "£10.8k" },
    { label: "Apr", val: 75, amt: "£9.0k" },
    { label: "May", val: 100, amt: "£12.4k" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">Financial Intelligence</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Revenue tracking, billing & staff payouts</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={exportReport}
            className="btn-outline px-6 flex items-center text-[10px] uppercase font-black tracking-widest transition-all"
          >
            <Download className="w-4 h-4 mr-2 text-primary" /> Export Report
          </button>
          <Link 
            href="/admin/finances/new-invoice"
            className="btn-primary px-8 flex items-center text-[10px] uppercase font-black tracking-widest transition-all shadow-xl shadow-primary/10"
          >
            <Plus className="w-4 h-4 mr-2" /> New Invoice
          </Link>
        </div>
      </div>

      {/* 2. TAB NAVIGATION */}
      <div className="flex items-center space-x-2 p-1.5 bg-accent/20 rounded-2xl border border-border w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={cn(
              "flex items-center space-x-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              (activeTab === tab.name || (activeTab === "Billing & Invoices" && tab.name === "Billing & Invoices")) 
                ? "bg-primary text-background shadow-lg" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* 🟡 OVERVIEW TAB */}
        {activeTab === "Overview" && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { 
                  label: "Monthly Revenue", 
                  value: `£${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, 
                  growth: "+12.5%", 
                  icon: TrendingUp, 
                  color: "text-primary",
                  tab: "Billing & Invoices"
                },
                { 
                  label: "Net Profit", 
                  value: `£${netProfitVal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, 
                  growth: "+8.2%", 
                  icon: PoundSterling, 
                  color: "text-green-500",
                  action: () => setIsAuditOpen(true)
                },
                { 
                  label: "Pending Bills", 
                  value: `£${pendingBillsVal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, 
                  growth: "-5%", 
                  icon: Receipt, 
                  color: "text-amber-500",
                  tab: "Billing & Invoices",
                  action: () => setSearch("Pending")
                },
                { 
                  label: "Operational Costs", 
                  value: `£${operationalCostsVal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, 
                  growth: "+2%", 
                  icon: Wallet, 
                  color: "text-red-500",
                  tab: "Expenses"
                },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    if (stat.tab) setActiveTab(stat.tab);
                    if (stat.action) stat.action();
                  }}
                  className="luxury-card p-6 space-y-4 cursor-pointer hover:border-primary/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-accent border border-border", stat.color)}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className={cn("text-[9px] font-black px-2 py-1 rounded-full", stat.growth.startsWith('+') ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
                      {stat.growth}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                    <h4 className="text-2xl font-serif font-black">{stat.value}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 luxury-card p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-serif font-black">Revenue Analytics</h3>
                  <select 
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="bg-accent border border-border rounded-lg text-[10px] font-bold px-3 py-1 outline-none cursor-pointer"
                  >
                    <option>Last 6 Months</option>
                    <option>5 Year Strategic Plan</option>
                  </select>
                </div>
                <div className="h-[350px] w-full bg-accent/5 rounded-3xl border border-border flex flex-col relative overflow-hidden p-8">
                  <div className="flex-1 flex items-end justify-around relative z-10">
                    {chartData.map((d, i) => (
                      <div key={i} className="flex flex-col items-center group space-y-4">
                        <div className="text-[10px] font-black text-primary drop-shadow-sm">{d.amt}</div>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${d.val * 1.8}px` }} key={timeframe + i} transition={{ delay: i * 0.1, duration: 0.8 }} className="w-14 bg-gradient-to-t from-primary/10 to-primary/40 border-t-2 border-primary rounded-t-xl relative cursor-pointer" />
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{d.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="luxury-card p-8 space-y-8">
                <h3 className="text-xl font-serif font-black">Income Breakdown</h3>
                <div className="space-y-6">
                  {[
                    { label: "Skin Care Services", value: 45, color: "bg-primary" },
                    { label: "Grooming Lounge", value: 30, color: "bg-amber-500" },
                    { label: "Bridal Packages", value: 15, color: "bg-purple-500" },
                    { label: "Retail Products", value: 10, color: "bg-teal-500" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-2 bg-accent rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} className={cn("h-full rounded-full", item.color)} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <button onClick={() => setIsAuditOpen(true)} className="w-full btn-outline py-3 text-[9px] flex items-center justify-center font-black uppercase tracking-[0.2em]">
                    View Detailed Audit <ChevronRight className="w-3.5 h-3.5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 🟡 BILLING & INVOICES TAB (REDESIGNED BASED ON USER EXAMPLE) */}
        {activeTab === "Billing & Invoices" && (
          <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* 📋 INVOICE STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="luxury-card !p-8 flex items-center space-x-6 border-l-4 border-l-primary">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Invoiced (Month)</p>
                  <h4 className="text-3xl font-serif font-black text-foreground">£{invoices.reduce((acc, inv) => acc + inv.amount, 0).toFixed(2)}</h4>
                </div>
              </div>
              <div className="luxury-card !p-8 flex items-center space-x-6 border-l-4 border-l-green-500">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Paid Invoices</p>
                  <h4 className="text-3xl font-serif font-black text-foreground">{invoices.filter(i => i.status === 'Paid').length}</h4>
                </div>
              </div>
              <div className="luxury-card !p-8 flex items-center space-x-6 border-l-4 border-l-amber-500">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pending Invoices</p>
                  <h4 className="text-3xl font-serif font-black text-foreground">{invoices.filter(i => i.status === 'Pending').length}</h4>
                </div>
              </div>
            </div>

            {/* 📋 INVOICE LIST SYSTEM */}
            <div className="luxury-card !p-0 overflow-hidden">
              <div className="p-8 border-b border-border bg-accent/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="relative max-w-sm w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search by customer name or ID..." 
                    className="w-full bg-background border border-primary/30 rounded-xl py-3 px-10 text-xs font-bold focus:border-primary transition-all shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={exportReport} className="btn-outline !py-3 !px-6 text-[10px] uppercase font-black tracking-widest flex items-center border-primary/20">
                    <Download className="w-4 h-4 mr-2" /> Export CSV
                  </button>
                  <button onClick={() => window.print()} className="btn-outline !py-3 !px-6 text-[10px] uppercase font-black tracking-widest flex items-center border-primary/20">
                    <Printer className="w-4 h-4 mr-2" /> Print Report
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-accent/5 border-b border-border">
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Invoice #</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Customer</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Date</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Amount</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Payment</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-accent/5 transition-colors group">
                          <td className="p-6">
                            <span className="text-xs font-black text-primary">{inv.id}</span>
                          </td>
                          <td className="p-6">
                            <p className="text-xs font-bold text-foreground">{inv.customer}</p>
                          </td>
                          <td className="p-6 text-[11px] text-muted-foreground font-bold">{inv.date}</td>
                          <td className="p-6 font-black text-sm text-foreground">£{inv.amount.toFixed(2)}</td>
                          <td className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{inv.method}</td>
                          <td className="p-6">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                              inv.status === 'Paid' ? "bg-green-500/10 border-green-500/20 text-green-500" :
                              inv.status === 'Pending' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                              "bg-red-500/10 border-red-500/20 text-red-500"
                            )}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="p-6 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="p-2 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-lg transition-all" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-lg transition-all" title="Edit">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setDeleteConfirmInvoiceId(inv.id)}
                                className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-all" 
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-20 text-center">
                          <div className="flex flex-col items-center space-y-4 text-muted-foreground">
                            <AlertCircle className="w-12 h-12 opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">No records found matching your search.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "Expenses" && (
          <motion.div key="expenses" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* Expense Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="luxury-card !p-8 flex items-center space-x-6 border-l-4 border-l-primary">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <PoundSterling className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Expenses (Month)</p>
                  <h4 className="text-3xl font-serif font-black text-foreground">
                    £{expenses.reduce((acc, exp) => acc + exp.amount, 0).toLocaleString()}
                  </h4>
                </div>
              </div>
              <div className="luxury-card !p-8 flex items-center space-x-6 border-l-4 border-l-green-500">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Approved Expenses</p>
                  <h4 className="text-3xl font-serif font-black text-foreground">
                    £{expenses.filter(e => e.status === 'Approved').reduce((acc, e) => acc + e.amount, 0).toLocaleString()}
                  </h4>
                </div>
              </div>
              <div className="luxury-card !p-8 flex items-center space-x-6 border-l-4 border-l-amber-500">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pending Approval</p>
                  <h4 className="text-3xl font-serif font-black text-foreground">
                    £{expenses.filter(e => e.status === 'Pending').reduce((acc, e) => acc + e.amount, 0).toLocaleString()}
                  </h4>
                </div>
              </div>
            </div>

            {/* Expenses Table */}
            <div className="luxury-card !p-0 overflow-hidden">
              <div className="p-8 border-b border-border bg-accent/10 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest">Salon Operational Expenses</h3>
                <span className="text-[10px] font-bold text-muted-foreground uppercase bg-accent/50 px-4 py-2 border border-border rounded-xl">
                  {expenses.length} Records Documented
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-accent/5 border-b border-border">
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Item ID</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Description</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Category</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Date</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Amount</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {expenses.map((exp) => (
                      <tr key={exp.id} className="hover:bg-accent/5 transition-colors group">
                        <td className="p-6">
                          <span className="text-xs font-black text-primary">{exp.id}</span>
                        </td>
                        <td className="p-6">
                          <span className="text-xs font-bold text-foreground">{exp.name}</span>
                        </td>
                        <td className="p-6 text-xs text-muted-foreground font-bold">{exp.category}</td>
                        <td className="p-6 text-[11px] text-muted-foreground font-bold">{exp.date}</td>
                        <td className="p-6 text-sm text-foreground font-black">£{exp.amount.toLocaleString()}</td>
                        <td className="p-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                            exp.status === 'Approved' 
                              ? "bg-green-500/10 border-green-500/20 text-green-500" 
                              : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                          )}>
                            {exp.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {exp.status === "Pending" && (
                              <button
                                onClick={() => handleApproveExpense(exp.id)}
                                className="btn-primary !py-1.5 !px-3 text-[8px] uppercase tracking-widest font-black"
                              >
                                Approve
                              </button>
                            )}
                            <button
                              onClick={() => setDeleteConfirmExpenseId(exp.id)}
                              className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-all"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
        {activeTab === "Staff Payouts" && (
          <motion.div key="payouts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            {/* Payout Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="luxury-card !p-8 flex items-center space-x-6 border-l-4 border-l-primary">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <PoundSterling className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Payouts (Month)</p>
                  <h4 className="text-3xl font-serif font-black text-foreground">
                    £{payouts.reduce((acc, p) => acc + p.base + p.commission, 0).toLocaleString()}
                  </h4>
                </div>
              </div>
              <div className="luxury-card !p-8 flex items-center space-x-6 border-l-4 border-l-green-500">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Paid</p>
                  <h4 className="text-3xl font-serif font-black text-foreground">
                    £{payouts.filter(p => p.status === 'Paid').reduce((acc, p) => acc + p.base + p.commission, 0).toLocaleString()}
                  </h4>
                </div>
              </div>
              <div className="luxury-card !p-8 flex items-center space-x-6 border-l-4 border-l-amber-500">
                <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Pending</p>
                  <h4 className="text-3xl font-serif font-black text-foreground">
                    £{payouts.filter(p => p.status === 'Pending').reduce((acc, p) => acc + p.base + p.commission, 0).toLocaleString()}
                  </h4>
                </div>
              </div>
            </div>

            {/* Payout Table */}
            <div className="luxury-card !p-0 overflow-hidden">
              <div className="p-8 border-b border-border bg-accent/10 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest">Active Staff Payroll</h3>
                <span className="text-[10px] font-bold text-muted-foreground uppercase bg-accent/50 px-4 py-2 border border-border rounded-xl">
                  {payouts.length} Staff Members Synchronized
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-accent/5 border-b border-border">
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Staff Member</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Role</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Base Salary</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Commission</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total Payout</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {payouts.map((p) => (
                      <tr key={p.id} className="hover:bg-accent/5 transition-colors group">
                        <td className="p-6 flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                            {p.name.charAt(0)}{p.name.split(' ')[1]?.charAt(0)}
                          </div>
                          <span className="text-xs font-bold text-foreground">{p.name}</span>
                        </td>
                        <td className="p-6 text-xs text-muted-foreground font-bold">{p.role}</td>
                        <td className="p-6 text-xs text-foreground font-bold">£{p.base.toLocaleString()}</td>
                        <td className="p-6 text-xs text-green-500 font-bold">+£{p.commission.toLocaleString()}</td>
                        <td className="p-6 text-sm text-foreground font-black">£{(p.base + p.commission).toLocaleString()}</td>
                        <td className="p-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                            p.status === 'Paid' 
                              ? "bg-green-500/10 border-green-500/20 text-green-500" 
                              : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                          )}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          {p.status === "Pending" ? (
                            <button
                              onClick={() => handlePayStaff(p.id)}
                              className="btn-primary !py-2 !px-4 text-[8px] uppercase tracking-widest font-black"
                            >
                              Pay Now
                            </button>
                          ) : (
                            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">
                              Settled ✓
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuditOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuditOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass-panel rounded-3xl p-8 border-4 border-primary/20 shadow-tesla max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
                <div>
                  <h3 className="text-xl font-serif font-black">Financial Audit Log</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Secured & Verified Ledgers</p>
                </div>
                <button 
                  onClick={() => setIsAuditOpen(false)}
                  className="p-3 hover:bg-accent rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Audit Content */}
              <div className="space-y-6">
                {/* Scorecards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/30 rounded-2xl border border-border">
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Gross Income</p>
                    <p className="text-lg font-serif font-black text-primary">£12,450.00</p>
                  </div>
                  <div className="p-4 bg-accent/30 rounded-2xl border border-border">
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Audit Integrity</p>
                    <p className="text-lg font-serif font-black text-green-500">100% Compliant</p>
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Department Performance</h4>
                  <div className="divide-y divide-border/50">
                    {[
                      { name: "Skin Care Services", gross: "£5,602.50", margin: "45%", count: "124 bookings" },
                      { name: "Grooming Lounge", gross: "£3,735.00", margin: "30%", count: "89 bookings" },
                      { name: "Bridal Packages", gross: "£1,867.50", margin: "15%", count: "18 bookings" },
                      { name: "Retail Products", gross: "£1,245.00", margin: "10%", count: "95 units sold" },
                    ].map((item, idx) => (
                      <div key={idx} className="py-3 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-foreground">{item.name}</p>
                          <p className="text-[9px] text-muted-foreground">{item.count}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-primary">{item.gross}</p>
                          <span className="text-[8px] font-bold uppercase text-muted-foreground bg-accent px-1.5 py-0.5 rounded">{item.margin} Share</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Statement */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wide leading-relaxed">
                    This audit is generated in compliance with Glamora financial systems. Ledgers have been verified against external gateway records.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🗑️ INVOICE DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteConfirmInvoiceId && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmInvoiceId(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-card border border-red-500/20 rounded-[2rem] p-8 shadow-luxury overflow-hidden text-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-serif font-black mb-3 text-foreground">Delete Invoice</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-8">
                Are you sure you want to permanently delete this invoice record? This action is irreversible.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmInvoiceId(null)}
                  className="btn-outline px-8 !py-3 text-[10px] uppercase font-black tracking-widest border-border"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(deleteConfirmInvoiceId);
                    setDeleteConfirmInvoiceId(null);
                  }}
                  className="btn-primary !bg-red-500 !border-red-500 hover:!bg-red-600 text-white px-8 !py-3 text-[10px] uppercase font-black tracking-widest shadow-lg shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🗑️ EXPENSE DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteConfirmExpenseId && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmExpenseId(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-card border border-red-500/20 rounded-[2rem] p-8 shadow-luxury overflow-hidden text-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-serif font-black mb-3 text-foreground">Remove Expense</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-8">
                Are you sure you want to permanently delete this expense item? This action is irreversible.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmExpenseId(null)}
                  className="btn-outline px-8 !py-3 text-[10px] uppercase font-black tracking-widest border-border"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteExpense(deleteConfirmExpenseId);
                    setDeleteConfirmExpenseId(null);
                  }}
                  className="btn-primary !bg-red-500 !border-red-500 hover:!bg-red-600 text-white px-8 !py-3 text-[10px] uppercase font-black tracking-widest shadow-lg shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Printer(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
    </svg>
  );
}
