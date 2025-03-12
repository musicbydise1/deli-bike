"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import AccessoriesTable from "./AccessoriesTable";
import AccessoryForm from "./AccessoryForm";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function AccessoriesTab() {
    const [accessories, setAccessories] = useState([]);
    const [bikes, setBikes] = useState([]); // Состояние для списка велосипедов
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [currentAccessory, setCurrentAccessory] = useState({
        id: null,
        bikeId: [], // Инициализируем как пустой массив
        name: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        fetchAccessories();
        fetchBikes();
    }, []);

    async function fetchAccessories() {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URL}/accessories`);
            if (!response.ok) throw new Error("Ошибка при получении аксессуаров");
            const result = await response.json();
            if (!result.isSuccess) throw new Error(result.message || "Не удалось загрузить аксессуары");
            setAccessories(result.data || []);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchBikes() {
        try {
            const response = await fetch(`${API_URL}/bikes`);
            if (!response.ok) throw new Error("Ошибка при получении велосипедов");
            const result = await response.json();
            if (result.isSuccess) {
                setBikes(result.data || []);
            } else {
                console.error("Не удалось загрузить велосипеды:", result.message);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleAddAccessory = () => {
        setIsEditMode(false);
        setCurrentAccessory({
            id: null,
            bikeId: [], // пустой массив
            name: "",
            description: "",
            price: "",
        });
        setShowModal(true);
    };

    const handleEditAccessory = (accessory) => {
        setIsEditMode(true);
        setCurrentAccessory({
            id: accessory.id,
            bikeId: accessory.bikeId, // предполагается, что на бэкенде bikeId хранится как массив чисел
            name: accessory.name,
            description: accessory.description,
            price: accessory.price,
        });
        setShowModal(true);
    };

    async function handleDeleteAccessory(id) {
        if (!confirm("Вы действительно хотите удалить этот аксессуар?")) return;
        try {
            const response = await fetch(`${API_URL}/accessories/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Ошибка при удалении аксессуара");
            setAccessories((prev) => prev.filter((a) => a.id !== id));
        } catch (error) {
            console.error(error);
            alert("Не удалось удалить аксессуар!");
        }
    }

    async function handleSaveAccessory(e) {
        e.preventDefault();

        const accessoryData = {
            bikeId: currentAccessory.bikeId, // Массив чисел
            name: currentAccessory.name,
            description: currentAccessory.description,
            price: Number(currentAccessory.price),
        };

        let url = `${API_URL}/accessories`;
        let method = "POST";
        if (isEditMode && currentAccessory.id) {
            url = `${API_URL}/accessories/${currentAccessory.id}`;
            method = "PUT";
        }

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(accessoryData),
            });
            if (!response.ok) {
                throw new Error(isEditMode ? "Ошибка при обновлении аксессуара" : "Ошибка при создании аксессуара");
            }
            const result = await response.json();
            if (!result.isSuccess) {
                throw new Error(result.message || "Операция не удалась");
            }
            setShowModal(false);
            if (isEditMode) {
                setAccessories((prev) =>
                    prev.map((a) => (a.id === currentAccessory.id ? { ...a, ...result.data } : a))
                );
            } else {
                setAccessories((prev) => [...prev, result.data]);
            }
        } catch (err) {
            console.error(err);
            alert(err.message || "Ошибка при сохранении аксессуара");
        }
    }

    if (loading) return <p className="text-gray-600">Загрузка аксессуаров...</p>;
    if (error) return <p className="text-red-500">Ошибка: {error}</p>;

    return (
        <div className="px-4 py-4">
            <h2 className="text-2xl font-bold mb-4">Управление аксессуарами</h2>
            <div className="mb-4">
                <button
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    onClick={handleAddAccessory}
                >
                    Добавить аксессуар
                </button>
            </div>
            {accessories.length === 0 ? (
                <p className="text-gray-600">Пока нет аксессуаров.</p>
            ) : (
                <AccessoriesTable accessories={accessories} onEdit={handleEditAccessory} onDelete={handleDeleteAccessory} />
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} title={isEditMode ? "Редактировать аксессуар" : "Добавить аксессуар"}>
                <AccessoryForm
                    currentAccessory={currentAccessory}
                    onChange={(field, value) => setCurrentAccessory((prev) => ({ ...prev, [field]: value }))}
                    onSave={handleSaveAccessory}
                    onCancel={() => setShowModal(false)}
                    bikes={bikes}
                />
            </Modal>
        </div>
    );
}