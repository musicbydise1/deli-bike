import Footer1 from '@/widgets/footers/Footer1';
import Header1 from '@/widgets/headers/Header1';
import Terms from '@/widgets/otherPages/Terms';

import React from 'react';
import Header6 from '@/widgets/headers/Header6';

export const metadata = {
  title: 'Terms || Boxcar - React Nextjs Car Template',
  description: 'Boxcar - React Nextjs Car Template',
};
export default function TermsPage() {
  return (
    <>
      <Header6 />
      <Terms />
    </>
  );
}
