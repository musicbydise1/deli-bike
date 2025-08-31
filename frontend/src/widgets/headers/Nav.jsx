'use client';

import {
  AboutLinks,
  blogLinks,
  CatalogueLinks,
  homeLinks,
  megaMenuData,
  pages,
  shopLinks,
} from '@/data/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Group, UnstyledButton, Text, Box, Flex } from '@mantine/core';
import { FaChevronDown } from 'react-icons/fa';
import styles from './Nav.module.css';

export default function Nav() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [aboutMenuOpened, setAboutMenuOpened] = useState(false);
  const [cooperationMenuOpened, setCooperationMenuOpened] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    <Group className={styles.navList}>
      {/* About Menu */}
      <Menu
        opened={aboutMenuOpened}
        onOpen={() => setAboutMenuOpened(true)}
        onClose={() => setAboutMenuOpened(false)}
        position="bottom-start"
        offset={5}
        withArrow
        arrowPosition="center"
        withinPortal={false}
      >
        <Menu.Target>
          <UnstyledButton
            className={`${styles.menuItem} ${isMenuActive(AboutLinks) ? styles.menuActive : ''} ${aboutMenuOpened ? styles.dropdownOpen : ''}`}
          >
            <Flex className={styles.dropdownTrigger}>
              <Text className={styles.dropdownMainText}>
                {isClient ? t('menu.about') : 'О нас'}
              </Text>
              <FaChevronDown className={styles.dropdownIcon} />
            </Flex>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className={styles.dropdownMenu}>
          {AboutLinks.map((link, index) => (
            <Menu.Item
              key={index}
              component={Link}
              href={link.href}
              className={`${styles.dropdownItem} ${isMenuActive(link) ? styles.menuActive : ''}`}
            >
              {link.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>

      {/* Cooperation Menu */}
      <Menu
        opened={cooperationMenuOpened}
        onOpen={() => setCooperationMenuOpened(true)}
        onClose={() => setCooperationMenuOpened(false)}
        position="bottom-start"
        offset={5}
        withArrow
        arrowPosition="center"
        withinPortal={false}
      >
        <Menu.Target>
          <UnstyledButton
            className={`${styles.menuItem} ${isMenuActive(CatalogueLinks) ? styles.menuActive : ''} ${cooperationMenuOpened ? styles.dropdownOpen : ''}`}
          >
            <Flex className={styles.dropdownTrigger}>
              <Text className={styles.dropdownMainText}>
                {isClient ? t('menu.cooperation') : 'Сотрудничество'}
              </Text>
              <FaChevronDown className={styles.dropdownIcon} />
            </Flex>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className={styles.dropdownMenu}>
          {CatalogueLinks.map((link, index) => (
            <Menu.Item
              key={index}
              component={Link}
              href={link.href}
              className={`${styles.dropdownItem} ${isMenuActive(link) ? styles.menuActive : ''}`}
            >
              {link.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>

      {/* Contacts Link */}
      <Box className={styles.menuItem}>
        <Link
          href="/contact"
          className={`${styles.link} ${pathname === '/contact' ? styles.menuActive : ''}`}
        >
          {isClient ? t('menu.contacts') : 'Контакты'}
        </Link>
      </Box>

      {/* Reviews Link */}
      <Box className={styles.menuItem}>
        <Link
          href="/#reviews"
          className={`${styles.link} ${pathname === '/reviews' ? styles.menuActive : ''}`}
        >
          {isClient ? t('menu.reviews') : 'Отзывы'}
        </Link>
      </Box>

      {/* Vacancies Link */}
      <Box className={styles.menuItem}>
        <Link
          href="/vacancy"
          className={`${styles.link} ${pathname === '/vacancy' ? styles.menuActive : ''}`}
        >
          {isClient ? t('menu.vacancies') : 'Вакансии'}
        </Link>
      </Box>
    </Group>
  );
}
