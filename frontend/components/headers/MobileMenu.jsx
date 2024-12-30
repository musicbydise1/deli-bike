"use client";
import {
  blogLinks,
  homeLinks,
  megaMenuData,
  pages,
  shopLinks,
} from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function MobileMenu() {
  const pathname = usePathname();
  const [memuOpen, setMemuOpen] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    setShowMenu(true);
    const mobileNavigation = document.querySelectorAll('[href="#nav-mobile"]');
    const mobileMenu = document.getElementById("nav-mobile");
    const mobileMenuOverlay = document.getElementById("mobileOverlay");
    mobileNavigation.forEach((elm) => elm?.classList.remove("active"));

    mobileMenu?.classList.remove("mm-menu_opened");
    mobileMenuOverlay?.classList.remove("active");
    const toggleActiveClass = (e) => {
      e?.preventDefault();
      mobileNavigation.forEach((elm) => elm?.classList.toggle("active"));
      mobileMenu?.classList.toggle("mm-menu_opened");
      mobileMenuOverlay?.classList.toggle("active");
    };

    // Add event listener for click
    mobileNavigation.forEach((elm) =>
      elm?.addEventListener("click", toggleActiveClass)
    );

    // Cleanup event listener on component unmount
    return () => {
      mobileNavigation.forEach((elm) =>
        elm?.removeEventListener("click", toggleActiveClass)
      );
    };
  }, [pathname]); // Empty dependency array ensures it only runs on mount/unmount

  const closeMenu = () => {
    const mobileNavigation = document.querySelector(".mobile-navigation");
    const mobileMenu = document.getElementById("nav-mobile");
    const mobileMenuOverlay = document.getElementById("mobileOverlay");

    mobileNavigation?.classList.remove("active");
    mobileMenu?.classList.remove("mm-menu_opened");
    mobileMenuOverlay?.classList.remove("active");
  };
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
      <div
        id="nav-mobile"
        className="mm-menu mm-menu_offcanvas mm-menu_position-left mm-menu_ mm-menu_theme-black "
        style={{
          zIndex: 101,
          display: "block",
          transition: "0.5s",
          opacity: 0.5,
          visibility: "hidden",
          left: "-100%",
        }}
      >
        {showMenu && (
          <div className="mm-panels">
            <div
              id="navbar"
              className={`mm-panel ${
                memuOpen > 0
                  ? "mm-panel_opened-parent mm-hidden"
                  : "mm-panel_opened"
              } `}
            >
              <div className="mm-navbar mm-navbar_sticky">
                <a className="mm-navbar__title">
                  <span>Menu</span>
                </a>
              </div>
              <ul className="navigation mm-listview">
                <li
                  className={`current-dropdown mm-listitem ${
                    isMenuActive(homeLinks) ? "current" : ""
                  }`}
                >
                  <a
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    onClick={() => setMemuOpen((pre) => (pre == 1 ? -1 : 1))}
                  >
                    Home <i className="fa-solid fa-angle-down" />
                    <span className="mm-sronly">Open submenu</span>
                  </a>
                </li>
                <li
                  className={`current-dropdown mm-listitem ${
                    isMenuActive(megaMenuData) ? "current" : ""
                  }`}
                >
                  <a
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    onClick={() => setMemuOpen((pre) => (pre == 2 ? -1 : 2))}
                  >
                    Inventory <i className="fa-solid fa-angle-down" />
                  </a>
                </li>
                <li
                  className={`current-dropdown mm-listitem ${
                    isMenuActive(blogLinks) ? "current" : ""
                  }`}
                >
                  <a
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    onClick={() => setMemuOpen((pre) => (pre == 3 ? -1 : 3))}
                  >
                    Blog <i className="fa-solid fa-angle-down" />
                    <span className="mm-sronly">Open submenu</span>
                  </a>
                </li>
                <li
                  className={`current-dropdown mm-listitem ${
                    isMenuActive(shopLinks) ? "current" : ""
                  }`}
                >
                  <a
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    onClick={() => setMemuOpen((pre) => (pre == 4 ? -1 : 4))}
                  >
                    Shop <i className="fa-solid fa-angle-down" />
                    <span className="mm-sronly">Open submenu</span>
                  </a>
                </li>
                <li
                  className={`current-dropdown mm-listitem ${
                    isMenuActive(pages) ? "current" : ""
                  }`}
                >
                  <a
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    onClick={() => setMemuOpen((pre) => (pre == 5 ? -1 : 5))}
                  >
                    Pages <i className="fa-solid fa-angle-down" />
                    <span className="mm-sronly">Open submenu</span>
                  </a>
                </li>
                <li
                  className={`mm-listitem ${
                    pathname == "/contact" ? "current" : ""
                  }`}
                >
                  <Link href={`/contact`} className="mm-listitem__text">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div
              id="mm-1"
              className={`mm-panel ${
                memuOpen == 1 ? "mm-panel_opened" : "mm-hidden"
              }`}
            >
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen((pre) => (pre == 1 ? -1 : 1))}
              >
                <a
                  className="mm-btn mm-btn_prev mm-navbar__btn"
                  href="#navbar"
                  aria-haspopup="true"
                  aria-owns="navbar"
                >
                  <span className="mm-sronly">Close submenu</span>
                </a>
                <a className="mm-navbar__title" href="#navbar">
                  <span>Home </span>
                </a>
              </div>
              <ul className="dropdown mm-listview">
                {homeLinks.map((elm, i) => (
                  <li key={i} className="mm-listitem">
                    <Link
                      href={elm.href}
                      className={`mm-listitem__text ${
                        isMenuActive(elm) ? "menuActive" : ""
                      }`}
                    >
                      {elm.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`mm-panel ${
                memuOpen == 2 ? "mm-panel_opened" : "mm-hidden"
              }`}
            >
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen((pre) => (pre == 2 ? -1 : 2))}
              >
                <a
                  className="mm-btn mm-btn_prev mm-navbar__btn"
                  href="#navbar"
                  aria-haspopup="true"
                  aria-owns="navbar"
                >
                  <span className="mm-sronly">Close submenu</span>
                </a>
                <a className="mm-navbar__title" href="#navbar">
                  <span>Inventory </span>
                </a>
              </div>
              {megaMenuData.map((elm, i) => (
                <div key={i} className="mega-column">
                  <h3>{elm.title}</h3>
                  <ul>
                    {elm.links.map((elm, i) => (
                      <li key={i}>
                        <Link
                          href={elm.href}
                          className={` ${
                            isMenuActive(elm) ? "menuActive" : ""
                          }`}
                          title=""
                        >
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div
              className={`mm-panel ${
                memuOpen == 3 ? "mm-panel_opened" : "mm-hidden"
              }`}
            >
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen((pre) => (pre == 3 ? -1 : 3))}
              >
                <a
                  className="mm-btn mm-btn_prev mm-navbar__btn"
                  href="#navbar"
                  aria-haspopup="true"
                  aria-owns="navbar"
                >
                  <span className="mm-sronly">Close submenu</span>
                </a>
                <a className="mm-navbar__title" href="#navbar">
                  <span>Blog </span>
                </a>
              </div>
              <ul className="dropdown mm-listview">
                {blogLinks.map((elm, i) => (
                  <li key={i} className="mm-listitem">
                    <Link
                      href={elm.href}
                      className={`mm-listitem__text ${
                        isMenuActive(elm) ? "menuActive" : ""
                      }`}
                    >
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`mm-panel ${
                memuOpen == 4 ? "mm-panel_opened" : "mm-hidden"
              }`}
            >
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen((pre) => (pre == 4 ? -1 : 4))}
              >
                <a
                  className="mm-btn mm-btn_prev mm-navbar__btn"
                  href="#navbar"
                  aria-haspopup="true"
                  aria-owns="navbar"
                >
                  <span className="mm-sronly">Close submenu</span>
                </a>
                <a className="mm-navbar__title" href="#navbar">
                  <span>Shop </span>
                </a>
              </div>
              <ul className="dropdown mm-listview">
                {shopLinks.map((elm, i) => (
                  <li key={i} className="mm-listitem">
                    <Link
                      href={elm.href}
                      className={`mm-listitem__text ${
                        isMenuActive(elm) ? "menuActive" : ""
                      }`}
                    >
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`mm-panel ${
                memuOpen == 5 ? "mm-panel_opened" : "mm-hidden"
              }`}
            >
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen((pre) => (pre == 5 ? -1 : 5))}
              >
                <a
                  className="mm-btn mm-btn_prev mm-navbar__btn"
                  href="#navbar"
                  aria-haspopup="true"
                  aria-owns="navbar"
                >
                  <span className="mm-sronly">Close submenu</span>
                </a>
                <a className="mm-navbar__title" href="#navbar">
                  <span>Pages </span>
                </a>
              </div>
              <ul className="dropdown mm-listview">
                {pages.map((elm, i) => (
                  <React.Fragment key={i}>
                    {" "}
                    {elm.links ? (
                      <li
                        className="nav-sub mm-listitem"
                        onClick={() =>
                          setMemuOpen((pre) => (pre == 6 ? -1 : 6))
                        }
                      >
                        <>
                          <a
                            className={`mm-listitem__text ${
                              isMenuActive(pages[0].links) ? "menuActive" : ""
                            }`}
                          >
                            {elm.title} <i className="fa fa-angle-right" />
                          </a>
                          <a
                            className="mm-btn mm-btn_next mm-listitem__btn"
                            href="#mm-6"
                          >
                            <span className="mm-sronly">Open submenu</span>
                          </a>
                        </>
                      </li>
                    ) : (
                      <li className="mm-listitem">
                        <Link
                          href={elm.href}
                          className={`mm-listitem__text ${
                            isMenuActive(elm) ? "menuActive" : ""
                          }`}
                        >
                          {elm.title}
                        </Link>
                      </li>
                    )}{" "}
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div
              className={`mm-panel ${
                memuOpen == 6 ? "mm-panel_opened" : "mm-hidden"
              }`}
            >
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen((pre) => (pre == 5 ? -1 : 5))}
              >
                <a
                  className="mm-btn mm-btn_prev mm-navbar__btn"
                  href="#mm-5"
                  aria-haspopup="true"
                  aria-owns="mm-5"
                >
                  <span className="mm-sronly">Close submenu</span>
                </a>
                <a
                  className="mm-navbar__title"
                  onClick={() => setMemuOpen((pre) => (pre == 6 ? -1 : 6))}
                >
                  <span>Dashboard </span>
                </a>
              </div>
              <ul className="dropdown deep subnav-menu mm-listview">
                {pages[0].links.map((elm, i) => (
                  <li key={i} className="mm-listitem">
                    <Link
                      href={elm.href}
                      title=""
                      className={`mm-listitem__text ${
                        isMenuActive(elm) ? "menuActive" : ""
                      }`}
                    >
                      {elm.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div
        className="overlay-mobile"
        id="mobileOverlay"
        onClick={closeMenu}
      ></div>
    </>
  );
}
