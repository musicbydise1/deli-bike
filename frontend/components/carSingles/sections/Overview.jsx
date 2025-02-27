import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiAlertTriangle, FiInfo } from "react-icons/fi";

const warrantyOptions = [
  { label: "Стандартная гарантия – 0 ₸", value: "standard" },
  { label: "Расширенная гарантия – 10 000 ₸", value: "extended" },
  { label: "Без гарантии", value: "none" },
];

const additionalOptions = [
  { label: "Шлем", price: "+ 341 ₸", value: "helmet" },
  { label: "Велозамок", price: "+ 341 ₸", value: "lock" },
  { label: "Дождевик", price: "+ 304 ₸", value: "raincoat" },
  { label: "Термоконтейнер", price: "+ 9 742 ₸", value: "container" },
  { label: "Смартфон", price: "+ 1 705 ₸", value: "smartphone" },
  { label: "Лазерный свет", price: "+ 487 ₸", value: "laser_light" },
  { label: "Доп. З/У", price: "+ 487 ₸", value: "charger" },
];

const batteryOptions = [
  { label: "21 Ач", price: "+ 10 278 ₸", value: "21Ah" },
  { label: "30 Ач", price: "+ 10 278 ₸", value: "30Ah" },
  { label: "45 Ач", price: "+ 15 417 ₸", value: "45Ah" },
];

export default function Overview({ price }) {
  // Если price является массивом, используем его, иначе пытаемся получить price.prices
  const pricesArr = Array.isArray(price) ? price : price?.prices || [];

  // Формируем опции для аренды
  const computedRentalPeriodOptions = pricesArr.map((item) => ({
    label: `${item.priceCategory.name} – ${Number(item.price).toLocaleString("ru-RU", {
      maximumFractionDigits: 0,
    })} ₸`,
    value: item.priceCategory.id, // или можно использовать item.id, если нужно
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
    if (field === "rental") setRentalPeriod(option);
    if (field === "warranty") setWarranty(option);
    setDropdownOpen((prev) => ({ ...prev, [field]: false }));
  };

  const toggleAdditionalOption = (value) => {
    setSelectedAdditional((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const selectBatteryOption = (value) => {
    setSelectedBattery(value);
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
              <span>{warranty.label}</span>
              <FaChevronDown className="icon" />
            </div>
            {dropdownOpen.warranty && (
                <ul className="overview-dropdown-menu">
                  {warrantyOptions.map((option) => (
                      <li key={option.value} onClick={() => selectOption("warranty", option)}>
                        {option.label}
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
            {additionalOptions.map((option) => (
                <button
                    key={option.value}
                    className={`option-button ${
                        selectedAdditional.includes(option.value) ? "selected" : ""
                    }`}
                    onClick={() => toggleAdditionalOption(option.value)}
                >
                  <span className="section-btn-label">{option.label}</span>
                  <span>{option.price}</span>
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
                        selectedBattery === option.value ? "selected" : ""
                    }`}
                    onClick={() => selectBatteryOption(option.value)}
                >
                  <span>{option.label}</span>
                  <span>{option.price}</span>
                </button>
            ))}
          </div>
        </div>
      </div>
  );
}