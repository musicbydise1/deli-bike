import Single1 from "@/components/carSingles/Single1";
import { allCars } from "@/data/cars";
import React from "react";
import Header6 from "@/components/headers/Header6";
import Footer3 from "@/components/footers/Footer3";

export const metadata = {
  title: "Inventory Single 1 || Boxcar - React Nextjs Car Template",
  description: "Boxcar - React Nextjs Car Template",
};
export default function InventorySinglePage1({ params }) {
  const carItem = allCars.filter((elm) => elm.id == params.id)[0] || allCars[0];
  return (
    <>
      <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Single1 carItem={carItem} />
      <Footer3 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
