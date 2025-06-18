import Footer1 from '@/components/footers/Footer1';
import Header1 from '@/components/headers/Header1';
import DealerSingle from '@/components/otherPages/DealerSingle';
import { dealers } from '@/data/dealers';
import React from 'react';
import Header6 from '@/components/headers/Header6';
import Footer3 from '@/components/footers/Footer3';

export const metadata = {
  title: 'Вакансии',
  description: '',
};

export async function generateStaticParams() {
  return dealers.map(dealer => ({ id: dealer.id.toString() }));
}

export default function DealerSinglePage({ params }) {
  const dealerItem = dealers.find(elm => elm.id == params.id) || dealers[0];

  return (
    <>
      <Header6 />
      <DealerSingle dealerItem={dealerItem} />
      <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
    </>
  );
}
