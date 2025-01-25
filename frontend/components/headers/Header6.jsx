"use client";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { IoMdGlobe } from "react-icons/io";
import {FaChevronDown, FaMapMarkerAlt, FaShoppingCart, FaUser} from "react-icons/fa";
import { HiOutlineLogout, HiOutlineShoppingBag } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { IoGridSharp } from "react-icons/io5";
import { FcGlobe } from "react-icons/fc";
import Button from "../ui/button/Button"
import '../../public/css/pages/header/Header.css'
import {SlBasket} from "react-icons/sl";
import {CgShoppingCart} from "react-icons/cg";

export default function Header6() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Проверяем наличие токена и роли в localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setHasAccessToken(!!token);
    setUserRole(role || "courier"); // Устанавливаем "courier" по умолчанию
  }, []);

  // Функция для переключения роли
  const toggleUserRole = () => {
    const newRole = userRole === "courier" ? "corporate" : "courier";
    setUserRole(newRole);
    localStorage.setItem("userRole", newRole); // Сохраняем новую роль в localStorage
    window.location.reload();
  };


  // >>> Состояние для определения скролла <<<
  const [isScrolled, setIsScrolled] = useState(false);

  const handleFocus = () => {
    document.getElementById("box-content-search").classList.add("active");
    document
        .getElementById("box-content-search")
        .closest(".layout-search")
        .classList.add("active");
  };

  const handleBlur = () => {
    document.getElementById("box-content-search").classList.remove("active");
    document
        .getElementById("box-content-search")
        .closest(".layout-search")
        .classList.remove("active");
  };

  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Проверяем наличие accessToken в localStorage
    const token = localStorage.getItem("accessToken");
    setHasAccessToken(!!token);
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setHasAccessToken(false);
    setIsProfileMenuOpen(false);
  };

  // >>> Добавляем эффект, который слушает скролл <<<
  useEffect(() => {
    const handleScroll = () => {
      // Если прокрутили страницу хотя бы на 50px, ставим флаг isScrolled в true
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      // >>> Добавляем класс "fixed-header", когда isScrolled === true <<<
      <header
          className={`boxcar-header header-style-v9 ${isScrolled ? "fixed-header" : ""}`}
      >
        <div className="header-inner">
          <div className="inner-container">
            {/* Main box */}
            <div className="c-box">
              <div className="logo st-logo">
                <Link href={`/`}>
                  {isScrolled ? (
                      <Image
                          alt=""
                          title="DeliBike"
                          src="/images/logo-deli.svg" // <-- Логотип для "тёмного" фона
                          width={130}
                          height={26}
                      />
                  ) : (
                      <Image
                          alt=""
                          title="DeliBike"
                          src="/images/logo-deli-dark1.svg"  // <-- Логотип по умолчанию
                          width={130}
                          height={26}
                      />
                  )}
                </Link>
                <div className="nav-out-bar">
                  <nav className="nav main-menu">
                    <ul className="navigation mt-3" id="navbar">
                      <Nav />
                    </ul>
                  </nav>
                </div>
              </div>
              {/*Nav Box*/}
              {/* Main Menu End*/}

              <div className="right-box">
                {/* Location Switcher */}
                <div className="location-switcher mt-2">
                  <div className="dropdown">
                    <button
                        className="dropdown-togglee location-button"
                        onClick={toggleDropdown}
                    >
                      {/* Отображение текущего флага */}
                      <Image
                          src={isDropdownOpen ? "/images/kazakhstan-flag.svg" : "/images/belarus-flag.svg"}
                          alt="Current Location"
                          width={18}
                          height={13}
                          className="flag-icon"
                      />
                      <FaChevronDown className="arrow-icon" />
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                          {/* Опции выбора локации */}
                          <button onClick={() => console.log("Selected Kazakhstan")}>
                            <Image
                                src="/images/kazakhstan-flag.svg"
                                alt="Kazakhstan"
                                width={18}
                                height={13}
                                className="flag-icon"
                            />
                            <span className="country-name">Казахстан</span>
                          </button>
                          <button onClick={() => console.log("Selected Belarus")}>
                            <Image
                                src="/images/belarus-flag.svg"
                                alt="Belarus"
                                width={24}
                                height={16}
                                className="flag-icon"
                            />
                            <span className="country-name">Беларусь</span>
                          </button>
                        </div>
                    )}
                  </div>
                </div>

                {/* Language Switcher */}
                <div className="language-switcher mt-2">
                  <div className="dropdown">
                    <button
                        className="dropdown-togglee language-button"
                        onClick={toggleDropdown}
                    >
                      {i18n.language.toUpperCase()} <FaChevronDown className="arrow-icon"/>
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                          <button onClick={() => changeLanguage("kz")}>Қазақша</button>
                          <button onClick={() => changeLanguage("ru")}>Русский</button>
                        </div>
                    )}
                  </div>
                </div>

                {hasAccessToken ? (
                    <ul className="user-actions">

                      {/* Корзина */}
                      <li>
                        <Link href="/cart" className="icon-link">
                          <CgShoppingCart
                              size={20}
                              style={{color: "#080341", marginTop: "5px", marginLeft: "10px"}}
                          />
                        </Link>
                      </li>

                      {/* Личный кабинет */}
                      <li className="user-menu">
                        {userData && (
                            <div className="user-info">
                              {userData.firstName
                                  ? `${userData.firstName} ${userData.lastName ? userData.lastName[0] + "." : ""}`
                                  : "Имя пользователя"}
                            </div>
                        )}
                        <button
                            className="user-icon"
                            onClick={toggleProfileMenu}
                        >
                          <FaUser size={18} style={{color: "#fff"}}/>
                        </button>
                        {isProfileMenuOpen && (
                            <ul className="user-menu-dropdown">
                              <li>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                >
                                  <IoGridSharp size={15} style={{marginRight: "10px"}}/>
                                  {t("dashboard")}
                                </Link>
                              </li>
                              <li>
                                <Link
                                    href="/my-orders"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                >
                                  <HiOutlineShoppingBag
                                      size={20}
                                      style={{marginRight: "10px"}}
                                  />
                                  {t("my_orders")}
                                </Link>
                              </li>
                              <li>
                                <Link
                                    href="/settings"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                >
                                  <MdSettings size={20} style={{marginRight: "10px"}}/>
                                  {t("settings")}
                                </Link>
                              </li>
                              <li>
                                <button onClick={handleLogout} className="text-center">
                                  <HiOutlineLogout
                                      size={20}
                                      style={{marginRight: "10px"}}
                                  />
                                  {t("logout")}
                                </button>
                              </li>
                            </ul>
                        )}
                      </li>
                    </ul>
                ) : (
                    <ul>
                      <li>
                          <Button variant="primary" onClick={toggleUserRole}>
                            {userRole === "courier" ? t("for_corporate") : t("for_courier")}
                          </Button>
                        <Link href="/login">
                          <Button variant="primary-outline">
                            {t("login")} {/* Войти */}
                          </Button>
                        </Link>
                      </li>
                    </ul>
                )}

              </div>
            </div>
            {/* Mobile Menu  */}
          </div>
        </div>
        {/* Header Search */}
        <div className="search-popup">
          <span className="search-back-drop"/>
          <button className="close-search">
            <span className="fa fa-times"/>
          </button>
          <div className="search-inner">
            <form onSubmit={(e) => e.preventDefault()} method="post">
              <div className="form-group">
                <input
                    type="search"
                    name="search-field"
                    defaultValue=""
                    placeholder="Search..."
                    required
                />
                <button type="submit">
                  <i className="fa fa-search" />
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* End Header Search */}
        <div id="nav-mobile" />
      </header>
  );
}