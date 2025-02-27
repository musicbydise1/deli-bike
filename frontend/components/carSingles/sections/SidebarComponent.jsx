import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";

const SidebarComponent = () => {
    const [userRole, setUserRole] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Retrieve user role from localStorage
        const role = localStorage.getItem("userRole");
        setUserRole(role);
    }, []);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="sidebar-container">
            <div className="summary">
                <h2 className="summary-title">Итого</h2>
                <ul className="summary-list">
                    <li className="summary-item">
                        <span>Срок аренды</span>
                        <span>1 неделя</span>
                    </li>
                    <li className="summary-item">
                        <span>Электровелосипед</span>
                        <span>31 662 ₸</span>
                    </li>
                    <li className="summary-item">
                        <span>Шлем</span>
                        <span>341 ₸</span>
                    </li>
                    <li className="summary-item">
                        <span>Термоконтейнер</span>
                        <span>9 742 ₸</span>
                    </li>
                    <li className="summary-item">
                        <span>Возвращаемый депозит</span>
                        <span>30 000 ₸</span>
                    </li>
                    <li className="summary-item">
                        <span>Стандартная гарантия</span>
                        <span>Бесплатно</span>
                    </li>
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
                    <span className="total-amount">71 003 ₸</span>
                </div>
                {userRole === "corporate" && (
                    <div className="quantity-control-container">
                        <div className="quantity-control-text"><p>Количество:</p></div>
                        <div className="quantity-control">
                            <button className="quantity-btn" onClick={decrementQuantity}>-</button>
                            <span className="quantity-value">{quantity}</span>
                            <button className="quantity-btn" onClick={incrementQuantity}>+</button>
                        </div>
                    </div>
                )}
                <Button variant="primary" className="w-full !ml-0">Добавить в корзину</Button>
            </div>

            <div className="specifications">
                <h2 className="specifications-title">Характеристики</h2>
                <ul className="specifications-list">
                    <li className="specifications-item">
                        <span>Макс. скорость</span>
                        <span>55 км/ч</span>
                    </li>
                    <li className="specifications-item">
                        <span>Пробег на 1 заряде:</span>
                        <span>70 км</span>
                    </li>
                    <li className="specifications-item">
                        <span>Время зарядки</span>
                        <span>6-8 ч</span>
                    </li>
                    <li className="specifications-item">
                        <span>Макс. нагрузка</span>
                        <span>200 кг</span>
                    </li>
                    <li className="specifications-item">
                        <span>Вес</span>
                        <span>50 кг</span>
                    </li>
                    <li className="specifications-item">
                        <span>Мощность</span>
                        <span>800 Вт</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarComponent;
