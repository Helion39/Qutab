import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MaterialIcon from '../MaterialIcon';
import { useCart } from '../../contexts/CartContext';
import { toast } from 'sonner@2.0.3';

// Temporary hardcoded products - will be replaced with API call
const productsData = [
  {
    id: 1,
    slug: 'kambing-standard',
    name: 'Kambing Standard',
    type: 'TYPE A',
    typeBadgeColor: 'green',
    weight: '~25-28 kg',
    location: 'West Java Farmers Group',
    price: 2500000,
    priceFormatted: 'Rp 2.500.000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC77I3-1OtvWdH2wGUjcQXUQTkNTnjEwx6qYbYPCyv2MbhiHixHIzdONsm9F4qvurREmgQNST84FVZJA6vy4szqPKkOo2kBHliP4EOoAhy2yMCTb1oXuZexVkXl5qXM0IHvLhCnXp8lHJ8vbKQpmGXqZAcL9mBn4B0vuf_vfmdVkdZLaBJYfQxwvS9yOumx9oPKgG8hep16JJZNhv_l4UgV67Uu83R5WGqizjgksxegpAkO2j4sXOgoKZ9BjGLK4mY5qD2Qa5DnRpM',
    inStock: true,
    description: 'Kambing berkualitas dari peternak lokal West Java dengan berat ideal untuk kurban. Hewan telah diperiksa kesehatan dan memenuhi syarat syariah.',
    healthInfo: 'Telah divaksinasi lengkap, bebas penyakit, aktif dan sehat.',
    syariahCompliance: 'Memenuhi syarat umur minimal 2 tahun (jadzhah) dan tidak cacat.'
  },
  {
    id: 2,
    slug: 'kambing-premium',
    name: 'Kambing Premium',
    type: 'TYPE B',
    typeBadgeColor: 'amber',
    weight: '~30-35 kg',
    location: 'Central Java Co-op',
    price: 3800000,
    priceFormatted: 'Rp 3.800.000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmh9t6CuT3s8TU_6A5oUHxkbViYdPL1jpW57akrkwqWJRxhTc42TGCFG1N5IU5xzRO3pYa_6rxB95xqRwr1HDp20ADh2Uao-QfBy8fo7BTSBrL85YOAqpbpuD17_UlTt3pwKTpoNiJwbFWGy4qJcbhOnNyIEYuwcLSlAhHP5tbMtZphFlZ3mROESp-GBjvXpYvupzzgA2MR35noqOJRs04bar9rqcWFusoc_rGIPoX5k6nPRlhSEtqCfyH-bvcJjZ1oFdeUmlObc',
    inStock: true,
    description: 'Kambing premium dengan bobot lebih besar dari Central Java. Kualitas terbaik untuk kurban keluarga.',
    healthInfo: 'Telah divaksinasi lengkap, kondisi prima, diet teratur.',
    syariahCompliance: 'Memenuhi syarat umur minimal 2 tahun (jadzhah) dan tidak cacat.'
  },
  {
    id: 3,
    slug: 'sapi-kolektif-1-7',
    name: 'Sapi Kolektif (1/7)',
    type: 'SHARE',
    typeBadgeColor: 'blue',
    weight: 'Standard Cow',
    location: 'East Java Livestock',
    price: 2800000,
    priceFormatted: 'Rp 2.800.000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJYVFKvXtetjJKtBagYQW6k9cx3P5B6EgOHA8V5y7rlsdn1ytv9IwctM5C2QTIwUFovUOWwn6EqzYIPnDKuT6YMYGmN9bFiN4ca5eihHVYGFoTGDt8i-y-e5Mdo7mnMrSlSxYOcfFMNO_iPrpoCUB1ksGLab8-4pj5SvhMYPJsv9zol3tqBJL7wgGQguUfehW9vnw79zE4Xk0k0jR2LVtLHnWvW8UPdL54373aKEXb0-tkS2hdqZEtKGn7PP20nrjvp2lY5s-304',
    inStock: true,
    description: 'Patungan sapi untuk 7 orang. Sapi berkualitas dari East Java dengan bobot minimal 220 kg.',
    healthInfo: 'Sapi sehat, telah divaksinasi, bobot memenuhi syarat untuk 7 bagian.',
    syariahCompliance: 'Memenuhi syarat umur minimal 2 tahun dan bobot minimal untuk dibagi 7 bagian.'
  },
  {
    id: 4,
    slug: 'sapi-utuh-standard',
    name: 'Sapi Utuh Standard',
    type: 'WHOLE',
    typeBadgeColor: 'purple',
    weight: '~220 kg',
    location: 'Sumatra Breeders',
    price: 19500000,
    priceFormatted: 'Rp 19.500.000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMiFHNj1aufs42MtquZhUEWh_kxpnaYO4wVxtwOxTfLhsL5NNZT82lrJmfsoYfLx63i0jxvL0Uj3lfi67OyU9bmF5QtQliivblaWWoWnzMX8EADqDTUYvvHo_RYMPN654HzCElwR4XBPHDPrsEjBWlccV6-C2c07V9JgakpciQ4WzQopoIm74FvoM4dJQifqH7q6SuGXO1cSmNvPIS8WAH_k4b_Umli4IVybKNLB4TnL7FjT55uPuO_lSPUDcZC3_1-F_H-08f2BE',
    inStock: true,
    description: 'Sapi utuh berkualitas dari Sumatra dengan bobot ~220 kg. Cocok untuk kurban keluarga besar atau dibagikan.',
    healthInfo: 'Sapi sehat, telah divaksinasi lengkap, kondisi prima.',
    syariahCompliance: 'Memenuhi syarat umur minimal 2 tahun dan tidak cacat.'
  },
  {
    id: 5,
    slug: 'domba-garut-super',
    name: 'Domba Garut Super',
    type: 'SPECIAL',
    typeBadgeColor: 'green',
    weight: '~40 kg',
    location: 'Garut Farms',
    price: 4200000,
    priceFormatted: 'Rp 4.200.000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmax_PeynDo-_WTUWPH79YoAKpNzA1Xqq8spVuPC5u3wJQP5AziOpwtTzZbNp90CSBdh9EhEM00vZTNZbcjdPDzRBMGAg8z9fBTr6-DVsGL4a3lqPwZscvspRJ_gIodPX7tU_hFSBGpg51ghx9qBGxfYacUAbSZda-YcydVPlseQ1AhyRir5u4bbdlKvkc0ixVlru_NbpU0e_MWKrgRw2e6llFC31GrO70RPfYiWj0522mPBZAbhdNMOLIZ_XA1vrohVWwMXPR830',
    inStock: true,
    description: 'Domba Garut premium dengan bobot besar ~40 kg. Kualitas super dari peternak terpercaya Garut.',
    healthInfo: 'Domba sehat, telah divaksinasi, kondisi prima dengan bulu tebal.',
    syariahCompliance: 'Memenuhi syarat umur minimal 1 tahun (untuk domba) dan tidak cacat.'
  }
];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [shohibulQurban, setShohibulQurban] = useState('');

  // Find product by slug
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="p-8 bg-[#f8f9fc] dark:bg-[#2d1b24] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MaterialIcon icon="search_off" className="text-[64px] text-gray-300 dark:text-gray-700 mb-4" />
          <h2 className="text-2xl font-bold text-[#4a2c3a] dark:text-white mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-[#7d5a6a] dark:text-gray-400 mb-6">Maaf, produk yang Anda cari tidak tersedia.</p>
          <button
            onClick={() => navigate('/dashboard/catalogue')}
            className="px-6 py-3 bg-[#ffafcc] hover:bg-[#ef9bb8] text-white font-bold rounded-lg transition-colors"
          >
            Kembali ke Katalog
          </button>
        </div>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    if (!shohibulQurban.trim()) {
      toast.error('Mohon masukkan nama Shohibul Qurban');
      return;
    }

    addToCart({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productType: product.type,
      typeBadgeColor: product.typeBadgeColor,
      price: product.price,
      priceFormatted: product.priceFormatted,
      shohibulQurban: shohibulQurban.trim(),
      weight: product.weight,
    });

    toast.success('Produk berhasil ditambahkan ke keranjang!');
    setShohibulQurban('');
  };

  const handleBuyNow = () => {
    if (!shohibulQurban.trim()) {
      toast.error('Mohon masukkan nama Shohibul Qurban');
      return;
    }

    addToCart({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productType: product.type,
      typeBadgeColor: product.typeBadgeColor,
      price: product.price,
      priceFormatted: product.priceFormatted,
      shohibulQurban: shohibulQurban.trim(),
      weight: product.weight,
    });

    navigate('/dashboard/checkout');
  };

  return (
    <div className="p-8 pb-20 bg-[#f8f9fc] dark:bg-[#2d1b24] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard/catalogue')}
          className="flex items-center gap-2 text-[#7d5a6a] dark:text-gray-400 hover:text-[#ffafcc] transition-colors mb-6"
        >
          <MaterialIcon icon="arrow_back" className="text-[20px]" />
          <span className="font-medium">Kembali ke Katalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div className="bg-white dark:bg-[#3d2531] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm aspect-square">
            <div className="w-full h-full bg-[#dfdffa] dark:bg-gray-800">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${product.image}')` }}
              ></div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            {/* Product Header */}
            <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="mb-3">
                <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded text-xs font-bold ${getBadgeColors(product.typeBadgeColor)}`}>
                    {product.type}
                  </span>
                  <span className="text-[#7d5a6a] dark:text-gray-400 font-medium">{product.weight}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#7d5a6a] dark:text-gray-400 mb-4">
                <MaterialIcon icon="location_on" className="text-[18px]" />
                <span className="text-sm">{product.location}</span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Harga</p>
                <p className="text-4xl font-bold text-[#4a2c3a] dark:text-white">{product.priceFormatted}</p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <MaterialIcon icon="check_circle" className="text-[#bdbef5] text-[20px]" />
                <span className="text-sm font-medium text-[#4a2c3a] dark:text-white">Stok Tersedia</span>
              </div>
            </div>

            {/* Shohibul Qurban Input */}
            <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-[#ffafcc] dark:border-[#ffafcc]/50 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="size-10 rounded-full bg-[#ffe1ed] dark:bg-[#ffafcc]/20 flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="person" className="text-[#ffafcc] text-[20px]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white mb-1">Nama Shohibul Qurban</h3>
                  <p className="text-sm text-[#7d5a6a] dark:text-gray-400">
                    Masukkan nama lengkap orang yang akan dikurbankan. Nama ini akan dibacakan saat penyembelihan.
                  </p>
                </div>
              </div>
              <input
                type="text"
                value={shohibulQurban}
                onChange={(e) => setShohibulQurban(e.target.value)}
                placeholder="Contoh: Bapak Ahmad bin Abdullah"
                className="w-full px-4 py-3 bg-white dark:bg-[#2d1b24] border-2 border-gray-200 dark:border-gray-700 focus:border-[#ffafcc] rounded-lg text-[#4a2c3a] dark:text-white placeholder-gray-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 h-14 bg-white dark:bg-[#3d2531] border-2 border-[#ffafcc] text-[#ffafcc] hover:bg-[#ffe1ed] dark:hover:bg-[#ffafcc]/20 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MaterialIcon icon="add_shopping_cart" className="text-[20px]" />
                Tambah ke Keranjang
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 h-14 bg-[#ffafcc] hover:bg-[#ef9bb8] text-white rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MaterialIcon icon="shopping_bag" className="text-[20px]" />
                Beli Langsung
              </button>
            </div>

            {/* Product Description */}
            <div className="bg-white dark:bg-[#3d2531] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-[#4a2c3a] dark:text-white mb-4">Detail Produk</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-[#7d5a6a] dark:text-gray-300 mb-2 flex items-center gap-2">
                    <MaterialIcon icon="description" className="text-[16px]" />
                    Deskripsi
                  </h4>
                  <p className="text-sm text-[#7d5a6a] dark:text-gray-400 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#7d5a6a] dark:text-gray-300 mb-2 flex items-center gap-2">
                    <MaterialIcon icon="health_and_safety" className="text-[16px]" />
                    Informasi Kesehatan
                  </h4>
                  <p className="text-sm text-[#7d5a6a] dark:text-gray-400 leading-relaxed">
                    {product.healthInfo}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#7d5a6a] dark:text-gray-300 mb-2 flex items-center gap-2">
                    <MaterialIcon icon="verified" className="text-[16px]" />
                    Kepatuhan Syariah
                  </h4>
                  <p className="text-sm text-[#7d5a6a] dark:text-gray-400 leading-relaxed">
                    {product.syariahCompliance}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}