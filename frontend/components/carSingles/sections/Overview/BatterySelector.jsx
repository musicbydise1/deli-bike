"use client";
import React from "react";
import { formatPrice } from "@/utils/pricingUtils";

export default function BatterySelector({ batteryList, selectedBattery, onSelectBattery, rentalValue, currency }) {
    return (
        <div className="section">
            <h4 className="section-title">
                АКБ. <span>Какой аккумулятор вы хотите добавить?</span>
            </h4>
            <div className="options-grid">
                {batteryList.map(batteryItem => {
                    const found = batteryItem?.price?.find(obj => Number(obj.value) === Number(rentalValue));
                    const priceToShow = found?.price ?? 0;
                    return (
                        <button
                            key={batteryItem.value}
                            className={`option-button ${selectedBattery && selectedBattery.value === batteryItem.value ? "selected" : ""}`}
                            onClick={() => onSelectBattery(batteryItem)}
                        >
                            <span>{batteryItem.label}</span>
                            <span>+ {formatPrice(priceToShow, currency)}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}