import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiAlertTriangle, FiInfo } from "react-icons/fi";


const batteryOptions = [
  { label: "21 Ач", price: "10278", value: "21Ah" },
  { label: "30 Ач", price: "10278", value: "30Ah" },
  { label: "45 Ач", price: "15417", value: "45Ah" },
];

export default function Overview({ price, accessories, onRentalPeriodChange, onWarrantyChange, warrantyOptions, onAdditionalChange, onBatteryChange }) {
  // Если price является массивом, используем его, иначе пытаемся получить price.prices
  const pricesArr = Array.isArray(price) ? price : price?.prices || [];

  const accessoriesArr = Array.isArray(accessories) ? accessories : accessories?.accessories || [];

  // Формируем опции для аренды
  const computedRentalPeriodOptions = pricesArr.map((item) => ({
    label: `${item.priceCategory.name} – ${Number(item.price).toLocaleString("ru-RU", {
      maximumFractionDigits: 0,
    })} ₸`,
    value: item.priceCategory.id,
    price: item.price,
    categoryName: item.priceCategory.name, // добавляем поле для названия категории
  }));

  // Инициализируем состояние. Если данных ещё нет, можно задать пустой объект или добавить проверку.
  const [rentalPeriod, setRentalPeriod] = useState(
      computedRentalPeriodOptions[0] || {}
  );
  const [warranty, setWarranty] = useState(warrantyOptions[0]);
  const [dropdownOpen, setDropdownOpen] = useState({ rental: false, warranty: false });
  const [selectedAdditional, setSelectedAdditional] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);

  // Если данные для аренды обновляются, устанавливаем первый элемент как дефолтное значение
  useEffect(() => {
    if (computedRentalPeriodOptions.length > 0 && !rentalPeriod.label) {
      setRentalPeriod(computedRentalPeriodOptions[0]);
    }
  }, [computedRentalPeriodOptions, rentalPeriod]);

  const toggleDropdown = (field) => {
    setDropdownOpen((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const selectOption = (field, option) => {
    if (field === "rental") {
      setRentalPeriod(option);
      if (onRentalPeriodChange) {
        // Передаём выбранный вариант в родительский компонент
        onRentalPeriodChange(option);
      }
    }
    if (field === "warranty") {
      setWarranty(option);
      if (onWarrantyChange) {
        onWarrantyChange(option);
      }
    }
    setDropdownOpen((prev) => ({ ...prev, [field]: false }));
  };

  const toggleAdditionalOption = (option) => {
    let updated;
    if (selectedAdditional.some((item) => item.id === option.id)) {
      updated = selectedAdditional.filter((item) => item.id !== option.id);
    } else {
      updated = [...selectedAdditional, option];
    }
    setSelectedAdditional(updated);
    if (onAdditionalChange) {
      onAdditionalChange(updated);
    }
  };

  const selectBatteryOption = (option) => {
    setSelectedBattery(option);
    if (onBatteryChange) {
      onBatteryChange(option);
    }
  };

  return (
      <div className="rental-container">
        <div className="section">
          <h4 className="section-title">
            Аренда и гарантия. <span>На какой срок?</span>
          </h4>

          <div className="overview-dropdown-container">
            <div className="overview-dropdown" onClick={() => toggleDropdown("rental")}>
              <span>{rentalPeriod.label || "Выберите срок"}</span>
              <FaChevronDown className="icon" />
            </div>
            {dropdownOpen.rental && (
                <ul className="overview-dropdown-menu">
                  {computedRentalPeriodOptions.map((option) => (
                      <li key={option.value} onClick={() => selectOption("rental", option)}>
                        {option.label}
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <div className="overview-dropdown-container">
            <div className="overview-dropdown" onClick={() => toggleDropdown("warranty")}>
              <span>{warranty.label} {warranty.value !== "none" && `- ${Number(warranty.price).toLocaleString("ru-RU")} ₸`}</span>
              <FaChevronDown className="icon" />
            </div>
            {dropdownOpen.warranty && (
                <ul className="overview-dropdown-menu">
                  {warrantyOptions.map((option) => (
                      <li key={option.value} onClick={() => selectOption("warranty", option)}>
                        {option.label} {option.value !== "none" && `- ${Number(option.price).toLocaleString("ru-RU")} ₸`}
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <div className="warning">
            <FiAlertTriangle className="mr-4 align-[-4px]" size={20} />
            <span>Возвращаемый депозит – 30 000 ₸</span>
            <FiInfo size={20} className="mr-2 align-[-4px] float-right mt-1" />
          </div>
        </div>

        <div className="section">
          <h4 className="section-title">
            Дополнительно. <span>Какие опции хотите добавить?</span>
          </h4>
          <div className="options-grid">
            {accessoriesArr.map((option) => (
                <button
                    key={option.id}
                    className={`option-button ${
                        selectedAdditional.some((item) => item.id === option.id) ? "selected" : ""
                    }`}
                    onClick={() => toggleAdditionalOption(option)}
                >
                  <span className="section-btn-label">{option.name}</span>
                  <span>+ {Math.round(Number(option.price)).toLocaleString("ru-RU")} ₸</span>
                </button>
            ))}
          </div>
        </div>

        <div className="section">
          <h4 className="section-title">
            АКБ. <span>Добавим дополнительный аккумулятор?</span>
          </h4>
          <div className="options-grid">
            {batteryOptions.map((option) => (
                <button
                    key={option.value}
                    className={`option-button ${
                        selectedBattery && selectedBattery.value === option.value ? "selected" : ""
                    }`}
                    onClick={() => selectBatteryOption(option)}  // передаём весь объект, а не option.value
                >
                  <span>{option.label}</span>
                  <span>+ {Number(option.price).toLocaleString("ru-RU")} ₸</span>
                </button>
            ))}
          </div>
        </div>
      </div>
  );
}