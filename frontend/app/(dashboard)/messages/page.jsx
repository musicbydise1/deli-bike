import Messages from '@/components/dashboard/Messages';
import Footer1 from '@/components/footers/Footer1';

import HeaderDashboard from '@/components/headers/HeaderDashboard';
import React from 'react';
import Header6 from '@/components/headers/Header6';

export const metadata = {
  title: 'Messages || Boxcar - React Nextjs Car Template',
  description: 'Boxcar - React Nextjs Car Template',
};
export default function MessagesPage() {
  return (
    <>
      <div style={{ background: 'var(--theme-color-dark)' }}>
        <Header6 />

        <Messages />
      </div>
    </>
  );
}
