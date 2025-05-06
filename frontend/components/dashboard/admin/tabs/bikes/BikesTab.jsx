"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { BikesTable } from "./BikesTable";
import { BikeForm } from "./BikeForm";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Alert,
} from "@mui/material";

const AVAILABLE_STATUSES = ["available", "unavailable", "in maintenance"];

export default function BikesTab() {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [priceCategories, setPriceCategories] = useState([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
            const response = await fetch(`${API_URL}/bikes/`);
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
            const res = await fetch(`${API_URL}/price-categories`);
            const result = await res.json();
            if (result.isSuccess) setPriceCategories(result.data);
        } catch (err) {
            console.error("Ошибка загрузки категорий цен:", err);
        }
    }

    const resetCurrentBike = () => setCurrentBike({
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

    const handleAddBike = () => {
        setIsEditMode(false);
        resetCurrentBike();
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
        if (!window.confirm("Вы действительно хотите удалить этот велосипед?")) return;
        try {
            const response = await fetch(`${API_URL}/bikes/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Ошибка при удалении велосипеда");
            setBikes((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            console.error(err);
            alert("Не удалось удалить велосипед!");
        }
    }

    const handleFileChange = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            setCurrentBike((prev) => ({ ...prev, files: acceptedFiles }));
        }
    };

    async function handleSaveBike(e) {
        e.preventDefault();

        const formData = new FormData();
        Object.entries({
            name: currentBike.name,
            model: currentBike.model,
            description: currentBike.description,
            availability_status: currentBike.availability_status,
            maxSpeed: currentBike.maxSpeed,
            rangePerCharge: currentBike.rangePerCharge,
            chargeTime: currentBike.chargeTime,
            maxLoad: currentBike.maxLoad,
            weight: currentBike.weight,
            power: currentBike.power,
            suspension: currentBike.suspension,
            prices: JSON.stringify(currentBike.prices),
            tags: currentBike.tags.join(","),
            imageUrls: JSON.stringify(currentBike.imageUrls),
        }).forEach(([key, value]) => formData.append(key, value));

        if (currentBike.files) {
            currentBike.files.forEach((file) => formData.append("photos", file));
        }

        let url = `${API_URL}/bikes/`;
        let method = "POST";
        if (isEditMode && currentBike.id) {
            url = `${API_URL}/bikes/${currentBike.id}`;
            method = "PUT";
        }

        try {
            const response = await fetch(url, { method, body: formData });
            if (!response.ok) throw new Error(isEditMode ? "Ошибка при обновлении велосипеда" : "Ошибка при создании велосипеда");
            const result = await response.json();
            if (!result.isSuccess) throw new Error(result.message || "Операция не удалась");

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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
                <CircularProgress />
                <Typography variant="body2" sx={{ ml: 2 }}>
                    Загрузка велосипедов...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">Ошибка: {error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
                Управление велосипедами
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Button variant="contained" color="success" onClick={handleAddBike}>
                    Добавить велосипед
                </Button>
            </Box>

            {bikes.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Пока нет велосипедов.
                </Typography>
            ) : (
                <BikesTable bikes={bikes} onEdit={handleEditBike} onDelete={handleDeleteBike} />
            )}

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title={isEditMode ? "Редактировать велосипед" : "Добавить велосипед"}
            >
                <BikeForm
                    currentBike={currentBike}
                    onChange={(field, value) => setCurrentBike((prev) => ({ ...prev, [field]: value }))}
                    onFileChange={handleFileChange}
                    onSubmit={handleSaveBike}
                    onCancel={() => setShowModal(false)}
                    availableStatuses={AVAILABLE_STATUSES}
                    isEditMode={isEditMode}
                    priceCategories={priceCategories}
                />
            </Modal>
        </Box>
    );
}