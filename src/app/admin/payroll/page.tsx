"use client";

import React, { useState } from "react";
import { 
  Clock, 
  PoundSterling, 
  Calendar, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Timer, 
  History, 
  Download, 
  Search,
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Briefcase,
  UserCheck,
  Edit2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const attendanceData = [
  { id: "STF-001", name: "Elena Gilbert", role: "Master Stylist", signIn: "08:55 AM", signOut: "06:12 PM", totalHours: 9.2, status: "Present", hourlyRate: 45 },
  { id: "STF-002", name: "Julian Vane", role: "Elite Barber", signIn: "09:05 AM", signOut: "05:45 PM", totalHours: 8.6, status: "Present", hourlyRate: 40 },
  { id: "STF-003", name: "Sarah Jenkins", role: "Skin Specialist", signIn: "-", signOut: "-", totalHours: 0, status: "On Leave", hourlyRate: 35 },
  { id: "STF-004", name: "Marcus Thorne", role: "Manager", signIn: "08:30 AM", signOut: "07:30 PM", totalHours: 11.0, status: "Overtime", hourlyRate: 55 },
];
export default function PayrollManagement() {
  const [attendance, setAttendance] = useState(attendanceData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Attendance");
  const [search, setSearch] = useState("");

  const filteredAttendance = attendance.filter(stf => 
    stf.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = (id: string, newData: any) => {
    setAttendance(attendance.map(a => a.id === id ? { ...a, ...newData } : a));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleExport = () => {
    const headers = ["ID", "Name", "Role", "Sign In", "Sign Out", "Total Hours", "Status", "Hourly Rate", "Daily Pay"];
    const rows = attendance.map(stf => [
      stf.id,
      stf.name,
      stf.role,
      stf.signIn,
      stf.signOut,
      stf.totalHours,
      stf.status,
      `£${stf.hourlyRate}`,
      `£${(stf.totalHours * stf.hourlyRate).toFixed(2)}`
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Glamora_Payroll_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">Staff Performance & Payroll</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Attendance tracking, hours & salary calculation</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleExport}
            className="btn-outline px-6 flex items-center text-[10px] uppercase font-black tracking-widest transition-all"
          >
            <Download className="w-4 h-4 mr-2 text-primary" /> Export Payroll Report
          </button>
        </div>
      </div>

      {/* 2. STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Man Hours (Today)", value: "32.8h", icon: Timer, color: "text-primary" },
          { label: "Active Staff Now", value: "8 / 12", icon: UserCheck, color: "text-green-500" },
          { label: "Estimated Daily Payout", value: "£1,450", icon: PoundSterling, color: "text-amber-500" },
          { label: "Attendance Rate", value: "92%", icon: TrendingUp, color: "text-blue-500" },
        ].map((stat, i) => (
          <div key={i} className="luxury-card p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent border border-border">
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              <h4 className="text-2xl font-serif font-black">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* 3. TABS */}
      <div className="flex items-center space-x-2 p-1.5 bg-accent/20 rounded-2xl border border-border w-fit">
        {["Attendance", "Salary Ledger", "History"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex items-center space-x-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === tab ? "bg-primary text-background shadow-lg" : "text-muted-foreground hover:text-primary"
            )}
          >
            <span>{tab}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "Attendance" && (
          <motion.div key="attendance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="luxury-card !p-0 overflow-hidden">
              <div className="p-8 border-b border-border bg-accent/5 flex items-center justify-between">
                <div className="relative max-w-sm w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search staff by name..." 
                    className="w-full bg-background border border-primary/30 rounded-xl py-2.5 px-10 text-xs font-bold focus:border-primary transition-all shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-3">
                   <div className="flex items-center space-x-2 px-4 py-2 bg-accent/30 rounded-xl border border-border">
                     <Calendar className="w-4 h-4 text-primary" />
                     <span className="text-[10px] font-black uppercase tracking-widest">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                   </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-accent/5 border-b border-border">
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Staff Member</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Sign In</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Sign Out</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Total Hours</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Status</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {filteredAttendance.map((stf) => {
                      const isEditing = editingId === stf.id;
                      return (
                        <tr key={stf.id} className="hover:bg-accent/5 transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-serif font-black text-primary border border-border group-hover:border-primary">
                                {stf.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-xs font-black">{stf.name}</p>
                                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{stf.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            {isEditing ? (
                              <input 
                                type="text" 
                                className="bg-background border border-primary/30 rounded-lg py-1 px-3 text-[10px] font-bold outline-none focus:border-primary transition-all w-28" 
                                defaultValue={stf.signIn}
                                id={`signIn-${stf.id}`}
                              />
                            ) : (
                              <span className="text-xs font-bold">{stf.signIn}</span>
                            )}
                          </td>
                          <td className="p-6">
                            {isEditing ? (
                              <input 
                                type="text" 
                                className="bg-background border border-primary/30 rounded-lg py-1 px-3 text-[10px] font-bold outline-none focus:border-primary transition-all w-28" 
                                defaultValue={stf.signOut}
                                id={`signOut-${stf.id}`}
                              />
                            ) : (
                              <span className="text-xs font-bold">{stf.signOut}</span>
                            )}
                          </td>
                          <td className="p-6 text-center">
                             {isEditing ? (
                               <input 
                                type="number" 
                                step="0.1"
                                className="bg-background border border-primary/30 rounded-lg py-1 px-3 text-[10px] font-bold outline-none focus:border-primary transition-all w-20 text-center" 
                                defaultValue={stf.totalHours}
                                id={`hours-${stf.id}`}
                              />
                             ) : (
                               <span className="text-xs font-black text-primary">{stf.totalHours} h</span>
                             )}
                          </td>
                          <td className="p-6">
                            <div className="flex justify-center">
                              {isEditing ? (
                                <select 
                                  className="bg-background border border-primary/30 rounded-lg py-1 px-2 text-[9px] font-black uppercase tracking-widest outline-none focus:border-primary transition-all"
                                  defaultValue={stf.status}
                                  id={`status-${stf.id}`}
                                >
                                  <option>Present</option>
                                  <option>Overtime</option>
                                  <option>On Leave</option>
                                  <option>Absent</option>
                                </select>
                              ) : (
                                <span className={cn(
                                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                  stf.status === 'Present' ? "bg-green-500/10 border-green-500/20 text-green-500" :
                                  stf.status === 'Overtime' ? "bg-primary/10 border-primary/20 text-primary" :
                                  "bg-red-500/10 border-red-500/20 text-red-500"
                                )}>
                                  {stf.status}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-6 text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end space-x-2">
                                <button 
                                  onClick={() => {
                                    const signIn = (document.getElementById(`signIn-${stf.id}`) as HTMLInputElement).value;
                                    const signOut = (document.getElementById(`signOut-${stf.id}`) as HTMLInputElement).value;
                                    const totalHours = parseFloat((document.getElementById(`hours-${stf.id}`) as HTMLInputElement).value);
                                    const status = (document.getElementById(`status-${stf.id}`) as HTMLSelectElement).value;
                                    handleSave(stf.id, { signIn, signOut, totalHours, status });
                                  }}
                                  className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={handleCancel}
                                  className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <button 
                                onClick={() => handleEdit(stf.id)}
                                className="p-2 hover:bg-primary/10 hover:text-primary text-muted-foreground rounded-lg transition-all flex items-center space-x-2"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Adjust</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "Salary Ledger" && (
          <motion.div key="salary" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="luxury-card !p-0 overflow-hidden">
              <div className="p-8 border-b border-border bg-primary/5">
                <h3 className="text-xl font-serif font-black flex items-center">
                  <Briefcase className="w-5 h-5 text-primary mr-3" /> Monthly Payroll Accrual
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-2">Period: May 01 - May 31, 2024</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-accent/5 border-b border-border">
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Staff Member</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Hourly Rate</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Monthly Hours</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Gross Pay</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 font-bold">
                    {attendanceData.map((stf) => (
                      <tr key={stf.id} className="hover:bg-accent/5 transition-colors">
                        <td className="p-6 text-sm">{stf.name}</td>
                        <td className="p-6 text-xs text-muted-foreground">£{stf.hourlyRate} / hr</td>
                        <td className="p-6 text-xs">{stf.totalHours * 20} h</td>
                        <td className="p-6 text-sm font-black text-primary">£{(stf.totalHours * 20 * stf.hourlyRate).toFixed(2)}</td>
                        <td className="p-6 text-right">
                          <button className="btn-primary !py-1.5 !px-4 text-[8px] uppercase tracking-widest shadow-lg">Finalize Payout</button>
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

      <div className="luxury-card p-6 border-amber-500/20 bg-amber-500/5">
        <div className="flex items-center space-x-3 text-amber-500 mb-2">
          <AlertCircle className="w-5 h-5" />
          <h4 className="text-xs font-black uppercase tracking-widest">Payroll Note</h4>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed">Hours are automatically synchronized from the Staff Clock-In Portal. Manual adjustments require Super Admin authorization.</p>
      </div>
    </div>
  );
}
