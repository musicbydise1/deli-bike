"use client";
import React from "react";
import FilterSidebar from "@/components/common/FilterSidebar";
import "../public/main.scss";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import MobileMenu from "@/components/headers/MobileMenu";
import RootContext from "@/context/RootContext";
import BackToTop from "@/components/common/BackToTop";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,87.5,100..900;1,87.5,100..900&display=swap"
                rel="stylesheet"
            />
        </head>
        <body>
        {/* Добавили MantineProvider */}
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
