import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MaterialIcon from '../MaterialIcon';

interface Product {
  id: number;
  slug: string;
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
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([3]);

  const products: Product[] = [
    {
      id: 1,
      slug: 'sapi-utuh',
      name: 'Sapi',
      type: 'BERAT',
      typeBadgeColor: 'green',
      weight: '220-250 kg',
      location: 'Peternak Lokal Terpercaya',
      price: 'Rp 13.293.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMiFHNj1aufs42MtquZhUEWh_kxpnaYO4wVxtwOxTfLhsL5NNZT82lrJmfsoYfLx63i0jxvL0Uj3lfi67OyU9bmF5QtQliivblaWWoWnzMX8EADqDTUYvvHo_RYMPN654HzCElwR4XBPHDPrsEjBWlccV6-C2c07V9JgakpciQ4WzQopoIm74FvoM4dJQifqH7q6SuGXO1cSmNvPIS8WAH_k4b_Umli4IVybKNLB4TnL7FjT55uPuO_lSPUDcZC3_1-F_H-08f2BE',
      badge: 'verified',
      inStock: true
    },
    {
      id: 2,
      slug: 'kambing-standard',
      name: 'Kambing',
      type: 'BERAT',
      typeBadgeColor: 'green',
      weight: '25-28 kg',
      location: 'Peternak Lokal Terpercaya',
      price: 'Rp 1.899.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC77I3-1OtvWdH2wGUjcQXUQTkNTnjEwx6qYbYPCyv2MbhiHixHIzdONsm9F4qvurREmgQNST84FVZJA6vy4szqPKkOo2kBHliP4EOoAhy2yMCTb1oXuZexVkXl5qXM0IHvLhCnXp8lHJ8vbKQpmGXqZAcL9mBn4B0vuf_vfmdVkdZLaBJYfQxwvS9yOumx9oPKgG8hep16JJZNhv_l4UgV67Uu83R5WGqizjgksxegpAkO2j4sXOgoKZ9BjGLK4mY5qD2Qa5DnRpM',
      badge: 'bestseller',
      inStock: true
    },
    {
      id: 3,
      slug: 'domba-garut',
      name: 'Domba',
      type: 'BERAT',
      typeBadgeColor: 'green',
      weight: '28-32 kg',
      location: 'Peternak Lokal Terpercaya',
      price: 'Rp 1.899.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmax_PeynDo-_WTUWPH79YoAKpNzA1Xqq8spVuPC5u3wJQP5AziOpwtTzZbNp90CSBdh9EhEM00vZTNZbcjdPDzRBMGAg8z9fBTr6-DVsGL4a3lqPwZscvspRJ_gIodPX7tU_hFSBGpg51ghx9qBGxfYacUAbSZda-YcydVPlseQ1AhyRir5u4bbdlKvkc0ixVlru_NbpU0e_MWKrgRw2e6llFC31GrO70RPfYiWj0522mPBZAbhdNMOLIZ_XA1vrohVWwMXPR830',
      inStock: true
    },
    {
      id: 4,
      slug: 'sapi-kolektif-1-7',
      name: 'Sapi 1/7',
      type: 'BERAT',
      typeBadgeColor: 'green',
      weight: '220-250 kg (Utuh)',
      location: 'Peternak Lokal Terpercaya',
      price: 'Rp 1.899.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJYVFKvXtetjJKtBagYQW6k9cx3P5B6EgOHA8V5y7rlsdn1ytv9IwctM5C2QTIwUFovUOWwn6EqzYIPnDKuT6YMYGmN9bFiN4ca5eihHVYGFoTGDt8i-y-e5Mdo7mnMrSlSxYOcfFMNO_iPrpoCUB1ksGLab8-4pj5SvhMYPJsv9zol3tqBJL7wgGQguUfehW9vnw79zE4Xk0k0jR2LVtLHnWvW8UPdL54373aKEXb0-tkS2hdqZEtKGn7PP20nrjvp2lY5s-304',
      badge: 'verified',
      inStock: true
    },
    {
      id: 5,
      slug: 'tabungan-qurban',
      name: 'Tabungan Qurban',
      type: 'PROGRAM SPESIAL',
      typeBadgeColor: 'blue',
      weight: 'Cicil qurban Anda dengan mudah setiap bulan',
      location: 'Cicilan Fleksibel • Tanpa Bunga',
      price: 'Mulai Rp 100.000',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmh9t6CuT3s8TU_6A5oUHxkbViYdPL1jpW57akrkwqWJRxhTc42TGCFG1N5IU5xzRO3pYa_6rxB95xqRwr1HDp20ADh2Uao-QfBy8fo7BTSBrL85YOAqpbpuD17_UlTt3pwKTpoNiJwbFWGy4qJcbhOnNyIEYuwcLSlAhHP5tbMtZphFlZ3mROESp-GBjvXpYvupzzgA2MR35noqOJRs04bar9rqcWFusoc_rGIPoX5k6nPRlhSEtqCfyH-bvcJjZ1oFdeUmlObc',
      inStock: true
    },
    {
      id: 6,
      slug: 'sedekah-qurban',
      name: 'Sedekah Qurban',
      type: 'PROGRAM SPESIAL',
      typeBadgeColor: 'purple',
      weight: 'Qurban Saudara Sumatera',
      location: 'Disalurkan Tepat Sasaran • Laporan Transparan',
      price: 'Bebas Nominal',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU8SaLUcUoxvxvdd7Q8eHKCeuiqXE_gjBFDKef4TODzDxrzIhM4D9ox4o-b33wOa8h9jY6i4pB-4Y5-Rq2YbV_Prqvg2gyGr8Snfgi2-vksO72ncmuOXXLyP02FAy9SAX5j26N6TTep9AO3rgeCi29_PfYLV1VBhhE9XPxttcyd1r2iLhJ1vA7ZXIBx-FNSLL6Oa_jcki7ClTUjKyGc2LbgtqCkwheVnAdh6GyVJj1Xjyw3h5KNDEXh2JS1fVAGA5eh11tW1P797g',
      inStock: true
    }
  ];

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const getBadgeColors = (color: string) => {
    const colors: Record<string, string> = {
      green: 'bg-[#dfdffa] dark:bg-[#bdbef5]/30 text-[#bdbef5] dark:text-[#dfdffa]',
      amber: 'bg-[#ffc7dd] dark:bg-[#ffafcc]/30 text-[#ef9bb8] dark:text-[#ffc7dd]',
      blue: 'bg-[#bdbef5] dark:bg-[#bdbef5]/30 text-white dark:text-[#dfdffa]',
      purple: 'bg-[#dfdffa] dark:bg-[#bdbef5]/30 text-[#bdbef5] dark:text-[#dfdffa]',
      gray: 'bg-gray-100 dark:bg-gray-800 text-gray-400'
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="p-8 pb-20 bg-[#f8f9fc] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-[#4a2c3a] dark:text-white tracking-tight">
              Katalog Qurban 2024
            </h2>
            <p className="text-[#7d5a6a] dark:text-gray-400 max-w-2xl">
              Pilih hewan kurban Anda dari peternak lokal terpercaya. Semua hewan diperiksa kesehatannya dan sesuai syariah.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-[#3d2531] px-3 py-1.5 rounded-lg border border-[#bdbef5]/20 dark:border-gray-700 shadow-sm">
            <span className="text-xs font-semibold text-[#7d5a6a] dark:text-gray-400">SALDO:</span>
            <span className="text-sm font-bold text-[#4a2c3a] dark:text-white">Rp 5.250.000</span>
            <button className="size-6 bg-[#ffafcc] rounded flex items-center justify-center hover:bg-[#ef9bb8] transition-colors text-white">
              <MaterialIcon icon="add" className="text-[16px]" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveFilter('all')}
            className={`h-9 px-4 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center gap-2 ring-2 ring-offset-1 ring-transparent focus:ring-[#ffafcc]/50 ${
              activeFilter === 'all'
                ? 'bg-[#ffafcc] text-white'
                : 'bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 text-[#7d5a6a] dark:text-gray-300 hover:border-[#ffafcc] hover:text-[#ffafcc]'
            }`}
          >
            <MaterialIcon icon="grid_view" className="text-[18px]" />
            Semua Hewan
          </button>
          <button
            onClick={() => setActiveFilter('goats')}
            className={`h-9 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-2 group focus:ring-2 focus:ring-[#ffafcc]/30 ${
              activeFilter === 'goats'
                ? 'bg-[#ffafcc] text-white'
                : 'bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 text-[#7d5a6a] dark:text-gray-300 hover:border-[#ffafcc] hover:text-[#ffafcc]'
            }`}
          >
            <MaterialIcon icon="cruelty_free" className="text-[18px] group-hover:text-[#ffafcc]" />
            Kambing / Domba
          </button>
          <button
            onClick={() => setActiveFilter('cows-whole')}
            className={`h-9 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-2 group focus:ring-2 focus:ring-[#ffafcc]/30 ${
              activeFilter === 'cows-whole'
                ? 'bg-[#ffafcc] text-white'
                : 'bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 text-[#7d5a6a] dark:text-gray-300 hover:border-[#ffafcc] hover:text-[#ffafcc]'
            }`}
          >
            <MaterialIcon icon="grass" className="text-[18px] group-hover:text-[#ffafcc]" />
            Sapi (Utuh)
          </button>
          <button
            onClick={() => setActiveFilter('cows-share')}
            className={`h-9 px-4 rounded-lg font-medium text-sm transition-all flex items-center gap-2 group focus:ring-2 focus:ring-[#ffafcc]/30 ${
              activeFilter === 'cows-share'
                ? 'bg-[#ffafcc] text-white'
                : 'bg-white dark:bg-[#3d2531] border border-gray-200 dark:border-gray-700 text-[#7d5a6a] dark:text-gray-300 hover:border-[#ffafcc] hover:text-[#ffafcc]'
            }`}
          >
            <MaterialIcon icon="pie_chart" className="text-[18px] group-hover:text-[#ffafcc]" />
            Patungan Sapi (1/7)
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group bg-white dark:bg-[#3d2531] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-[#ffafcc]/50 transition-all duration-300 flex flex-col relative ${
                !product.inStock ? 'opacity-75' : ''
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#dfdffa] dark:bg-gray-800">
                <button
                  onClick={() => navigate(`/dashboard/product/${product.slug}`)}
                  className="block w-full h-full"
                >
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 ${
                      !product.inStock ? 'grayscale' : ''
                    }`}
                    style={{ backgroundImage: `url('${product.image}')` }}
                  ></div>
                </button>

                {/* Badge */}
                {product.badge === 'verified' && (
                  <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 backdrop-blur px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md border border-gray-200 dark:border-gray-700 pointer-events-none">
                    <MaterialIcon icon="verified" className="text-[16px] text-green-600 dark:text-green-500 filled" />
                    <span className="text-xs font-bold text-gray-800 dark:text-white">Peternak Terverifikasi</span>
                  </div>
                )}
                {product.badge === 'bestseller' && (
                  <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 backdrop-blur px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md border border-gray-200 dark:border-gray-700 pointer-events-none">
                    <MaterialIcon icon="star" className="text-[16px] text-yellow-500 dark:text-yellow-400 filled" />
                    <span className="text-xs font-bold text-gray-800 dark:text-white">Paling Laris</span>
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center">
                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Stok Habis
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1">
                <a href="#" className="block group-hover:text-[#ffafcc] transition-colors">
                  <h3
                    className={`font-bold text-lg ${
                      product.inStock
                        ? 'text-[#4a2c3a] dark:text-white'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {product.name}</h3>
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
                        product.inStock ? 'text-[#7d5a6a] dark:text-gray-400' : 'text-gray-400'
                      }`}
                    >
                      {product.weight}
                    </span>
                  </div>
                </a>
                <div
                  className={`flex items-center gap-2 text-xs ${
                    product.inStock ? 'text-[#7d5a6a] dark:text-gray-400' : 'text-gray-400'
                  }`}
                >
                  <MaterialIcon icon="location_on" className="text-[14px]" />
                  <span>{product.location}</span>
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-medium">
                      Harga
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        product.inStock
                          ? 'text-[#4a2c3a] dark:text-white'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {product.price}
                    </span>
                  </div>
                  <button
                    disabled={!product.inStock}
                    onClick={() => navigate(`/dashboard/product/${product.slug}`)}
                    className={`h-9 px-4 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center gap-1.5 active:scale-95 ${
                      product.inStock
                        ? 'bg-[#ffafcc] hover:bg-[#ef9bb8] text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 shadow-none cursor-not-allowed'
                    }`}
                  >
                    <MaterialIcon
                      icon={product.inStock ? 'shopping_cart' : 'block'}
                      className="text-[18px]"
                    />
                    {product.inStock ? 'Keranjang' : 'Penuh'}
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