"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import Link from "next/link";

export default function UserModal({
                                      isEditMode,
                                      currentUser,
                                      setCurrentUser,
                                      onSave,
                                      onClose,
                                      availableRoles,
                                  }) {
    const handleChange = (field, value) => {
        setCurrentUser({ ...currentUser, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Собираем данные формы
        const payload = {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            phoneNumber: currentUser.phoneNumber,
            password: currentUser.password,
            role: currentUser.role,
        };

        // Если выбрана роль corporate, добавляем companyName
        if (currentUser.role === "corporate") {
            payload.companyName = currentUser.companyName;
        }

        onSave(payload);
    };

    return (
        // При клике по оверлею закрывается модальное окно
        <div className="modal-overlay" onClick={onClose}>
            {/* Содержимое модального окна – предотвращаем закрытие при клике внутрь */}
            <div className="modal-user" onClick={(e) => e.stopPropagation()}>
                <h3>{isEditMode ? "Редактировать пользователя" : "Добавить пользователя"}</h3>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-form-row">
                        <label>Имя:</label>
                        <input
                            type="text"
                            value={currentUser.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-form-row">
                        <label>Фамилия:</label>
                        <input
                            type="text"
                            value={currentUser.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-form-row">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={currentUser.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-form-row">
                        <label>Телефон:</label>
                        <input
                            type="text"
                            value={currentUser.phoneNumber}
                            onChange={(e) => handleChange("phoneNumber", e.target.value)}
                            required
                        />
                    </div>
                    {/* Показываем поле "Пароль" только при добавлении пользователя */}
                    {!isEditMode && (
                        <div className="modal-form-row">
                            <label>Пароль:</label>
                            <input
                                type="password"
                                value={currentUser.password || ""}
                                onChange={(e) => handleChange("password", e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="modal-form-row">
                        <label>Роль:</label>
                        <select
                            value={currentUser.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                        >
                            {availableRoles.map((roleOption) => (
                                <option key={roleOption} value={roleOption}>
                                    {roleOption}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Если выбрана роль "corporate", показываем поле для ввода названия компании */}
                    {currentUser.role === "corporate" && (
                        <div className="modal-form-row">
                            <label>Название компании:</label>
                            <input
                                type="text"
                                value={currentUser.companyName || ""}
                                onChange={(e) => handleChange("companyName", e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="modal-buttons">
                        <Button type="submit" variant="primary">
                            {isEditMode ? "Сохранить изменения" : "Добавить"}
                        </Button>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Отмена
                        </Button>
                    </div>
                </form>
            </div>
            <style jsx>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal-user {
                    background: #fff;
                    padding: 2rem;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 80vh; /* Ограничиваем максимальную высоту */
                    overflow-y: auto; /* Вертикальная прокрутка при необходимости */
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    z-index: 1001;
                }
                .modal-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .modal-form-row {
                    display: flex;
                    flex-direction: column;
                }
                .modal-form-row label {
                    margin-bottom: 0.5rem;
                    font-weight: 600;
                }
                .modal-form-row input,
                .modal-form-row select {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                }
                .modal-buttons {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 1rem;
                }
            `}</style>
        </div>
    );
}