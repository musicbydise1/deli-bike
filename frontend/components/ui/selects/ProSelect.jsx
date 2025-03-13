import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./select.css";

const ProSelect = ({
                       options = [],
                       value,
                       onChange,
                       placeholder = "Выберите...",
                       className = "",
                       maxQuantity = 10, // максимальное количество (по умолчанию 10)
                   }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const [isCorporate, setIsCorporate] = useState(false);
    const [quantities, setQuantities] = useState({});
    const [nestedOpen, setNestedOpen] = useState({}); // состояние для вложенных селектов

    // Получаем роль пользователя из localStorage
    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setIsCorporate(role === "corporate");
    }, []);

    // Если корпоративный пользователь, инициализируем счетчики для каждой опции
    useEffect(() => {
        if (isCorporate && options.length > 0) {
            const initialQuantities = {};
            options.forEach((option) => {
                initialQuantities[option.value] = 1; // значение по умолчанию: 1
            });
            setQuantities(initialQuantities);
        }
    }, [isCorporate, options]);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const toggleNestedDropdown = (optionValue) => {
        setNestedOpen((prev) => ({
            ...prev,
            [optionValue]: !prev[optionValue],
        }));
    };

    const handleQuantityChange = (optionValue, newQuantity) => {
        setQuantities((prev) => ({
            ...prev,
            [optionValue]: newQuantity,
        }));
    };

    const handleOptionClick = (option) => {
        if (onChange) {
            // Если корпоративный пользователь – добавляем выбранное количество к объекту опции
            const optionWithQuantity = isCorporate
                ? { ...option, quantity: quantities[option.value] }
                : option;
            onChange(optionWithQuantity);
        }
        setIsOpen(false);
    };

    // Закрываем список, если клик вне компонента
    const handleClickOutside = (e) => {
        if (selectRef.current && !selectRef.current.contains(e.target)) {
            setIsOpen(false);
            setNestedOpen({});
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // В главном отображении выводим выбранную опцию, а для корпоративного пользователя – и количество
    const selectedLabel = value
        ? isCorporate && value.quantity
            ? `${value.label} (${value.quantity} шт)`
            : value.label
        : placeholder;

    return (
        <div className={`custom-select-container ${className}`} ref={selectRef}>
            <div className="custom-select-display" onClick={toggleDropdown}>
                <span>{selectedLabel}</span>
                <FaChevronDown className="custom-select-icon" />
            </div>
            {isOpen && (
                <ul className="custom-select-options">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={value && value.value === option.value ? "selected" : ""}
                            onClick={() => handleOptionClick(option)}
                        >
                            <span>{option.label}</span>
                            {isCorporate && (
                                <div
                                    className="custom-select-container nested-select"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ width: "20%" }}
                                >
                                    <div
                                        className="custom-select-display"
                                        onClick={() => toggleNestedDropdown(option.value)}
                                    >
                    <span style={{ fontSize: "13px" }}>
                      {quantities[option.value]} шт
                    </span>
                                        <FaChevronDown className="custom-select-icon" />
                                    </div>
                                    {nestedOpen[option.value] && (
                                        <ul className="custom-select-options">
                                            {[...Array(maxQuantity).keys()].map((i) => {
                                                const qty = i + 1;
                                                return (
                                                    <li
                                                        key={qty}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleQuantityChange(option.value, qty);
                                                            setNestedOpen((prev) => ({
                                                                ...prev,
                                                                [option.value]: false,
                                                            }));
                                                        }}
                                                        style={{ fontSize: "13px" }}
                                                    >
                                                        {qty} шт
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProSelect;