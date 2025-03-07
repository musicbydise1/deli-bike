"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import { useContextElement } from "@/context/Context";

const SidebarComponent = ({ product, selectedRentalOption, selectedWarranty, selectedAdditional, selectedBattery }) => {
    const { addProductToCart } = useContextElement();
    const [userRole, setUserRole] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

    const totalAmount = selectedRentalOption
        ? Number(selectedRentalOption.price) +
        Number(selectedWarranty.price) +
        30000 + // депозит
        selectedAdditional.reduce((sum, item) => sum + Number(item.price), 0) +
        Number(selectedBattery ? selectedBattery.price : 0)
        : 0;

    const handleAddToCart = () => {
        if (product && product.id) {
            addProductToCart(product.id, quantity, totalAmount);
            setIsAdded(true);
        }
    };

    return (
        <div className="sidebar-container">
            <div className="summary">
                <h2 className="summary-title">Итого</h2>
                <ul className="summary-list">
                    <li className="summary-item">
                        <span>Срок аренды</span>
                        <span>{selectedRentalOption?.categoryName || "1 неделя"}</span>
                    </li>
                    <li className="summary-item">
                        <span>Электровелосипед</span>
                        <span>
                            {selectedRentalOption
                                ? `${Math.round(selectedRentalOption.price).toLocaleString("ru-RU")} ₸`
                                : "0 ₸"}
                        </span>
                    </li>
                    {selectedAdditional && selectedAdditional.length > 0 &&
                        selectedAdditional.map((opt) => (
                            <li className="summary-item" key={opt.id}>
                                <span>{opt.name}</span>
                                <span>{Math.round(opt.price).toLocaleString("ru-RU")} ₸</span>
                            </li>
                        ))
                    }
                    {selectedWarranty?.value !== "none" && (
                        <li className="summary-item">
                            <span>{selectedWarranty?.label || "Стандартная гарантия"}</span>
                            <span>
                                {selectedWarranty?.price === "0"
                                    ? "Бесплатно"
                                    : `${Number(selectedWarranty.price).toLocaleString("ru-RU")} ₸`}
                            </span>
                        </li>
                    )}
                    <li className="summary-item">
                        <span>Возвращаемый депозит</span>
                        <span>30 000 ₸</span>
                    </li>
                    {selectedBattery && (
                        <li className="summary-item">
                            <span>Аккумулятор {selectedBattery.label}:</span>
                            <span>{Number(selectedBattery.price).toLocaleString("ru-RU")} ₸</span>
                        </li>
                    )}
                    <li className="summary-item">
                        <span>Передние / задние фонари и поворотники</span>
                        <span>Бесплатно</span>
                    </li>
                    <li className="summary-item">
                        <span>Держатель для телефона</span>
                        <span>Бесплатно</span>
                    </li>
                </ul>
                <div className="total">
                    <span>Итого к оплате:</span>
                    <span className="total-amount">
                      {selectedRentalOption
                          ? `${totalAmount.toLocaleString("ru-RU")} ₸`
                          : "0 ₸"}
                    </span>
                </div>
                {userRole === "corporate" && (
                    <div className="quantity-control-container">
                        <div className="quantity-control-text">
                            <p>Количество:</p>
                        </div>
                        <div className="quantity-control">
                            <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                            <span className="quantity-value">{quantity}</span>
                            <button className="quantity-btn" onClick={incrementQuantity}>+</button>
                        </div>
                    </div>
                )}
                <Button
                    variant="primary"
                    className="w-full !ml-0"
                    onClick={handleAddToCart}
                >
                    {isAdded ? "Уже добавлено" : "Добавить в корзину"}
                </Button>
            </div>

            <div className="specifications">
                <h2 className="specifications-title">Характеристики</h2>
                <ul className="specifications-list">
                    <li className="specifications-item">
                        <span>Макс. скорость</span>
                        <span>{Math.round(product.maxSpeed)} км/ч</span>
                    </li>
                    <li className="specifications-item">
                        <span>Пробег на 1 заряде:</span>
                        <span>{Math.round(product.rangePerCharge)} км</span>
                    </li>
                    <li className="specifications-item">
                        <span>Время зарядки</span>
                        <span>{product.chargeTime} ч</span>
                    </li>
                    <li className="specifications-item">
                        <span>Макс. нагрузка</span>
                        <span>{Math.round(product.maxLoad)} кг</span>
                    </li>
                    <li className="specifications-item">
                        <span>Вес</span>
                        <span>{Math.round(product.weight)} кг</span>
                    </li>
                    <li className="specifications-item">
                        <span>Мощность</span>
                        <span>{product.power} Вт</span>
                    </li>
                    <li className="specifications-item">
                        <span>Привод</span>
                        <span>{product.suspension}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarComponent;