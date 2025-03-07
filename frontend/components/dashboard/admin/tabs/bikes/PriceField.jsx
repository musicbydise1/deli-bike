"use client";
import React from "react";

export function PriceField({ index, price, priceCategories, onPriceChange, onRemove }) {
    return (
        <div className="flex items-center space-x-2">
            <select
                value={price.categoryId || ""}
                onChange={(e) => onPriceChange(index, "categoryId", e.target.value)}
                className="border p-2 rounded"
            >
                <option value="">Выберите категорию</option>
                {priceCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                step="0.01"
                value={price.price || ""}
                onChange={(e) => onPriceChange(index, "price", e.target.value)}
                placeholder="Цена"
                className="border p-2 rounded"
            />
            <button type="button" onClick={() => onRemove(index)} className="text-red-500">
                Удалить
            </button>
        </div>
    );
}