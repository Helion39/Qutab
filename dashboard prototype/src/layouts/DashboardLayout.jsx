import Sidebar from "../components/sidebar/Sidebar";
import TopBar from "../components/header/TopBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Body content */}
      <div className="flex-1 flex flex-col">
        <TopBar />

        {/* Konten scrollable */}
        <main className="flex-1 overflow-y-auto p-6" style={{ scrollbarColor: "#b3b3b3ff #f0f0f0" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
