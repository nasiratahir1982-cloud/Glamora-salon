"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Star, 
  Sparkles, 
  X, 
  CheckCircle,
  Award,
  Zap,
  Activity,
  Heart,
  User as UserIcon,
  ChevronRight,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const initialStaff = [
  { 
    id: "S-101", 
    name: "Elena Gilbert", 
    role: "Master Stylist", 
    revenue: "£14.2k", 
    rating: 4.9, 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80", 
    rituals: 124,
    email: "elena.g@glamora.com",
    phone: "+44 20 7123 4567",
    joined: "March 2021",
    bio: "Elena is a visionary hair stylist with a passion for creative color and avant-garde cutting techniques. With over a decade of experience in luxury salons across London and Paris, she brings a unique blend of classical elegance and modern edge to Glamora.",
    expertise: ["Balayage & Ombre", "Precision Cutting", "Bridal Hairstyling", "Color Correction"],
    experience: [
      { company: "Luxe Hair London", role: "Senior Stylist", period: "2018 - 2021" },
      { company: "Vogue Salons Paris", role: "Stylist", period: "2015 - 2018" },
      { company: "Artisan Hair Studio", role: "Junior Stylist", period: "2013 - 2015" }
    ],
    education: [
      { title: "Master of Hair Color", institution: "L'Oréal Professionnel Academy", year: "2019" },
      { title: "Advanced Cutting Diploma", institution: "Sassoon Academy", year: "2016" }
    ]
  },
  { 
    id: "S-102", 
    name: "Marcus Vane", 
    role: "Lead Barber", 
    revenue: "£8.5k", 
    rating: 4.8, 
    status: "Active", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80", 
    rituals: 98,
    email: "marcus.v@glamora.com",
    phone: "+44 20 7123 8899",
    joined: "June 2022",
    bio: "Marcus is a master of the traditional straight-razor shave and modern fades. His meticulous attention to detail and calm demeanor make every visit a therapeutic experience for his clients.",
    expertise: ["Traditional Shaves", "Skin Fades", "Beard Sculpting", "Classic Cuts"],
    experience: [
      { company: "The Gentleman's Lounge", role: "Senior Barber", period: "2019 - 2022" },
      { company: "Heritage Barbershop", role: "Barber", period: "2017 - 2019" }
    ],
    education: [
      { title: "Traditional Barbering Certificate", institution: "British Master Barbers", year: "2018" }
    ]
  },
  { 
    id: "S-103", 
    name: "Sarah Jenkins", 
    role: "Skin Specialist", 
    revenue: "£7.1k", 
    rating: 5.0, 
    status: "On Leave", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80", 
    rituals: 72,
    email: "sarah.j@glamora.com",
    phone: "+44 20 7123 1122",
    joined: "January 2023",
    bio: "Sarah is a clinical aesthetician specializing in advanced skin rejuvenation. Her scientific approach combined with her knowledge of premium skincare products ensures visible results for all skin types.",
    expertise: ["Hydrafacials", "Chemical Peels", "Microneedling", "Anti-Aging Therapies"],
    experience: [
      { company: "Dermis Medical Spa", role: "Aesthetician", period: "2020 - 2022" },
      { company: "Glow Skin Clinic", role: "Skin Therapist", period: "2018 - 2020" }
    ],
    education: [
      { title: "CIDESCO International Diploma", institution: "Skincare Institute UK", year: "2017" }
    ]
  },
  { id: "S-104", name: "Arthur Shelby", role: "Spa Therapist", revenue: "£4.5k", rating: 4.9, status: "Active", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80", rituals: 32 },
  { id: "S-105", name: "Sophia Loren", role: "Bridal Expert", revenue: "£21.0k", rating: 5.0, status: "Active", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80", rituals: 189 },
  { id: "S-106", name: "David Gandy", role: "Lead Barber", revenue: "£8.8k", rating: 4.7, status: "Busy", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80", rituals: 72 },
];

export default function StaffManagement() {
  const [staff, setStaff] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [currentImage, setCurrentImage] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem('glamora-staff');
    if (saved) {
      try {
        setStaff(JSON.parse(saved));
      } catch (e) {
        console.error(e);
        setStaff(initialStaff);
      }
    } else {
      localStorage.setItem('glamora-staff', JSON.stringify(initialStaff));
      setStaff(initialStaff);
    }
  }, []);

  const filteredStaff = staff.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string) => {
    const updated = staff.filter(s => s.id !== id);
    setStaff(updated);
    localStorage.setItem('glamora-staff', JSON.stringify(updated));
  };

  const openProfile = (artisan: any) => {
    setSelectedStaff(artisan);
    setIsProfileOpen(true);
  };

  const handleEdit = (artisan: any) => {
    setSelectedStaff(artisan);
    setCurrentImage(artisan.image);
    setIsProfileOpen(false); // Close profile view if open
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
    const artisanData = {
      ...selectedStaff,
      id: selectedStaff?.id || `S-${Math.floor(Math.random() * 1000)}`,
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      email: formData.get("email") as string,
      image: currentImage || selectedStaff?.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
      status: selectedStaff?.status || "Active",
      revenue: selectedStaff?.revenue || "£0k",
      rating: selectedStaff?.rating || 5.0,
      rituals: selectedStaff?.rituals || 0,
    };

    let updated;
    if (selectedStaff) {
      updated = staff.map(s => s.id === selectedStaff.id ? artisanData : s);
    } else {
      updated = [artisanData, ...staff];
    }
    setStaff(updated);
    localStorage.setItem('glamora-staff', JSON.stringify(updated));

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. SIMPLE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">Our Team</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Total Staff • {staff.length} Experts Online</p>
        </div>
        <button 
          onClick={() => { setSelectedStaff(null); setCurrentImage(""); setIsModalOpen(true); }}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Staff
        </button>
      </div>

      {/* 2. FILTER BAR */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-card p-2 rounded-2xl border border-border">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search staff by name or role..." 
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

      {/* 3. STAFF GRID */}
      <div className="flex flex-wrap justify-center gap-8">
        <AnimatePresence mode="popLayout">
          {filteredStaff.map((artisan, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={artisan.id}
              className="luxury-card !p-0 flex flex-col group"
            >
              <div className="relative h-40 overflow-hidden rounded-t-[1.1rem]">
                <img src={artisan.image} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt={artisan.name} />
                <div className="absolute top-3 right-3">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border shadow-sm backdrop-blur-md",
                    artisan.status === "Active" ? "bg-green-500/20 text-green-500 border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  )}>
                    {artisan.status}
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-serif font-black tracking-tight">{artisan.name}</h3>
                    <p className="text-[9px] text-primary font-bold uppercase tracking-widest mt-1">{artisan.role}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-primary">
                    <Star className="w-3 h-3 fill-primary" />
                    <span className="text-xs font-bold">{artisan.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-border">
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Total Sales</p>
                    <p className="text-xs font-bold text-foreground">{artisan.revenue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Bookings</p>
                    <p className="text-xs font-bold text-foreground">{artisan.rituals}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button 
                    onClick={() => openProfile(artisan)}
                    className="flex-1 py-2.5 bg-accent hover:bg-primary/10 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={() => setDeleteConfirmId(artisan.id)}
                    className="p-2.5 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. STAFF PROFILE VIEW (CENTERED PREMIUM MODAL) */}
      <AnimatePresence>
        {isProfileOpen && selectedStaff && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 cursor-zoom-out"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card w-full max-w-5xl max-h-[90vh] border border-border rounded-[3rem] shadow-premium relative flex flex-col md:flex-row overflow-hidden z-10"
            >
              {/* Left Side: Visual & Identity */}
              <div className="md:w-2/5 relative min-h-[300px] md:min-h-full border-r border-border bg-accent/20">
                <img src={selectedStaff.image} className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 transition-all duration-700 hover:grayscale-0 hover:brightness-100" alt={selectedStaff.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-10 left-10 right-10 text-center md:text-left space-y-4">
                  <div className="badge-luxury !bg-primary !text-background mx-auto md:mx-0">
                    {selectedStaff.role}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-white drop-shadow-lg">{selectedStaff.name}</h2>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                      <span className="text-xs font-black text-white">{selectedStaff.rating} Rating</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <Activity className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{selectedStaff.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Professional Data */}
              <div className="md:w-3/5 flex flex-col overflow-hidden bg-background">
                <div className="p-6 border-b border-border flex items-center justify-between bg-accent/10">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                       <Award className="w-5 h-5" />
                     </div>
                     <div>
                       <h3 className="text-sm font-serif font-black">Professional Dossier</h3>
                       <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Verified Artisan Profile</p>
                     </div>
                   </div>
                   <button 
                    onClick={() => setIsProfileOpen(false)} 
                    className="p-2.5 bg-accent hover:bg-red-500 hover:text-white rounded-full transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                  {/* 1. Bio Section - Centered Focus */}
                  <div className="text-center space-y-4 max-w-xl mx-auto">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Artisan Statement</p>
                    <p className="text-sm md:text-base text-foreground leading-relaxed font-medium italic border-x-2 border-primary/20 px-8">
                      "{selectedStaff.bio || "Crafting elegance through precision and artistic vision."}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Col: Experience */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center">
                        <History className="w-4 h-4 mr-2" /> Professional Journey
                      </h4>
                      <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
                        {(selectedStaff.experience || [
                          { company: "Luxe Hair London", role: "Senior Stylist", period: "2021 - Present" },
                          { company: "Vogue Salons Paris", role: "Artistic Lead", period: "2018 - 2021" },
                          { company: "Elite Beauty House", role: "Stylist", period: "2015 - 2018" }
                        ]).map((exp: any, i: number) => (
                          <div key={i} className="relative pl-8 group">
                            <div className="absolute left-0 top-1.5 w-4 h-4 bg-background border-2 border-primary rounded-full z-10 transition-transform group-hover:scale-125" />
                            <div className="space-y-1">
                              <p className="text-[9px] font-black text-primary uppercase tracking-widest">{exp.period}</p>
                              <p className="text-sm font-black tracking-tight">{exp.role}</p>
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{exp.company}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Col: Expertise & Education */}
                    <div className="space-y-10">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center">
                          <Zap className="w-4 h-4 mr-2" /> Key Expertises
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(selectedStaff.expertise || ["Master Coloring", "Advanced Cutting", "Bridal Artistry", "Color Correction"]).map((skill: string) => (
                            <span key={skill} className="px-3 py-1.5 bg-accent/50 border border-border rounded-lg text-[9px] font-bold uppercase tracking-widest text-foreground hover:border-primary transition-colors cursor-default">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center">
                          <Heart className="w-4 h-4 mr-2" /> Education & Awards
                        </h4>
                        <div className="space-y-3">
                          {(selectedStaff.education || [
                            { title: "Master of Hair Color", institution: "L'Oréal Academy", year: "2019" },
                            { title: "Advanced Stylist Award", institution: "Beauty UK", year: "2022" }
                          ]).map((edu: any, i: number) => (
                            <div key={i} className="p-3 bg-accent/30 rounded-xl border border-border flex justify-between items-center group hover:bg-primary/5 transition-colors">
                              <div>
                                <p className="text-[11px] font-black tracking-tight">{edu.title}</p>
                                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{edu.institution}</p>
                              </div>
                              <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">{edu.year}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 border-t border-border bg-accent/5 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1 flex items-center space-x-6">
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Contact Email</p>
                      <p className="text-xs font-black">{selectedStaff.email || "concierge@glamora.com"}</p>
                    </div>
                    <div className="w-px h-8 bg-border hidden sm:block" />
                    <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">Phone Number</p>
                      <p className="text-xs font-black">{selectedStaff.phone || "+44 20 7946 0123"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button 
                      onClick={() => handleEdit(selectedStaff)}
                      className="flex-1 sm:flex-none btn-outline !py-3 !px-6 text-[10px] uppercase font-black tracking-widest"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={() => setIsAssignModalOpen(true)}
                      className="flex-1 sm:flex-none btn-primary !py-3 !px-10 text-[10px] uppercase font-black tracking-widest shadow-xl group/btn overflow-hidden relative"
                    >
                      <span className="relative z-10">Assign Client</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. CLIENT ASSIGNMENT MODAL (NEW) */}
      <AnimatePresence>
        {isAssignModalOpen && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAssignModalOpen(false)}
              className="absolute inset-0 cursor-zoom-out"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card w-full max-w-lg rounded-3xl p-10 border border-border shadow-2xl relative"
            >
              <button onClick={() => setIsAssignModalOpen(false)} className="absolute top-6 right-6 p-2 bg-accent rounded-xl hover:bg-red-500 hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2 mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto border border-primary/20 mb-4">
                  <UserIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-black tracking-tight">Assign Client to {selectedStaff?.name}</h3>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Select an elite member for this ritual</p>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search existing clients..." 
                  className="w-full bg-accent/50 border border-border rounded-xl py-3 px-12 text-xs font-bold focus:outline-none focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {[
                  { name: "Julianne Moore", tier: "Platinum", status: "Recent" },
                  { name: "Cillian Murphy", tier: "Gold", status: "Pending" },
                  { name: "Anya Taylor-Joy", tier: "Diamond", status: "VIP" },
                  { name: "Benedict Cumberbatch", tier: "Gold", status: "Active" },
                  { name: "Florence Pugh", tier: "Platinum", status: "Active" },
                ].map((client, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 6, backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }}
                    onClick={() => {
                      alert(`💎 Luxury Assignment: ${client.name} has been assigned to ${selectedStaff?.name}`);
                      setIsAssignModalOpen(false);
                    }}
                    className="p-4 bg-accent/30 rounded-2xl border border-border flex items-center justify-between cursor-pointer group hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center font-black text-primary text-xs">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black tracking-tight group-hover:text-primary transition-colors">{client.name}</p>
                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{client.tier} Member</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded">{client.status}</span>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-8 py-4 bg-accent hover:bg-accent/80 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all border border-border">
                Create New Client Record
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. ADD/EDIT STAFF MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
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
                <div className="w-10 h-10 bg-primary text-background rounded-xl flex items-center justify-center shadow-sm">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-black tracking-tight">{selectedStaff ? "Edit Artisan" : "New Registration"}</h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-primary mt-1">Staff Management Portal</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* 📸 IMAGE UPLOAD SECTION */}
                <div className="flex items-center space-x-6 pb-6 border-b border-border">
                  <div className="relative group w-24 h-24 flex-shrink-0">
                    <img 
                      src={currentImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80"} 
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
                    <label className="form-label !mb-0">Artisan Portrait</label>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Recommended: Square Aspect Ratio</p>
                    <div className="flex space-x-2">
                      <input 
                        type="text" 
                        className="form-input text-[10px]" 
                        placeholder="Paste portrait URL..." 
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="form-input-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" required className="form-input" defaultValue={selectedStaff?.name} />
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Job Role</label>
                    <select name="role" className="form-input" defaultValue={selectedStaff?.role}>
                      <option>Master Stylist</option>
                      <option>Lead Barber</option>
                      <option>Skin Specialist</option>
                      <option>Spa Therapist</option>
                    </select>
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" name="email" required className="form-input" defaultValue={selectedStaff?.email} />
                </div>
                <div className="flex justify-end pt-6 space-x-4 border-t border-border">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
                  <button type="submit" className="btn-primary px-10">
                    {selectedStaff ? "Update Record" : "Register Artisan"}
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
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
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
                Are you sure you want to permanently delete this team member? This action is irreversible and will remove all associated logs.
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
