import About from "@/components/homes/home-6/About";
import React from "react";
import Header6 from "@/components/headers/Header6";
import Features from "@/components/homes/home-6/Features";
import Footer3 from "@/components/footers/Footer3";
import "../../../public/css/pages/home/Home.css"

export default function AboutPage() {
  return (
    <>
        <Header6 />

          <About />
          <Features />
        <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
    </>
  );
}
