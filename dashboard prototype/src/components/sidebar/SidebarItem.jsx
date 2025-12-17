import { NavLink } from "react-router-dom";

export default function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors duration-200
        ${isActive ? "bg-[#6DED13]/50 text-black font-medium" : "text-black hover:bg-[#6DED13]/20"}`
      }
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </NavLink>
  );
}
