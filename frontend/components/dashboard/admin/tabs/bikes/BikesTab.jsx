"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { BikesTable } from "./BikesTable";
import { BikeForm } from "./BikeForm";

const AVAILABLE_STATUSES = ["available", "unavailable", "in maintenance"];

export default function BikesTab() {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [priceCategories, setPriceCategories] = useState([]);

    const [currentBike, setCurrentBike] = useState({
        id: null,
        name: "",
        model: "",
        description: "",
        availability_status: "available",
        maxSpeed: "",
        rangePerCharge: "",
        chargeTime: "",
        maxLoad: "",
        weight: "",
        power: "",
        suspension: "",
        imageUrls: [],
        tags: [],
        prices: [],
        files: null,
    });

    useEffect(() => {
        fetchBikes();
        fetchPriceCategories();
    }, []);

    async function fetchBikes() {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch("https://api.deli-bike.kz/bikes/");
            if (!response.ok) throw new Error("Ошибка при получении списка велосипедов");
            const result = await response.json();
            if (!result.isSuccess) throw new Error(result.message || "Не удалось загрузить велосипеды");
            setBikes(result.data || []);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchPriceCategories() {
        try {
            const res = await fetch("https://api.deli-bike.kz/price-categories");
            const result = await res.json();
            if (result.isSuccess) setPriceCategories(result.data);
        } catch (err) {
            console.error("Ошибка загрузки категорий цен:", err);
        }
    }

    const handleAddBike = () => {
        setIsEditMode(false);
        setCurrentBike({
            id: null,
            name: "",
            model: "",
            description: "",
            availability_status: "available",
            maxSpeed: "",
            rangePerCharge: "",
            chargeTime: "",
            maxLoad: "",
            weight: "",
            power: "",
            suspension: "",
            imageUrls: [],
            tags: [],
            prices: [],
            files: null,
        });
        setShowModal(true);
    };

    const handleEditBike = (bike) => {
        setIsEditMode(true);
        setCurrentBike({
            id: bike.id,
            name: bike.name || "",
            model: bike.model || "",
            description: bike.description || "",
            availability_status: bike.availability_status || "available",
            maxSpeed: bike.maxSpeed || "",
            rangePerCharge: bike.rangePerCharge || "",
            chargeTime: bike.chargeTime || "",
            maxLoad: bike.maxLoad || "",
            weight: bike.weight || "",
            power: bike.power || "",
            suspension: bike.suspension || "",
            imageUrls: bike.imageUrls || [],
            tags: bike.tags || [],
            prices: bike.prices || [],
            files: null,
        });
        setShowModal(true);
    };

    async function handleDeleteBike(id) {
        if (!confirm("Вы действительно хотите удалить этот велосипед?")) return;
        try {
            const response = await fetch(`https://api.deli-bike.kz/bikes/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Ошибка при удалении велосипеда");
            setBikes((prev) => prev.filter((b) => b.id !== id));
        } catch (error) {
            console.error(error);
            alert("Не удалось удалить велосипед!");
        }
    }

    function handleFileChange(acceptedFiles) {
        console.log("Selected files:", acceptedFiles);
        if (acceptedFiles && acceptedFiles.length > 0) {
            setCurrentBike((prev) => ({ ...prev, files: acceptedFiles }));
        }
    }

    async function handleSaveBike(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", currentBike.name);
        formData.append("model", currentBike.model);
        formData.append("description", currentBike.description || "");
        formData.append("availability_status", currentBike.availability_status);
        formData.append("maxSpeed", currentBike.maxSpeed);
        formData.append("rangePerCharge", currentBike.rangePerCharge);
        formData.append("chargeTime", currentBike.chargeTime || "");
        formData.append("maxLoad", currentBike.maxLoad);
        formData.append("weight", currentBike.weight);
        formData.append("power", currentBike.power || "");
        formData.append("suspension", currentBike.suspension || "");
        formData.append("prices", JSON.stringify(currentBike.prices));
        formData.append("tags", currentBike.tags.join(","));
        formData.append("imageUrls", JSON.stringify(currentBike.imageUrls));

        if (currentBike.files) {
            for (let i = 0; i < currentBike.files.length; i++) {
                formData.append("photos", currentBike.files[i]);
            }
        }

        let url = "https://api.deli-bike.kz/bikes/";
        let method = "POST";
        if (isEditMode && currentBike.id) {
            url = `https://api.deli-bike.kz/bikes/${currentBike.id}`;
            method = "PUT";
        }

        try {
            const response = await fetch(url, { method, body: formData });
            if (!response.ok) {
                throw new Error(isEditMode ? "Ошибка при обновлении велосипеда" : "Ошибка при создании велосипеда");
            }
            const result = await response.json();
            if (!result.isSuccess) {
                throw new Error(result.message || "Операция с велосипедом не удалась");
            }
            setShowModal(false);
            if (isEditMode) {
                setBikes((prev) => prev.map((b) => (b.id === currentBike.id ? { ...b, ...result.data } : b)));
            } else {
                setBikes((prev) => [...prev, result.data]);
            }
        } catch (err) {
            console.error(err);
            alert(err.message || "Ошибка при сохранении велосипеда");
        }
    }

    if (loading) return <p className="text-gray-600">Загрузка велосипедов...</p>;
    if (error) return <p className="text-red-500">Ошибка: {error}</p>;

    return (
        <div className="px-4 py-4">
            <h2 className="text-2xl font-bold mb-4">Управление велосипедами</h2>
            <div className="mb-4">
                <button
                    onClick={handleAddBike}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                >
                    Добавить велосипед
                </button>
            </div>
            {bikes.length === 0 ? (
                <p className="text-gray-600">Пока нет велосипедов.</p>
            ) : (
                <BikesTable bikes={bikes} onEdit={handleEditBike} onDelete={handleDeleteBike} />
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} title={isEditMode ? "Редактировать велосипед" : "Добавить велосипед"}>
                <BikeForm
                    currentBike={currentBike}
                    onChange={(field, value) => setCurrentBike((prev) => ({ ...prev, [field]: value }))}
                    onFileChange={handleFileChange}
                    onSave={handleSaveBike}
                    onCancel={() => setShowModal(false)}
                    availableStatuses={AVAILABLE_STATUSES}
                    isEditMode={isEditMode}
                    priceCategories={priceCategories}
                />
            </Modal>
        </div>
    );
}