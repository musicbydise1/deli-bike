"use client";
import React from "react";
import { FiAlertTriangle, FiInfo } from "react-icons/fi";
import { formatPrice } from "@/utils/pricingUtils";

export default function DepositInfo({ deposit, currency }) {
    return (
        <div className="warning mt-3">
            <FiAlertTriangle className="mr-4 align-[-4px]" size={20} />
            <span>Возвращаемый депозит – {formatPrice(deposit, currency)}</span>
            <FiInfo size={20} className="mr-2 align-[-4px] float-right mt-1" />
        </div>
    );
}