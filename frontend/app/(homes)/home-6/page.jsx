"use client"

import Footer3 from "@/components/footers/Footer3";
import Header6 from "@/components/headers/Header6";
import Cars from "@/components/homes/home-6/Cars";
import Features from "@/components/homes/home-6/Features";
import Hero from "@/components/homes/home-6/Hero";
import MapSection from "@/components/homes/home-6/MapSection";
import React, {useEffect, useState} from "react";
import Feature from "@/components/homes/home-2/Feature";
import Pricing from "@/components/otherPages/Pricing";
import Cta from "@/components/homes/home-2/Cta";
import Testimonials from "@/components/homes/home-5/Testimonials";
import "../../../public/css/pages/home/Home.css"
import Banner from "@/components/homes/home-10/Banner";
import Features3 from "@/components/homes/home-1/Features3";
import About from "@/components/homes/home-6/About";
import Testimonials2 from "@/components/homes/home-2/Testimonials";

export default function HomePage6() {
    const [userRole, setUserRole] = useState(null);

    // Check user role from localStorage
    useEffect(() => {
        const role = localStorage.getItem("userRole"); // Assuming "userRole" is the key in localStorage
        setUserRole(role);
    }, []);

  return (
      <>
          <Header6 />
          <Hero />
          <Feature />
          <Banner />
          <Features3 />
          <Testimonials />
          {userRole === "corporate" ? (
              <>
                <Cta />
              </>
          ) : (
              <>
              </>
          )}
          <About />
          <Features />
          <Cars />
          <Pricing />
          <Testimonials2 />
          <MapSection />
          <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
      </>
  );
}
