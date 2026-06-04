export interface Product {
  id: string;
  sku: string;
  name: string;
  desc: string;
  price: string;
  category: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
  tags: string[];
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
  verified: boolean;
  likes: number;
}

export interface Appointment {
  id: string;
  guest: string;
  service: string;
  artisan: string;
  date: string;
  time: string;
  status: 'Authorized' | 'In Flight' | 'Pending' | 'Completed';
}

export const products: Product[] = [
  { id: "P-001", sku: "BAD-001", name: "Augustinus Bader | The Rich Cream", desc: "An intense, deeply hydrating moisturizer that supports cellular renewal.", price: "£230", category: "Skin Care", stock: 12, rating: 5.0, reviewsCount: 145, status: 'In Stock', image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80", tags: ["Premium", "Skin"] },
  { id: "P-002", sku: "MER-002", name: "La Mer | Crème de la Mer", desc: "The legendary moisturizer that delivers soothing moisture and daily protection.", price: "£165", category: "Skin Care", stock: 45, rating: 4.8, reviewsCount: 320, status: 'In Stock', image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&q=80", tags: ["Luxury", "Skin"] },
  { id: "P-003", sku: "CT-003", name: "Charlotte Tilbury | Magic Cream", desc: "The award-winning, instant-turnaround moisturizer for a hydrated complexion.", price: "£79", category: "Bridal Care", stock: 8, rating: 4.9, reviewsCount: 560, status: 'Low Stock', image: "/glamora-salon/images/magic-cream.png", tags: ["Bridal", "Glow"] },
  { id: "P-004", sku: "DYS-004", name: "Dyson | Supersonic™ Hair Dryer", desc: "Fast drying. No extreme heat. Engineered for professional salon styling.", price: "£329", category: "Hair Styling", stock: 5, rating: 5.0, reviewsCount: 890, status: 'In Stock', image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?auto=format&fit=crop&q=80", tags: ["Professional", "Tech"] },
  { id: "P-005", sku: "TF-005", name: "Tom Ford | Conditioning Beard Oil", desc: "A lightweight blend of almond and jojoba oils, scented with Tobacco Vanille.", price: "£44", category: "Grooming", stock: 0, rating: 4.7, reviewsCount: 156, status: 'Out of Stock', image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80", tags: ["Signature", "Grooming"] },
  { id: "P-006", sku: "OLA-006", name: "Olaplex | No.3 Hair Perfector", desc: "Global best-seller at-home treatment that reduces breakage and strengthens hair.", price: "£28", category: "Hair Styling", stock: 15, rating: 4.9, reviewsCount: 1200, status: 'In Stock', image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80", tags: ["Repair", "Best-Seller"] },
  { id: "P-007", sku: "AES-007", name: "Aesop | Moroccan Neroli Shaving Duet", desc: "A sophisticated pair to facilitate the perfect shave, with Serum and Lotion.", price: "£63", category: "Grooming", stock: 10, rating: 4.8, reviewsCount: 92, status: 'In Stock', image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80", tags: ["Natural", "Grooming"] },
  { id: "P-008", sku: "CHA-008", name: "Chanel | N°5 Eau de Parfum", desc: "The very essence of femininity. A powdery floral bouquet in an iconic bottle.", price: "£136", category: "Bridal Care", stock: 4, rating: 5.0, reviewsCount: 2100, status: 'Low Stock', image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80", tags: ["Iconic", "Timeless"] },
  { id: "P-009", sku: "GHD-009", name: "GHD | Platinum+ Smart Styler", desc: "Recognises your hair's needs and constantly adapts the power for ultimate results.", price: "£239", category: "Hair Styling", stock: 7, rating: 4.9, reviewsCount: 450, status: 'In Stock', image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80", tags: ["Styling", "Pro"] },
  { id: "P-010", sku: "ELE-010", name: "Elemis | Pro-Collagen Cleansing Balm", desc: "A nourishing cleansing balm that melts away makeup and impurities for a glowing complexion.", price: "£48", category: "Skin Care", stock: 25, rating: 4.8, reviewsCount: 880, status: 'In Stock', image: "/glamora-salon/images/elemis-cleansing-balm.png", tags: ["Cleansing", "Best-Seller"] },
  { id: "P-011", sku: "KER-011", name: "Kérastase | Elixir Ultime Oil", desc: "A versatile, beautifying oil for all hair types that provides ultimate shine and hydration.", price: "£52", category: "Hair Styling", stock: 30, rating: 4.9, reviewsCount: 670, status: 'In Stock', image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80", tags: ["Hair", "Shine"] },
  { id: "P-012", sku: "JM-012", name: "Jo Malone London | Peony Cologne", desc: "The essence of charm. Peonies in voluptuous bloom, exquisite and fragile.", price: "£118", category: "Bridal Care", stock: 12, rating: 4.9, reviewsCount: 340, status: 'In Stock', image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80", tags: ["Fragrance", "Bridal"] },
  { id: "P-013", sku: "ADP-013", name: "Acqua di Parma | Shaving Cream", desc: "A soft and thick shaving cream that provides a comfortable and clean shave.", price: "£42", category: "Grooming", stock: 20, rating: 4.7, reviewsCount: 110, status: 'In Stock', image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80", tags: ["Italian", "Shave"] },
  { id: "P-014", sku: "DRB-014", name: "Dr. Barbara Sturm | Serum", desc: "The Hyaluronic Serum is the most fundamental item in Dr. Barbara Sturm's skincare line.", price: "£250", category: "Skin Care", stock: 10, rating: 5.0, reviewsCount: 220, status: 'In Stock', image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80", tags: ["Science", "Serum"] },
  { id: "P-015", sku: "ORI-015", name: "Oribe | Texturizing Spray", desc: "A revolutionary invisible dry hair spray that builds incredible volume and texture.", price: "£45", category: "Hair Styling", stock: 18, rating: 4.8, reviewsCount: 950, status: 'In Stock', image: "/glamora-salon/images/oribe-spray.png", tags: ["Volume", "Pro"] },
  { id: "P-016", sku: "MB-016", name: "Molton Brown | Black Pepper Gel", desc: "Re-charge your senses with the woody-citrus notes of this iconic bath and shower gel.", price: "£25", category: "Grooming", stock: 50, rating: 4.7, reviewsCount: 1500, status: 'In Stock', image: "/glamora-salon/images/black-pepper-gel.png", tags: ["Iconic", "Grooming"] },
  { id: "P-017", sku: "HGR-017", name: "Hourglass | Veil Mineral Primer", desc: "An oil-free primer with a silky, airy texture that leaves skin with a smooth finish.", price: "£53", category: "Bridal Care", stock: 15, rating: 4.9, reviewsCount: 1200, status: 'In Stock', image: "/glamora-salon/images/hourglass-primer.png", tags: ["Primer", "Bridal"] },
  { id: "P-018", sku: "SIS-018", name: "Sisley Paris | Black Rose Face Oil", desc: "A dry oil that nourishes skin while providing visible anti-aging and plumping benefits.", price: "£178", category: "Skin Care", stock: 6, rating: 4.9, reviewsCount: 180, status: 'Low Stock', image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80", tags: ["Rose", "Anti-Aging"] },
  { id: "P-019", sku: "TTC-019", name: "Tatcha | The Dewy Skin Cream", desc: "A rich, moisturizing cream with plumping hydration for a dewy, healthy glow.", price: "£67", category: "Skin Care", stock: 22, rating: 4.8, reviewsCount: 2400, status: 'In Stock', image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80", tags: ["Dewy", "Glow"] },
  { id: "P-020", sku: "GS-020", name: "Gisou | Honey Infused Hair Oil", desc: "Enriched with Mirsalehi Honey, this oil is formulated to rebuild and repair hair.", price: "£35", category: "Hair Styling", stock: 14, rating: 4.7, reviewsCount: 1100, status: 'In Stock', image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80", tags: ["Natural", "Hair Oil"] },
] as Product[];

export const services = [
  { id: "s1", name: "Full Bridal Makeup", time: "4 Hours", price: 850, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80" },
  { id: "s2", name: "Hydra-Facial Ritual", time: "1.5 Hours", price: 150, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80" },
  { id: "s3", name: "Master Hair Styling", time: "2 Hours", price: 120, image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80" },
  { id: "s4", name: "Professional Grooming", time: "1 Hour", price: 85, image: "https://images.unsplash.com/photo-1503913232257-82c39efd39a1?auto=format&fit=crop&q=80" },
];

export const reviews: Review[] = [
  { id: "R-1", user: "Sophia Loren", avatar: "SL", rating: 5, comment: "The Augustinus Bader cream is a miracle. My skin felt transformed within days. Perfectly suited for my bridal regime.", date: "May 10, 2026", category: "Bridal Service", verified: true, likes: 24 },
  { id: "R-2", user: "Marcus Vane", avatar: "MV", rating: 5, comment: "Tom Ford's beard oil is in a league of its own. The Tobacco Vanille scent is subtle and masculine.", date: "May 08, 2026", category: "Men's Grooming", verified: true, likes: 18 },
  { id: "R-3", user: "Elena Gilbert", avatar: "EG", rating: 4, comment: "The La Mer moisturizer is ultra-rich and soothing. Perfect for London winters.", date: "May 05, 2026", category: "Skin Care", verified: true, likes: 12 },
  { id: "R-4", user: "Arthur Shelby", avatar: "AS", rating: 5, comment: "Olaplex has saved my hair after years of styling. Essential for professional hair care.", date: "May 01, 2026", category: "Hair Styling", verified: true, likes: 45 },
];

export const appointments: Appointment[] = [
  { id: "A-1024", guest: "Elena Gilbert", service: "Bridal Makeup", artisan: "Senior Stylist", date: "May 12, 2026", time: "10:30 AM", status: "Authorized" },
  { id: "A-1025", guest: "Marcus Vane", service: "Men's Haircut", artisan: "Senior Barber", date: "May 12, 2026", time: "11:15 AM", status: "In Flight" },
  { id: "A-1026", guest: "Sophia Loren", service: "Skin Facial", artisan: "Skin Expert", date: "May 12, 2026", time: "01:45 PM", status: "Pending" },
  { id: "A-1027", guest: "Arthur Shelby", service: "Hair Colour", artisan: "Senior Stylist", date: "May 13, 2026", time: "03:30 PM", status: "Authorized" },
];
