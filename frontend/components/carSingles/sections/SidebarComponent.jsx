import React, { useState, useEffect } from "react";

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
        <div className="sidebar bg-white border rounded-lg p-4 max-w-sm mx-auto">
            <div className="summary">
                <h2 className="text-lg font-bold mb-4">Итого</h2>
                <ul className="summary-list space-y-2">
                    <li className="flex justify-between border-b pb-2">
                        <span>Срок аренды</span>
                        <span>1 неделя</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Электровелосипед</span>
                        <span>31 662 ₸</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Шлем</span>
                        <span>341 ₸</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Термоконтейнер</span>
                        <span>9 742 ₸</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Возвращаемый депозит</span>
                        <span>30 000 ₸</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Стандартная гарантия</span>
                        <span>Бесплатно</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Передние / задние фонари и поворотники</span>
                        <span>Бесплатно</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Держатель для телефона</span>
                        <span>Бесплатно</span>
                    </li>
                </ul>
                <div className="total flex justify-between font-bold text-lg my-4">
                    <span>Итого к оплате:</span>
                    <span className="text-orange-500">71 003 ₸</span>
                </div>
                {userRole === "corporate" && (
                    <div className="quantity-control flex items-center space-x-4 my-4">
                        <button
                            className="bg-gray-200 text-gray-700 rounded px-2 py-1 hover:bg-gray-300"
                            onClick={decrementQuantity}
                        >
                            -
                        </button>
                        <span className="font-bold text-lg">{quantity}</span>
                        <button
                            className="bg-gray-200 text-gray-700 rounded px-2 py-1 hover:bg-gray-300"
                            onClick={incrementQuantity}
                        >
                            +
                        </button>
                    </div>
                )}
                <button className="add-to-cart bg-orange-500 text-white py-2 px-4 rounded w-full hover:bg-orange-600">
                    Добавить в корзину
                </button>
            </div>

            <div className="specifications mt-6">
                <h2 className="text-lg font-bold mb-4">Характеристики</h2>
                <ul className="specifications-list space-y-2">
                    <li className="flex justify-between border-b pb-2">
                        <span>Макс. скорость</span>
                        <span>55 км/ч</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Пробег на 1 заряде:</span>
                        <span>70 км</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Время зарядки</span>
                        <span>6-8 ч</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Макс. нагрузка</span>
                        <span>200 кг</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Вес</span>
                        <span>50 кг</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                        <span>Мощность</span>
                        <span>800 Вт</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarComponent;
