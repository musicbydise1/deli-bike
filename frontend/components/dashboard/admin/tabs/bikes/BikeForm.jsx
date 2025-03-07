"use client";
import React from "react";
import { PriceField } from "./PriceField";
import { PhotoUploader } from "./PhotoUploader";

export function BikeForm({
                             currentBike,
                             onChange,
                             onFileChange,
                             onSave,
                             onCancel,
                             availableStatuses,
                             isEditMode,
                             priceCategories,
                         }) {
    // Функция для работы с изменениями цены
    const handlePriceChange = (index, field, value) => {
        const newPrices = [...(currentBike.prices || [])];
        newPrices[index] = { ...newPrices[index], [field]: value };
        onChange("prices", newPrices);
    };

    const addPriceField = () => {
        const newPrices = currentBike.prices ? [...currentBike.prices] : [];
        newPrices.push({ categoryId: "", price: "" });
        onChange("prices", newPrices);
    };

    const removePriceField = (index) => {
        const newPrices = [...(currentBike.prices || [])];
        newPrices.splice(index, 1);
        onChange("prices", newPrices);
    };

    return (
        <form onSubmit={onSave} className="space-y-4">
            {/* Название */}
            <div className="flex flex-col">
                <label className="font-medium mb-1">Название:</label>
                <input
                    type="text"
                    className="border p-2 rounded"
                    value={currentBike.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    required
                />
            </div>
            {/* Модель */}
            <div className="flex flex-col">
                <label className="font-medium mb-1">Модель:</label>
                <input
                    type="text"
                    className="border p-2 rounded"
                    value={currentBike.model}
                    onChange={(e) => onChange("model", e.target.value)}
                    required
                />
            </div>
            {/* Описание */}
            <div className="flex flex-col">
                <label className="font-medium mb-1">Описание:</label>
                <textarea
                    rows={3}
                    className="border p-2 rounded"
                    value={currentBike.description}
                    onChange={(e) => onChange("description", e.target.value)}
                />
            </div>
            {/* Статус доступности */}
            <div className="flex flex-col">
                <label className="font-medium mb-1">Статус доступности:</label>
                <select
                    className="border p-2 rounded"
                    value={currentBike.availability_status}
                    onChange={(e) => onChange("availability_status", e.target.value)}
                >
                    {availableStatuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
            {/* Параметры */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Макс. скорость (км/ч):</label>
                    <input
                        type="number"
                        step="0.1"
                        className="border p-2 rounded"
                        value={currentBike.maxSpeed}
                        onChange={(e) => onChange("maxSpeed", e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Пробег на заряде (км):</label>
                    <input
                        type="number"
                        step="0.1"
                        className="border p-2 rounded"
                        value={currentBike.rangePerCharge}
                        onChange={(e) => onChange("rangePerCharge", e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Время зарядки:</label>
                    <input
                        type="text"
                        className="border p-2 rounded"
                        value={currentBike.chargeTime}
                        onChange={(e) => onChange("chargeTime", e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Макс. нагрузка (кг):</label>
                    <input
                        type="number"
                        step="0.1"
                        className="border p-2 rounded"
                        value={currentBike.maxLoad}
                        onChange={(e) => onChange("maxLoad", e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Вес (кг):</label>
                    <input
                        type="number"
                        step="0.1"
                        className="border p-2 rounded"
                        value={currentBike.weight}
                        onChange={(e) => onChange("weight", e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="font-medium mb-1">Мощность (Вт):</label>
                    <input
                        type="text"
                        className="border p-2 rounded"
                        value={currentBike.power}
                        onChange={(e) => onChange("power", e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label className="font-medium mb-1">Подвеска:</label>
                <input
                    type="text"
                    className="border p-2 rounded"
                    value={currentBike.suspension}
                    onChange={(e) => onChange("suspension", e.target.value)}
                />
            </div>
            {/* Поле для загрузки файлов */}
            <div className="flex flex-col">
                <label className="font-medium mb-1">Загрузить фотографии:</label>
                <PhotoUploader
                    onFilesChange={onFileChange}
                    existingUrls={currentBike.imageUrls}
                />
            </div>
            {/* Теги */}
            <div className="flex flex-col">
                <label className="font-medium mb-1">Теги (через запятую):</label>
                <input
                    type="text"
                    className="border p-2 rounded"
                    value={Array.isArray(currentBike.tags) ? currentBike.tags.join(", ") : ""}
                    onChange={(e) =>
                        onChange("tags", e.target.value.split(",").map((t) => t.trim()))
                    }
                />
            </div>
            {/* Блок для ввода цен */}
            <div className="flex flex-col">
                <label className="font-medium mb-1">Цены:</label>
                {currentBike.prices && currentBike.prices.length > 0 ? (
                    currentBike.prices.map((price, index) => (
                        <PriceField
                            key={index}
                            index={index}
                            price={price}
                            priceCategories={priceCategories}
                            onPriceChange={handlePriceChange}
                            onRemove={removePriceField}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">Нет добавленных цен</p>
                )}
                <button
                    type="button"
                    onClick={addPriceField}
                    className="mt-2 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                    Добавить цену
                </button>
            </div>
            {/* Кнопки действий */}
            <div className="flex space-x-2 mt-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                    {isEditMode ? "Сохранить изменения" : "Добавить"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
}