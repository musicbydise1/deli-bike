
import React from "react";
import Header6 from "@/components/headers/Header6";
import OrderDetails from "@/components/orders/Orders";

export const metadata = {
    title: "Заказы",
    description: "Просмотр деталей заказа",
};

export default function OrdersPage({ params }) {
    const { id } = params;

    return (
        <>
            <Header6 />
            <OrderDetails orderId={id} />
        </>
    );
}