"use client";

export function formatPrice(value, currency) {
    const symbol = currency === "by" ? "руб" : "₸";
    return `${Math.round(value).toLocaleString("ru-RU")} ${symbol}`;
}

export function getDaysForRentalPeriod(rentalValue) {
    switch (rentalValue) {
        case 1:
            return 7;
        case 2:
            return 14;
        case 3:
            return 90;
        case 4:
            return 60;
        case 5:
            return 30;
        default:
            return 0;
    }
}

export function getPlanPrice(warranty, days, userRole = "courier", currency = "kz") {
    if (!warranty || warranty.value === "standard") return 0;
    if (warranty.value === "premium" && Array.isArray(warranty.pricing)) {
        const roleData = warranty.pricing.find((item) => item.role === userRole);
        if (!roleData) return 0;
        const currencyArr = roleData.price[currency];
        if (!currencyArr) return 0;
        const found = currencyArr.find((elem) => elem.value === days);
        return found ? found.price : 0;
    }
    return 0;
}

export function getExtendedWarrantyPrice(extendedWarranty, days, userRole = "courier", currency = "kz", proWarrantyPricing) {
    if (!extendedWarranty) return 0;
    const roleData = proWarrantyPricing.find((item) => item.role === userRole);
    if (!roleData) return 0;
    const currencyArr = roleData.price[currency];
    if (!currencyArr) return 0;
    const found = currencyArr.find((elem) => elem.value === days);
    return found ? found.price : 0;
}

export function getDepositPrice(days, userRole = "courier", currency = "kz", depositPricing) {
    const roleData = depositPricing.find((item) => item.role === userRole);
    if (!roleData) return 0;
    const currencyArr = roleData.price[currency];
    if (!currencyArr) return 0;
    const found = currencyArr.find((elem) => elem.value === days);
    return found ? found.price : 0;
}

export function getBatteryPrice(selectedBattery, days) {
    if (!selectedBattery) return 0;
    const found = selectedBattery.price.find((elem) => elem.value === days);
    return found ? found.price : 0;
}