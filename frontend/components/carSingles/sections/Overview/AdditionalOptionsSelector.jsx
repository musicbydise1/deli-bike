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
                        key={option.id}
                        className={`option-button ${selectedAdditional.some(item => item.id === option.id) ? "selected" : ""}`}
                        onClick={() => onToggleOption(option)}
                    >
                        <span className="section-btn-label">{option.name}</span>
                        <span>+ {formatPrice(Math.round(Number(option.price)), currency)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}