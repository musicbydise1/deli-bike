"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { formatPrice, getPlanPrice, getSuffix } from "@/utils/pricingUtils";

export default function WarrantyDropdown({ options, selectedOption, onSelect, rentalValue, role, currency }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    return (
        <div className="overview-dropdown-container">
            <div className="overview-dropdown" onClick={toggleDropdown}>
        <span>
          {selectedOption?.plan || "Стандарт"}
            {selectedOption && selectedOption.value !== "standard" && selectedOption.value !== "none" && (
                <>
                    {" - "}
                    {formatPrice(getPlanPrice(selectedOption, rentalValue, role, currency), currency)}
                    {getSuffix(rentalValue)}
                </>
            )}
        </span>
                <FaChevronDown className="icon" />
            </div>
            {dropdownOpen && (
                <ul className="overview-dropdown-menu">
                    {options.map(option => {
                        const priceValue = getPlanPrice(option, rentalValue, role, currency);
                        return (
                            <li
                                key={option.value}
                                onClick={() => {
                                    onSelect(option);
                                    setDropdownOpen(false);
                                }}
                            >
                                {option.plan}{" "}
                                {option.value !== "standard" && option.value !== "none" && (
                                    <> - {formatPrice(priceValue, currency)}{getSuffix(rentalValue)}</>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}