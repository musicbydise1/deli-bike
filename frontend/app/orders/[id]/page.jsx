// app/orders/[id]/page.jsx

import React from "react";
import Header6 from "@/components/headers/Header6";
import OrderDetails from "@/components/orders/Orders";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

// Если используете metadata:
export const metadata = {
    title: "Заказы",
    description: "Просмотр деталей заказа",
};

// Обязательно экспортируем функцию с именем generateStaticParams
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateStaticParams() {
    // Пример запроса к API:
    const res = await fetch(`${API_URL}/rentals`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Ошибка при получении данных из API");
    }
    const json = await res.json();
    // Предполагаем, что нужный массив в json.data
    const rentals = json.data || [];

    // Возвращаем массив объектов, где ключ должен совпадать с именем динамического сегмента ([id] -> id)
    return rentals.map((rental) => ({
        id: rental.id.toString(),
    }));
}

// Основной компонент страницы
export default function OrdersPage({ params }) {
    const { id } = params;
    return (
        <>
            <Header6 />
            <OrderDetails orderId={id} />
        </>
    );
}