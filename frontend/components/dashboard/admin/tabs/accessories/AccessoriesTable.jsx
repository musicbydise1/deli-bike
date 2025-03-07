"use client";
import React from "react";

export function AccessoriesTable({ accessories, onEdit, onDelete }) {
    return (
        <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Велосипед</th>
                <th className="px-4 py-2 border-b">Название</th>
                <th className="px-4 py-2 border-b">Описание</th>
                <th className="px-4 py-2 border-b">Цена</th>
                <th className="px-4 py-2 border-b">Действия</th>
            </tr>
            </thead>
            <tbody>
            {accessories.map((accessory) => (
                <tr key={accessory.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{accessory.id}</td>
                    <td className="px-4 py-2 border-b">
                        {accessory.bike ? `${accessory.bike.name} ${accessory.bike.model}` : accessory.bikeId}
                    </td>
                    <td className="px-4 py-2 border-b">{accessory.name}</td>
                    <td className="px-4 py-2 border-b">{accessory.description}</td>
                    <td className="px-4 py-2 border-b">{accessory.price}</td>
                    <td className="px-4 py-2 border-b text-center">
                        <button
                            onClick={() => onEdit(accessory)}
                            className="mr-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                            Редактировать
                        </button>
                        <button
                            onClick={() => onDelete(accessory.id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                            Удалить
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default AccessoriesTable;