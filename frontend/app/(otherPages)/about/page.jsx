import Features2 from "@/components/homes/home-1/Features2";
import About from "@/components/otherPages/About";
import React from "react";
import Header6 from "@/components/headers/Header6";
import Footer1 from "@/components/footers/Footer1";

export default function AboutPage() {
  return (
    <>
        <Header6 />
      <section className="about-inner-one layout-radius" style={{ marginTop: 50 }}>

        <About />
        <Features2 />
      </section>
        <Footer1 />
    </>
  );
}
