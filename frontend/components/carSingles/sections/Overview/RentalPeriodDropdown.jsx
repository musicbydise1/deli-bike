"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { getSuffix } from "@/utils/pricingUtils";

export default function RentalPeriodDropdown({ options, selectedOption, onSelect }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    return (
        <div className="overview-dropdown-container">
            <div className="overview-dropdown" onClick={toggleDropdown}>
        <span>
          {selectedOption?.label || "Выберите срок"}
            {selectedOption && getSuffix(selectedOption.value)}
        </span>
                <FaChevronDown className="icon" />
            </div>
            {dropdownOpen && (
                <ul className="overview-dropdown-menu">
                    {options.map(option => (
                        <li
                            key={option.value}
                            onClick={() => {
                                onSelect(option);
                                setDropdownOpen(false);
                            }}
                        >
                            {option.label}
                            {getSuffix(option.value)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}