"use client";
import React, { useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // Обработчик изменения полей формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        // Логика отправки данных на сервер или на email
        alert("Ваше сообщение отправлено!");
        // Очистим поля формы
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="w-full border border-gray-200 rounded p-4">
            <h2 className="text-xl font-semibold mb-4">Связаться с нами</h2>

            <p className="text-gray-600 mb-4 text-sm">
                Если вы не нашли ответ на свой вопрос, вы можете связаться с нашей службой поддержки:
            </p>

            {/* Контактная информация */}
            <div className="flex items-center mb-2">
                <FiPhone className="text-gray-600 mr-2" />
                <span className="text-gray-800">+7 (777) 123-45-67</span>
            </div>
            <div className="flex items-center mb-4">
                <FiMail className="text-gray-600 mr-2" />
                <span className="text-gray-800">support@delilux.kz</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
                Мы работаем 7 дней в неделю с 9:00 до 21:00.
            </p>

            {/* Форма обратной связи */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                        Ваше имя
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Введите ваше имя"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                        Ваш Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Введите ваш email"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                        Сообщение
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Опишите вашу проблему или вопрос"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
                >
                    Отправить
                </button>
            </form>
        </div>
    );
}