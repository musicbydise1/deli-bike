import Footer1 from '@/components/footers/Footer1';
import Header1 from '@/components/headers/Header1';
import Checkout from '@/components/shop/checkout/Checkout';

import React from 'react';
import Header6 from '@/components/headers/Header6';

export const metadata = {
  title: 'Оформление заказа',
  description: 'Оформление заказа',
};
export default function CheckoutPage() {
  return (
    <>
      <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Checkout />
    </>
  );
}
