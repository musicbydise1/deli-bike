"use client";

import {
  AboutLinks,
  blogLinks, CatalogueLinks,
  homeLinks,
  megaMenuData,
  pages,
  shopLinks,
} from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {useTranslation} from "react-i18next";

export default function Nav() {
    const { t } = useTranslation();
  const pathname = usePathname();
  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.length) {
      active = menuItem.some(
        (elm) => elm.href?.split("/")[1] == pathname.split("/")[1]
      );
    }
    if (menuItem.length) {
      menuItem.forEach((item) => {
        item.links?.forEach((elm2) => {
          if (elm2.href?.includes("/")) {
            if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          }
          if (elm2.length) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item.href?.includes("/")) {
          if (item.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
      });
    }

    return active;
  };

  return (
      <>
          {/*<li className="current-dropdown current">*/}
          {/*    <Link*/}
          {/*        className={pathname == "/" ? "menuActive" : ""}*/}
          {/*        href={`/`}*/}
          {/*    >*/}
          {/*        Главная*/}
          {/*    </Link>*/}
          {/*</li>*/}
          <li className="current-dropdown">
        <span className={isMenuActive(AboutLinks) ? "menuActive" : ""}>
         {t("menu.about")} <i className="fa-solid fa-angle-down"/>
        </span>
              <ul className="dropdown">
                  {AboutLinks.map((link, index) => (
                      <li key={index}>
                          <Link
                              className={isMenuActive(link) ? "menuActive" : ""}
                              href={link.href}
                          >
                              {link.label}
                          </Link>
                      </li>
                  ))}
              </ul>
          </li>

          <li className="current-dropdown">
        <span className={isMenuActive(CatalogueLinks) ? "menuActive" : ""}>
          {t("menu.cooperation")} <i className="fa-solid fa-angle-down"/>
        </span>
              <ul className="dropdown">
                  {CatalogueLinks.map((link, index) => (
                      <li key={index}>
                          <Link
                              className={isMenuActive(link) ? "menuActive" : ""}
                              href={link.href}
                          >
                              {link.label}
                          </Link>
                      </li>
                  ))}
              </ul>
          </li>

          {/*<li className="current-dropdown">*/}
          {/*    <Link*/}
          {/*        className={pathname == "/blog-list-01" ? "menuActive" : ""}*/}
          {/*        href={`/blog-list-02`}*/}
          {/*    >*/}
          {/*        Новости*/}
          {/*    </Link>*/}
          {/*</li>*/}

          {/*<li className="current-dropdown">*/}
          {/*    <Link*/}
          {/*        className={pathname == "/blog-list-01" ? "menuActive" : ""}*/}
          {/*        href={`/#`}*/}
          {/*    >*/}
          {/*        Вопрос-Ответы*/}
          {/*    </Link>*/}
          {/*</li>*/}

          <li className="current-dropdown">
              <Link
                  className={pathname == "/blog-list-01" ? "menuActive" : ""}
                  href={`/contact`}
              >
                  {t("menu.contacts")}
              </Link>
          </li>

          <li className="current-dropdown">
              <Link
                  className={pathname == "/blog-list-01" ? "menuActive" : ""}
                  href={`/#`}
              >
                  {t("menu.reviews")}
              </Link>
          </li>

          <li className="current-dropdown">
              <Link
                  className={pathname == "/blog-list-01" ? "menuActive" : ""}
                  href={`/#`}
              >
                  {t("menu.vacancies")}
              </Link>
          </li>
      </>
  );
}
