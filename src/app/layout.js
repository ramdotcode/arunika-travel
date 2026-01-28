import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata = {
  title: "Arunika - Liburan Impian Anda",
  description: "Penyedia layanan tour & travel terpercaya di Indonesia.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <div className="layout-container flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          
          {/* Floating Mobile WhatsApp */}
          <div className="fixed bottom-6 right-6 z-[60] md:hidden">
            <button className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">chat</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
