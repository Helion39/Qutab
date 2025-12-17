import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Navbar';
import Hero from './Hero';
import MissionSection from './MissionSection';
import Benefits from './Benefits';
import ProductsPreview from './ProductsPreview';
import HowToOrder from './HowToOrder';
import DistributionSection from './DistributionSection';
import SocialMediaSection from './SocialMediaSection';
import GallerySection from './GallerySection';
import FAQ from './FAQ';
import Footer from './Footer';

interface LandingPageProps {
  isLoggedIn: boolean;
}

export default function LandingPage({ isLoggedIn }: LandingPageProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#fffbef] font-['Space_Grotesk']">
      <Navbar isLoggedIn={isLoggedIn} />
      <Hero />
      <div data-aos="fade-up">
        <MissionSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <Benefits />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <ProductsPreview />
      </div>
      <div data-aos="fade-up">
        <HowToOrder />
      </div>
      <div data-aos="fade-right">
        <DistributionSection />
      </div>
      <div data-aos="fade-up">
        <SocialMediaSection />
      </div>
      <div data-aos="fade-up">
        <GallerySection />
      </div>
      <div data-aos="fade-up">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
}