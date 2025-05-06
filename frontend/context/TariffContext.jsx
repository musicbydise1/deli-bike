"use client";
import React, { createContext, useState, useContext } from "react";
import { pricingPlans } from "@/data/pricing";

export const TariffContext = createContext(null);

export function useTariff() {
    return useContext(TariffContext);
}

export function TariffProvider({ children }) {
    // Старые состояния
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState(
        pricingPlans.map(() => null)
    );

    // Новые глобальные состояния
    const [rentalPeriod, setRentalPeriod] = useState(null);
    const [selectedWarranty, setSelectedWarranty] = useState(pricingPlans[0]);
    const [selectedAdditional, setSelectedAdditional] = useState([]);
    const [selectedBattery, setSelectedBattery] = useState(null);

    // Инициализируем extendedWarrantyStates как объект с ключами по plan.value
    const initialExtendedWarrantyStates = pricingPlans.reduce((acc, plan) => {
        acc[plan.value] = false;
        return acc;
    }, {});

    const [extendedWarrantyStates, setExtendedWarrantyStates] = useState(
        initialExtendedWarrantyStates
    );

    const value = {
        selectedPlanIndex,
        setSelectedPlanIndex,
        selectedOptions,
        setSelectedOptions,
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
    };

    return <TariffContext.Provider value={value}>{children}</TariffContext.Provider>;
}