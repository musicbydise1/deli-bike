'use client';
import React, { useState, useEffect, useContext } from 'react';
import { pricingPlans } from '@/data/pricing';

const dataContext = React.createContext();
export const useContextElement = () => useContext(dataContext);

export default function Context({ children }) {
  // ------------------------------
  // Состояния для корзины
  // ------------------------------
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([1, 2, 3]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Состояние для продуктов, загруженных с API
  const [products, setProducts] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ------------------------------
  // Состояния для тарифов (старые)
  // ------------------------------
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(pricingPlans.map(() => null));
  // === УДАЛЯЕМ массив warrantyChecked ===
  // const [warrantyChecked, setWarrantyChecked] = useState(
  //   pricingPlans.map(() => false)
  // );

  // ------------------------------
  // Новые глобальные состояния
  // ------------------------------
  // rentalPeriod: аналог selectedRentalOption (содержит { price, categoryName, ... })
  const [rentalPeriod, setRentalPeriod] = useState(null);

  // Тариф (Стандарт/Премиум)
  const [selectedWarranty, setSelectedWarranty] = useState(null);

  // Массив выбранных дополнительных опций
  const [selectedAdditional, setSelectedAdditional] = useState([]);

  // Выбранный аккумулятор
  const [selectedBattery, setSelectedBattery] = useState(null);

  // === Чекбокс «Расширенная гарантия» (единый) ===
  const [extendedWarrantyStates, setExtendedWarrantyStates] = useState(
    pricingPlans.map(() => false),
  );

  // ------------------------------
  // Состояние для роли пользователя (userRole)
  // ------------------------------
  const [userRole, setUserRole] = useState(null);

  // ------------------------------
  // Состояние для локации (KZ / BY и т.д.)
  // ------------------------------
  const [location, setLocation] = useState('kz');

  // ------------------------------
  // Загрузка продуктов (велосипедов) с API
  // ------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/bikes/`);
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data : [];
        setProducts(data);

        if (data.length > 0) {
          setQuickViewItem(data[0]);
        }
      } catch (error) {
        console.error('Error fetching bikes:', error);
      }
    };
    fetchProducts();
  }, [API_URL]);

  // Пересчёт итоговой суммы корзины
  useEffect(() => {
    const subtotal = cartProducts.reduce(
      (accumulator, product) => accumulator + product.quantity * product.price,
      0,
    );
    setTotalPrice(subtotal);
  }, [cartProducts]);

  // ------------------------------
  // Методы для корзины
  // ------------------------------
  const addProductToCart = (id, qty, price) => {
    if (!cartProducts.some(elm => elm.id == id)) {
      const item = {
        ...products.find(elm => elm.id == id),
        quantity: qty || 1,
        price: price || 0,
      };
      setCartProducts(prev => [...prev, item]);
    }
  };

  const isAddedToCartProducts = id => cartProducts.some(elm => elm.id == id);

  // ------------------------------
  // Методы для wishlist
  // ------------------------------
  const addToWishlist = id => {
    if (!wishList.includes(id)) {
      setWishList(prev => [...prev, id]);
    }
  };

  const removeFromWishlist = id => {
    if (wishList.includes(id)) {
      setWishList(prev => prev.filter(elm => elm !== id));
    }
  };

  const isAddedtoWishlist = id => wishList.includes(id);

  // ------------------------------
  // Локальное хранение корзины
  // ------------------------------
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartList'));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartProducts));
  }, [cartProducts]);

  // ------------------------------
  // Локальное хранение wishlist
  // ------------------------------
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('wishlist'));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishList));
  }, [wishList]);

  // ------------------------------
  // Загрузка userRole из localStorage
  // ------------------------------
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  // ------------------------------
  // Формируем объект контекста
  // ------------------------------
  const contextElement = {
    // Данные и методы для корзины
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    products,

    // Состояния тарифов (старые)
    selectedPlanIndex,
    setSelectedPlanIndex,
    selectedOptions,
    setSelectedOptions,
    // warrantyChecked, setWarrantyChecked, // Удалено!

    // Новые глобальные состояния выбора аренды/гарантии/опций
    rentalPeriod,
    setRentalPeriod,
    selectedWarranty,
    setSelectedWarranty,
    selectedAdditional,
    setSelectedAdditional,
    selectedBattery,
    setSelectedBattery,

    // Используем один стейт для «Расширенной гарантии»
    extendedWarrantyStates,
    setExtendedWarrantyStates,

    // userRole / location
    userRole,
    setUserRole,
    location,
    setLocation,
  };

  return <dataContext.Provider value={contextElement}>{children}</dataContext.Provider>;
}
