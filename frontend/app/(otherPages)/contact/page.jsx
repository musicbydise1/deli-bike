import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Contact from "@/components/otherPages/Contact";

import React from "react";
import Header6 from "@/components/headers/Header6";
import Footer3 from "@/components/footers/Footer3";

export const metadata = {
  title: "Contact || Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};
export default function ContactPage() {
  return (
    <>
      <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Contact />

        <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
    </>
  );
}
