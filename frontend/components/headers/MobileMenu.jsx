'use client';
import { homeLinks, megaMenuData, AboutLinks, pages, shopLinks } from '@/data/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import Button from '@/components/ui/button/Button';
import { useTranslation } from 'react-i18next';
import { FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { flushSync } from 'react-dom';

export default function MobileMenu() {
  const pathname = usePathname();
  const [memuOpen, setMemuOpen] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { i18n, t } = useTranslation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const { location, setLocation, language, setLanguage } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const changeLanguage = lng => {
    flushSync(() => {
      setLanguage(lng);
    });
    i18n.changeLanguage(lng);
    document.cookie = `lang=${lng}; path=/; max-age=31536000`;

    setIsLanguageDropdownOpen(false);
  };

  const toggleLocationDropdown = () => {
    setIsLocationDropdownOpen(prev => !prev);
    setIsLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(prevState => !prevState);
    setIsLocationDropdownOpen(false);
  };

  const handleLocationChange = loc => {
    flushSync(() => {
      setLocation(loc);
    });
    document.cookie = `location=${loc}; path=/; max-age=31536000`;
    setIsLocationDropdownOpen(false);
  };

  // Функция для переключения роли: обновляем cookie и перезагружаем страницу
  const toggleUserRole = () => {
    const newRole = userRole === 'courier' ? 'corporate' : 'courier';
    document.cookie = `userRole=${newRole}; path=/; max-age=31536000`;
    window.location.reload();
  };

  useEffect(() => {
    // При монтировании читаем location из cookies и обновляем глобальное состояние
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const locCookie = cookies.find(cookie => cookie.startsWith('location='));
    if (locCookie) {
      const loc = locCookie.split('=')[1];
      setLocation(loc);
    }
  }, [setLocation]);

  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const languageCookie = cookies.find(cookie => cookie.startsWith('lang='));
    if (languageCookie) {
      const lang = languageCookie.split('=')[1];
      setLanguage(lang);
    }
  }, [setLanguage]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setHasAccessToken(!!token);

    // Получаем роль из cookies вместо localStorage
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
    const role = roleCookie ? roleCookie.split('=')[1] : 'courier';
    setUserRole(role);

    setShowMenu(true);
    const mobileNavigation = document.querySelectorAll('[href="#nav-mobile"]');
    const mobileMenu = document.getElementById('nav-mobile');
    const mobileMenuOverlay = document.getElementById('mobileOverlay');
    mobileNavigation.forEach(elm => elm?.classList.remove('active'));

    mobileMenu?.classList.remove('mm-menu_opened');
    mobileMenuOverlay?.classList.remove('active');
    const toggleActiveClass = e => {
      e?.preventDefault();
      mobileNavigation.forEach(elm => elm?.classList.toggle('active'));
      mobileMenu?.classList.toggle('mm-menu_opened');
      mobileMenuOverlay?.classList.toggle('active');
    };

    // Add event listener for click
    mobileNavigation.forEach(elm => elm?.addEventListener('click', toggleActiveClass));

    // Cleanup event listener on component unmount
    return () => {
      mobileNavigation.forEach(elm => elm?.removeEventListener('click', toggleActiveClass));
    };
  }, [pathname]);

  const closeMenu = () => {
    const mobileNavigation = document.querySelector('.mobile-navigation');
    const mobileMenu = document.getElementById('nav-mobile');
    const mobileMenuOverlay = document.getElementById('mobileOverlay');

    mobileNavigation?.classList.remove('active');
    mobileMenu?.classList.remove('mm-menu_opened');
    mobileMenuOverlay?.classList.remove('active');
  };

  const isMenuActive = menuItem => {
    let active = false;
    if (menuItem.href?.includes('/')) {
      if (menuItem.href?.split('/')[1] == pathname.split('/')[1]) {
        active = true;
      }
    }
    if (menuItem.length) {
      active = menuItem.some(elm => elm.href?.split('/')[1] == pathname.split('/')[1]);
    }
    if (menuItem.length) {
      menuItem.forEach(item => {
        item.links?.forEach(elm2 => {
          if (elm2.href?.includes('/')) {
            if (elm2.href?.split('/')[1] == pathname.split('/')[1]) {
              active = true;
            }
          }
          if (elm2.length) {
            elm2.forEach(item2 => {
              item2?.links?.forEach(elm3 => {
                if (elm3.href.split('/')[1] == pathname.split('/')[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item.href?.includes('/')) {
          if (item.href?.split('/')[1] == pathname.split('/')[1]) {
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
          display: 'block',
          transition: '0.5s',
          opacity: 0.5,
          visibility: 'hidden',
          left: '-100%',
        }}
      >
        {showMenu && (
          <div className="mm-panels">
            <div
              id="navbar"
              className={`mm-panel ${
                memuOpen > 0 ? 'mm-panel_opened-parent mm-hidden' : 'mm-panel_opened'
              } `}
            >
              <div className="mm-navbar mm-navbar_sticky">
                <a className="mm-navbar__title">
                  <span>Меню</span>
                </a>
              </div>
              <ul className="navigation mm-listview">
                <li className={`mm-listitem ${pathname == '/' ? 'current' : ''}`}>
                  <Link href={`/`} className="mm-listitem__text">
                    Главная
                  </Link>
                </li>
                <li
                  className={`current-dropdown mm-listitem ${
                    isMenuActive(AboutLinks) ? 'current' : ''
                  }`}
                >
                  <a
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    onClick={() => setMemuOpen(pre => (pre == 3 ? -1 : 3))}
                  >
                    О нас <i className="fa-solid fa-angle-down" />
                    <span className="mm-sronly">Открыть</span>
                  </a>
                </li>
                <li
                  className={`current-dropdown mm-listitem ${
                    isMenuActive(megaMenuData) ? 'current' : ''
                  }`}
                >
                  <a
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    onClick={() => setMemuOpen(pre => (pre == 2 ? -1 : 2))}
                  >
                    Сотрудничество <i className="fa-solid fa-angle-down" />
                  </a>
                </li>
                <li className={`mm-listitem ${pathname == '/contact' ? 'current' : ''}`}>
                  <Link href={`/contact`} className="mm-listitem__text">
                    Контакты
                  </Link>
                </li>
                <li className={`mm-listitem ${pathname == '/#reviews' ? 'current' : ''}`}>
                  <Link href={`/contact`} className="mm-listitem__text">
                    Отзывы
                  </Link>
                </li>
                <li className={`mm-listitem ${pathname == '/vacancy' ? 'current' : ''}`}>
                  <Link href={`/contact`} className="mm-listitem__text">
                    Вакансии
                  </Link>
                </li>
              </ul>
              <Button variant="primary" className="ml-0 w-full" onClick={toggleUserRole}>
                {isClient 
                  ? userRole === 'courier' ? t('for_corporate') : t('for_courier')
                  : userRole === 'courier' ? "Для Юр.лиц" : "Для Курьеров"
                }{' '}
                <FaArrowRightToBracket className="ml-2" />
              </Button>
              <div className="mt-3">
                <Link href={userRole === 'courier' ? '/login' : '/other-login'}>
                  <Button className="ml-0 w-full" variant="primary-outline">
                    {isClient ? t('login') : "Личный кабинет"}
                  </Button>
                </Link>
              </div>

              <div className="location-switcher mt-2">
                <div className="dropdown">
                  <button
                    className="dropdown-togglee location-button"
                    onClick={toggleLocationDropdown}
                  >
                    <Image
                      src={
                        location === 'kz'
                          ? '/images/kazakhstan-flag.svg'
                          : '/images/belarus-flag.svg'
                      }
                      alt={location}
                      width={18}
                      height={13}
                      style={{ width: 'auto', height: 'auto' }}
                      className="flag-icon"
                    />
                    <FaChevronDown className="arrow-icon" />
                  </button>
                  {isLocationDropdownOpen && (
                    <div className="dropdown-menuu">
                      <button onClick={() => handleLocationChange('kz')}>
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
                      <button onClick={() => handleLocationChange('by')}>
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

              <div className="language-switcher mt-2">
                <div className="dropdown">
                  <button
                    className="dropdown-togglee language-button"
                    onClick={toggleLanguageDropdown}
                  >
                    {i18n.language.toUpperCase()} <FaChevronDown className="arrow-icon" />
                  </button>
                  {isLanguageDropdownOpen && (
                    <div className="dropdown-menuu">
                      <button onClick={() => changeLanguage('kz')}>Қазақша</button>
                      <button onClick={() => changeLanguage('ru')}>Русский</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              id="mm-1"
              className={`mm-panel ${memuOpen == 1 ? 'mm-panel_opened' : 'mm-hidden'}`}
            >
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen(pre => (pre == 1 ? -1 : 1))}
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
                  <span> </span>
                </a>
              </div>
              <ul className="dropdown mm-listview">
                {homeLinks.map((elm, i) => (
                  <li key={i} className="mm-listitem">
                    <Link
                      href={elm.href}
                      className={`mm-listitem__text ${isMenuActive(elm) ? 'menuActive' : ''}`}
                    >
                      {elm.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`mm-panel ${memuOpen == 2 ? 'mm-panel_opened' : 'mm-hidden'}`}>
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen(pre => (pre == 2 ? -1 : 2))}
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
                  <span>Сотрудничество</span>
                </a>
              </div>
              {megaMenuData.map((elm, i) => (
                <div key={i} className="mega-column">
                  <h3>{elm.title}</h3>
                  <ul className="dropdown mm-listview">
                    {elm.links.map((elm, i) => (
                      <li key={i} className="mm-listitem">
                        <Link
                          href={elm.href}
                          className={`mm-listitem__text ${isMenuActive(elm) ? 'menuActive' : ''}`}
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
            <div className={`mm-panel ${memuOpen == 3 ? 'mm-panel_opened' : 'mm-hidden'}`}>
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen(pre => (pre == 3 ? -1 : 3))}
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
                  <span>О нас</span>
                </a>
              </div>
              <ul className="dropdown mm-listview">
                {AboutLinks.map((elm, i) => (
                  <li key={i} className="mm-listitem">
                    <Link
                      href={elm.href}
                      className={`mm-listitem__text ${isMenuActive(elm) ? 'menuActive' : ''}`}
                    >
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`mm-panel ${memuOpen == 4 ? 'mm-panel_opened' : 'mm-hidden'}`}>
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen(pre => (pre == 4 ? -1 : 4))}
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
                      className={`mm-listitem__text ${isMenuActive(elm) ? 'menuActive' : ''}`}
                    >
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`mm-panel ${memuOpen == 5 ? 'mm-panel_opened' : 'mm-hidden'}`}>
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen(pre => (pre == 5 ? -1 : 5))}
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
                    {' '}
                    {elm.links ? (
                      <li
                        className="nav-sub mm-listitem"
                        onClick={() => setMemuOpen(pre => (pre == 6 ? -1 : 6))}
                      >
                        <>
                          <a
                            className={`mm-listitem__text ${
                              isMenuActive(pages[0].links) ? 'menuActive' : ''
                            }`}
                          >
                            {elm.title} <i className="fa fa-angle-right" />
                          </a>
                          <a className="mm-btn mm-btn_next mm-listitem__btn" href="#mm-6">
                            <span className="mm-sronly">Open submenu</span>
                          </a>
                        </>
                      </li>
                    ) : (
                      <li className="mm-listitem">
                        <Link
                          href={elm.href}
                          className={`mm-listitem__text ${isMenuActive(elm) ? 'menuActive' : ''}`}
                        >
                          {elm.title}
                        </Link>
                      </li>
                    )}{' '}
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div className={`mm-panel ${memuOpen == 6 ? 'mm-panel_opened' : 'mm-hidden'}`}>
              <div
                className="mm-navbar mm-navbar_sticky"
                onClick={() => setMemuOpen(pre => (pre == 5 ? -1 : 5))}
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
                  onClick={() => setMemuOpen(pre => (pre == 6 ? -1 : 6))}
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
                      className={`mm-listitem__text ${isMenuActive(elm) ? 'menuActive' : ''}`}
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
      <div className="overlay-mobile" id="mobileOverlay" onClick={closeMenu}></div>
    </>
  );
}
