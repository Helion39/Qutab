// Sidebar.jsx
import { LayoutGrid, Store, Heart, Wallet, Settings, HelpCircle } from "lucide-react";
import SidebarItem from "./SidebarItem";
import ProfileCard from "./ProfileCard";
import logo from "../../assets/logo.png";

export default function Sidebar() {
  return (
    <aside className="w-70 h-screen bg-white border-r border-gray-200 flex flex-col font-[Poppins]">
      {/* ===== LOGO ===== */}
      <div className="px-6 pt-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-lime-400 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="black">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
              4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
              14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
              6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>

        <div className="leading-tight">
          <p className="font-bold text-lg">Qurban</p>
          <p className="font-medium text-gray-800">Tanpa Batas</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="px-3 space-y-2 mt-10">
        <SidebarItem to="/dashboard" icon={LayoutGrid} label="Dashboard" />
        <SidebarItem to="/catalog" icon={Store} label="Product Catalog" />
        <SidebarItem to="/wishlist" icon={Heart} label="Wishlist" />
        <SidebarItem to="/payments" icon={Wallet} label="My Qurban / Payments" />
      </nav>

      {/* SETTINGS */}
      <div className="mt-6 px-6 text-xs font-semibold text-gray-400 tracking-widest">SETTINGS</div>
      <nav className="px-4 mt-2 space-y-1">
        <SidebarItem to="/settings" icon={Settings} label="Account Settings" />
        <SidebarItem to="/help-center" icon={HelpCircle} label="Help Center" />
      </nav>

      {/* PROFILE CARD ikut scroll */}
      <div className="px-6 py-4">
        <ProfileCard />
      </div>
    </aside>
  );
}
