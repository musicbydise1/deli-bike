"use client";
import { pricingPlans } from "@/data/pricing";
// import ProSelect from "@/components/ui/selects/ProSelect";
import React from "react";
import Button from "@/components/ui/button/Button";
import { useTariff } from "@/context/TariffContext"; // Импорт контекста

export default function Pricing() {
    const {
        selectedWarranty,
        setSelectedWarranty,
        // selectedOptions,
        // setSelectedOptions,
        extendedWarrantyStates,
        setExtendedWarrantyStates,
    } = useTariff();

    // Обработка изменения выбранной опции для тарифа
    // const handleSelectChange = (planValue, option) => {
    //     // Здесь можно использовать planValue как ключ
    //     const newSelectedOptions = { ...selectedOptions };
    //     newSelectedOptions[planValue] = option;
    //     setSelectedOptions(newSelectedOptions);
    // };

    // Обработка клика по тарифу — сохраняем выбранный тариф (объект или его уникальное значение)
    const handlePlanClick = (plan) => {
        setSelectedWarranty(plan);
    };

    // Обработка чекбокса для расширенной гарантии для конкретного тарифа
    const handleCheckboxChange = (plan) => {
        setExtendedWarrantyStates((prev) => ({
            ...prev,
            [plan.value]: !prev[plan.value],
        }));
    };

    return (
        <section className="boxcar-pricing-section-seven">
            <div className="boxcar-container">
                <div className="boxcar-title text-center pricing-title">
                    <h2>
                        Тарифы <span>Deli-Bike</span>
                    </h2>
                    <p>гарантийному обслуживанию и сервису</p>
                </div>
                <div className="row">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-block-seven col-lg-6 col-md-6 col-sm-12 ${
                                selectedWarranty?.value === plan.value ? "selected" : ""
                            }`}
                        >
                            <div
                                className="inner-box"
                                onClick={() => handlePlanClick(plan)}
                            >
                                <h6 className="title">{plan.plan}</h6>
                                <span className="plan"></span>
                                <div className="text">{plan.description}</div>

                                {/*{plan.type && (*/}
                                {/*    <ProSelect*/}
                                {/*        options={plan.price}*/}
                                {/*        // Используем plan.value в качестве ключа для выбранной опции*/}
                                {/*        value={selectedOptions[plan.value]}*/}
                                {/*        onChange={(option) => handleSelectChange(plan.value, option)}*/}
                                {/*        placeholder="Выберите опцию"*/}
                                {/*        maxQuantity={plan.quantity}*/}
                                {/*    />*/}
                                {/*)}*/}

                                <ul className="pricing-list">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <i className="fa-solid fa-check" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Чекбокс для расширенной гарантии */}
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input custom-checkbox"
                                        type="checkbox"
                                        id={`extendedWarranty-${plan.value}`}
                                        checked={extendedWarrantyStates[plan.value] || false}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            setExtendedWarrantyStates((prev) => ({
                                                ...prev,
                                                [plan.value]: !prev[plan.value],
                                            }));
                                        }}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`extendedWarranty-${plan.value}`}
                                    >
                                        Расширенная гарантия
                                    </label>
                                </div>

                                <Button
                                    variant="secondary"
                                    className="w-full !ml-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePlanClick(plan);
                                    }}
                                >
                                    {selectedWarranty?.value === plan.value ? (
                                        <span className="orange">Выбран</span>
                                    ) : (
                                        "Выбрать"
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}