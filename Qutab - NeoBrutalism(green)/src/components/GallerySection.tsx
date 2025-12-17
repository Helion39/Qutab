import React from 'react';

export default function GallerySection() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1761048370427-494e01030f97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGhhcHB5JTIwY29tbXVuaXR5fGVufDF8fHx8MTc2NTc5NzcyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Happy children receiving donation packages',
      colSpan: 'col-span-2',
      rowSpan: 'row-span-2'
    },
    {
      src: 'https://images.unsplash.com/photo-1760915383861-eda6fa5a890c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBmZWFzdCUyMGdhdGhlcmluZ3xlbnwxfHx8fDE3NjU3OTc3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Community gathering for a feast',
      colSpan: '',
      rowSpan: '',
      bgColor: 'bg-black'
    },
    {
      src: 'https://images.unsplash.com/photo-1649558008717-e1b9e815b906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGdvYXQlMjBmYXJtfGVufDF8fHx8MTc2NTc5NzcyMnww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'A goat looking at the camera',
      colSpan: '',
      rowSpan: '',
      bgColor: 'bg-[#cecd34]'
    },
    {
      src: 'https://images.unsplash.com/photo-1593113616828-6f22bca04804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwY2hhcml0eSUyMGZvb2R8ZW58MXx8fHwxNzY1Nzk3NzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Volunteers distributing meat to villagers',
      colSpan: 'col-span-2',
      rowSpan: ''
    }
  ];

  return (
    <div className="py-20 bg-[#fffbef] border-b-4 border-black lg:min-h-screen lg:flex lg:items-center" id="gallery">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2
          className="text-5xl font-black text-black text-center mb-10 uppercase tracking-tighter"
          data-aos="fade-up"
        >
          Momen Kebahagiaan
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${image.colSpan} ${image.rowSpan} ${image.bgColor || ''} border-4 border-black shadow-[4px_4px_0px_0px_#000000] overflow-hidden relative group`}
              data-aos="zoom-in-up"
              data-aos-delay={index * 200}
            >
              <img
                className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ${
                  image.bgColor === 'bg-black' ? 'opacity-80 group-hover:opacity-100' : ''
                } ${image.bgColor === 'bg-[#cecd34]' ? 'mix-blend-multiply group-hover:mix-blend-normal' : ''}`}
                src={image.src}
                alt={image.alt}
              />
              <div className="absolute inset-0 bg-[#cecd34]/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}