export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <h2 className="text-lg font-bold mb-3" style={{ color: "#868686ff" }}>
          {title}
        </h2>

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
