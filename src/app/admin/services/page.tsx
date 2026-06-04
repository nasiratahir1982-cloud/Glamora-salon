"use client";

import React, { useState } from "react";
import { 
  Scissors, 
  Plus, 
  Search, 
  Sparkles, 
  DollarSign, 
  Clock, 
  Trash2, 
  Edit2, 
  CheckCircle,
  X,
  ChevronRight,
  TrendingUp,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const initialServices = [
  { id: "S1", name: "Bridal Makeup", price: "£850", duration: "240 min", department: "Bridal", status: "Active", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80" },
  { id: "S2", name: "Men's Haircut", price: "£120", duration: "90 min", department: "Groom", status: "Active", image: "/glamora-salon/images/mens-haircut.png" },
  { id: "S3", name: "Skin Care Spa", price: "£180", duration: "60 min", department: "Skin", status: "Active", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80" },
  { id: "S4", name: "Hair Styling", price: "£450", duration: "180 min", department: "Bridal", status: "Active", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80" },
];

export default function ServicesManagement() {
  const [services, setServices] = useState(initialServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setCurrentImage(service.image || "");
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData = {
      id: editingService?.id || `S${services.length + 1}`,
      name: formData.get("name") as string,
      price: formData.get("price")!.toString().startsWith('£') ? formData.get("price") as string : `£${formData.get("price")}`,
      duration: formData.get("duration")!.toString().endsWith('min') ? formData.get("duration") as string : `${formData.get("duration")} min`,
      department: editingService?.department || "General",
      status: editingService?.status || "Active",
      image: currentImage || editingService?.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80",
    };

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? serviceData : s));
    } else {
      setServices([...services, serviceData]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. SIMPLE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">Our Services</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Manage salon treatments and prices</p>
        </div>
        <button 
          onClick={() => { setEditingService(null); setCurrentImage(""); setIsModalOpen(true); }}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Service
        </button>
      </div>

      {/* 2. STATS OVERVIEW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Services", val: services.length, icon: Scissors, color: "text-primary" },
          { label: "Avg. Price", val: "£345", icon: Tag, color: "text-green-500" },
          { label: "Avg. Duration", val: "142m", icon: Clock, color: "text-blue-500" },
          { label: "Growth", val: "+12%", icon: TrendingUp, color: "text-purple-500" },
        ].map((s, i) => (
          <div key={i} className="luxury-card !p-4 flex items-center space-x-4">
            <div className={cn("p-2 rounded-lg bg-accent/50", s.color)}>
              <s.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
              <p className="text-lg font-serif font-black">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. SERVICES GRID */}
      <div className="flex flex-wrap justify-center gap-8">
        <AnimatePresence>
          {services.map((service) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={service.id}
              className="luxury-card group !p-0 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={service.image} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt={service.name} />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    onClick={() => handleEdit(service)}
                    className="p-2 bg-black/40 backdrop-blur-md rounded-lg hover:bg-primary hover:text-background transition-all border border-white/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setDeleteConfirmId(service.id)}
                    className="p-2 bg-black/40 backdrop-blur-md text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-white/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="badge-luxury !bg-primary !text-background">
                    {service.department}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-serif font-black text-foreground">{service.name}</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Ref ID: {service.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Standard Fee</p>
                    <p className="text-xl font-serif font-black text-primary">{service.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Duration</p>
                    <p className="text-xl font-serif font-black text-foreground">{service.duration}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-green-500 pt-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">{service.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Service Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-2xl rounded-3xl p-10 relative border border-border shadow-premium"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 bg-accent rounded-xl hover:bg-red-500 hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-black tracking-tight">{editingService ? "Edit Service" : "Add New Service"}</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-primary mt-1">Service Catalog Update</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* 📸 IMAGE UPLOAD SECTION */}
                <div className="flex items-center space-x-6 pb-6 border-b border-border">
                  <div className="relative group w-24 h-24 flex-shrink-0">
                    <img 
                      src={currentImage || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80"} 
                      className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all border-2 border-border" 
                      alt="Preview" 
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="form-label !mb-0">Service Imagery</label>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Recommended: Scenic Treatment Photo</p>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        className="form-input text-[10px]" 
                        placeholder="Paste image URL here..." 
                        value={currentImage} 
                        onChange={(e) => setCurrentImage(e.target.value)}
                      />
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange}
                      />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-outline !py-1 !px-4 text-[9px]"
                      >
                        Browse
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-input-group">
                  <label className="form-label">Service Name</label>
                  <input type="text" name="name" required className="form-input" defaultValue={editingService?.name} placeholder="e.g., Premium Facial" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="form-input-group">
                    <label className="form-label">Price (£)</label>
                    <input type="text" name="price" required className="form-input" defaultValue={editingService?.price} placeholder="0.00" />
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Duration (mins)</label>
                    <input type="text" name="duration" required className="form-input" defaultValue={editingService?.duration} placeholder="60" />
                  </div>
                </div>
                <div className="flex justify-end pt-6 border-t border-border space-x-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
                  <button type="submit" className="btn-primary px-10">
                    {editingService ? "Update Service" : "Save Service"}
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
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
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
                Are you sure you want to permanently delete this service? This action is irreversible and will remove all associated logs.
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
                    deleteService(deleteConfirmId);
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
