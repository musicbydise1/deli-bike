import Footer1 from '@/widgets/footers/Footer1';
import Header1 from '@/widgets/headers/Header1';
import Checkout from '@/widgets/shop/checkout/Checkout';

import React from 'react';
import Header6 from '@/widgets/headers/Header6';

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
