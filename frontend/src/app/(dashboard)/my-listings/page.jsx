import MyListings from '@/widgets/dashboard/MyListings';
import Footer1 from '@/widgets/footers/Footer1';
import HeaderDashboard from '@/widgets/headers/HeaderDashboard';
import React from 'react';
import Header6 from '@/widgets/headers/Header6';

export const metadata = {
  title: 'My Listings || Boxcar - React Nextjs Car Template',
  description: 'Boxcar - React Nextjs Car Template',
};
export default function MyListingsPage() {
  return (
    <>
      <div style={{ background: 'var(--theme-color-dark)' }}>
        <Header6 />

        <MyListings />
      </div>
    </>
  );
}
