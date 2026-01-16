import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';

export default function Hero() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 24, hours: 8, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative w-full border-b-4 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center bg-[#bdbef5] px-6 py-20 lg:px-12 border-r-0 lg:border-r-4 border-black">
            <div className="relative z-20 flex flex-col gap-6 max-w-2xl">
              <span
                className="inline-block w-fit bg-[#ffafcc] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black border-2 border-black shadow-[4px_4px_0px_0px_#000000]"
                data-aos="fade-down"
                data-aos-delay="100"
              >
                Idul Adha 1445H
              </span>

              <h1
                className="text-black text-6xl lg:text-8xl font-black leading-none tracking-tighter uppercase"
                data-aos="slide-up"
                data-aos-duration="1000"
              >
                Qurban <br />
                <span
                  className="text-[#ffafcc]"
                  style={{ WebkitTextStroke: '2px black' }}
                >
                  Tanpa Batas
                </span>
              </h1>

              <p
                className="text-black text-lg lg:text-xl font-medium max-w-lg leading-relaxed border-l-4 border-black pl-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Memberdayakan peternak lokal sambil menunaikan kewajiban suci Anda. Mari bergabung menebar kebaikan di seluruh nusantara dan untuk Palestina Idul Adha ini.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => navigate('/login')}
                  className="h-14 px-8 bg-[#ffafcc] text-black text-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase hover:bg-[#ff9ebb]"
                  data-aos="fade-right"
                  data-aos-delay="500"
                >
                  Qurban Sekarang
                </button>
                <button
                  className="h-14 px-8 bg-white text-black text-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase hover:bg-gray-100"
                  data-aos="fade-left"
                  data-aos-delay="600"
                >
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative min-h-[400px] lg:min-h-full border-t-4 lg:border-t-0 border-black overflow-hidden group">
            <img
              alt="Indonesian landscape with green hills and cattle grazing"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-[2s]"
              src="https://images.unsplash.com/photo-1679959350683-d503e8becfee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWElMjByaWNlJTIwZmllbGRzJTIwY2F0dGxlfGVufDF8fHx8MTc2NTc5NzcyMXww&ixlib=rb-4.1.0&q=80&w=1080"
            />
            <div className="absolute inset-0 bg-[#bdbef5]/30 mix-blend-multiply"></div>
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      <div className="w-full bg-[#ffafcc] py-12 border-b-4 border-black overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <h3
            className="text-black text-3xl font-black uppercase tracking-tighter border-b-4 border-black lg:border-b-0 lg:pr-8 pb-4 lg:pb-0"
            data-aos="fade-right"
          >
            Hitung Mundur <br />
            Idul Adha
          </h3>

          <div className="flex gap-4 lg:gap-8 w-full lg:w-auto justify-center">
            <div
              className="flex flex-col justify-center bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] w-[70px] h-[70px] md:w-[90px] md:h-[90px] items-center"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <span className="text-2xl md:text-4xl font-black text-black">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs text-black font-bold uppercase bg-[#ffafcc] px-1 mt-1 border border-black">
                Hari
              </span>
            </div>

            <div
              className="flex flex-col justify-center bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] w-[70px] h-[70px] md:w-[90px] md:h-[90px] items-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <span className="text-2xl md:text-4xl font-black text-black">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs text-black font-bold uppercase bg-[#ffafcc] px-1 mt-1 border border-black">
                Jam
              </span>
            </div>

            <div
              className="flex flex-col justify-center bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] w-[70px] h-[70px] md:w-[90px] md:h-[90px] items-center"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <span className="text-2xl md:text-4xl font-black text-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs text-black font-bold uppercase bg-[#ffafcc] px-1 mt-1 border border-black">
                Mnt
              </span>
            </div>

            <div
              className="flex flex-col justify-center bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] w-[70px] h-[70px] md:w-[90px] md:h-[90px] items-center"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <span className="text-2xl md:text-4xl font-black text-black">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs text-black font-bold uppercase bg-[#ffafcc] px-1 mt-1 border border-black">
                Dtk
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}