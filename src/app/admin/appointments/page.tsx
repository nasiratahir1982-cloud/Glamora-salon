"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  Clock, 
  User, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  X,
  Plus,
  Trash2,
  Edit2,
  Scissors,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const initialAppointments = [
  { id: "A-1024", guest: "Elena Gilbert", service: "Bridal Makeup", time: "10:30 AM", date: "2026-05-12", status: "Confirmed", staff: "Elena G." },
  { id: "A-1025", guest: "Marcus Vane", service: "Men's Haircut", time: "11:15 AM", date: "2026-05-12", status: "In Progress", staff: "Marcus V." },
  { id: "A-1026", guest: "Sophia Loren", service: "Skin Care Spa", time: "01:45 PM", date: "2026-05-12", status: "Pending", staff: "Sarah J." },
  { id: "A-1027", guest: "Arthur Shelby", service: "Hair Colour", time: "03:30 PM", date: "2026-05-13", status: "Confirmed", staff: "Elena G." },
];

const staffList = ["Elena G.", "Marcus V.", "Sarah J.", "Julian V."];
const serviceList = ["Bridal Makeup", "Men's Haircut", "Skin Care Spa", "Hair Colour", "Manicure"];

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredAppointments = appointments.filter(a => 
    a.guest.toLowerCase().includes(search.toLowerCase()) || 
    a.service.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id: string, newStatus: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleDelete = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const appointmentData = {
      id: editingAppointment?.id || `A-${Math.floor(Math.random() * 10000)}`,
      guest: formData.get("guest") as string,
      service: formData.get("service") as string,
      staff: formData.get("staff") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      status: editingAppointment?.status || "Pending",
    };

    if (editingAppointment) {
      setAppointments(appointments.map(a => a.id === editingAppointment.id ? appointmentData : a));
    } else {
      setAppointments([appointmentData, ...appointments]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. SIMPLE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">Appointments</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Manage guest bookings and schedules</p>
        </div>
        <button 
          onClick={() => { setEditingAppointment(null); setIsModalOpen(true); }}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" /> New Booking
        </button>
      </div>

      {/* 2. CONTROLS */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-card p-2 rounded-2xl border border-border">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by name, service, or ID..." 
            className="w-full bg-accent/30 border border-primary/30 rounded-xl py-2.5 px-10 text-xs font-bold focus:outline-none focus:border-primary transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-accent/50 hover:bg-primary/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
            <Filter className="w-3.5 h-3.5 text-primary" />
            <span>Filter Status</span>
          </button>
        </div>
      </div>

      {/* 3. APPOINTMENTS TABLE - High Density */}
      <div className="luxury-card !p-0 overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Guest Info</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Expert</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAppointments.map((a) => (
                <tr key={a.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-primary">
                        {a.guest.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{a.guest}</p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest">{a.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md font-bold text-[9px] uppercase tracking-widest border border-primary/20">
                      {a.service}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-muted-foreground">{a.staff}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">{a.time}</p>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase">{a.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full animate-pulse",
                        a.status === 'Confirmed' ? 'bg-green-500' : 
                        a.status === 'In Progress' ? 'bg-primary' : 'bg-yellow-500'
                      )} />
                      <span className="font-bold uppercase tracking-widest text-[10px]">{a.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => updateStatus(a.id, "Confirmed")}
                        title="Mark Confirmed"
                        className="p-2 bg-green-500/5 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all border border-green-500/10"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setEditingAppointment(a); setIsModalOpen(true); }}
                        className="p-2 bg-accent/50 hover:bg-primary hover:text-background rounded-lg transition-all border border-border"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirmId(a.id)}
                        className="p-2 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/10"
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
              className="relative w-full max-w-xl bg-card border border-border rounded-[2.5rem] shadow-premium overflow-hidden"
            >
              <div className="p-8 border-b border-border bg-accent/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-black">{editingAppointment ? "Edit Booking" : "New Appointment"}</h3>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1">Guest Scheduling Portal</p>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2.5 bg-accent hover:bg-red-500 hover:text-white rounded-full transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <form className="p-8 space-y-6" onSubmit={handleSave}>
                <div className="form-input-group">
                  <label className="form-label">Guest Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" name="guest" className="form-input !pl-11" placeholder="Search or enter guest name" defaultValue={editingAppointment?.guest} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="form-input-group">
                    <label className="form-label">Select Service</label>
                    <div className="relative">
                      <Scissors className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select name="service" className="form-input !pl-11" defaultValue={editingAppointment?.service}>
                        {serviceList.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Assign Expert</label>
                    <div className="relative">
                      <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select name="staff" className="form-input !pl-11" defaultValue={editingAppointment?.staff}>
                        {staffList.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="form-input-group">
                    <label className="form-label">Appointment Date</label>
                    <input type="date" name="date" className="form-input" defaultValue={editingAppointment?.date} required />
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Preferred Time</label>
                    <input type="time" name="time" className="form-input" defaultValue={editingAppointment?.time} required />
                  </div>
                </div>

                <div className="form-input-group">
                  <label className="form-label">Booking Status</label>
                  <div className="flex items-center space-x-3 p-1 bg-accent/20 rounded-xl border border-border">
                    {["Pending", "Confirmed", "In Progress"].map(s => (
                      <button 
                        key={s} 
                        type="button"
                        onClick={() => setEditingAppointment({...editingAppointment, status: s})}
                        className={cn(
                          "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all",
                          (editingAppointment?.status || "Pending") === s ? "bg-primary text-background shadow-md" : "text-muted-foreground hover:bg-accent/50"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-6 space-x-4 border-t border-border">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Discard</button>
                  <button type="submit" className="btn-primary px-10 shadow-xl">
                    {editingAppointment ? "Update Booking" : "Confirm Appointment"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🗑️ DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-card border border-red-500/20 rounded-[2rem] p-8 shadow-luxury overflow-hidden text-center"
            >
              {/* Background gradient for warning */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
              
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              
              <h3 className="text-xl font-serif font-black mb-3 text-foreground">Confirm Deletion</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-8">
                Are you sure you want to permanently delete this appointment? This action is irreversible and will remove all associated logs.
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="btn-outline px-8 !py-3 text-[10px] uppercase font-black tracking-widest border-border"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(deleteConfirmId);
                    setDeleteConfirmId(null);
                  }}
                  className="btn-primary !bg-red-500 !border-red-500 hover:!bg-red-600 text-white px-8 !py-3 text-[10px] uppercase font-black tracking-widest shadow-lg shadow-red-500/20"
                >
                  Delete Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
