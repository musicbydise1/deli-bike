'use client';
import React from 'react';
import FilterSidebar from '@/components/common/FilterSidebar';
import '../public/main.scss';
import 'photoswipe/dist/photoswipe.css';
import 'rc-slider/assets/index.css';
import MobileMenu from '@/components/headers/MobileMenu';
import RootContext from '@/context/RootContext';
import BackToTop from '@/components/common/BackToTop';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <I18nextProvider i18n={i18n}>
          <RootContext>
            <MobileMenu />
            <div className="boxcar-wrapper">{children}</div>
            <FilterSidebar />
          </RootContext>
          <BackToTop />
        </I18nextProvider>
      </body>
    </html>
  );
}
