import Login from '@/components/otherPages/auth/other-login/Login';

import React from 'react';
import Header6 from '@/components/headers/Header6';

export const metadata = {
  title: 'Login DeliBike',
  description: 'Login DeliBike',
};
export default function LoginPage() {
  return (
    <>
      <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Login />
    </>
  );
}
