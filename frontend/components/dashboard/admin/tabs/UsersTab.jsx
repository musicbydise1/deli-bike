"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import UsersTable from "./users/UsersTable";
import UserModal from "./users/UserModal";
import ErrorMessage from "./users/ErrorMessage";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const AVAILABLE_ROLES = ["corporate", "admin", "courier"];

export default function UsersTab() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Для модального окна
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [currentUser, setCurrentUser] = useState({
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        role: "corporate", // по умолчанию
    });

    // Получаем список пользователей при монтировании
    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URL}/admin/users`);
            if (!response.ok) {
                throw new Error("Ошибка при получении списка пользователей");
            }
            const result = await response.json();
            if (!result.isSuccess) {
                throw new Error(result.message || "Не удалось загрузить пользователей");
            }
            setUsers(result.data || []);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleAddUser = () => {
        setIsEditMode(false);
        setCurrentUser({
            id: null,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            companyName: "",
            role: "corporate",
        });
        setShowModal(true);
    };

    const handleEditUser = (user) => {
        setIsEditMode(true);
        setCurrentUser({
            id: user.id,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            companyName: user.companyName || "",
            role: user.role || "user",
        });
        setShowModal(true);
    };

    async function handleDeleteUser(id) {
        if (!confirm("Вы действительно хотите удалить пользователя?")) return;

        try {
            const response = await fetch(`${API_URL}/admin/users/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Ошибка при удалении пользователя");
            }
            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (error) {
            console.error(error);
            alert("Не удалось удалить пользователя!");
        }
    }

    async function handleSaveUser(formData) {
        // formData уже содержит данные пользователя
        try {
            let url = `${API_URL}/admin/users`;
            let method = "POST";
            if (isEditMode && currentUser.id) {
                url = `${API_URL}/admin/users/${currentUser.id}`;
                method = "PUT";
            }
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(
                    isEditMode
                        ? "Ошибка при обновлении пользователя"
                        : "Ошибка при создании пользователя"
                );
            }
            const result = await response.json();
            if (!result.isSuccess) {
                throw new Error(result.message || "Операция не удалась");
            }
            setShowModal(false);
            if (isEditMode) {
                setUsers((prev) =>
                    prev.map((u) => (u.id === currentUser.id ? { ...u, ...result.data } : u))
                );
            } else {
                setUsers((prev) => [...prev, result.data]);
            }
        } catch (error) {
            console.error(error);
            alert(error.message || "Ошибка при сохранении пользователя");
        }
    }

    if (loading) {
        return <p>Загрузка пользователей...</p>;
    }
    if (error) {
        return <p className="error-text">Ошибка: {error}</p>;
    }

    return (
        <div>
            <h3>Управление пользователями</h3>
            <p>Здесь вы можете просматривать, добавлять, редактировать и удалять пользователей.</p>
            <div style={{ marginBottom: "1rem" }}>
                <Button onClick={handleAddUser} variant="primary">
                    Добавить пользователя
                </Button>
            </div>
            {users.length > 0 ? (
                <UsersTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
            ) : (
                <p>Пользователей пока нет.</p>
            )}
            {showModal && (
                <UserModal
                    isEditMode={isEditMode}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    onSave={handleSaveUser}
                    onClose={() => setShowModal(false)}
                    availableRoles={AVAILABLE_ROLES}
                />
            )}
            <style jsx>{`
                .tab-content {
                    padding: 2rem;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                h3 {
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    );
}