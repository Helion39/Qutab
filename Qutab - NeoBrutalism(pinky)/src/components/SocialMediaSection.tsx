import MaterialIcon from './MaterialIcon';
import QTB_Insta from 'figma:asset/ca12904086ed4472b74adb4709352801501ca1ba.png';

export default function SocialMediaSection() {
  return (
    <div className="py-20 bg-[#fffbef] border-b-4 border-black overflow-hidden lg:min-h-[calc(100vh-84px)] lg:flex lg:items-center" id="social-media">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-8">
        <div className="relative bg-[#bdbef5] border-4 border-black py-6 md:py-8 px-10 md:px-16 shadow-[12px_12px_0px_0px_#000000]">
          {/* Diagonal pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
              backgroundPosition: '0 0, 10px 10px',
              backgroundSize: '20px 20px'
            }}
          />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <div className="inline-block bg-white border-2 border-black px-4 py-1.5 shadow-[4px_4px_0px_0px_#000000] mb-4">
                <span className="text-black font-bold uppercase tracking-wider text-sm">
                  Ikuti Perjalanan Kami
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold text-black leading-none uppercase tracking-tighter mb-4">
                SOSIAL <br />
                <span 
                  className="text-white bg-black px-4 py-1 inline-block transform -rotate-2 mt-2"
                  style={{ textShadow: '2px 2px 0 #ffafcc' }}
                >
                  MEDIA KAMI
                </span>
              </h2>
              
              <p className="text-black text-lg font-bold bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000000] mb-6 leading-relaxed max-w-lg">
                Dapatkan update terkini tentang distribusi hewan Qurban, cerita peternak, dan dokumentasi langsung dari lapangan. Jangan sampai ketinggalan momen kebaikan.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-3 bg-black text-white px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all group">
                  <MaterialIcon icon="photo_camera" className="text-2xl group-hover:text-[#ffafcc] transition-colors" />
                  <span className="uppercase tracking-wider text-sm">Instagram</span>
                </button>
                
                <button className="flex items-center gap-3 bg-white text-black px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all group">
                  <MaterialIcon icon="thumb_up" className="text-2xl group-hover:text-blue-600 transition-colors" />
                  <span className="uppercase tracking-wider text-sm">Facebook</span>
                </button>
              </div>
            </div>
            
            {/* Right Side - Phone Mockup */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative w-[280px] h-[560px] lg:w-[300px] lg:h-[620px] bg-black rounded-[3rem] border-[10px] lg:border-[14px] border-black shadow-[4px_4px_0px_0px_#ffffff] lg:shadow-[8px_8px_0px_0px_#ffffff] overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 hover:scale-105">
                
                {/* Notch - more prominent and realistic */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[45%] h-8 bg-black rounded-b-3xl z-40 flex justify-center items-center">
                  <div className="w-14 h-1 bg-gray-700 rounded-full mt-1" />
                </div>
                
                {/* Phone screen */}
                <div className="bg-white h-full w-full overflow-hidden flex flex-col rounded-[2.2rem] relative">
                  {/* Status bar - simplified, notch area */}
                  <div className="h-11 bg-black flex justify-between items-center px-8 shrink-0 z-10">
                    <span className="font-bold text-xs text-white">12:30</span>
                    <div className="flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      <div className="w-1.5 h-1.5 bg-black border border-white rounded-full" />
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                  
                  {/* Screen content - Instagram Screenshot */}
                  <div className="flex-1 w-full bg-white relative overflow-hidden">
                    <img 
                      src={QTB_Insta} 
                      alt="Qurban Tanpa Batas Instagram Feed"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  
                  {/* Home indicator bar - iPhone style */}
                  <div className="h-6 bg-black flex justify-center items-center shrink-0">
                    <div className="w-32 h-1 bg-white rounded-full" />
                  </div>
                </div>
                
                {/* Side buttons - more realistic placement */}
                <div className="absolute top-28 -left-[14px] w-[3px] h-8 bg-gray-800 rounded-l-sm" />
                <div className="absolute top-40 -left-[14px] w-[3px] h-14 bg-gray-800 rounded-l-sm" />
                <div className="absolute top-[13.5rem] -left-[14px] w-[3px] h-14 bg-gray-800 rounded-l-sm" />
                <div className="absolute top-40 -right-[14px] w-[3px] h-20 bg-gray-800 rounded-r-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}