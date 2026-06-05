"use client";

import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  X, 
  ChevronRight, 
  CreditCard, 
  Eye, 
  Truck, 
  User, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  DollarSign, 
  ShieldAlert,
  Printer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const initialOrders = [
  {
    id: "O-1024",
    customerName: "Elena Gilbert",
    customerPhone: "+44 7800 123456",
    customerEmail: "elena@example.com",
    items: [
      { id: "P-001", name: "Augustinus Bader | The Rich Cream", price: 230, quantity: 1, image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80" },
      { id: "P-006", name: "Olaplex | No.3 Hair Perfector", price: 28, quantity: 2, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80" }
    ],
    subtotal: 286,
    tax: 57.2,
    discount: 20,
    total: 323.2,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    status: "Shipped",
    date: "2026-06-03"
  },
  {
    id: "O-1025",
    customerName: "Arthur Shelby",
    customerPhone: "+44 7800 654321",
    customerEmail: "arthur@example.com",
    items: [
      { id: "P-005", name: "Tom Ford | Conditioning Beard Oil", price: 44, quantity: 1, image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80" }
    ],
    subtotal: 44,
    tax: 8.8,
    discount: 0,
    total: 67.8, // Includes shipping (£15)
    paymentMethod: "Pay at Salon",
    paymentStatus: "Pending",
    status: "Pending",
    date: "2026-06-04"
  },
  {
    id: "O-1026",
    customerName: "Sophia Loren",
    customerPhone: "+44 7800 987654",
    customerEmail: "sophia@example.com",
    items: [
      { id: "P-002", name: "La Mer | Crème de la Mer", price: 165, quantity: 1, image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80" }
    ],
    subtotal: 165,
    tax: 33,
    discount: 20,
    total: 178, // Free shipping (> £100 subtotal)
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    status: "Completed",
    date: "2026-06-05"
  }
];

export default function OrderManagement() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("glamora-product-orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error(e);
        localStorage.setItem("glamora-product-orders", JSON.stringify(initialOrders));
        setOrders(initialOrders);
      }
    } else {
      localStorage.setItem("glamora-product-orders", JSON.stringify(initialOrders));
      setOrders(initialOrders);
    }
  }, []);

  const updateOrderStatus = (id: string, newStatus: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem("glamora-product-orders", JSON.stringify(updated));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const updatePaymentStatus = (id: string, newStatus: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, paymentStatus: newStatus } : o);
    setOrders(updated);
    localStorage.setItem("glamora-product-orders", JSON.stringify(updated));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus });
    }
  };

  const handleDeleteOrder = (id: string) => {
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    localStorage.setItem("glamora-product-orders", JSON.stringify(updated));
    setDeleteConfirmId(null);
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder(null);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.customerName.toLowerCase().includes(search.toLowerCase()) || 
      o.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());

    if (filterStatus === "All") return matchesSearch;
    if (filterStatus === "Paid") return matchesSearch && o.paymentStatus === "Paid";
    if (filterStatus === "Pending Pay") return matchesSearch && o.paymentStatus === "Pending";
    return matchesSearch && o.status === filterStatus;
  });

  // Calculate Metrics
  const totalRevenue = orders
    .filter(o => o.paymentStatus === "Paid")
    .reduce((acc, o) => acc + o.total, 0);

  const pendingOrdersCount = orders.filter(o => o.status === "Pending").length;
  const shippedOrdersCount = orders.filter(o => o.status === "Shipped").length;

  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">Product Orders</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Monitor product purchases, payments, and delivery tracking</p>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="luxury-card !p-5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Orders</p>
            <p className="text-2xl font-serif font-black text-foreground">{orders.length}</p>
          </div>
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
        <div className="luxury-card !p-5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Revenue (Paid)</p>
            <p className="text-2xl font-serif font-black text-primary">£{totalRevenue.toFixed(2)}</p>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="luxury-card !p-5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Pending Fulfillment</p>
            <p className="text-2xl font-serif font-black text-yellow-500">{pendingOrdersCount}</p>
          </div>
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="luxury-card !p-5 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">In Transit</p>
            <p className="text-2xl font-serif font-black text-blue-500">{shippedOrdersCount}</p>
          </div>
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <Truck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. CONTROLS */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-card p-2 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by customer, email, or Order ID..." 
            className="w-full bg-accent/30 border border-primary/30 rounded-xl py-2.5 px-10 text-xs font-bold focus:outline-none focus:border-primary transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar max-w-full pb-2 md:pb-0">
          {[
            { label: "All Statuses", value: "All" },
            { label: "Pending", value: "Pending" },
            { label: "Shipped", value: "Shipped" },
            { label: "Completed", value: "Completed" },
            { label: "Paid", value: "Paid" },
            { label: "Unpaid", value: "Pending Pay" }
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border whitespace-nowrap",
                filterStatus === opt.value 
                  ? "bg-primary border-primary text-background font-black shadow-sm" 
                  : "bg-card border-border text-muted-foreground hover:border-primary/40"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. ORDERS TABLE */}
      <div className="luxury-card !p-0 overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Customer Info</th>
                <th className="px-6 py-4">Ordered Items</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Order Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-accent/30 transition-colors">
                    {/* Order ID & Date */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="font-black text-foreground">{order.id}</p>
                        <p className="text-[9px] text-muted-foreground font-bold uppercase">{order.date}</p>
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-foreground">{order.customerName}</p>
                        <p className="text-[10px] text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </td>

                    {/* Ordered Items */}
                    <td className="px-6 py-4">
                      <div className="max-w-[200px] truncate">
                        <p className="font-bold text-foreground">
                          {order.items.map((i: any) => `${i.name} (${i.quantity})`).join(", ")}
                        </p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{order.items.length} unique item(s)</p>
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="px-6 py-4 font-black text-foreground text-sm">
                      £{order.total.toFixed(2)}
                    </td>

                    {/* Payment Status */}
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => updatePaymentStatus(order.id, order.paymentStatus === 'Paid' ? 'Pending' : 'Paid')}
                        className={cn(
                          "px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border transition-all flex items-center gap-1.5",
                          order.paymentStatus === 'Paid' 
                            ? "bg-green-500/10 border-green-500/20 text-green-500" 
                            : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500 animate-pulse"
                        )}
                        title="Toggle Payment Status"
                      >
                        <CreditCard className="w-3 h-3" />
                        <span>{order.paymentStatus}</span>
                      </button>
                    </td>

                    {/* Order Status */}
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={cn(
                          "bg-accent/50 border rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-widest outline-none transition-colors",
                          order.status === 'Completed' ? 'border-green-500/30 text-green-500 bg-green-500/5' :
                          order.status === 'Shipped' ? 'border-blue-500/30 text-blue-500 bg-blue-500/5' :
                          order.status === 'Cancelled' ? 'border-red-500/30 text-red-500 bg-red-500/5' :
                          'border-yellow-500/30 text-yellow-500 bg-yellow-500/5'
                        )}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {deleteConfirmId === order.id ? (
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleDeleteOrder(order.id)}
                              className="px-2.5 py-1 bg-red-500 text-white rounded text-[8px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
                            >
                              Confirm
                            </button>
                            <button 
                              onClick={() => setDeleteConfirmId(null)}
                              className="p-1 hover:bg-accent rounded text-[8px] text-muted-foreground"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteConfirmId(order.id)}
                            className="p-2 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                            title="Delete Order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground opacity-60">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-40 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest">No product orders found matching search filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. SIDE-OVER DETAILS PANEL */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[2000] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-screen bg-card border-l border-border shadow-premium flex flex-col z-10 overflow-hidden"
            >
              {/* Panel Header */}
              <div className="p-6 border-b border-border bg-accent/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-black text-foreground flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    Order Details
                  </h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Order Ref: {selectedOrder.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-accent rounded-xl transition-all"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                
                {/* Status controls */}
                <div className="p-5 bg-accent/20 border border-border rounded-2xl space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Manage Status</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Order Status</label>
                      <select 
                        value={selectedOrder.status}
                        onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                        className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-primary transition-all"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Payment Status</label>
                      <select 
                        value={selectedOrder.paymentStatus}
                        onChange={(e) => updatePaymentStatus(selectedOrder.id, e.target.value)}
                        className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-primary transition-all"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Customer card */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Customer Profile</h4>
                  <div className="luxury-card !p-5 space-y-4 bg-accent/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary text-sm uppercase">
                        {selectedOrder.customerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{selectedOrder.customerName}</p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono">Date Placed: {selectedOrder.date}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border/50 space-y-3">
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground truncate">{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground">{selectedOrder.customerPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items breakdown */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Purchased Products</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center bg-card p-3 rounded-xl border border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-border">
                            <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                          </div>
                          <div>
                            <p className="font-bold text-xs text-foreground max-w-[200px] truncate">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground">Qty: {item.quantity} • £{item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <p className="font-serif font-black text-foreground italic text-xs">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="space-y-4 pt-4 border-t border-border/50">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">Financial Summary</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-bold">£{selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (VAT 20%)</span>
                      <span className="font-bold">£{selectedOrder.tax.toFixed(2)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-primary font-bold">
                        <span>Discount Applied</span>
                        <span>-£{selectedOrder.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-border flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest">Total Amount</span>
                      <span className="text-xl font-serif font-black text-primary">£{selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping & Payment details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="p-3 bg-accent/10 border border-border/30 rounded-xl space-y-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Payment Method</p>
                    <p className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase">
                      <CreditCard className="w-3.5 h-3.5 text-primary" />
                      {selectedOrder.paymentMethod}
                    </p>
                  </div>
                  <div className="p-3 bg-accent/10 border border-border/30 rounded-xl space-y-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Security Level</p>
                    <p className="text-xs font-bold text-green-500 flex items-center gap-1.5 uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </p>
                  </div>
                </div>

              </div>

              {/* Panel Footer */}
              <div className="p-6 border-t border-border bg-accent/10 flex items-center gap-4">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-primary text-background hover:bg-primary/95 text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
                >
                  <Printer className="w-4 h-4" /> Print Order Invoice
                </button>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-3 border border-border hover:bg-accent text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
