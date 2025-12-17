export default function QurbanInfoCard({ product }) {
  return (
    <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-72 sm:h-80 object-cover" />

      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col justify-end p-6 space-y-2 text-white">
        <p className="text-xs uppercase tracking-wide">{product.badge}</p>
        <p className="text-xl font-semibold flex items-center gap-2">
          {product.name} <span className="text-sm font-normal">• {product.type}</span>
        </p>
        <p className="text-sm flex items-center gap-2">📍 {product.location}</p>
        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[#6DED13] text-white font-medium">Rp {product.price.toLocaleString("id-ID")}</span>
      </div>
    </div>
  );
}
