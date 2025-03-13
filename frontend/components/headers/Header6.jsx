"use client";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {FaChevronDown, FaUser} from "react-icons/fa";
import {HiOutlineLogout, HiOutlineMenuAlt3, HiOutlineShoppingBag} from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { IoGridSharp } from "react-icons/io5";
import Button from "../ui/button/Button"
import '../../public/css/pages/header/Header.css'
import {CgShoppingCart} from "react-icons/cg";
import {FaArrowRightToBracket} from "react-icons/fa6";
import { useContextElement } from "@/context/Context";
import { useRouter } from "next/navigation";

export default function Header6({  white = false}) {

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false); // Состояние для локации
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // Состояние для языка
  const [currentLocation, setCurrentLocation] = useState("Kazakhstan"); // Значение по умолчанию
  const { cartProducts } = useContextElement();
  const router = useRouter();

  const cartQuantity = cartProducts.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
  );

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
    setIsLanguageDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleLocationDropdown = () => {
    setIsLocationDropdownOpen((prevState) => !prevState);
    setIsLanguageDropdownOpen(false); // Закрыть другой дропдаун
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prevState) => !prevState);
    setIsLocationDropdownOpen(false); // Закрыть другой дропдаун
  };

  const handleLocationChange = (location) => {
    setCurrentLocation(location);
    setIsLocationDropdownOpen(false); // Закрываем выпадающее меню после выбора
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
    // Удаляем токен и userData из localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");

    // Сбрасываем состояния в приложении
    setHasAccessToken(false);
    setIsProfileMenuOpen(false);

    // Пытаемся прочитать userData из localStorage, чтобы узнать роль
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Предположим, что роль хранится в parsedData.roles[0].name (как в предыдущих примерах)
        const userRole = parsedData.roles?.[0]?.name;

        if (userRole === "courier") {
          router.push("/login");
        } else {
          router.push("/other-login");
        }
      } catch (error) {
        console.error("Ошибка парсинга userData:", error);
        // На случай ошибки парсинга отправляем по умолчанию на /login
        router.push("/login");
      }
    } else {
      // Если userData отсутствует, тоже отправляем на /login (или по логике — /other-login)
      router.push("/login");
    }
  };

  // >>> Добавляем эффект, который слушает скролл <<<
  useEffect(() => {
    const handleScroll = () => {
      // Если прокрутили страницу хотя бы на 50px, ставим флаг isScrolled в true
      if (window.scrollY > 80) {
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
          className={`boxcar-header header-style-v9 fixed-header`}
      >
        <div className="header-inner">
          <div className="inner-container">
            {/* Main box */}
            <div className="c-box">
              <div className="logo st-logo">
                <Link href={`/`}>
                  {isScrolled ? (
                      <div>
                        <Image
                            alt=""
                            title="DeliBike"
                            src="/images/logo-deli2.svg" // <-- Логотип для "тёмного" фона
                            width={111}
                            height={48}
                        />
                        <div style={{lineHeight: "5px"}}>
                          <span className="logo-text white-text">Скорость</span>
                          <span className="logo-text white-text">Свобода</span>
                          <span className="logo-text white-text">Стиль</span>
                        </div>
                      </div>
                  ) : (
                      <div>
                        <Image
                            alt=""
                            title="DeliBike"
                            src="/images/logo-deli2.svg"  // <-- Логотип по умолчанию
                            width={111}
                            height={48}
                        />
                        <div style={{ lineHeight: "5px" }}>
                          <span className="logo-text white-text">Скорость</span>
                          <span className="logo-text white-text">Свобода</span>
                          <span className="logo-text white-text">Стиль</span>
                        </div>
                      </div>
                  )}
                </Link>
                <div className="nav-out-bar">
                  <nav className="nav main-menu">
                    <ul className="navigation mt-3" id="navbar">
                      <Nav/>
                    </ul>
                  </nav>
                </div>
              </div>
              {/*Nav Box*/}
              {/* Main Menu End*/}
              <div className="nav-box">
                <div className="right-box">
                {/* Location Switcher */}
                <div className="location-switcher mt-2">
                  <div className="dropdown">
                    <button
                        className="dropdown-togglee location-button"
                        onClick={toggleLocationDropdown}
                    >
                      {/* Отображение текущего флага */}
                      <Image
                          src={
                            currentLocation === "Kazakhstan"
                                ? "/images/kazakhstan-flag.svg"
                                : "/images/belarus-flag.svg"
                          }
                          alt={currentLocation}
                          width={18}
                          height={13}
                          style={{ width: 'auto', height: 'auto' }}
                          className="flag-icon"
                      />
                      <FaChevronDown className="arrow-icon"/>
                    </button>
                    {isLocationDropdownOpen && (
                        <div className="dropdown-menuu">
                          {/* Опции выбора локации */}
                          <button onClick={() => handleLocationChange("Kazakhstan")}>
                            <Image
                                src="/images/kazakhstan-flag.svg"
                                alt="Kazakhstan"
                                width={18}
                                height={13}
                                style={{ width: 'auto', height: 'auto' }}
                                className="flag-icon"
                            />
                            <span className="country-name">Казахстан</span>
                          </button>
                          <button onClick={() => handleLocationChange("Belarus")}>
                            <Image
                                src="/images/belarus-flag.svg"
                                alt="Belarus"
                                width={18}
                                height={13}
                                style={{ width: 'auto', height: 'auto' }}
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
                        onClick={toggleLanguageDropdown}
                    >
                      {i18n.language.toUpperCase()} <FaChevronDown className="arrow-icon"/>
                    </button>
                    {isLanguageDropdownOpen && (
                        <div className="dropdown-menuu">
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
                        <Link href="/cart" className="icon-link" style={{ position: "relative" }}>
                          <CgShoppingCart
                              className="cart-icon"
                              size={20}
                              style={{ color: "#fff", marginTop: "5px", marginLeft: "10px" }}
                          />
                          {cartQuantity > 0 && (
                              <span className="cart-badge">
                                {cartQuantity}
                              </span>
                          )}
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
                                    href="/dashboard"
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
                                    href="/dashboard"
                                    onClick={() => setIsProfileMenuOpen(false)}
                                >
                                  <MdSettings size={20} style={{marginRight: "10px"}}/>
                                  {t("profile")}
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
                          {userRole === "courier" ? t("for_corporate") : t("for_courier")} <FaArrowRightToBracket className="ml-2" />
                        </Button>
                        <Link href={userRole === "courier" ? "/login" : "/other-login"}>
                          <Button variant="primary-outline">
                            {t("login")} {/* Войти */}
                          </Button>
                        </Link>
                      </li>
                    </ul>
                )}

              </div>
              </div>
              <div className="mobile-box">
                <div className="right-box">
                  <div className="mobile-navigation">
                    <a href="#nav-mobile" title="">
                      <HiOutlineMenuAlt3 className="menu-burger-icon" />
                    </a>
                  </div>
                </div>
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
                  <i className="fa fa-search"/>
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* End Header Search */}
        <div id="nav-mobile"/>
      </header>
  );
}