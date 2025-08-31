import Footer from '@/widgets/footers/Footer3';
import Cart from '@/widgets/shop/Cart';
import './Cart.css';
import React from 'react';
import Header6 from '@/widgets/headers/Header6';
import Footer3 from '@/widgets/footers/Footer3';

export const metadata = {
  title: 'DeliBike',
  description: 'DeliBike',
};
export default function CartPage() {
  return (
    <>
      <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Cart />

      <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
    </>
  );
}
