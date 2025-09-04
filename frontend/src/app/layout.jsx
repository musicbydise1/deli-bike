'use client';
import React from 'react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import FilterSidebar from '@/ui/common/FilterSidebar';
import '@public/main.scss';
import 'photoswipe/dist/photoswipe.css';
import 'rc-slider/assets/index.css';
import MobileMenu from '@/widgets/headers/MobileMenu';
import RootContext from '@/context/RootContext';
import BackToTop from '@/ui/common/BackToTop';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

// Import theme configuration
import { jost, theme } from './theme';

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${jost.className} ${jost.variable}`}>
      <body>
        <MantineProvider theme={theme}>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <RootContext>
                <MobileMenu />
                <div className="boxcar-wrapper">{children}</div>
                <FilterSidebar />
              </RootContext>
              <BackToTop />
            </I18nextProvider>
          </Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
