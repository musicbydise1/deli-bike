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
import { CgShoppingCart } from 'react-icons/cg';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { flushSync } from 'react-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
  Avatar,
} from '@mantine/core';
import { ORANGE_COLOR } from '@/app/theme/colors';
import styles from './Header6.module.css';
import ProfileDropdown from '@/widgets/headers/ProfileDropdown';

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

  // No need for classes and cx with the new styling approach

  return (
    <Box
      component="header"
      h={80}
      className={`${styles.header} ${isScrolled ? styles.fixedHeader : ''}`}
    >
      <Container size="xl" className={styles.container}>
        {/* Logo and Navigation */}
        <Flex align="center">
          <Box className={styles.logo}>
            <Link href="/">
              <Flex direction="column" align="center">
                <Image
                  alt="Logo"
                  title="DeliBike"
                  src="/images/logo-deli2.svg"
                  width={111}
                  height={48}
                />
                <Box className={styles.logoTextContainer}>
                  <Text className={styles.logoText}>Скорость</Text>
                  <Text className={styles.logoText}>Свобода</Text>
                  <Text className={styles.logoText}>Стиль</Text>
                </Box>
              </Flex>
            </Link>
          </Box>

          <Box ml="xl" className={styles.desktopNav}>
            <Box component="nav">
              <Nav />
            </Box>
          </Box>
        </Flex>

        {/* Right Side Controls */}
        <Group>
          {/* Location Switcher */}
          <Box className={styles.dropdown}>
            <Menu
              opened={isLocationDropdownOpen}
              onOpen={() => setIsLocationDropdownOpen(true)}
              onClose={() => setIsLocationDropdownOpen(false)}
              position="bottom-end"
              withinPortal={false}
            >
              <Menu.Target>
                <UnstyledButton className={styles.flagButton}>
                  <Image
                    src={
                      location === 'kz' ? '/images/kazakhstan-flag.svg' : '/images/belarus-flag.svg'
                    }
                    alt={location === 'kz' ? 'Flag of Kazakhstan' : 'Flag of Belarus'}
                    width={18}
                    height={13}
                    className={`${styles.autoSize} ${styles.flagIcon}`}
                  />
                  <FaChevronDown className={styles.arrowIcon} />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown className={styles.dropdownMenu}>
                <Menu.Item onClick={() => handleLocationChange('kz')}>
                  <Group>
                    <Image
                      src="/images/kazakhstan-flag.svg"
                      alt="Kazakhstan"
                      width={18}
                      height={13}
                      className={styles.autoSize}
                    />
                    <Text>Казахстан</Text>
                  </Group>
                </Menu.Item>
                <Menu.Item onClick={() => handleLocationChange('by')}>
                  <Group>
                    <Image
                      src="/images/belarus-flag.svg"
                      alt="Belarus"
                      width={18}
                      height={13}
                      className={styles.autoSize}
                    />
                    <Text>Беларусь</Text>
                  </Group>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>

          {/* Language Switcher */}
          <Box className={styles.dropdown}>
            <Menu
              opened={isLanguageDropdownOpen}
              onOpen={() => setIsLanguageDropdownOpen(true)}
              onClose={() => setIsLanguageDropdownOpen(false)}
              position="bottom-end"
              withinPortal={false}
            >
              <Menu.Target>
                <UnstyledButton className={styles.flagButton}>
                  <Text color="white">{i18n.language.toUpperCase()}</Text>
                  <FaChevronDown className={styles.arrowIcon} />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown className={styles.dropdownMenu}>
                <Menu.Item onClick={() => changeLanguage('kz')}>Қазақша</Menu.Item>
                <Menu.Item onClick={() => changeLanguage('ru')}>Русский</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>

          {/* User Actions */}
          {hasAccessToken ? (
            <Group spacing="md">
              {/* Cart */}
              <Box className={styles.relativePosition}>
                <Link href="/cart">
                  <UnstyledButton className={styles.cartIcon}>
                    <CgShoppingCart size={20} />
                    {cartQuantity > 0 && <Box className={styles.cartBadge}>{cartQuantity}</Box>}
                  </UnstyledButton>
                </Link>
              </Box>

              {/* User Menu */}
              <Box className={styles.userMenu}>
                <Menu shadow="md" width={220}>
                  <Menu.Target>
                    {/* любой ваш триггер: аватар, иконка, кнопка */}
                    <Avatar radius="xl" src="/path/to/avatar.jpg" alt="avatar" />
                  </Menu.Target>

                  <ProfileDropdown
                    isClient={isClient}
                    onClose={() => setIsProfileMenuOpen(false)}
                    onLogout={handleLogout}
                  />
                </Menu>
              </Box>
            </Group>
          ) : (
            <Group>
              <Button size="sm" variant="filled" color="#ff5500" onClick={toggleUserRole}>
                {isClient
                  ? userRoleCookie === 'courier'
                    ? t('for_corporate')
                    : t('for_courier')
                  : userRoleCookie === 'courier'
                    ? 'Для Юр.лиц'
                    : 'Для Курьеров'}{' '}
                <FaArrowRightToBracket className={styles.iconMarginLeft} />
              </Button>
              <Button
                component={Link}
                href={userRoleCookie === 'courier' ? '/login' : '/other-login'}
                variant="outline"
                color="#ff5500"
                size="sm"
              >
                {isClient ? t('login') : 'Личный кабинет'}
              </Button>
            </Group>
          )}

          {/* Mobile Menu Button */}
          <Box className={styles.mobileMenu}>
            <UnstyledButton component="a" href="#nav-mobile">
              <HiOutlineMenuAlt3 size={24} color="white" />
            </UnstyledButton>
          </Box>
        </Group>
      </Container>

      {/* Mobile Menu Container */}
      <Box id="nav-mobile" />
    </Box>
  );
}
