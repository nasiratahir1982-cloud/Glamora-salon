"use client";

import React, { useState } from "react";
import { 
  Contact2, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Filter,
  Download,
  Trash2,
  Edit2,
  UserCheck,
  History,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const initialCustomers = [
  { id: 1, name: "Sophia Reynolds", email: "sophia.r@example.com", phone: "+44 7700 900123", visits: 12, status: "Active", lastVisit: "2024-05-01", notes: "Prefers organic skin products." },
  { id: 2, name: "Marcus Thorne", email: "m.thorne@example.com", phone: "+44 7700 900456", visits: 8, status: "Active", lastVisit: "2024-04-28", notes: "Regular grooming lounge visitor." },
  { id: 3, name: "Isabella Vane", email: "isabella@example.com", phone: "+44 7700 900789", visits: 24, status: "VIP", lastVisit: "2024-05-08", notes: "VIP Member since 2022." },
  { id: 4, name: "Arthur Dent", email: "dent.a@example.com", phone: "+44 7700 900011", visits: 2, status: "Inactive", lastVisit: "2023-12-15", notes: "Occasional visitor." },
];

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "VIP">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchesStatus = statusFilter === "All" || 
      (statusFilter === "Active" && c.status !== "Inactive") ||
      (statusFilter === "VIP" && c.status === "VIP");
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const customerData = {
      id: editingCustomer?.id || customers.length + 1,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      status: formData.get("status") as string,
      visits: editingCustomer?.visits || 0,
      lastVisit: editingCustomer?.lastVisit || new Date().toISOString().split('T')[0],
      notes: formData.get("notes") as string,
    };

    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? customerData : c));
    } else {
      setCustomers([customerData, ...customers]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">Customer Management</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Manage your salon's clientele and loyalty</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn-outline px-6 flex items-center">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
          <button 
            onClick={() => { setEditingCustomer(null); setIsModalOpen(true); }}
            className="btn-primary px-8 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Customer
          </button>
        </div>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setStatusFilter("All")}
          className={cn(
            "luxury-card p-6 flex items-center justify-between group cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5",
            statusFilter === "All" ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "hover:border-primary/50"
          )}
        >
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Customers</p>
            <h4 className="text-3xl font-serif font-black">{customers.length}</h4>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
            <Contact2 className="w-6 h-6" />
          </div>
        </div>
        <div 
          onClick={() => setStatusFilter("Active")}
          className={cn(
            "luxury-card p-6 flex items-center justify-between group cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5",
            statusFilter === "Active" ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "hover:border-primary/50"
          )}
        >
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active Members</p>
            <h4 className="text-3xl font-serif font-black">
              {customers.filter(c => c.status !== "Inactive").length}
            </h4>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>
        <div 
          onClick={() => setStatusFilter("VIP")}
          className={cn(
            "luxury-card p-6 flex items-center justify-between group cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5",
            statusFilter === "VIP" ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "hover:border-primary/50"
          )}
        >
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">VIP Tier</p>
            <h4 className="text-3xl font-serif font-black">
              {customers.filter(c => c.status === "VIP").length}
            </h4>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
            <Star className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. SEARCH & TABLE */}
      <div className="luxury-card !p-0 overflow-hidden">
        <div className="p-6 border-b border-border bg-accent/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name, email, or phone..." 
              className="w-full bg-background border border-primary/30 rounded-xl py-2 px-10 text-xs font-bold focus:outline-none focus:border-primary transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn-outline !py-2 !px-4 text-[10px] flex items-center">
              <Filter className="w-3.5 h-3.5 mr-2" /> Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent/5 border-b border-border">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Customer</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Contact</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Visits</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Last Visit</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-accent/5 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-serif font-black text-primary border border-border group-hover:border-primary transition-all">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-none">{c.name}</p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1.5 font-bold">Client ID: #C-{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center text-[10px] text-muted-foreground font-medium">
                        <Mail className="w-3 h-3 mr-2 text-primary/60" /> {c.email}
                      </div>
                      <div className="flex items-center text-[10px] text-muted-foreground font-medium">
                        <Phone className="w-3 h-3 mr-2 text-primary/60" /> {c.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-accent/30 rounded-lg text-[10px] font-black border border-border">
                      {c.visits}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center text-[10px] font-bold">
                      <History className="w-3.5 h-3.5 mr-2 text-primary" />
                      {c.lastVisit}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                      c.status === 'VIP' ? "bg-primary/10 border-primary text-primary" :
                      c.status === 'Active' ? "bg-green-500/10 border-green-500/20 text-green-500" :
                      "bg-muted/10 border-border text-muted-foreground"
                    )}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => { setEditingCustomer(c); setIsModalOpen(true); }}
                        className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setCustomers(customers.filter(cust => cust.id !== c.id))}
                        className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
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

      {/* 4. MODAL (ADD/EDIT) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-[2.5rem] shadow-premium overflow-hidden"
            >
              <div className="p-8 border-b border-border bg-accent/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-black">{editingCustomer ? "Edit Customer" : "Add New Customer"}</h3>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Personal Details & CRM</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-accent rounded-full transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                <div className="form-input-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" name="name" className="form-input" defaultValue={editingCustomer?.name} required />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-input-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" className="form-input" defaultValue={editingCustomer?.email} required />
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phone" className="form-input" defaultValue={editingCustomer?.phone} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-input-group">
                    <label className="form-label">Tier Status</label>
                    <select name="status" className="form-input" defaultValue={editingCustomer?.status || "Active"}>
                      <option>Active</option>
                      <option>VIP</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Loyalty Points</label>
                    <input type="number" className="form-input" defaultValue="150" />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-label">Client Notes</label>
                  <textarea name="notes" className="form-input h-24 resize-none" defaultValue={editingCustomer?.notes}></textarea>
                </div>

                <div className="flex justify-end pt-6 space-x-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
                  <button type="submit" className="btn-primary px-8">
                    {editingCustomer ? "Save Changes" : "Create Customer"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
