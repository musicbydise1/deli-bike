'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/button/Button';
import { useUser } from '@/context/UserContext';
import { useTariff } from '@/context/TariffContext';
import { useCart } from '@/context/CartContext';
import SidebarSummary from './SidebarSummary';
import QuantityControl from './QuantityControl';
import ProductSpecs from './ProductSpecs';
import {
  getDaysForRentalPeriod,
  getPlanPrice,
  getExtendedWarrantyPrice,
  getDepositPrice,
  getBatteryPrice,
  formatPrice,
} from '@/utils/sidePricingUtils';
import { proWarrantyPricing, depositPricing } from '@/data/pricing';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const SidebarComponent = ({ product }) => {
  // Читаем location из контекста, а роль пользователя - по cookies
  const { location } = useUser();
  const [roleCookie, setRoleCookie] = useState('courier');

  // === 1. Состояния для проверки авторизации ===
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [userData, setUserData] = useState(null);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    // Проверяем куки для роли
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const roleCookieFound = cookies.find(cookie => cookie.startsWith('userRole='));
    if (roleCookieFound) {
      const role = roleCookieFound.split('=')[1];
      setRoleCookie(role);
    }

    // Проверяем localStorage на наличие токена и userData
    const token = localStorage.getItem('accessToken');
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setHasAccessToken(!!token);
  }, []);

  const { addProductToCart } = useCart();
  const {
    rentalPeriod,
    selectedWarranty,
    selectedAdditional,
    selectedBattery,
    extendedWarrantyStates,
  } = useTariff();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Определяем срок аренды в днях
  const rentalValue = rentalPeriod ? rentalPeriod.value : 0;
  const days = getDaysForRentalPeriod(rentalValue);

  // 1) Цена тарифа (Стандарт/Премиум)
  const warrantyPrice = getPlanPrice(selectedWarranty, days, roleCookie, location);

  // 2) Цена аренды
  const rentalPrice = rentalPeriod ? Number(rentalPeriod.price) : 0;

  // 3) Дополнительные опции
  const additionalPrice = selectedAdditional.reduce((sum, item) => sum + Number(item.price), 0);

  // 4) Цена аккумулятора (с учётом дней)
  const batteryCost = getBatteryPrice(selectedBattery, days);

  // 5) Депозит (динамический)
  const deposit = getDepositPrice(days, roleCookie, location, depositPricing);

  // 6) Расширенная гарантия
  const extendedWarranty =
    Array.isArray(extendedWarrantyStates) && extendedWarrantyStates.length
      ? extendedWarrantyStates[0]
      : extendedWarrantyStates;
  const extendedWarrantyPrice = getExtendedWarrantyPrice(
    extendedWarranty,
    days,
    roleCookie,
    location,
    proWarrantyPricing,
  );

  // Итоговая сумма
  const totalAmount =
    rentalPrice + warrantyPrice + deposit + additionalPrice + batteryCost + extendedWarrantyPrice;

  const handleAddToCart = () => {
    if (product && product.id) {
      addProductToCart(product.id, quantity, totalAmount);
      setIsAdded(true);
    }
    console.log(product.id);
  };

  return (
    <div className="sidebar-container">
      <SidebarSummary
        rentalPeriod={rentalPeriod}
        rentalPrice={rentalPrice}
        selectedAdditional={selectedAdditional}
        selectedWarranty={selectedWarranty}
        warrantyPrice={warrantyPrice}
        extendedWarranty={extendedWarranty}
        extendedWarrantyPrice={extendedWarrantyPrice}
        deposit={deposit}
        selectedBattery={selectedBattery}
        batteryCost={batteryCost}
        totalAmount={totalAmount}
        userRole={roleCookie}
        location={location}
      />

      {roleCookie === 'corporate' && (
        <QuantityControl quantity={quantity} setQuantity={setQuantity} />
      )}

      {/* Если пользователь не авторизован, кнопка "Зарегистрироваться", иначе "Добавить в корзину" */}
      {!hasAccessToken ? (
        <div>
          <Link href={roleCookie === 'courier' ? '/login' : '/other-login'}>
            <Button variant="primary" className="w-full !ml-0">
              Войти
            </Button>
          </Link>
          <span className="text-[14px] mt-2 text-red-500">
            Чтобы произвести аренду вам необходимо войти в систему
          </span>
        </div>
      ) : (
        <Button variant="primary" className="w-full !ml-0" onClick={handleAddToCart}>
          {isAdded ? 'Уже добавлено' : 'Добавить в корзину'}
        </Button>
      )}

      <ProductSpecs product={product} />
    </div>
  );
};

export default SidebarComponent;
