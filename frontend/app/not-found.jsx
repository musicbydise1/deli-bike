import Footer1 from '@/components/footers/Footer1';
import Header6 from '@/components/headers/Header6';
import NotFound from '@/components/otherPages/NotFound';

import React from 'react';

export const metadata = {
  title: 'Page Not Found || Boxcar - React Nextjs Car Template',
  description: 'Boxcar - React Nextjs Car Template',
};
export default function NotFoundPage() {
  return (
    <>
      <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <NotFound />

      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
