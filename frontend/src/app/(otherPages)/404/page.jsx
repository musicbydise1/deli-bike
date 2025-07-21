import Footer1 from '@/components/footers/Footer1';
import Header1 from '@/components/headers/Header1';
import NotFound from '@/components/otherPages/NotFound';

import React from 'react';
import Header6 from '@/components/headers/Header6';
import Footer3 from '@/components/footers/Footer3';

export const metadata = {
  title: '404',
  description: 'DeliBike',
};
export default function NotFoundPage() {
  return (
    <>
      <NotFound />
    </>
  );
}
