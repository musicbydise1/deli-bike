"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../../../public/css/pages/home/FormModalContent.module.css";
import Button from "@/components/ui/button/Button";

export default function FormModalContent() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://91.243.71.138:4000/lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Ошибка создания лида");
            }

            // Если лид создан успешно
            setIsSubmitted(true);
        } catch (err) {
            console.error("Ошибка отправки формы:", err);
            setError(err.message);
        }
    };

    if (isSubmitted) {
        // Второе состояние - «Заявка отправлена»
        return (
            <div className={styles.successWrap}>
                <Image
                    src="/images/fists.svg"
                    alt="Success"
                    width={180}
                    height={180}
                    className={styles.successImage}
                />
                <h2 className={styles.successTitle}>ЗАЯВКА ОТПРАВЛЕНА</h2>
                <p className={styles.successSubtitle}>
                    Мы свяжемся с вами в ближайшее время<br />
                    для подтверждения и деталей аренды.
                </p>
            </div>
        );
    }

    // Первое состояние - Форма
    return (
        <div className={styles.formWrap}>
            <h2 className={styles.formTitle}>ЗАПОЛНИТЕ ФОРМУ</h2>
            <p className={styles.formSubtitle}>
                Менеджер свяжется с вами в течение дня
            </p>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className="modalLabel" htmlFor="name">Ваше имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Имя"
                        className="modalInput"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className="modalLabel" htmlFor="phone">Телефон</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+7"
                        className="modalInput"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className="modalLabel" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@email.com"
                        className="modalInput"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <Button variant="primary" className="w-full mt-2" type="submit">
                    Отправить &nbsp;&rarr;
                </Button>
            </form>
        </div>
    );
}