import Footer1 from '@/widgets/footers/Footer1';
import Header1 from '@/widgets/headers/Header1';
import NotFound from '@/widgets/otherPages/NotFound';

import React from 'react';
import Header6 from '@/widgets/headers/Header6';
import Footer3 from '@/widgets/footers/Footer3';

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
