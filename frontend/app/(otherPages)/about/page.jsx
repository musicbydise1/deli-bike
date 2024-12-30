import Features2 from "@/components/homes/home-1/Features2";
import About from "@/components/otherPages/About";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <section className="about-inner-one layout-radius" style={{ marginTop: 50 }}>
        <About />
        <Features2 />
      </section>
    </>
  );
}
