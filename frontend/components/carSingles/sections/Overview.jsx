import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const rentalPeriodOptions = [
  { label: "1 неделя – 31 662 ₸", value: "1_week" },
  { label: "2 недели – 63 324 ₸", value: "2_weeks" },
  { label: "1 месяц – 126 648 ₸", value: "1_month" },
  { label: "3 месяца – 379 944 ₸", value: "3_months" },
];

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

export default function Overview() {
  const [rentalPeriod, setRentalPeriod] = useState(rentalPeriodOptions[0]);
  const [warranty, setWarranty] = useState(warrantyOptions[0]);
  const [dropdownOpen, setDropdownOpen] = useState({ rental: false, warranty: false });
  const [selectedAdditional, setSelectedAdditional] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState(null);

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
        prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
    );
  };

  const selectBatteryOption = (value) => {
    setSelectedBattery(value);
  };

  return (
      <div className="rental-container">
        <div className="section">
          <h4 className="section-title">Аренда и гарантия. На какой срок?</h4>

          <div className="dropdown-container">
            <div className="dropdown" onClick={() => toggleDropdown("rental")}>
              <span>{rentalPeriod.label}</span>
              <FaChevronDown className="icon" />
            </div>
            {dropdownOpen.rental && (
                <ul className="dropdown-menu">
                  {rentalPeriodOptions.map((option) => (
                      <li key={option.value} onClick={() => selectOption("rental", option)}>
                        {option.label}
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <div className="dropdown-container">
            <div className="dropdown" onClick={() => toggleDropdown("warranty")}>
              <span>{warranty.label}</span>
              <FaChevronDown className="icon" />
            </div>
            {dropdownOpen.warranty && (
                <ul className="dropdown-menu">
                  {warrantyOptions.map((option) => (
                      <li key={option.value} onClick={() => selectOption("warranty", option)}>
                        {option.label}
                      </li>
                  ))}
                </ul>
            )}
          </div>

          <div className="warning">Возвращаемый депозит – 30 000 ₸</div>
        </div>

        <div className="section">
          <h4 className="section-title">Дополнительно. Какие опции хотите добавить?</h4>
          <div className="options-grid">
            {additionalOptions.map((option) => (
                <button
                    key={option.value}
                    className={`option-button ${
                        selectedAdditional.includes(option.value) ? "selected" : ""
                    }`}
                    onClick={() => toggleAdditionalOption(option.value)}
                >
                  <span>{option.label}</span>
                  <span>{option.price}</span>
                </button>
            ))}
          </div>
        </div>

        <div className="section">
          <h4 className="section-title">АКБ. Добавим дополнительный аккумулятор?</h4>
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

        <style jsx>{`
        .rental-container {
          font-family: Arial, sans-serif;
          padding: 20px;
        }

        .section {
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .dropdown-container {
          position: relative;
          margin-bottom: 15px;
        }

        .dropdown {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #fff;
          cursor: pointer;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 8px;
          z-index: 10;
          list-style: none;
          padding: 0;
          margin: 5px 0 0;
        }

        .dropdown-menu li {
          padding: 10px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .dropdown-menu li:hover {
          background-color: #f0f0f0;
        }

        .icon {
          font-size: 14px;
          color: #999;
        }

        .warning {
          margin-top: 10px;
          padding: 10px;
          background-color: #ffe5e5;
          color: #d9534f;
          font-weight: bold;
          border-radius: 8px;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 10px;
        }

        .option-button {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.3s, border-color 0.3s;
        }

        .option-button:hover {
          background: #f0f0f0;
        }

        .option-button.selected {
          background: #ffe5e5;
          border-color: #d9534f;
        }
      `}</style>
      </div>
  );
}
