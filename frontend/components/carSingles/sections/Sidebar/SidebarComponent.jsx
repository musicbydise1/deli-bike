// src/components/Sidebar/SidebarComponent.jsx
"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import { useUser } from "@/context/UserContext";
import { useTariff } from "@/context/TariffContext";
import { useCart } from "@/context/CartContext";
import SidebarSummary from "./SidebarSummary";
import QuantityControl from "./QuantityControl";
import ProductSpecs from "./ProductSpecs";
import {
    getDaysForRentalPeriod,
    getPlanPrice,
    getExtendedWarrantyPrice,
    getDepositPrice,
    getBatteryPrice,
    formatPrice,
} from "@/utils/sidePricingUtils";
import { proWarrantyPricing, depositPricing } from "@/data/pricing";

const SidebarComponent = ({ product }) => {
    const { userRole, location } = useUser();
    const { addProductToCart } = useCart();
    const {
        rentalPeriod,
        selectedWarranty,
        selectedAdditional,
        selectedBattery,
        extendedWarrantyStates,
    } = useTariff();

    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    // Определяем срок аренды в днях
    const rentalValue = rentalPeriod ? rentalPeriod.value : 0;
    const days = getDaysForRentalPeriod(rentalValue);

    // 1) Цена тарифа (Стандарт/Премиум)
    const warrantyPrice = getPlanPrice(selectedWarranty, days, userRole, location);

    // 2) Цена аренды
    const rentalPrice = rentalPeriod ? Number(rentalPeriod.price) : 0;

    // 3) Дополнительные опции
    const additionalPrice = selectedAdditional.reduce(
        (sum, item) => sum + Number(item.price),
        0
    );

    // 4) Цена аккумулятора (с учётом дней)
    const batteryCost = getBatteryPrice(selectedBattery, days);

    // 5) Депозит (динамический)
    const deposit = getDepositPrice(days, userRole, location, depositPricing);

    // 6) Расширенная гарантия
    // Здесь важно: если extendedWarrantyStates – массив, обновляем для выбранного тарифа
    const extendedWarranty =
        Array.isArray(extendedWarrantyStates) && extendedWarrantyStates.length
            ? extendedWarrantyStates[0] // или используйте индекс выбранного тарифа
            : extendedWarrantyStates;
    const extendedWarrantyPrice = getExtendedWarrantyPrice(
        extendedWarranty,
        days,
        userRole,
        location,
        proWarrantyPricing
    );

    // Итоговая сумма
    const totalAmount =
        rentalPrice +
        warrantyPrice +
        deposit +
        additionalPrice +
        batteryCost +
        extendedWarrantyPrice;

    const handleAddToCart = () => {
        if (product && product.id) {
            addProductToCart(product.id, quantity, totalAmount);
            setIsAdded(true);
        }
        console.log(product.id);
    };

    return (
        <div className="sidebar-container">
            <SidebarSummary
                rentalPeriod={rentalPeriod}
                rentalPrice={rentalPrice}
                selectedAdditional={selectedAdditional}
                selectedWarranty={selectedWarranty}
                warrantyPrice={warrantyPrice}
                extendedWarranty={extendedWarranty}
                extendedWarrantyPrice={extendedWarrantyPrice}
                deposit={deposit}
                selectedBattery={selectedBattery}
                batteryCost={batteryCost}
                totalAmount={totalAmount}
                userRole={userRole}
                location={location}
            />

            {userRole === "corporate" && (
                <QuantityControl quantity={quantity} setQuantity={setQuantity} />
            )}

            <Button variant="primary" className="w-full !ml-0" onClick={handleAddToCart}>
                {isAdded ? "Уже добавлено" : "Добавить в корзину"}
            </Button>

            <ProductSpecs product={product} />
        </div>
    );
};

export default SidebarComponent;