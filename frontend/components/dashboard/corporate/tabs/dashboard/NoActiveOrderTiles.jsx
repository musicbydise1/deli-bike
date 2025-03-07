"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";

export default function NoActiveOrderTiles() {
    const [bikes, setBikes] = useState([]);

    useEffect(() => {
        fetch("https://api.deli-bike.kz/bikes")
            .then((res) => res.json())
            .then((data) => {
                if (data.isSuccess) {
                    setBikes(data.data);
                } else {
                    console.error("Произошла ошибка при получении байков:", data);
                }
            })
            .catch((error) => {
                console.error("Произошла ошибка при загрузке:", error);
            });
    }, []);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-1">Личный кабинет</h1>
            <p className="text-gray-600 mb-6">Выберите свой первый электросамокат</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {bikes.length === 0 ? (
                    <div className="text-gray-500">Нет доступных байков для аренды</div>
                ) : (
                    bikes.map((bike) => (
                        <div
                            key={bike.id}
                            className="border border-gray-200 rounded-lg p-4 flex flex-col items-center"
                        >
                            <div className="w-full h-40 mb-4 flex items-center justify-center">
                                {bike.imageUrls && bike.imageUrls.length > 0 ? (
                                    <img
                                        src={bike.imageUrls[0]}
                                        alt={bike.name}
                                        className="h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400">IMAGE</span>
                                )}
                            </div>

                            <h2 className="text-lg font-semibold mb-2 uppercase">
                                {bike.name} - {bike.model}
                            </h2>

                            {/* Ссылка на страницу /bike/[id] */}
                            <Link href={`/bike/${bike.id}`} className="block w-full">
                                <Button variant="primary" className="w-full ml-0">
                                    Арендовать
                                </Button>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}