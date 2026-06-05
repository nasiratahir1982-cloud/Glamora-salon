"use client";

import React, { useState, useMemo } from "react";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  TrendingUp, 
  AlertCircle,
  X,
  Download,
  Eye,
  Tag,
  Layers,
  Sparkles,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { products as initialProducts, Product } from "@/lib/mockData";

export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState<"All" | "Low Stock" | "Out of Stock">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [currentImage, setCurrentImage] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || 
        p.category === filter ||
        (filter.toLowerCase().startsWith("bridal") && p.category.toLowerCase().startsWith("bridal"));
      const matchesStock = stockFilter === "All" || 
        (stockFilter === "Low Stock" && p.stock < 10 && p.stock > 0) || 
        (stockFilter === "Out of Stock" && p.stock === 0);
      return matchesSearch && matchesFilter && matchesStock;
    });
  }, [products, search, filter, stockFilter]);

  const totalValue = useMemo(() => {
    const sum = products.reduce((acc, p) => {
      const priceNum = parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0;
      return acc + (priceNum * p.stock);
    }, 0);
    if (sum >= 1000) {
      return `£${(sum / 1000).toFixed(1)}k`;
    }
    return `£${sum.toFixed(0)}`;
  }, [products]);

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "SKU", "Category", "Stock Level", "Price", "Total Value"];
    const rows = products.map(p => {
      const priceNum = parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0;
      const totalVal = priceNum * p.stock;
      return [
        p.id,
        `"${p.name.replace(/"/g, '""')}"`,
        p.sku,
        `"${p.category}"`,
        p.stock.toString(),
        `"${p.price}"`,
        `"£${totalVal.toFixed(2)}"`
      ];
    });
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `glamora_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExportModalOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setCurrentImage(product.image);
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
    let priceVal = formData.get("price") as string;
    if (priceVal && !priceVal.startsWith("£")) {
      priceVal = `£${priceVal}`;
    }
    const productData = {
      id: editingProduct?.id || `P-${Math.floor(Math.random() * 1000)}`,
      name: formData.get("name") as string,
      sku: formData.get("sku") as string,
      price: priceVal,
      stock: parseInt(formData.get("stock") as string),
      category: formData.get("category") as string,
      desc: formData.get("desc") as string,
      image: currentImage || editingProduct?.image || "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80",
      status: (parseInt(formData.get("stock") as string) > 10 ? 'In Stock' : parseInt(formData.get("stock") as string) > 0 ? 'Low Stock' : 'Out of Stock') as any,
      rating: editingProduct?.rating || 5.0,
      reviewsCount: editingProduct?.reviewsCount || 0,
      tags: editingProduct?.tags || ["New"]
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts([productData, ...products]);
    }

    setIsModalOpen(false);
  };

  const stats = [
    { label: "Total Items", value: products.length, icon: Layers, color: "text-primary", stockType: "All" as const },
    { label: "Total Value", value: totalValue, icon: TrendingUp, color: "text-green-500", stockType: null },
    { label: "Low Stock", value: products.filter(p => p.stock < 10 && p.stock > 0).length, icon: AlertCircle, color: "text-yellow-500", stockType: "Low Stock" as const },
    { label: "Out of Stock", value: products.filter(p => p.stock === 0).length, icon: X, color: "text-red-500", stockType: "Out of Stock" as const },
  ];

  return (
    <div className="space-y-8 pb-10 print:p-0">
      {/* 1. SIMPLE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border print:hidden">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">Inventory List</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Manage your products and stock levels</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="btn-outline hover:border-primary hover:text-primary transition-all"
          >
            <Download className="w-4 h-4 mr-2" /> Export List
          </button>
          <button 
            onClick={() => { setEditingProduct(null); setCurrentImage(""); setIsModalOpen(true); }}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Item
          </button>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 print:hidden">
        {stats.map((s, i) => {
          const isFilterable = s.stockType !== null;
          const isActive = isFilterable && stockFilter === s.stockType;
          return (
            <div 
              key={i} 
              onClick={() => {
                if (isFilterable) {
                  setStockFilter(s.stockType);
                }
              }}
              className={cn(
                "luxury-card !p-5 flex items-center space-x-4 transition-all duration-300 transform hover:-translate-y-0.5",
                isFilterable ? "cursor-pointer hover:border-primary/50" : "",
                isActive ? "border-primary bg-primary/5 ring-1 ring-primary/20" : ""
              )}
            >
              <div className={cn("p-2.5 rounded-lg bg-accent/50", s.color)}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
                <p className="text-xl font-serif font-black">{s.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-card p-2 rounded-2xl border border-border print:hidden">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by name or code..." 
            className="w-full bg-accent/30 border border-primary/30 rounded-xl py-2.5 px-10 text-xs font-bold focus:outline-none focus:border-primary transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar max-w-full pb-2 md:pb-0">
          {["All", "Skin Care", "Grooming", "Bridal Care", "Hair Styling"].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap",
                filter === cat ? "bg-primary border-primary text-background shadow-sm" : "bg-card border-border text-foreground hover:border-primary/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. INVENTORY TABLE */}
      <div className="luxury-card !p-0 overflow-hidden shadow-sm print:hidden">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Item Name</th>
                <th className="px-6 py-4">Product Code</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-accent/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img src={p.image} className="w-10 h-10 object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500 shadow-sm" />
                      <div>
                        <p className="font-bold text-foreground">{p.name}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-2.5 h-2.5 text-primary fill-primary" />
                          <span className="text-[9px] font-bold text-muted-foreground">{p.rating}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-muted-foreground">{p.sku}</td>
                  <td className="px-6 py-4">
                    <span className="badge-luxury bg-accent/40 border-border !px-2.5 !py-0.5">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        p.status === 'In Stock' ? 'bg-green-500' : p.status === 'Low Stock' ? 'bg-yellow-500' : 'bg-red-500'
                      )} />
                      <span className="font-bold">{p.stock} units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-serif font-black text-sm text-foreground">{p.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit(p)} className="p-2 bg-accent/50 hover:bg-primary hover:text-background rounded-lg transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteConfirmId(p.id)} className="p-2 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/10">
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

      {/* 📥 EXPORT MODAL */}
      <AnimatePresence>
        {isExportModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-md rounded-3xl p-8 relative border border-border shadow-premium text-center"
            >
              <button 
                onClick={() => setIsExportModalOpen(false)} 
                className="absolute top-6 right-6 p-2 bg-accent rounded-xl hover:bg-red-500 hover:text-white transition-all focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <Download className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-serif font-black mb-2">Export Inventory List</h3>
              <p className="text-xs text-muted-foreground mb-8">
                Choose your preferred export format for the current inventory records.
              </p>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={handleExportCSV}
                  className="w-full p-4 rounded-2xl bg-accent/30 hover:bg-primary hover:text-background transition-all border border-border flex items-center justify-between group font-bold"
                >
                  <div className="text-left">
                    <p className="text-xs text-foreground group-hover:text-background font-black uppercase tracking-wider">Download Spreadsheet</p>
                    <p className="text-[10px] text-muted-foreground group-hover:text-background/80 mt-0.5">Compatible with Excel & Google Sheets (.csv)</p>
                  </div>
                  <span className="text-xs text-primary group-hover:text-background font-black">&rarr;</span>
                </button>

                <button
                  onClick={() => {
                    setIsExportModalOpen(false);
                    setTimeout(() => window.print(), 300);
                  }}
                  className="w-full p-4 rounded-2xl bg-accent/30 hover:bg-primary hover:text-background transition-all border border-border flex items-center justify-between group font-bold"
                >
                  <div className="text-left">
                    <p className="text-xs text-foreground group-hover:text-background font-black uppercase tracking-wider">Print Audit Report</p>
                    <p className="text-[10px] text-muted-foreground group-hover:text-background/80 mt-0.5">Generates print-optimized PDF statement</p>
                  </div>
                  <span className="text-xs text-primary group-hover:text-background font-black">&rarr;</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-2xl rounded-3xl p-8 relative border border-border shadow-premium"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 bg-accent rounded-xl hover:bg-red-500 hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-black tracking-tight">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-primary mt-1">Inventory Management Portal</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* 📸 IMAGE UPLOAD SECTION */}
                <div className="flex items-center space-x-6 pb-6 border-b border-border">
                  <div className="relative group w-24 h-24 flex-shrink-0">
                    <img 
                      src={currentImage || "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80"} 
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
                    <label className="form-label !mb-0">Product Imagery</label>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">Recommended: High-resolution PNG or JPG</p>
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

                <div className="grid grid-cols-2 gap-6">
                  <div className="form-input-group">
                    <label className="form-label">Product Name</label>
                    <input type="text" name="name" required className="form-input" defaultValue={editingProduct?.name} />
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Product Code (SKU)</label>
                    <input type="text" name="sku" required className="form-input" defaultValue={editingProduct?.sku} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="form-input-group">
                    <label className="form-label">Price (£)</label>
                    <input type="text" name="price" required className="form-input" defaultValue={editingProduct?.price} />
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">In Stock</label>
                    <input type="number" name="stock" required className="form-input" defaultValue={editingProduct?.stock} />
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Category</label>
                    <select name="category" className="form-input" defaultValue={editingProduct?.category}>
                      <option value="Skin Care">Skin Care</option>
                      <option value="Grooming">Grooming</option>
                      <option value="Bridal Care">Bridal Care</option>
                      <option value="Hair Styling">Hair Styling</option>
                    </select>
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="form-label">Product Description</label>
                  <textarea name="desc" className="form-input h-24" defaultValue={editingProduct?.desc} />
                </div>
                
                <div className="flex justify-end pt-6 space-x-4 border-t border-border">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline">Cancel</button>
                  <button type="submit" className="btn-primary px-8">
                    {editingProduct ? "Save Changes" : "Add Product"}
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
                Are you sure you want to permanently delete this product? This action is irreversible and will remove all associated logs.
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

      {/* 🖨️ PRINT-ONLY INVENTORY AUDIT REPORT */}
      <div className="hidden print:block p-8 space-y-8 bg-white text-black font-sans print-only">
        <div className="flex justify-between items-start border-b pb-6 border-gray-300">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">GLAMORA LUXURY SALON</h1>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1">Official Inventory & Audit Statement</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Date: {new Date().toLocaleDateString("en-GB")}</p>
            <p className="text-xs text-gray-500">London, United Kingdom</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 p-4 bg-gray-100 rounded-xl">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Total Distinct Items</p>
            <p className="text-lg font-bold">{products.length}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Total Inventory Value</p>
            <p className="text-lg font-bold">{totalValue}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Low Stock Warning Items</p>
            <p className="text-lg font-bold text-yellow-600">{products.filter(p => p.stock < 10).length}</p>
          </div>
        </div>

        <table className="w-full text-left text-xs border-collapse mt-8">
          <thead>
            <tr className="border-b border-gray-400 text-gray-700 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">SKU</th>
              <th className="py-3 px-2">Item Name</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2">Stock Level</th>
              <th className="py-3 px-2">Price</th>
              <th className="py-3 px-2 text-right">Total Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((p) => {
              const priceNum = parseFloat(p.price.replace(/[^0-9.]/g, "")) || 0;
              const totalVal = priceNum * p.stock;
              return (
                <tr key={p.id} className="text-gray-800">
                  <td className="py-3 px-2 font-mono font-semibold">{p.sku}</td>
                  <td className="py-3 px-2 font-bold">{p.name}</td>
                  <td className="py-3 px-2">{p.category}</td>
                  <td className="py-3 px-2">{p.stock} units</td>
                  <td className="py-3 px-2">{p.price}</td>
                  <td className="py-3 px-2 text-right font-semibold">£{totalVal.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
