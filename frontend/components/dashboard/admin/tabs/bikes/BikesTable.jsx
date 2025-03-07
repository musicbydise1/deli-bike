"use client";
import React from "react";

export function BikesTable({ bikes, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border-b border-gray-300 text-left">ID</th>
                    <th className="px-4 py-2 border-b border-gray-300 text-left">Название</th>
                    <th className="px-4 py-2 border-b border-gray-300 text-left">Модель</th>
                    <th className="px-4 py-2 border-b border-gray-300 text-left">Статус</th>
                    <th className="px-4 py-2 border-b border-gray-300 text-left">Макс. скорость</th>
                    <th className="px-4 py-2 border-b border-gray-300 text-left">Цены</th>
                    <th className="px-4 py-2 border-b border-gray-300">Действия</th>
                </tr>
                </thead>
                <tbody>
                {bikes.map((bike) => (
                    <tr key={bike.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b border-gray-300">{bike.id}</td>
                        <td className="px-4 py-2 border-b border-gray-300">{bike.name}</td>
                        <td className="px-4 py-2 border-b border-gray-300">{bike.model}</td>
                        <td className="px-4 py-2 border-b border-gray-300">{bike.availability_status}</td>
                        <td className="px-4 py-2 border-b border-gray-300">{bike.maxSpeed} км/ч</td>
                        <td className="px-4 py-2 border-b border-gray-300">
                            {bike.prices && bike.prices.length > 0 ? (
                                <ul className="list-disc list-inside space-y-1">
                                    {bike.prices.map((p) => (
                                        <li key={p.id}>
                                            {p.priceCategory?.name}: {p.price} USD
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-400">Нет цены</span>
                            )}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300 text-center">
                            <button onClick={() => onEdit(bike)} className="mr-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                                Изм.
                            </button>
                            <button onClick={() => onDelete(bike.id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded">
                                Удал.
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}