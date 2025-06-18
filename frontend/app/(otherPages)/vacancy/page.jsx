import Footer1 from '@/components/footers/Footer1';
import Header1 from '@/components/headers/Header1';
import Dealer from '@/components/otherPages/Dealer';

import React from 'react';
import Header6 from '@/components/headers/Header6';
import Footer3 from '@/components/footers/Footer3';

export const metadata = {
  title: 'Dealer || Boxcar - React Nextjs Car Template',
  description: 'Boxcar - React Nextjs Car Template',
};
export default function DealerPage() {
  return (
    <>
      <Header6 />
      <Dealer />

      <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
    </>
  );
}
