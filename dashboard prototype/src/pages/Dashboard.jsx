import { ArrowRight, Heart, ShoppingCart, Wallet, User, MapPin, CheckCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6 font-[Poppins]">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Welcome back, Ahmad! 👋</h1>
        <p className="text-[#6DED13] font-semibold">Here's your Qurban journey overview for 2024</p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          <div className="h-14 w-14 rounded-full bg-[#6DED13]/20 flex items-center justify-center">
            <User className="text-[#6DED13]" size={28} />
          </div>

          {/* INFO */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Ahmad Fauzi</h3>
              <span className="flex items-center gap-1 text-[11px] font-medium bg-[#6DED13]/20 text-[#6DED13] px-2 py-0.5 rounded-full">
                <CheckCircle size={12} />
                Verified
              </span>
            </div>

            <p className="mt-0.5 text-xs text-gray-500 flex items-center gap-1">
              <MapPin size={12} className="text-gray-400" />
              Jakarta, Indonesia
            </p>
          </div>
        </div>

        {/* BALANCE */}
        <div className="text-right">
          <p className="text-xs text-gray-400 tracking-wide">BALANCE</p>
          <p className="text-lg font-bold text-gray-900">Rp 5.250.000</p>
        </div>
      </div>

      {/* STATS BANNER */}
      <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden shadow-lg">
        <img src="https://images.pexels.com/photos/4586471/pexels-photo-4586471.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Desert Qurban" className="w-full h-full object-cover" />

        <div className="absolute inset-0 flex justify-center items-center gap-6 p-4">
          {/* TOTAL QURBAN */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 flex flex-col items-center shadow-md w-36">
            <ShoppingCart className="w-8 h-8 text-[#6DED13] mb-2" />
            <p className="text-sm font-semibold text-gray-700">Total Qurban</p>
            <p className="text-xl font-bold text-gray-900">3</p>
            <p className="text-xs text-gray-500">Active orders</p>
          </div>

          {/* WISHLIST */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 flex flex-col items-center shadow-md w-36">
            <Heart className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-sm font-semibold text-gray-700">Wishlist Items</p>
            <p className="text-xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-500">Saved animals</p>
          </div>

          {/* FUNDS */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 flex flex-col items-center shadow-md w-36">
            <Wallet className="w-8 h-8 text-[#0084FF] mb-2" />
            <p className="text-sm font-semibold text-gray-700">Available</p>
            <p className="text-xl font-bold text-gray-900">Rp 5.2M</p>
            <p className="text-xs text-gray-500">Ready to spend</p>
          </div>
        </div>
      </div>

      {/* MAIN CTA */}
      <div className="bg-[#6DED13] rounded-2xl p-6 text-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div>
          <h2 className="text-xl font-bold mb-1">Ready for Qurban 2026?</h2>
          <p className="text-sm text-black/80 max-w-md">Browse our catalog and select your sacrifice animal from trusted local farmers.</p>
        </div>

        <button className="inline-flex items-center gap-2 bg-[#41D800] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#558106] transition">
          Browse Catalog
          <ArrowRight size={18} />
        </button>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>

        <ul className="space-y-3 text-sm">
          <li className="flex justify-between">
            <span className="text-gray-600">
              Added <b>Kambing Premium</b> to wishlist
            </span>
            <span className="text-gray-400">2h ago</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Payment completed</span>
            <span className="text-gray-400">Yesterday</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">New catalog available</span>
            <span className="text-gray-400">2 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
