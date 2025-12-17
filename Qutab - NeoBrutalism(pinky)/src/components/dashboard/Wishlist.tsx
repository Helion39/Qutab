import { ImageWithFallback } from '../figma/ImageWithFallback';
import MaterialIcon from '../MaterialIcon';

export default function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: 'Kambing Premium',
      type: 'TYPE B',
      weight: '~30-35 kg',
      location: 'Central Java Co-op',
      price: 'Rp 3.800.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmh9t6CuT3s8TU_6A5oUHxkbViYdPL1jpW57akrkwqWJRxhTc42TGCFG1N5IU5xzRO3pYa_6rxB95xqRwr1HDp20ADh2Uao-QfBy8fo7BTSBrL85YOAqpbpuD17_UlTt3pwKTpoNiJwbFWGy4qJcbhOnNyIEYuwcLSlAhHP5tbMtZphFlZ3mROESp-GBjvXpYvupzzgA2MR35noqOJRs04bar9rqcWFusoc_rGIPoX5k6nPRlhSEtqCfyH-bvcJjZ1oFdeUmlObc'
    },
    {
      id: 2,
      name: 'Sapi Kolektif (1/7)',
      type: 'SHARE',
      weight: 'Standard Cow',
      location: 'East Java Livestock',
      price: 'Rp 2.800.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJYVFKvXtetjJKtBagYQW6k9cx3P5B6EgOHA8V5y7rlsdn1ytv9IwctM5C2QTIwUFovUOWwn6EqzYIPnDKuT6YMYGmN9bFiN4ca5eihHVYGFoTGDt8i-y-e5Mdo7mnMrSlSxYOcfFMNO_iPrpoCUB1ksGLab8-4pj5SvhMYPJsv9zol3tqBJL7wgGQguUfehW9vnw79zE4Xk0k0jR2LVtLHnWvW8UPdL54373aKEXb0-tkS2hdqZEtKGn7PP20nrjvp2lY5s-304'
    }
  ];

  return (
    <div className="p-8 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#131b0d] dark:text-white tracking-tight">
            My Wishlist
          </h2>
          <p className="text-[#6c9a4c] dark:text-gray-400">
            Items you've saved for later consideration
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-[#23301a] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-[#6dec13]/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute top-3 right-3 size-8 rounded-full bg-white/90 hover:bg-white dark:bg-black/60 dark:hover:bg-black/80 backdrop-blur flex items-center justify-center transition-all">
                  <MaterialIcon icon="favorite" className="text-[18px] filled text-red-500" />
                </button>
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <h3 className="font-bold text-lg text-[#131b0d] dark:text-white">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      {item.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.weight}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <MaterialIcon icon="location_on" className="text-[14px]" />
                  <span>{item.location}</span>
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">Price</span>
                    <span className="text-lg font-bold text-[#131b0d] dark:text-white">{item.price}</span>
                  </div>
                  <button className="h-9 px-4 rounded-lg bg-[#6dec13] hover:bg-[#5bc710] text-[#131b0d] font-bold text-sm shadow-sm transition-colors flex items-center gap-1.5">
                    <MaterialIcon icon="add_shopping_cart" className="text-[18px]" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
