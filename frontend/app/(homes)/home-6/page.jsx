import Footer3 from "@/components/footers/Footer3";
import Header3 from "@/components/headers/Header3";
import Cars from "@/components/homes/home-6/Cars";
import Features from "@/components/homes/home-6/Features";
import Hero from "@/components/homes/home-6/Hero";
import MapSection from "@/components/homes/home-6/MapSection";
import React from "react";
import AboutPage from "@/app/(otherPages)/about/page";
import Bikes from "@/components/homes/home-6/Bikes";
import Service from "@/components/homes/home-6/Service";
import Service2 from "@/components/homes/home-6/Service2"
import Pricing from "@/components/otherPages/Pricing";
import Cta from "@/components/common/Cta";
import Testimonials from "@/components/homes/home-5/Testimonials";

export const metadata = {
  title: "DeliBike",
  description: "DeliBike",
};
export default function HomePage6() {
  return (
    <>
      <Header3 />
      <Hero />
        <Features />
        <Testimonials />
        <AboutPage />
        <Bikes />
        <Service2 />
        <Service />
        <Cta />
        <Pricing />
        <Cars />
        {/*<Inspiration />*/}

      <MapSection />
      <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
    </>
  );
}
