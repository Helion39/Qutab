import React from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';

export default function ProductsPreview() {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Kambing Standard',
      weight: '25-28 kg',
      price: 'Rp 2.500.000',
      unit: '/ekor',
      badge: 'Paling Laris',
      image: 'https://images.unsplash.com/photo-1649558008717-e1b9e815b906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGdvYXQlMjBmYXJtfGVufDF8fHx8MTc2NTc5NzcyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      bgColor: 'bg-white'
    },
    {
      name: 'Sapi Patungan (1/7)',
      weight: '220-250 kg (Utuh)',
      price: 'Rp 3.000.000',
      unit: '/bagian',
      image: 'https://images.unsplash.com/photo-1614379350905-fe1c7838e0f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGNvdyUyMGxpdmVzdG9ja3xlbnwxfHx8fDE3NjU3OTc3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      bgColor: 'bg-white'
    },
    {
      name: 'Qurban Palestina',
      subtitle: 'Kirim Qurban Anda untuk saudara-saudari kita.',
      price: 'Rp 4.500.000',
      features: ['Bantuan untuk Palestina', 'Dokumentasi Spesial'],
      image: 'https://images.unsplash.com/photo-1761048370427-494e01030f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGhhcHB5JTIwY29tbXVuaXR5fGVufDF8fHx8MTc2NTc5NzcyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      bgColor: 'bg-[#203e18]',
      special: true
    }
  ];

  return (
    <div className="py-20 bg-white border-b-4 border-black overflow-hidden" id="products">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
          data-aos="fade-down"
        >
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter leading-none mb-4">
              Pilih Hewan <br />
              <span className="bg-[#cecd34] px-2 border-2 border-black shadow-[4px_4px_0px_0px_#000000] inline-block transform rotate-1">
                Qurban Anda
              </span>
            </h2>
            <p className="text-black font-medium text-lg border-l-4 border-black pl-4">
              Hewan berkualitas, bersertifikat sehat, dan siap didistribusikan.
            </p>
          </div>

          <a
            href="#"
            className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-[#cecd34] hover:text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all flex items-center gap-2 group"
            data-aos="fade-up"
          >
            Lihat Katalog Lengkap
            <MaterialIcon icon="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className={`flex flex-col ${product.bgColor} border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[8px_8px_0px_0px_#000000] hover:-translate-y-1 transition-all group`}
              data-aos="zoom-in-up"
              data-aos-delay={index * 200}
            >
              {/* Image */}
              <div className="h-64 bg-gray-200 relative border-b-4 border-black overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  src={product.image}
                  alt={product.name}
                />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-[#cecd34] text-black px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#000000] text-sm font-black uppercase tracking-wider z-10">
                    {product.badge}
                  </div>
                )}
                {product.special && (
                  <>
                    <div className="absolute inset-0 bg-[#cecd34]/20 mix-blend-overlay z-10"></div>
                    <div className="absolute top-4 left-0 w-full bg-[#cecd34] border-y-2 border-black text-black text-center py-2 text-sm font-black uppercase tracking-widest z-20">
                      PROGRAM SPESIAL
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className={`p-6 flex flex-col flex-1 ${product.special ? 'text-white' : ''}`}>
                <h3 className={`text-2xl font-black uppercase mb-2 ${product.special ? 'text-[#cecd34]' : 'text-black'}`}>
                  {product.name}
                </h3>

                {product.weight && (
                  <div className="flex items-center gap-2 mb-6">
                    <span className="bg-black text-white text-xs font-bold px-2 py-0.5 uppercase">
                      Berat
                    </span>
                    <p className={`text-sm font-bold ${product.special ? 'text-white' : 'text-black'}`}>
                      {product.weight}
                    </p>
                  </div>
                )}

                {product.subtitle && (
                  <p className="text-sm font-medium text-gray-300 mb-6 border-l-2 border-[#cecd34] pl-2">
                    {product.subtitle}
                  </p>
                )}

                {product.features && (
                  <div className="space-y-3 mb-6 text-sm font-bold text-white">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <MaterialIcon icon="check" className="text-[#cecd34] text-sm bg-black p-0.5" />
                        {feature}
                      </div>
                    ))}
                  </div>
                )}

                {/* Price & Button */}
                <div className={`mt-auto border-t-2 border-dashed ${product.special ? 'border-white/30' : 'border-black'} pt-6`}>
                  <p className={`text-3xl font-black mb-4 ${product.special ? 'text-white' : 'text-black'}`}>
                    {product.price}{' '}
                    {product.unit && (
                      <span className="text-sm font-bold text-gray-500">{product.unit}</span>
                    )}
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className={`w-full h-12 border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all font-black uppercase tracking-wider ${
                      product.special
                        ? 'bg-[#cecd34] hover:bg-white text-black'
                        : 'bg-white hover:bg-[#cecd34] text-black'
                    }`}
                  >
                    Pilih {product.special ? 'Palestina' : product.name.includes('Kambing') ? 'Kambing' : 'Sapi'}
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