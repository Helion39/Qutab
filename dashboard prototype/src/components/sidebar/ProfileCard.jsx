import { LogOut } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="border-t border-gray-100 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-semibold">A</div>
        <div>
          <p className="text-sm font-medium text-gray-800">Ahmad Fulan</p>
          <p className="text-xs" style={{ color: "#6DED13" }}>
            Gold Donor
          </p>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-sm text-red-600 border border-red-200 rounded-lg py-2 hover:bg-red-50 transition">
        <LogOut size={16} />
        Log Out
      </button>
    </div>
  );
}
