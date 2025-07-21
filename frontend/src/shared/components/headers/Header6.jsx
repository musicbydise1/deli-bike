'use client';
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaUser } from 'react-icons/fa';
import { HiOutlineLogout, HiOutlineMenuAlt3, HiOutlineShoppingBag } from 'react-icons/hi';
import { MdSettings } from 'react-icons/md';
import { IoGridSharp } from 'react-icons/io5';
import Button from '../ui/button/Button';
import '../../public/css/pages/header/Header.css';
import { CgShoppingCart } from 'react-icons/cg';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { flushSync } from 'react-dom';

export default function Header6({ white = false }) {
  const [userRoleCookie, setUserRoleCookie] = useState('courier');
  // Локальное состояние для локации, вместо глобального контекста
  const [locationCookie, setLocationCookie] = useState();
  const [isClient, setIsClient] = useState(false);
  const { location, setLocation, language, setLanguage } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Получаем userRole из cookies
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookie = cookies.find(cookie => cookie.startsWith('userRole='));
    if (roleCookie) {
      const role = roleCookie.split('=')[1];
      setUserRoleCookie(role);
    }
  }, []);

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  // Убираем использование setLocation из контекста – теперь location хранится локально
  const {
    /* location, setLocation, */
  } = useUser();
  const { cartProducts } = useCart();
  const router = useRouter();

  const cartQuantity = cartProducts.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Проверяем наличие accessToken в localStorage
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setHasAccessToken(!!token);
  }, []);

  // Функция для переключения роли: обновляем cookie и перезагружаем страницу
  const toggleUserRole = () => {
    const newRole = userRoleCookie === 'courier' ? 'corporate' : 'courier';
    document.cookie = `userRole=${newRole}; path=/; max-age=31536000`;
    window.location.reload();
  };

  const { i18n, t } = useTranslation();

  // Проверяем, сохранён ли язык в cookies, и переключаем язык при монтировании компонента
  useEffect(() => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const langCookie = cookies.find(cookie => cookie.startsWith('lang='));
    if (langCookie) {
      const lang = langCookie.split('=')[1];
      if (lang && lang !== i18n.language) {
        i18n.changeLanguage(lang);
      }
    }
  }, [i18n]);

  const changeLanguage = lng => {
    flushSync(() => {
      setLanguage(lng);
    });
    i18n.changeLanguage(lng);
    document.cookie = `lang=${lng}; path=/; max-age=31536000`;

    setIsLanguageDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const toggleLocationDropdown = () => {
    setIsLocationDropdownOpen(prev => !prev);
    setIsLanguageDropdownOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(prevState => !prevState);
    setIsLocationDropdownOpen(false);
  };

  // Обновляем локальное состояние и cookies для локации
  const handleLocationChange = loc => {
    flushSync(() => {
      setLocation(loc);
    });
    document.cookie = `location=${loc}; path=/; max-age=31536000`;
    setIsLocationDropdownOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setHasAccessToken(!!token);
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    setHasAccessToken(false);
    setIsProfileMenuOpen(false);

    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const userRole = parsedData.roles?.[0]?.name;
        if (userRole === 'courier') {
          router.push('/login');
        } else {
          router.push('/other-login');
        }
      } catch (error) {
        console.error('Ошибка парсинга userData:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        if (!isScrolled) {
          setIsScrolled(true);
        }
      } else if (window.scrollY === 0) {
        if (isScrolled) {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <header className={`boxcar-header header-style-v9 ${isScrolled ? 'fixed-header' : ''}`}>
      <div className="header-inner">
        <div className="inner-container">
          {/* Main box */}
          <div className="c-box">
            <div className="logo st-logo">
              <Link href={`/`}>
                {isScrolled ? (
                  <div>
                    <Image
                      alt="Logo"
                      title="DeliBike"
                      src="/images/logo-deli2.svg"
                      width={111}
                      height={48}
                    />
                    <div style={{ lineHeight: '5px' }}>
                      <span className="logo-text white-text">Скорость</span>
                      <span className="logo-text white-text">Свобода</span>
                      <span className="logo-text white-text">Стиль</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Image
                      alt="Logo"
                      title="DeliBike"
                      src="/images/logo-deli2.svg"
                      width={111}
                      height={48}
                    />
                    <div style={{ lineHeight: '5px' }}>
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
                    <Nav />
                  </ul>
                </nav>
              </div>
            </div>
            {/* Nav Box */}
            <div className="nav-box">
              <div className="right-box">
                {/* Location Switcher */}
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
                        alt={location === 'kz' ? 'Flag of Kazakhstan' : 'Flag of Belarus'}
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

                {/* Language Switcher */}
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

                {hasAccessToken ? (
                  <ul className="user-actions">
                    {/* Корзина */}
                    <li>
                      <Link href="/cart" className="icon-link" style={{ position: 'relative' }}>
                        <CgShoppingCart
                          className="cart-icon"
                          size={20}
                          style={{ color: '#fff', marginTop: '5px', marginLeft: '10px' }}
                        />
                        {cartQuantity > 0 && <span className="cart-badge">{cartQuantity}</span>}
                      </Link>
                    </li>

                    {/* Личный кабинет */}
                    <li className="user-menu">
                      {userData && (
                        <div className="user-info">
                          {userData.firstName
                            ? `${userData.firstName} ${userData.lastName ? userData.lastName[0] + '.' : ''}`
                            : 'Имя пользователя'}
                        </div>
                      )}
                      <button className="user-icon" onClick={toggleProfileMenu}>
                        <FaUser size={18} style={{ color: '#fff' }} />
                      </button>
                      {isProfileMenuOpen && (
                        <ul className="user-menu-dropdown">
                          <li>
                            <Link href="/dashboard" onClick={() => setIsProfileMenuOpen(false)}>
                              <IoGridSharp size={15} style={{ marginRight: '10px' }} />
                              {isClient ? t('dashboard') : 'Личный кабинет'}
                            </Link>
                          </li>
                          <li>
                            <Link href="/dashboard" onClick={() => setIsProfileMenuOpen(false)}>
                              <HiOutlineShoppingBag size={20} style={{ marginRight: '10px' }} />
                              {isClient ? t('my_orders') : 'Аренда'}
                            </Link>
                          </li>
                          <li>
                            <Link href="/dashboard" onClick={() => setIsProfileMenuOpen(false)}>
                              <MdSettings size={20} style={{ marginRight: '10px' }} />
                              {isClient ? t('profile') : 'Профиль'}
                            </Link>
                          </li>
                          <li>
                            <button onClick={handleLogout} className="text-center">
                              <HiOutlineLogout size={20} style={{ marginRight: '10px' }} />
                              {isClient ? t('logout') : 'Выйти'}
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
                        {isClient
                          ? userRoleCookie === 'courier'
                            ? t('for_corporate')
                            : t('for_courier')
                          : userRoleCookie === 'courier'
                            ? 'Для Юр.лиц'
                            : 'Для Курьеров'}{' '}
                        <FaArrowRightToBracket className="ml-2" />
                      </Button>
                      <Link href={userRoleCookie === 'courier' ? '/login' : '/other-login'}>
                        <Button variant="primary-outline">
                          {isClient ? t('login') : 'Личный кабинет'}
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
        <div className="search-popup">
          <span className="search-back-drop" />
          <button className="close-search">
            <span className="fa fa-times" />
          </button>
          <div className="search-inner">
            <form onSubmit={e => e.preventDefault()} method="post">
              <div className="form-group">
                <input
                  type="search"
                  name="search-field"
                  defaultValue=""
                  placeholder={t('search.placeholder')}
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
      </div>
    </header>
  );
}
