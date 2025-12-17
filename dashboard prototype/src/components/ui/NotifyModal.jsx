export default function NotifyModal({ open, onClose, product }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>

        <h2 className="text-xl font-bold mb-1">🔔 Beri Tahu Saya</h2>

        <p className="text-sm text-gray-600 mb-4">
          Kami akan menghubungi Anda saat
          <b> {product}</b> tersedia atau pemesanan dibuka.
        </p>

        {/* Input */}
        <label className="text-sm font-medium">Email / WhatsApp</label>
        <input
          type="text"
          placeholder="contoh@email.com / 08xxxxxxxx"
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-4 focus:outline-none"
          style={{ borderColor: "#6DED13" }}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px rgba(110,237,19,0.5)")}
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />

        {/* Checkbox options */}
        <div className="space-y-2 text-sm mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked style={{ accentColor: "#6DED13" }} />
            Stok tersedia
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" style={{ accentColor: "#6DED13" }} />
            Menjelang Idul Adha
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" style={{ accentColor: "#6DED13" }} />
            Program khusus (Palestina)
          </label>
        </div>

        {/* Action */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm border rounded-lg">
            Batal
          </button>
          <button
            onClick={() => {
              alert("Notifikasi disimpan (mock UI)");
              onClose();
            }}
            className="px-4 py-2 text-sm text-white rounded-lg"
            style={{ backgroundColor: "#6DED13" }}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
