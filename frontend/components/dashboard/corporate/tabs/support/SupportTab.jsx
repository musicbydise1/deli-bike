"use client";
import React from "react";
import FaqAccordion from "./FaqAccordion";
import ContactForm from "./ContactForm";

export default function SupportTab() {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <h1 className="text-2xl font-bold mb-6">Поддержка</h1>

            {/* Аккордеон с часто задаваемыми вопросами (на всю ширину) */}
            <FaqAccordion />

            {/* Форма обратной связи и контакты (на всю ширину) */}
            <ContactForm />
        </div>
    );
}