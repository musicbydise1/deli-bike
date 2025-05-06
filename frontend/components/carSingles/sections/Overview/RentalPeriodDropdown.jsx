"use client";
import React, {useEffect, useState} from "react";
import { FaChevronDown } from "react-icons/fa";
import { getSuffix } from "@/utils/pricingUtils";
import {useTariff} from "@/context/TariffContext";

export default function RentalPeriodDropdown({ options, selectedOption, onSelect }) {
    const { rentalPeriod, setRentalPeriod } = useTariff();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    return (
        <div className="overview-dropdown-container">
            <div className="overview-dropdown" onClick={toggleDropdown}>
        <span>
          {rentalPeriod?.label || "Выберите срок"}
            {rentalPeriod && getSuffix(rentalPeriod.value)}
        </span>
                <FaChevronDown className="icon" />
            </div>
            {dropdownOpen && (
                <ul className="overview-dropdown-menu">
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            onClick={() => {
                                // Передаём выбранную опцию вместе с позицией (индексом)
                                onSelect({ ...option, index });
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
