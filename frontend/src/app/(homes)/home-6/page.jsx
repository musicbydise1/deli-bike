'use client';

import { useState, useEffect } from 'react';
import Footer3 from '@/widgets/footers/Footer3';
import Header6 from '@/widgets/headers/Header6';
import Cars from '@/widgets/homes/home-6/Cars';
import Features from '@/widgets/homes/home-6/Features';
import Hero from '@/widgets/homes/home-6/Hero';
import MapSection from '@/widgets/homes/home-6/MapSection';
import React from 'react';
import Feature from '@/widgets/homes/home-6/Feature';
import Pricing from '@/widgets/homes/home-6/Pricing';
import Cta from '@/widgets/homes/home-6/Cta';
import Testimonials from '@/widgets/homes/home-6/Testimonials';
import '@public/css/pages/home/Home.css';
import Banner from '@/widgets/homes/home-6/Banner';
import Features3 from '@/widgets/homes/home-6/Features3';
import About from '@/widgets/homes/home-6/About';
import Testimonials2 from '@/widgets/homes/home-6/Testimonials2';
import Cooperation from '@/widgets/homes/home-6/Cooperation';
import Promo from '@/widgets/homes/home-6/Promo';
import SocialWidget from '@/shared/ui/ui/widget/SocialWidget';

export default function HomePage6() {
  // Состояние для хранения роли, по умолчанию "courier"
  const [userRoleCookie, setUserRoleCookie] = useState('courier');

  useEffect(() => {
    // Разбираем cookies и ищем cookie с именем "userRole"
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
    if (roleCookie) {
      const role = roleCookie.split('=')[1];
      setUserRoleCookie(role);
    }
  }, []);

  return (
    <>
      <Header6 />
      <Hero />
      <Feature />
      <Banner />
      <Cooperation />
      <Features3 />
      <Testimonials />
      {userRoleCookie === 'corporate' && <Cta />}
      <About />
      <Features />
      <Cars />
      <Pricing />
      <Promo />
      <Testimonials2 />
      <MapSection />
      <SocialWidget />
      <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
    </>
  );
}
