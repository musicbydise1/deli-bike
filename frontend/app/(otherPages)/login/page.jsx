import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Login from "@/components/otherPages/Login";
import "./Login.css"

import React from "react";
import Header6 from "@/components/headers/Header6";

export const metadata = {
  title: "Login DeliBike",
  description: "Login DeliBike",
};
export default function LoginPage() {
  return (
    <>
      <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Login />

      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
