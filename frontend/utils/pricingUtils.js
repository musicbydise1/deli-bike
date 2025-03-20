// src/utils/pricingUtils.js

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

export function formatPrice(value, currency) {
    const symbol = currency === "by" ? "руб" : "₸";
    return `${value.toLocaleString("ru-RU")} ${symbol}`;
}

export function getPlanPrice(plan, rentalValue, role = "courier", currency = "kz") {
    if (!plan || plan.value === "standard") return 0;
    if (plan.value === "premium" && Array.isArray(plan.pricing)) {
        const days = getDaysForRentalPeriod(rentalValue);
        const roleData = plan.pricing.find(item => item.role === role);
        if (!roleData) return 0;
        const currencyArr = roleData.price[currency];
        if (!currencyArr) return 0;
        const found = currencyArr.find(elem => elem.value === days);
        return found ? found.price : 0;
    }
    return 0;
}

export function getSuffix(rentalValue) {
    const days = getDaysForRentalPeriod(rentalValue);
    return days >= 30 ? " / мес" : "";
}

export function getExtendedWarrantyPrice(extendedWarrantyChecked, rentalValue, role, currency, proWarrantyPricing) {
    if (!extendedWarrantyChecked) return 0;
    const roleData = proWarrantyPricing.find(item => item.role === role);
    if (!roleData) return 0;
    const currencyArr = roleData.price[currency];
    if (!currencyArr) return 0;
    const days = getDaysForRentalPeriod(rentalValue);
    const found = currencyArr.find(elem => elem.value === days);
    return found ? found.price : 0;
}

export function getDepositPrice(rentalValue, role, currency, depositPricing) {
    const roleData = depositPricing.find(item => item.role === role);
    if (!roleData) return 0;
    const currencyArr = roleData.price[currency];
    if (!currencyArr) return 0;
    const days = getDaysForRentalPeriod(rentalValue);
    const found = currencyArr.find(elem => elem.value === days);
    return found ? found.price : 0;
}

export function getBatteryPrice(selectedBattery, rentalValue) {
    if (!selectedBattery) return 0;
    const days = getDaysForRentalPeriod(rentalValue);
    const found = selectedBattery.price.find(elem => elem.value === days);
    return found ? found.price : 0;
}
