import Footer1 from '@/widgets/footers/Footer1';
import Header1 from '@/widgets/headers/Header1';
import Dealer from '@/widgets/otherPages/Dealer';

import React from 'react';
import Header6 from '@/widgets/headers/Header6';
import Footer3 from '@/widgets/footers/Footer3';

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
