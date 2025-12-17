import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function TestimonySection() {
  return (
    <section className="py-20 bg-[#f7f8f6]" id="gallery">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#203e18] text-center mb-10">Moments of Joy</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
          <div className="col-span-2 row-span-2 rounded-xl overflow-hidden relative group">
            <ImageWithFallback
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYKLo3_MO5Wm0Ru32xlDDrTNeAAbvEPKtylWp681n2PkKjSdFO37N4CxJoW79Gynm-WYFMT29vU7t-PrxRG8ayMDbjP4WDvdSb9lux0O850XF6Shm5lmH8MLmtcGO70P2vEqy7l2MmYyww2RsdLhNkfAOAII7KB9oam_D8br9g3mVrGFGzzERHFTwOdY_-g9jjWpjgqAJ0YIl1QAk20BWfCZuwsBbcBonbdVIuw5bbzH8w2YVQrxsmPpQE4xcshQN2pDRa0ypyU4Y"
              alt="Happy children receiving donation packages"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          </div>
          
          <div className="rounded-xl overflow-hidden relative group">
            <ImageWithFallback
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGR2Wm39_sLVzy1J5-juuURseAjRStCbPvUe4R2r6fPRoFEw5mCJy0KBcwjFJwHAT736fUa7Owt2o6yttqApc9y3QMS9sUFj_Ihs3HCfN26ro0Ao_0pCigx2HUaOcDC3Yg_dol_-VhFIzdV9mgRlSrL_bBzO4opzdZmWZgoofEjAgSyu-ybnxL33eAkQ5nxfg68WjgQ3NE0secyPKOx8xziqVlodgjVq7MlpZx5cljIAVFeBjmc4FhYbShy7mmKQjFhxk9i8r6Wrs"
              alt="Community gathering for a feast"
            />
          </div>
          
          <div className="rounded-xl overflow-hidden relative group">
            <ImageWithFallback
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf6AhGwUwUqAF_L8oR1XwKwJatGJXMs7zaLBgQ5vhXSlD1_7Jvmuvl8DGqb26lRxpe9_zoWs0pydtFS58OyccfiD7nQdxGpz-VI2PthInwdfPhB6GkeT_ncnh2vPh7DwDLcEZpMiZRWyvUa9XfXFzGI3xj_CwJY7_MdBA2MLyU1gvK7DiKbRK5bUelLQCjKkRZaLkIL_tvwgu5AJhai1-wR4C_DYVFaQ0JkB3tmWw7Kazv1ekcIW4dCBAhTv-zdgpDsdVO-OHtbOY"
              alt="A goat looking at the camera"
            />
          </div>
          
          <div className="col-span-2 rounded-xl overflow-hidden relative group">
            <ImageWithFallback
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrnYWV_WhZ65tuL7shzcD2X4SDjPjJugMwPzJBOGHBj9kfaujftWJ5t7SIQAftQRshw6_oJco3Gco7nD4T1ZHPJcz6f0VNxtXWLCOjgC37s54WQq-h24QFBkExP8yhteYpssyFamKmZcJbWpncimM5toKJYD20sWXP_4C5hk034h85H_QNPUsKrNk_Opm0B7unyzkNbAspD5XnRd_wTBDoaPau2lbsLf25GhFCWO-MSZq1rnMEH_HDf4MwagERVNKwDnRso0c7Rfg"
              alt="Volunteers distributing meat to villagers"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
