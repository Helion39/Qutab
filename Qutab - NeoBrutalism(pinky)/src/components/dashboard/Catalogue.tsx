import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MaterialIcon from '../MaterialIcon';

interface Product {
  id: number;
  name: string;
  type: string;
  typeBadgeColor: string;
  weight: string;
  location: string;
  price: string;
  image: string;
  badge?: 'verified' | 'bestseller';
  inStock: boolean;
  isFavorite?: boolean;
}

export default function Catalogue() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([3]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Kambing Standard',
      type: 'TYPE A',
      typeBadgeColor: 'green',
      weight: '~25-28 kg',
      location: 'West Java Farmers Group',
      price: 'Rp 2.500.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC77I3-1OtvWdH2wGUjcQXUQTkNTnjEwx6qYbYPCyv2MbhiHixHIzdONsm9F4qvurREmgQNST84FVZJA6vy4szqPKkOo2kBHliP4EOoAhy2yMCTb1oXuZexVkXl5qXM0IHvLhCnXp8lHJ8vbKQpmGXqZAcL9mBn4B0vuf_vfmdVkdZLaBJYfQxwvS9yOumx9oPKgG8hep16JJZNhv_l4UgV67Uu83R5WGqizjgksxegpAkO2j4sXOgoKZ9BjGLK4mY5qD2Qa5DnRpM',
      badge: 'verified',
      inStock: true
    },
    {
      id: 2,
      name: 'Kambing Premium',
      type: 'TYPE B',
      typeBadgeColor: 'amber',
      weight: '~30-35 kg',
      location: 'Central Java Co-op',
      price: 'Rp 3.800.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmh9t6CuT3s8TU_6A5oUHxkbViYdPL1jpW57akrkwqWJRxhTc42TGCFG1N5IU5xzRO3pYa_6rxB95xqRwr1HDp20ADh2Uao-QfBy8fo7BTSBrL85YOAqpbpuD17_UlTt3pwKTpoNiJwbFWGy4qJcbhOnNyIEYuwcLSlAhHP5tbMtZphFlZ3mROESp-GBjvXpYvupzzgA2MR35noqOJRs04bar9rqcWFusoc_rGIPoX5k6nPRlhSEtqCfyH-bvcJjZ1oFdeUmlObc',
      badge: 'bestseller',
      inStock: true
    },
    {
      id: 3,
      name: 'Sapi Kolektif (1/7)',
      type: 'SHARE',
      typeBadgeColor: 'blue',
      weight: 'Standard Cow',
      location: 'East Java Livestock',
      price: 'Rp 2.800.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJYVFKvXtetjJKtBagYQW6k9cx3P5B6EgOHA8V5y7rlsdn1ytv9IwctM5C2QTIwUFovUOWwn6EqzYIPnDKuT6YMYGmN9bFiN4ca5eihHVYGFoTGDt8i-y-e5Mdo7mnMrSlSxYOcfFMNO_iPrpoCUB1ksGLab8-4pj5SvhMYPJsv9zol3tqBJL7wgGQguUfehW9vnw79zE4Xk0k0jR2LVtLHnWvW8UPdL54373aKEXb0-tkS2hdqZEtKGn7PP20nrjvp2lY5s-304',
      inStock: true,
      isFavorite: true
    },
    {
      id: 4,
      name: 'Sapi Utuh Standard',
      type: 'WHOLE',
      typeBadgeColor: 'purple',
      weight: '~220 kg',
      location: 'Sumatra Breeders',
      price: 'Rp 19.500.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMiFHNj1aufs42MtquZhUEWh_kxpnaYO4wVxtwOxTfLhsL5NNZT82lrJmfsoYfLx63i0jxvL0Uj3lfi67OyU9bmF5QtQliivblaWWoWnzMX8EADqDTUYvvHo_RYMPN654HzCElwR4XBPHDPrsEjBWlccV6-C2c07V9JgakpciQ4WzQopoIm74FvoM4dJQifqH7q6SuGXO1cSmNvPIS8WAH_k4b_Umli4IVybKNLB4TnL7FjT55uPuO_lSPUDcZC3_1-F_H-08f2BE',
      badge: 'verified',
      inStock: true
    },
    {
      id: 5,
      name: 'Domba Garut Super',
      type: 'SPECIAL',
      typeBadgeColor: 'green',
      weight: '~40 kg',
      location: 'Garut Farms',
      price: 'Rp 4.200.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmax_PeynDo-_WTUWPH79YoAKpNzA1Xqq8spVuPC5u3wJQP5AziOpwtTzZbNp90CSBdh9EhEM00vZTNZbcjdPDzRBMGAg8z9fBTr6-DVsGL4a3lqPwZscvspRJ_gIodPX7tU_hFSBGpg51ghx9qBGxfYacUAbSZda-YcydVPlseQ1AhyRir5u4bbdlKvkc0ixVlru_NbpU0e_MWKrgRw2E6llFC31GrO70RPfYiWj0522mPBZAbhdNMOLIZ_XA1vrohVWwMXPR830',
      inStock: true
    },
    {
      id: 6,
      name: 'Kambing Hemat',
      type: 'ECONOMY',
      typeBadgeColor: 'gray',
      weight: '~20 kg',
      location: 'Banten Village',
      price: 'Rp 2.100.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU8SaLUcUoxvxvdd7Q8eHKCeuiqXE_gjBFDKef4TODzDxrzIhM4D9ox4o-b33wOa8h9jY6i4pB-4Y5-Rq2YbV_Prqvg2gyGr8Snfgi2-vksO72ncmuOXXLyP02FAy9SAX5j26N6TTep9AO3rgeCi29_PfYLV1VBhhE9XPxttcyd1r2iLhJ1vA7ZXIBx-FNSLL6Oa_jcki7ClTUjKyGc2LbgtqCkwheVnAdh6GyVJj1Xjyw3h5KNDEXh2JS1fVAGA5eh11tW1P797g',
      inStock: false
    }
  ];

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const getBadgeColors = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      gray: 'bg-gray-100 dark:bg-gray-800 text-gray-500'
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="p-8 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-[#131b0d] dark:text-white tracking-tight">
              Qurban Catalog 2024
            </h2>
            <p className="text-[#6c9a4c] dark:text-gray-400 max-w-2xl">
              Select your sacrifice animal from trusted local farmers. All animals are health-checked and
              sharia-compliant.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-[#23301a] px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">BALANCE:</span>
            <span className="text-sm font-bold text-[#131b0d] dark:text-white">Rp 5.250.000</span>
            <button className="size-6 bg-[#6dec13] rounded flex items-center justify-center hover:bg-[#5bc710] transition-colors">
              <MaterialIcon icon="add" className="text-[16px] text-[#131b0d]" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveFilter('all')}
            className={`h-9 px-4 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center gap-2 ${
              activeFilter === 'all'
                ? 'bg-[#6dec13] text-[#131b0d]'
                : 'bg-white dark:bg-[#23301a] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#6dec13] hover:text-[#6dec13]'
            }`}
          >
            <MaterialIcon icon="grid_view" className="text-[18px]" />
            All Animals
          </button>
          <button
            onClick={() => setActiveFilter('goats')}
            className={`h-9 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-2 group ${
              activeFilter === 'goats'
                ? 'bg-[#6dec13] text-[#131b0d]'
                : 'bg-white dark:bg-[#23301a] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#6dec13] hover:text-[#6dec13]'
            }`}
          >
            <MaterialIcon icon="cruelty_free" className="text-[18px] group-hover:text-[#6dec13]" />
            Goats / Sheep
          </button>
          <button
            onClick={() => setActiveFilter('cows-whole')}
            className={`h-9 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-2 group ${
              activeFilter === 'cows-whole'
                ? 'bg-[#6dec13] text-[#131b0d]'
                : 'bg-white dark:bg-[#23301a] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#6dec13] hover:text-[#6dec13]'
            }`}
          >
            <MaterialIcon icon="grass" className="text-[18px] group-hover:text-[#6dec13]" />
            Cows (Whole)
          </button>
          <button
            onClick={() => setActiveFilter('cows-share')}
            className={`h-9 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-2 group ${
              activeFilter === 'cows-share'
                ? 'bg-[#6dec13] text-[#131b0d]'
                : 'bg-white dark:bg-[#23301a] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#6dec13] hover:text-[#6dec13]'
            }`}
          >
            <MaterialIcon icon="pie_chart" className="text-[18px] group-hover:text-[#6dec13]" />
            Cow Share (1/7)
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group bg-white dark:bg-[#23301a] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-[#6dec13]/50 transition-all duration-300 flex flex-col ${
                !product.inStock ? 'opacity-75' : ''
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    !product.inStock ? 'grayscale' : ''
                  }`}
                />

                {/* Badge */}
                {product.badge === 'verified' && (
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <MaterialIcon icon="verified" className="text-[14px] text-green-600" />
                    <span className="text-xs font-bold text-gray-800 dark:text-white">Verified Farmer</span>
                  </div>
                )}
                {product.badge === 'bestseller' && (
                  <div className="absolute top-3 left-3 bg-amber-100/90 dark:bg-amber-900/80 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 shadow-sm border border-amber-200 dark:border-amber-800">
                    <MaterialIcon icon="star" className="text-[14px] text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-200">Best Seller</span>
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center">
                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 size-8 rounded-full bg-white/50 hover:bg-white dark:bg-black/30 dark:hover:bg-black/60 backdrop-blur flex items-center justify-center transition-all text-gray-700 dark:text-white"
                >
                  <MaterialIcon
                    icon="favorite"
                    className={`text-[18px] ${
                      favorites.includes(product.id) ? 'filled text-red-500' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      product.inStock
                        ? 'text-[#131b0d] dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${getBadgeColors(
                        product.typeBadgeColor
                      )}`}
                    >
                      {product.type}
                    </span>
                    <span
                      className={`text-sm ${
                        product.inStock ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400'
                      }`}
                    >
                      {product.weight}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 text-xs ${
                    product.inStock ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400'
                  }`}
                >
                  <MaterialIcon icon="location_on" className="text-[14px]" />
                  <span>{product.location}</span>
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col">
                    <span
                      className={`text-xs font-medium ${
                        product.inStock ? 'text-gray-400' : 'text-gray-400'
                      }`}
                    >
                      Price
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        product.inStock
                          ? 'text-[#131b0d] dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {product.price}
                    </span>
                  </div>
                  <button
                    disabled={!product.inStock}
                    className={`h-9 px-4 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center gap-1.5 ${
                      product.inStock
                        ? 'bg-[#6dec13] hover:bg-[#5bc710] text-[#131b0d]'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 shadow-none cursor-not-allowed'
                    }`}
                  >
                    <MaterialIcon
                      icon={product.inStock ? 'add_shopping_cart' : 'block'}
                      className="text-[18px]"
                    />
                    {product.inStock ? 'Add' : 'Full'}
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
