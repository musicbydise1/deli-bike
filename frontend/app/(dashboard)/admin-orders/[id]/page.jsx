
import React from "react";
import Header6 from "@/components/headers/Header6";
import AdminOrderDetails from "@/components/orders/AdminOrderDetails";

export const metadata = {
    title: "Admin Orders",
    description: "Просмотр деталей заказа",
};

export default function AdminOrdersPage({ params }) {
    const { id } = params;

    return (
        <>
            <Header6 />
            <AdminOrderDetails orderId={id} />
        </>
    );
}