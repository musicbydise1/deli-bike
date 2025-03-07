"use client";
import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Box,
    Chip,
} from "@mui/material";

export function AccessoryForm({ currentAccessory, onChange, onSave, onCancel, bikes }) {
    // Handler для обработки изменений в multi-select
    const handleBikesChange = (event) => {
        const { target: { value } } = event;
        // Если value приходит как строка, разбиваем её по запятой, иначе используем как есть
        const selected = typeof value === "string" ? value.split(",") : value;
        // Преобразуем элементы в числа
        const selectedIds = selected.map((id) => Number(id));
        console.log("Selected bike IDs:", selectedIds); // отладочный лог
        onChange("bikeId", selectedIds);
    };

    return (
        <form onSubmit={onSave} className="space-y-4">
            {/* Multi-select для велосипедов с использованием Material UI */}
            <FormControl fullWidth variant="outlined">
                <InputLabel id="bike-select-label">Велосипеды</InputLabel>
                <Select
                    labelId="bike-select-label"
                    multiple
                    value={currentAccessory.bikeId || []}
                    onChange={handleBikesChange}
                    input={<OutlinedInput label="Велосипеды" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((id) => {
                                // Находим велосипед по id для отображения имени и модели
                                const bike = bikes.find((b) => b.id === id);
                                const label = bike
                                    ? bike.name && bike.model
                                        ? `${bike.name} ${bike.model}`
                                        : bike.name || bike.model
                                    : id;
                                return <Chip key={id} label={label} />;
                            })}
                        </Box>
                    )}
                >
                    {bikes.map((bike) => (
                        <MenuItem key={bike.id} value={bike.id}>
                            {bike.name && bike.model ? `${bike.name} ${bike.model}` : bike.name || bike.model}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className="flex flex-col">
                <label className="font-medium mb-1">Название:</label>
                <input
                    type="text"
                    className="border p-2 rounded"
                    value={currentAccessory.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="font-medium mb-1">Описание:</label>
                <textarea
                    rows={3}
                    className="border p-2 rounded"
                    value={currentAccessory.description}
                    onChange={(e) => onChange("description", e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="font-medium mb-1">Цена:</label>
                <input
                    type="number"
                    className="border p-2 rounded"
                    value={currentAccessory.price}
                    onChange={(e) => onChange("price", e.target.value)}
                    required
                />
            </div>

            <div className="flex space-x-2 mt-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                    Сохранить
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

export default AccessoryForm;