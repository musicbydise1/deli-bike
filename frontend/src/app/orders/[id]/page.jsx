// app/orders/[id]/page.jsx

import React from 'react';
import Header6 from '@/widgets/headers/Header6';
import OrderDetails from '@/features/orders/Orders';

// Если используете metadata:
export const metadata = {
  title: 'Заказы',
  description: 'Просмотр деталей заказа',
};

// Обязательно экспортируем функцию с именем generateStaticParams
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateStaticParams() {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/rentals`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    const rentals = json.data || [];
    return rentals.map(rental => ({
      id: rental.id.toString(),
    }));
  } catch {
    return [];
  }
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
