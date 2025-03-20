"use client";
import React, { useState, useEffect } from "react";
import RentalPeriodDropdown from "./RentalPeriodDropdown";
import WarrantyDropdown from "./WarrantyDropdown";
import ExtendedWarrantyToggle from "./ExtendedWarrantyToggle";
import DepositInfo from "./DepositInfo";
import AdditionalOptionsSelector from "./AdditionalOptionsSelector";
import BatterySelector from "./BatterySelector";
import { useUser } from "@/context/UserContext";
import { useTariff } from "@/context/TariffContext";
import { getDaysForRentalPeriod, getDepositPrice } from "@/utils/pricingUtils";
import { depositPricing } from "@/data/pricing";

export default function Overview({ price, accessories, warrantyOptions }) {
  const { userRole, location } = useUser();
  const {
    rentalPeriod,
    setRentalPeriod,
    selectedWarranty,
    setSelectedWarranty,
    selectedAdditional,
    setSelectedAdditional,
    selectedBattery,
    setSelectedBattery,
    selectedPlanIndex,
    extendedWarrantyStates,
    setExtendedWarrantyStates,
  } = useTariff();

  const role = userRole || "courier";
  const currency = location || "kz";

  // Вычисляем варианты аренды
  const pricesArr = Array.isArray(price) ? price : price?.prices || [];
  const computedRentalPeriodOptions = pricesArr.map(item => ({
    label: `${item.priceCategory.name} – ${item.price.toLocaleString("ru-RU")} ${currency === "by" ? "руб" : "₸"}`,
    value: item.priceCategory.id,
    price: item.price,
    categoryName: item.priceCategory.name,
  }));

  const accessoriesArr = Array.isArray(accessories) ? accessories : accessories?.accessories || [];

  // Загрузка списка аккумуляторов
  const [batteryList, setBatteryList] = useState([]);
  useEffect(() => {
    import("@/data/pricing").then(module => {
      const batteryData = module.batteryPricing.find(item => item.role === role);
      const currencyArr = batteryData ? batteryData.price[currency] || [] : [];
      setBatteryList(currencyArr);
    }).catch(() => setBatteryList([]));
  }, [role, currency]);

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
    if (selectedAdditional.some(item => item.id === option.id)) {
      updated = selectedAdditional.filter(item => item.id !== option.id);
    } else {
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

  return (
      <div className="rental-container">
        <div className="section">
          <h4 className="section-title">
            Аренда и гарантия. <span>На какой срок?</span>
          </h4>
          <RentalPeriodDropdown
              options={computedRentalPeriodOptions}
              selectedOption={rentalPeriod}
              onSelect={setRentalPeriod}
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
              // Если выбран тариф, используем его значение; иначе false
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
            accessories={accessoriesArr}
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