"use client";
import { pricingPlans } from "@/data/pricing";
import ProSelect from "@/components/ui/selects/ProSelect";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";

export default function Pricing() {

    // Массив состояний для выбранных опций селекта для каждого тарифа
    const [selectedOptions, setSelectedOptions] = useState(
        pricingPlans.map(() => null)
    );

    // Состояние для выбранного тарифного блока (индекс) по умолчанию первый блок выбран
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

    // Состояние для чекбокса расширенной гарантии
    const [warrantyChecked, setWarrantyChecked] = useState(
        pricingPlans.map(() => false)
    );

    const handleSelectChange = (index, option) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = option;
        setSelectedOptions(newSelectedOptions);
    };

    const handleBlockClick = (index) => {
        setSelectedPlanIndex(index);
    };

    const handleCheckboxChange = (index) => {
        const newWarrantyChecked = [...warrantyChecked];
        newWarrantyChecked[index] = !newWarrantyChecked[index];
        setWarrantyChecked(newWarrantyChecked);
    };

    return (
        <section className="boxcar-pricing-section-seven">
            <div className="boxcar-container">
                <div className="boxcar-title text-center pricing-title">
                    <h2>Тарифы <span>Deli-Bike</span></h2>
                    <p>гарантийному обслуживанию и сервису</p>
                </div>
                <div className="row">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-block-seven col-lg-6 col-md-6 col-sm-12 ${
                                selectedPlanIndex === index ? "selected" : ""
                            }`}
                        >
                            <div className="inner-box" onClick={() => handleBlockClick(index)}>
                                <h6 className="title">{plan.plan}</h6>
                                <span className="plan"></span>
                                <div className="text">{plan.description}</div>
                                {/* Отображаем селект только если plan.type === true */}
                                {plan.type && (
                                    <ProSelect
                                        options={plan.price}
                                        value={selectedOptions[index]}
                                        onChange={(option) => handleSelectChange(index, option)}
                                        placeholder="Выберите опцию"
                                        maxQuantity={plan.quantity} // передаем максимальное количество из тарифа
                                    />
                                )}

                                <ul className="pricing-list">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <i className="fa-solid fa-check" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Новый чекбокс «Расширенная гарантия» */}
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input custom-checkbox"
                                        type="checkbox"
                                        id={`extendedWarranty-${index}`}
                                        checked={warrantyChecked[index]}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleCheckboxChange(index);
                                        }}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`extendedWarranty-${index}`}
                                    >
                                        Расширенная гарантия
                                    </label>
                                </div>

                                <Button
                                    variant="secondary"
                                    className="w-full !ml-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleBlockClick(index);
                                    }}
                                >
                                    {selectedPlanIndex === index ? (
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