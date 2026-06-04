import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchOverlay } from "@/components/search-overlay";
import { ChatBox } from "@/components/layout/ChatBox";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FEFDFC" },
    { media: "(prefers-color-scheme: dark)", color: "#060607" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "GLAMORA | Luxury Salon London",
    template: "%s | GLAMORA London",
  },
  description: "London's premier destination for professional bridal makeup, expert hair styling, and high-end grooming.",
  keywords: ["luxury salon london", "bridal makeup", "hair styling london", "men's grooming", "beauty salon uk"],
  authors: [{ name: "GLAMORA Team" }],
  creator: "GLAMORA London",
  publisher: "GLAMORA Salon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://glamora-london.co.uk",
    siteName: "GLAMORA London",
    title: "GLAMORA | Luxury Salon & Beauty Studio",
    description: "Professional beauty services and expert grooming in the heart of London.",
    images: [
      {
        url: "https://glamora-london.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GLAMORA London Luxury",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GLAMORA | Luxury Salon",
    description: "Professional bridal and grooming services in London.",
    creator: "@GlamoraLondon",
    images: ["https://glamora-london.co.uk/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/glamora-salon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <SearchOverlay />
            {children}
            <ChatBox />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
