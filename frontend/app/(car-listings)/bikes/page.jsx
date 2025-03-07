import DropdownFilter from "@/components/carListings/DropdownFilter";
import Listings1 from "@/components/carListings/Listings1";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import Header6 from "@/components/headers/Header6";
import Footer3 from "@/components/footers/Footer3";

export const metadata = {
  title: "DeliBike",
  description: "DeliBike",
};
export default function InventoryListPage1() {
  return (
    <>
      <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header bb-0" />
      <div className="bb-0"></div>
      <DropdownFilter />
      <Sidebar />
      <Listings1 />
        <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
    </>
  );
}
