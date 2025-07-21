// components/MobileBottomMenu.jsx
import React, { useState } from 'react';
import { FiHome, FiShoppingBag, FiUser, FiFileText } from 'react-icons/fi';

// Основные пункты меню (Logout перенесен в подменю Profile)
const mainTabs = [
  { key: 'dashboard', label: 'Личный кабинет', icon: FiHome },
  { key: 'rent', label: 'Заказы', icon: FiShoppingBag },
  { key: 'documentation', label: 'Документация', icon: FiFileText },
  { key: 'profile', label: 'Профиль', icon: FiUser },
];

// Подменю для документации и профиля (добавлен Logout в группу Profile)
const subMenus = {
  documentation: [
    { key: 'rentPolicy', label: 'Политика аренды' },
    { key: 'returnPolicy', label: 'Политика возврата' },
    { key: 'renterResponsibility', label: 'Ответственность' },
  ],
  profile: [
    { key: 'profile', label: 'Профиль' },
    { key: 'support', label: 'Поддержка' },
    { key: 'logout', label: 'Выйти', isLogout: true },
  ],
};

export default function MobileBottomMenu({ activeTab, setActiveTab, onLogout }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMainClick = item => {
    if (item.key === 'documentation' || item.key === 'profile') {
      setOpenDropdown(openDropdown === item.key ? null : item.key);
    } else {
      setActiveTab(item.key);
      setOpenDropdown(null);
    }
  };

  const handleSubClick = sub => {
    if (sub.isLogout) {
      onLogout();
    } else {
      setActiveTab(sub.key);
    }
    setOpenDropdown(null);
  };

  return (
    <>
      {/* Выпадающее подменю (анимация, современный стиль) */}
      {openDropdown && (
        <div
          className="fixed bottom-16 left-0 w-full bg-white rounded-t-xl shadow-xl z-20 lg:hidden
                                   transform transition-transform duration-300 ease-out origin-bottom"
        >
          <ul className="flex justify-around py-3">
            {subMenus[openDropdown].map(sub => (
              <li key={sub.key} className="flex-1 text-center">
                <button
                  onClick={() => handleSubClick(sub)}
                  className="w-full py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {sub.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Основное нижнее меню */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-10 lg:hidden">
        <ul className="flex justify-around">
          {mainTabs.map(item => {
            const Icon = item.icon;
            const isActive = item.key === activeTab || openDropdown === item.key;

            return (
              <li key={item.key} className="flex-1">
                <button
                  onClick={() => handleMainClick(item)}
                  className={`w-full flex flex-col items-center py-2 transition-colors duration-200
                                         ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                >
                  <Icon size={24} />
                  <span className="text-xs mt-1 truncate">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
