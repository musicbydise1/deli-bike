'use client';
import React from 'react';
import Link from 'next/link';
import { Menu } from '@mantine/core';
import { IoGridSharp } from 'react-icons/io5';
import { HiOutlineShoppingBag, HiOutlineLogout } from 'react-icons/hi';
import { MdSettings } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export default function ProfileDropdown({ isClient, onClose, onLogout, className }) {
  const { t } = useTranslation();

  const iconSize = 18;

  const menuItems = [
    {
      label: isClient ? t('dashboard') : 'Личный кабинет',
      href: '/dashboard',
      icon: <IoGridSharp size={iconSize} />,
    },
    {
      label: isClient ? t('my_orders') : 'Аренда',
      href: '/dashboard',
      icon: <HiOutlineShoppingBag size={iconSize} />,
    },
    {
      label: isClient ? t('profile') : 'Профиль',
      href: '/dashboard',
      icon: <MdSettings size={iconSize} />,
    },
  ];

  return (
    <Menu.Dropdown className={className}>
      {menuItems.map(({ label, href, icon }) => (
        <Menu.Item key={label} component={Link} href={href} icon={icon} onClick={onClose}>
          {label}
        </Menu.Item>
      ))}

      <Menu.Divider />

      <Menu.Item color="red" icon={<HiOutlineLogout size={iconSize} />} onClick={onLogout}>
        {isClient ? t('logout') : 'Выйти'}
      </Menu.Item>
    </Menu.Dropdown>
  );
}
