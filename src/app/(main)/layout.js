import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export default function MainLayout({ children }) {
  return (
    <div className="layout-container flex flex-col min-h-screen">
      <AnalyticsTracker />
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
  );
}
