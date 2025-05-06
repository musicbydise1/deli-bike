"use client";
import React, { useState, useEffect } from "react";
import RentalPeriodDropdown from "./RentalPeriodDropdown";
import WarrantyDropdown from "./WarrantyDropdown";
import ExtendedWarrantyToggle from "./ExtendedWarrantyToggle";
import DepositInfo from "./DepositInfo";
import AdditionalOptionsSelector from "./AdditionalOptionsSelector";
import BatterySelector from "./BatterySelector";
import { useTariff } from "@/context/TariffContext";
import { getDaysForRentalPeriod, getDepositPrice } from "@/utils/pricingUtils";
import { depositPricing } from "@/data/pricing";
import {useUser} from "@/context/UserContext";
import {formatPrice} from "@/utils/sidePricingUtils";

export default function Overview({ price, accessories, warrantyOptions }) {
  // Читаем роль из cookies
  const [roleCookie, setRoleCookie] = useState("courier");
  // Читаем location из cookies (по умолчанию "kz")
  const { location, language } = useUser()
  const [locationCookie, setLocationCookie] = useState();

  useEffect(() => {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const roleCookieFound = cookies.find(cookie => cookie.startsWith("userRole="));
    if (roleCookieFound) {
      const role = roleCookieFound.split("=")[1];
      setRoleCookie(role);
    }
  }, []);

  useEffect(() => {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const locCookie = cookies.find(cookie => cookie.startsWith("location="));
    if (locCookie) {
      const loc = locCookie.split("=")[1];
      setLocationCookie(loc);
    }
  }, [])

  useEffect(() => {
    // console.log("Updated currency:", location);
  }, [location]);

  useEffect(() => {
    // console.log("Updated language:", language);
  }, [language]);



  const role = roleCookie;
  const currency = location || "kz";


  // Вычисляем варианты аренды
  const pricesArr = Array.isArray(price) ? price : price?.prices || [];

  let myRoleId = 0;
  let myCurrencyId = 0;
  if (roleCookie === "courier") {
    myRoleId = 1;
  } else { myRoleId = 2; }

  if (currency === "kz") {
    myCurrencyId = 1;
  } else { myCurrencyId = 2; }

  const computedRentalPeriodOptions = pricesArr
      // Фильтруем записи по совпадению role.id с roleCookie
      .filter(item => {
        return item.role && item.currency && String(item.role.id) === String(myRoleId) && String(item.currency.id) === String(myCurrencyId);
      })
      .map(item => {
        const priceCategory = item.priceCategory;
        // Значение по умолчанию – оригинальное название
        let translatedName = priceCategory.name;

        // Если есть переводы, ищем перевод с нужным языком и полем "name"
        if (priceCategory.translations && Array.isArray(priceCategory.translations)) {
          const translationObj = priceCategory.translations.find(
              t => t.language === language && t.field === "name"
          );
          if (translationObj) {
            translatedName = translationObj.translation;
          }
        }

        return {
          label: `${translatedName} – ${Math.round(item.price).toLocaleString("ru-RU")} ${
              currency === "by" ? "руб" : "₸"
          }`,
          value: priceCategory.rental_duration,
          price: item.price,
          categoryName: translatedName,
        };
      });

  // console.log(computedRentalPeriodOptions);

  const accessoriesArr = Array.isArray(accessories)
      ? accessories
      : accessories?.accessories || [];


  const computedAccessoriesPeriodOptions = accessoriesArr
      .map(item => {
        // Фильтруем цены аксессуара по нужным критериям
        const validPrices = item.prices.filter(price => {
          // Если у цены нет role или currency – считаем её валидной
          if (!price.role || !price.currency) return true;
          return String(price.role.id) === String(myRoleId) &&
              String(price.currency.id) === String(myCurrencyId);
        });

        // Если ни одна цена не соответствует (если это необходимо), исключаем аксессуар
        if (validPrices.length === 0) return null;

        // Например, выбираем первую подходящую цену
        const chosenPrice = validPrices[0];

        // Определяем название аксессуара – если есть переводы, берем перевод с нужным языком и полем "name"
        let translatedName = item.name;
        if (item.translations && Array.isArray(item.translations)) {
          const translationObj = item.translations.find(
              t => t.language === language && t.field === "name"
          );
          if (translationObj) {
            translatedName = translationObj.translation;
          }
        }

        return {
          label: `${translatedName}`,
          value: item.id,
          price: chosenPrice.price,
          accessoryName: translatedName,
        };
      })
      .filter(item => item !== null);

  // console.log("Accessories: ", computedAccessoriesPeriodOptions);
  // console.log("accessories: ", accessoriesArr);

  // Загрузка списка аккумуляторов
  const [batteryList, setBatteryList] = useState([]);
  useEffect(() => {
    import("@/data/pricing")
        .then(module => {
          const batteryData = module.batteryPricing.find(item => item.role === role);
          const currencyArr = batteryData ? batteryData.price[currency] || [] : [];
          setBatteryList(currencyArr);
        })
        .catch(() => setBatteryList([]));
  }, [role, currency]);

  // Извлекаем данные из контекста тарифа
  const {
    rentalPeriod,
    setRentalPeriod,
    selectedWarranty,
    setSelectedWarranty,
    selectedAdditional,
    setSelectedAdditional,
    selectedBattery,
    setSelectedBattery,
    extendedWarrantyStates,
    setExtendedWarrantyStates,
  } = useTariff();

  const [selectedRentalIndex, setSelectedRentalIndex] = useState(0);

  // Если срок аренды не выбран, устанавливаем первый вариант
  useEffect(() => {
    if (computedRentalPeriodOptions.length > 0 && !rentalPeriod) {
      setRentalPeriod(computedRentalPeriodOptions[0]);
    }
  }, [computedRentalPeriodOptions, rentalPeriod, setRentalPeriod]);

  const rentalValue = rentalPeriod ? rentalPeriod.value : 0;
  const days = getDaysForRentalPeriod(rentalValue);
  const deposit = getDepositPrice(rentalValue, role, currency, depositPricing);

  const toggleAdditionalOption = (option) => {
    let updated;
    // Сравниваем по .value
    if (selectedAdditional.some(item => item.value === option.value)) {
      // Если уже есть — убираем
      updated = selectedAdditional.filter(item => item.value !== option.value);
    } else {
      // Если нет — добавляем
      updated = [...selectedAdditional, option];
    }
    setSelectedAdditional(updated);
  };

  const handleSelectBattery = (batteryItem) => {
    if (selectedBattery && selectedBattery.value === batteryItem.value) {
      setSelectedBattery(null);
    } else {
      setSelectedBattery(batteryItem);
    }
  };

  const format = (val) => formatPrice(val, currency);

  return (
      <div className="rental-container">
        <div className="section">
          <h4 className="section-title">
            Аренда и гарантия. <span>На какой срок?</span>
          </h4>
          <RentalPeriodDropdown
              options={computedRentalPeriodOptions}
              selectedOption={computedRentalPeriodOptions[selectedRentalIndex]}
              // onSelect теперь обновляет индекс
              onSelect={(option) => setRentalPeriod(option)}
          />

          <WarrantyDropdown
              options={warrantyOptions}
              selectedOption={selectedWarranty}
              onSelect={setSelectedWarranty}
              rentalValue={rentalValue}
              role={role}
              currency={currency}
          />

          <ExtendedWarrantyToggle
              extendedWarranty={selectedWarranty ? extendedWarrantyStates[selectedWarranty.value] : false}
              onToggle={(checked) =>
                  setExtendedWarrantyStates((prev) => ({
                    ...prev,
                    [selectedWarranty?.value]: checked,
                  }))
              }
              rentalValue={rentalValue}
              role={role}
              currency={currency}
          />

          <DepositInfo deposit={deposit} currency={currency} />
        </div>

        <AdditionalOptionsSelector
            accessories={computedAccessoriesPeriodOptions}
            selectedAdditional={selectedAdditional}
            onToggleOption={toggleAdditionalOption}
            currency={currency}
        />

        <BatterySelector
            batteryList={batteryList}
            selectedBattery={selectedBattery}
            onSelectBattery={handleSelectBattery}
            rentalValue={rentalValue}
            currency={currency}
        />
      </div>
  );
}