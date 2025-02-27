"use client";

import React, { useEffect, useState } from "react";

/**
 * Пример отдельного компонента модального окна.
 * Вызывается через <Modal show={boolean} onClose={func} title="..."> {children} </Modal>
 */
function Modal({ show, onClose, title, children }) {
    // Если show = false, модалка не рендерится вообще
    if (!show) return null;

    // Клик по overlay → закрываем модалку
    const handleOverlayClick = () => {
        onClose();
    };

    // Останавливаем всплытие клика внутри контента,
    // чтобы при клике на саму форму модалка не закрывалась
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            {/* Модальное окно само, ограничим ширину и высоту */}
            <div
                onClick={handleModalContentClick}
                className="bg-white w-full max-w-xl max-h-[80vh] overflow-y-auto rounded shadow-md relative"
            >
                {/* Шапка модалки */}
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl font-bold"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                {/* Контент модального окна */}
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}

// Возможные статусы — для упрощённого выбора в форме
const AVAILABLE_STATUSES = ["available", "unavailable", "in maintenance"];

export default function BikesTab() {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Управление модалкой
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // Храним все поля текущего велосипеда, который редактируем/создаём
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
    });

    // При первом рендере грузим данные
    useEffect(() => {
        fetchBikes();
    }, []);

    // Загрузка списка велосипедов
    async function fetchBikes() {
        try {
            setLoading(true);
            setError(null);

            // Если нужно передать токен:
            // const token = localStorage.getItem("accessToken");
            // headers: { Authorization: `Bearer ${token}` }

            const response = await fetch("http://localhost:4000/bikes/");
            if (!response.ok) {
                throw new Error("Ошибка при получении списка велосипедов");
            }

            const result = await response.json();
            if (!result.isSuccess) {
                throw new Error(result.message || "Не удалось загрузить велосипеды");
            }

            setBikes(result.data || []);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Открыть модалку для добавления
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
        });
        setShowModal(true);
    };

    // Открыть модалку для редактирования
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
        });
        setShowModal(true);
    };

    // Удалить велосипед
    async function handleDeleteBike(id) {
        if (!confirm("Вы действительно хотите удалить этот велосипед?")) return;
        try {
            // const token = localStorage.getItem("accessToken");
            // headers: { Authorization: `Bearer ${token}` },

            const response = await fetch(`http://localhost:4000/bikes/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Ошибка при удалении велосипеда");
            }
            // Удаляем локально
            setBikes((prev) => prev.filter((b) => b.id !== id));
        } catch (error) {
            console.error(error);
            alert("Не удалось удалить велосипед!");
        }
    }

    // Сохранить (добавить/обновить) велосипед
    async function handleSaveBike(e) {
        e.preventDefault();

        const {
            id,
            name,
            model,
            description,
            availability_status,
            maxSpeed,
            rangePerCharge,
            chargeTime,
            maxLoad,
            weight,
            power,
            suspension,
            imageUrls,
            tags,
            prices,
        } = currentBike;

        // Простая проверка на заполнение обязательных полей
        if (!name || !model) {
            alert("Пожалуйста, заполните поля 'Название' и 'Модель'!");
            return;
        }

        try {
            let url = "http://localhost:4000/bikes/";
            let method = "POST";

            if (isEditMode && id) {
                url = `http://localhost:4000/bikes/${id}`;
                method = "PUT";
            }

            // const token = localStorage.getItem("accessToken");
            // headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    model,
                    description,
                    availability_status,
                    maxSpeed,
                    rangePerCharge,
                    chargeTime,
                    maxLoad,
                    weight,
                    power,
                    suspension,
                    imageUrls,
                    tags,
                    prices,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    isEditMode
                        ? "Ошибка при обновлении велосипеда"
                        : "Ошибка при создании велосипеда"
                );
            }

            const result = await response.json();
            if (!result.isSuccess) {
                throw new Error(result.message || "Операция с велосипедом не удалась");
            }

            setShowModal(false);

            // Обновим локальный стейт
            if (isEditMode) {
                setBikes((prev) =>
                    prev.map((b) => (b.id === id ? { ...b, ...result.data } : b))
                );
            } else {
                setBikes((prev) => [...prev, result.data]);
            }
        } catch (err) {
            console.error(err);
            alert(err.message || "Ошибка при сохранении велосипеда");
        }
    }

    // Рендерим таблицу с велосипедами
    const renderBikesTable = () => {
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">ID</th>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">Название</th>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">Модель</th>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">Статус</th>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">Макс. скорость</th>
                        <th className="px-4 py-2 border-b border-gray-300 text-left">Цены</th>
                        <th className="px-4 py-2 border-b border-gray-300">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bikes.map((bike) => (
                        <tr key={bike.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border-b border-gray-300">{bike.id}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{bike.name}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{bike.model}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{bike.availability_status}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{bike.maxSpeed} км/ч</td>
                            <td className="px-4 py-2 border-b border-gray-300">
                                {/* Если есть цены, показываем */}
                                {bike.prices && bike.prices.length > 0 ? (
                                    <ul className="list-disc list-inside space-y-1">
                                        {bike.prices.map((p) => (
                                            <li key={p.id}>
                                                {p.priceCategory?.name}: {p.price} USD
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="text-gray-400">Нет цены</span>
                                )}
                            </td>
                            <td className="px-4 py-2 border-b border-gray-300 text-center">
                                <button
                                    onClick={() => handleEditBike(bike)}
                                    className="mr-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                                >
                                    Изм.
                                </button>
                                <button
                                    onClick={() => handleDeleteBike(bike.id)}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                                >
                                    Удал.
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    // Состояния загрузки/ошибки
    if (loading) {
        return <p className="text-gray-600">Загрузка велосипедов...</p>;
    }
    if (error) {
        return <p className="text-red-500">Ошибка: {error}</p>;
    }

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
                renderBikesTable()
            )}

            {/* Модалка через отдельный компонент */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                title={isEditMode ? "Редактировать велосипед" : "Добавить велосипед"}
            >
                <form onSubmit={handleSaveBike} className="space-y-4">
                    {/* Название */}
                    <div className="flex flex-col">
                        <label className="font-medium mb-1">Название:</label>
                        <input
                            type="text"
                            className="border p-2 rounded"
                            value={currentBike.name}
                            onChange={(e) => setCurrentBike({ ...currentBike, name: e.target.value })}
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
                            onChange={(e) => setCurrentBike({ ...currentBike, model: e.target.value })}
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
                            onChange={(e) =>
                                setCurrentBike({ ...currentBike, description: e.target.value })
                            }
                        />
                    </div>

                    {/* Статус */}
                    <div className="flex flex-col">
                        <label className="font-medium mb-1">Статус доступности:</label>
                        <select
                            className="border p-2 rounded"
                            value={currentBike.availability_status}
                            onChange={(e) =>
                                setCurrentBike({ ...currentBike, availability_status: e.target.value })
                            }
                        >
                            {AVAILABLE_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Параметры (макс. скорость, пробег, ... ) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Максимальная скорость (км/ч):</label>
                            <input
                                type="number"
                                step="0.1"
                                className="border p-2 rounded"
                                value={currentBike.maxSpeed}
                                onChange={(e) =>
                                    setCurrentBike({ ...currentBike, maxSpeed: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Пробег на заряде (км):</label>
                            <input
                                type="number"
                                step="0.1"
                                className="border p-2 rounded"
                                value={currentBike.rangePerCharge}
                                onChange={(e) =>
                                    setCurrentBike({ ...currentBike, rangePerCharge: e.target.value })
                                }
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
                                onChange={(e) =>
                                    setCurrentBike({ ...currentBike, chargeTime: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Макс. нагрузка (кг):</label>
                            <input
                                type="number"
                                step="0.1"
                                className="border p-2 rounded"
                                value={currentBike.maxLoad}
                                onChange={(e) =>
                                    setCurrentBike({ ...currentBike, maxLoad: e.target.value })
                                }
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
                                onChange={(e) =>
                                    setCurrentBike({ ...currentBike, weight: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium mb-1">Мощность (Вт):</label>
                            <input
                                type="text"
                                className="border p-2 rounded"
                                value={currentBike.power}
                                onChange={(e) =>
                                    setCurrentBike({ ...currentBike, power: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Подвеска */}
                    <div className="flex flex-col">
                        <label className="font-medium mb-1">Подвеска:</label>
                        <input
                            type="text"
                            className="border p-2 rounded"
                            value={currentBike.suspension}
                            onChange={(e) =>
                                setCurrentBike({ ...currentBike, suspension: e.target.value })
                            }
                        />
                    </div>

                    {/* Ссылки на изображения */}
                    <div className="flex flex-col">
                        <label className="font-medium mb-1">
                            URL изображений (через запятую):
                        </label>
                        <input
                            type="text"
                            className="border p-2 rounded"
                            value={currentBike.imageUrls.join(", ")}
                            onChange={(e) =>
                                setCurrentBike({
                                    ...currentBike,
                                    imageUrls: e.target.value.split(",").map((url) => url.trim()),
                                })
                            }
                        />
                    </div>

                    {/* Теги */}
                    <div className="flex flex-col">
                        <label className="font-medium mb-1">Теги (через запятую):</label>
                        <input
                            type="text"
                            className="border p-2 rounded"
                            value={currentBike.tags.join(", ")}
                            onChange={(e) =>
                                setCurrentBike({
                                    ...currentBike,
                                    tags: e.target.value.split(",").map((t) => t.trim()),
                                })
                            }
                        />
                    </div>

                    {/* Блок цен, если нужно — отдельная логика */}
                    {/* <div className="flex flex-col">
            <label className="font-medium mb-1">Цена (пример):</label>
            <input
              type="number"
              step="0.01"
              className="border p-2 rounded"
              value={currentBike.prices[0]?.price || ""}
              onChange={(e) => {
                const price = e.target.value;
                setCurrentBike((prev) => ({
                  ...prev,
                  prices: [
                    {
                      ...prev.prices[0],
                      price,
                    },
                  ],
                }));
              }}
            />
          </div> */}

                    {/* Кнопки действий */}
                    <div className="flex space-x-2 mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                            {isEditMode ? "Сохранить изменения" : "Добавить"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}