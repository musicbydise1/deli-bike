"use client";
import React from "react";
import { formatPrice } from "@/utils/pricingUtils";

export default function AdditionalOptionsSelector({ accessories, selectedAdditional, onToggleOption, currency }) {
    return (
        <div className="section">
            <h4 className="section-title">
                Дополнительно. <span>Какие опции хотите добавить?</span>
            </h4>
            <div className="options-grid">
                {accessories.map(option => (
                    <button
                        key={option.value}
                        className={`option-button ${selectedAdditional.some(item => item.value === option.value) ? "selected" : ""}`}
                        onClick={() => onToggleOption(option)}
                    >
                        <span className="section-btn-label">{option.label}</span>
                        <span>{ option.price }</span>
                    </button>
                ))}
            </div>
        </div>
    );
}