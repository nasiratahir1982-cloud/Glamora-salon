"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Activity,
  BarChart3,
  PoundSterling,
  Star,
  User,
  ShieldCheck,
  X,
  ShoppingBag
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const data = [
  { name: 'Mon', revenue: 4500, appointments: 12 },
  { name: 'Tue', revenue: 5200, appointments: 15 },
  { name: 'Wed', revenue: 4800, appointments: 14 },
  { name: 'Thu', revenue: 6100, appointments: 18 },
  { name: 'Fri', revenue: 5900, appointments: 16 },
  { name: 'Sat', revenue: 7800, appointments: 22 },
  { name: 'Sun', revenue: 3200, appointments: 8 },
];

const extendedActivities = [
  { id: 1, type: "ritual", msg: "New Appointment Booked", details: "Sophia Reynolds booked Bridal Makeup for May 12, 10:30 AM", time: "2m ago", icon: Zap, color: "text-yellow-500", link: "/admin/appointments", isNew: true },
  { id: 2, type: "inventory", msg: "Product Restocked", details: "Augustinus Bader | The Rich Cream restocked by 12 units", time: "15m ago", icon: Package, color: "text-blue-500", link: "/admin/inventory", isNew: true },
  { id: 3, type: "staff", msg: "Marcus Vane Logged In", details: "Staff session initialized on Station 4", time: "1h ago", icon: User, color: "text-green-500", link: "/admin/staff", isNew: false },
  { id: 4, type: "security", msg: "Login Security Check", details: "Passed credentials verification from NYC IP", time: "3h ago", icon: ShieldCheck, color: "text-primary", link: "/admin/security", isNew: false },
  { id: 5, type: "ritual", msg: "Appointment Rescheduled", details: "Arthur Shelby moved Hair Colour to May 13, 03:30 PM", time: "4h ago", icon: Calendar, color: "text-purple-500", link: "/admin/appointments", isNew: false },
  { id: 6, type: "inventory", msg: "Low Stock Alert", details: "Charlotte Tilbury | Magic Cream down to 8 units", time: "5h ago", icon: AlertCircle, color: "text-red-500", link: "/admin/inventory", isNew: false },
  { id: 7, type: "finances", msg: "Invoice Payment Received", details: "INV-8901 for £4,500.00 settled via Card", time: "6h ago", icon: PoundSterling, color: "text-emerald-500", link: "/admin/finances", isNew: false },
  { id: 8, type: "staff", msg: "Elena Gilbert Clocked Out", details: "Completed 8-hour shift, Master Stylist", time: "8h ago", icon: User, color: "text-orange-500", link: "/admin/staff", isNew: false },
  { id: 9, type: "security", msg: "Password Updated", details: "Administrator password rotated successfully", time: "1d ago", icon: ShieldCheck, color: "text-primary", link: "/admin/security", isNew: false },
  { id: 10, type: "finances", msg: "New Invoice Generated", details: "INV-8902 for £1,200.00 generated for Marcus Thorne", time: "1d ago", icon: PoundSterling, color: "text-emerald-500", link: "/admin/finances", isNew: false },
];

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => (
  <div className="luxury-card !p-5 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-2.5 rounded-lg", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className={cn("flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full", trend > 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500")}>
        {trend > 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-serif font-black text-foreground">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyCategory, setHistoryCategory] = useState<string>("All");
  const [mounted, setMounted] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    
    const savedApps = localStorage.getItem('glamora-appointments');
    if (savedApps) {
      try {
        setAppointments(JSON.parse(savedApps));
      } catch(e) { console.error(e); }
    }
    
    const savedOrders = localStorage.getItem('glamora-product-orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch(e) { console.error(e); }
    }

    const savedStaff = localStorage.getItem('glamora-staff');
    const defaultStaff = [
      { id: "S-101", name: "Elena Gilbert", role: "Master Stylist", revenue: "£14.2k", rating: 4.9, status: "Active", rituals: 124, image: "/images/staff/elena-gilbert.png" },
      { id: "S-102", name: "Marcus Vane", role: "Lead Barber", revenue: "£8.5k", rating: 4.8, status: "Active", rituals: 98, image: "/images/staff/marcus-vane.png" },
      { id: "S-103", name: "Sarah Jenkins", role: "Skin Specialist", revenue: "£7.1k", rating: 5.0, status: "On Leave", rituals: 72, image: "/images/staff/sarah-jenkins.png" },
      { id: "S-104", name: "Arthur Shelby", role: "Spa Therapist", revenue: "£4.5k", rating: 4.9, status: "Active", rituals: 32, image: "/images/staff/arthur-shelby.png" },
      { id: "S-105", name: "Sophia Loren", role: "Bridal Expert", revenue: "£21.0k", rating: 5.0, status: "Active", rituals: 189, image: "/images/staff/sophia-loren.png" },
      { id: "S-106", name: "David Gandy", role: "Lead Barber", revenue: "£8.8k", rating: 4.7, status: "Busy", rituals: 72, image: "/images/staff/david-gandy.png" },
    ];

    if (savedStaff) {
      try {
        const parsed = JSON.parse(savedStaff);
        let migrated = false;
        const updated = parsed.map((member: any) => {
          const matchedInitial = defaultStaff.find(s => s.id === member.id || s.name === member.name);
          if (matchedInitial && member.image !== matchedInitial.image && (!member.image || member.image.includes('unsplash.com'))) {
            migrated = true;
            return { ...member, image: matchedInitial.image };
          }
          return member;
        });
        if (migrated) {
          localStorage.setItem('glamora-staff', JSON.stringify(updated));
          setStaff(updated);
        } else {
          setStaff(parsed);
        }
      } catch(e) { 
        console.error(e); 
        setStaff(defaultStaff);
      }
    } else {
      setStaff(defaultStaff);
      localStorage.setItem('glamora-staff', JSON.stringify(defaultStaff));
    }
  }, []);

  const dynamicRev = useMemo(() => {
    return orders
      .filter(o => o.paymentStatus === "Paid")
      .reduce((acc, o) => acc + o.total, 0);
  }, [orders]);

  const appointmentsCount = useMemo(() => {
    return 120 + appointments.length;
  }, [appointments]);

  const revenueText = useMemo(() => {
    const totalRev = 42.5 + (dynamicRev / 1000);
    return `£${totalRev.toFixed(1)}k`;
  }, [dynamicRev]);

  const dynamicActivities = useMemo(() => {
    const list: any[] = [];
    appointments.slice(0, 5).forEach((a, idx) => {
      const isInitial = ["A-1024", "A-1025", "A-1026", "A-1027"].includes(a.id);
      list.push({
        id: `app-${a.id}-${idx}`,
        type: "ritual",
        msg: isInitial ? "Appointment Scheduled" : "New Appointment Booked",
        details: `${a.guest} reserved ${a.service} on ${a.date} at ${a.time}`,
        time: isInitial ? "1d ago" : "Just now",
        icon: Calendar,
        color: "text-yellow-500",
        link: "/admin/appointments",
        isNew: !isInitial
      });
    });

    orders.slice(0, 5).forEach((o, idx) => {
      const isInitial = ["O-1024", "O-1025", "O-1026"].includes(o.id);
      list.push({
        id: `ord-${o.id}-${idx}`,
        type: "inventory",
        msg: isInitial ? "Order Fulfilled" : "New Product Order",
        details: `${o.customerName} ordered ${o.items.length} item(s) for £${o.total.toFixed(2)}`,
        time: isInitial ? "2d ago" : "Just now",
        icon: ShoppingBag,
        color: "text-blue-500",
        link: "/admin/orders",
        isNew: !isInitial
      });
    });
    return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }, [appointments, orders]);

  const displayedActivities = useMemo(() => {
    const combined = [...dynamicActivities];
    extendedActivities.forEach(act => {
      if (!combined.some(c => c.details === act.details)) {
        combined.push(act);
      }
    });
    return combined;
  }, [dynamicActivities]);

  const filteredHistory = displayedActivities.filter(act => {
    if (historyCategory === "All") return true;
    return act.type === historyCategory;
  });

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={revenueText} trend={12.4} icon={PoundSterling} color="bg-primary/10 text-primary" />
        <StatCard title="Appointments" value={appointmentsCount.toString()} trend={8.2} icon={Calendar} color="bg-blue-500/10 text-blue-500" />
        <StatCard title="New Clients" value="2.8k" trend={-3.1} icon={Users} color="bg-purple-500/10 text-purple-500" />
        <StatCard title="Stock Level" value="94%" trend={2.5} icon={Package} color="bg-orange-500/10 text-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 luxury-card !p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-serif font-black">Sales Overview</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Weekly performance tracking</p>
            </div>
            <select className="bg-accent/50 border border-border rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `£${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="luxury-card !p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
          
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-serif font-black text-foreground">Recent Activity</h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Real-time salon events</p>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Live</span>
              </div>
            </div>

            <div className="space-y-1">
              {displayedActivities.slice(0, 4).map((activity) => (
                <Link key={activity.id} href={activity.link} className="block">
                  <motion.div 
                    whileHover={{ x: 8, backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }}
                    className="flex items-start space-x-4 p-3 -mx-3 rounded-2xl cursor-pointer group transition-all duration-300"
                  >
                    <div className={cn("mt-1 p-2.5 rounded-xl bg-accent/50 group-hover:bg-accent transition-colors shadow-sm", activity.color)}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 border-b border-border/50 pb-3 group-last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{activity.msg}</p>
                        {activity.isNew && (
                          <span className="px-1.5 py-0.5 bg-primary/10 text-[8px] font-black text-primary rounded uppercase">New</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{activity.time}</p>
                        <ArrowUpRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="w-full mt-6 py-4 bg-accent/50 hover:bg-primary/10 text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all border border-border/50 hover:border-primary/20 flex items-center justify-center gap-2"
          >
            View All History
            <Activity className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 3. STAFF PERFORMANCE */}
      <div className="luxury-card !p-0 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border bg-accent/10 flex items-center justify-between">
          <h3 className="text-lg font-serif font-black">Staff Performance</h3>
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Staff Member</th>
                <th className="px-6 py-4">Total Appointments</th>
                <th className="px-6 py-4">Revenue Generated</th>
                <th className="px-6 py-4">Customer Rating</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staff.map((member, i) => (
                <tr key={i} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center font-black text-[10px] text-primary border border-border">
                        {member.image ? (
                          <img src={member.image} className="w-full h-full object-cover" alt="" />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-bold">{member.name}</p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">{member.rituals} Visits</td>
                  <td className="px-6 py-4 font-bold text-primary">
                    {typeof member.revenue === 'string' ? member.revenue.replace('$', '£') : `£${member.revenue}`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-3 h-3 fill-primary text-primary" />
                      <span className="font-bold">{member.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest", 
                      member.status === "Active" ? "bg-green-500/10 text-green-500" : 
                      member.status === "Busy" ? "bg-red-500/10 text-red-500" :
                      "bg-yellow-500/10 text-yellow-500"
                    )}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ACTIVITY HISTORY SLIDE-OVER PANEL */}
      <AnimatePresence>
        {isHistoryOpen && (
          <div className="fixed inset-0 z-[2000] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-screen bg-card border-l border-border shadow-premium flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border bg-accent/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-black text-foreground flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Activity History
                  </h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Audit log of real-time salon events</p>
                </div>
                <button 
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-2 hover:bg-accent rounded-xl transition-all"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Filters */}
              <div className="p-4 border-b border-border bg-accent/5 flex flex-wrap gap-1.5">
                {[
                  { name: "All", type: "All" },
                  { name: "Appointments", type: "ritual" },
                  { name: "Inventory", type: "inventory" },
                  { name: "Staff", type: "staff" },
                  { name: "Security", type: "security" },
                  { name: "Finances", type: "finances" },
                ].map(cat => (
                  <button
                    key={cat.type}
                    onClick={() => setHistoryCategory(cat.type)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider border transition-all",
                      historyCategory === cat.type 
                        ? "bg-primary border-primary text-background shadow-sm" 
                        : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((act) => (
                    <Link key={act.id} href={act.link} onClick={() => setIsHistoryOpen(false)} className="block">
                      <div className="p-4 bg-accent/20 border border-border hover:border-primary/40 rounded-2xl flex gap-4 transition-all duration-300 transform hover:scale-[1.01] cursor-pointer">
                        <div className={cn("p-2.5 h-fit rounded-xl bg-card border border-border flex items-center justify-center", act.color)}>
                          <act.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black text-foreground">{act.msg}</h4>
                            <span className="text-[9px] text-muted-foreground uppercase font-black">{act.time}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground leading-relaxed font-bold">{act.details}</p>
                          <div className="pt-2 flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-primary">
                            <span>Go to section</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-20 text-muted-foreground opacity-50">
                    <Activity className="w-10 h-10" />
                    <p className="text-[9px] font-black uppercase tracking-widest">No activities found in this category.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
