import DropdownFilter from '@/features/carListings/DropdownFilter';
import Listings1 from '@/features/carListings/Listings1';
import Sidebar from '@/features/carListings/Sidebar';
import Footer1 from '@/widgets/footers/Footer1';
import Header1 from '@/widgets/headers/Header1';
import React from 'react';
import Header6 from '@/widgets/headers/Header6';
import Footer3 from '@/widgets/footers/Footer3';

export const metadata = {
  title: 'DeliBike',
  description: 'DeliBike',
};
export default function InventoryListPage1() {
  return (
    <>
      <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header bb-0" />
      <div className="bb-0"></div>
      <DropdownFilter />
      <Sidebar />
      <Listings1 />
      <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
    </>
  );
}
