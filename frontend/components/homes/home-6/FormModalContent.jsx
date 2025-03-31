"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import InputMask from "react-input-mask";
import { AiOutlineCheckCircle } from "react-icons/ai";
import styles from "../../../public/css/pages/home/FormModalContent.module.css";
import Button from "@/components/ui/button/Button";

export default function FormModalContent() {
    // Добавляем новое поле companyName в formData
    const [formData, setFormData] = useState({
        title: "",
        name: "",
        companyName: "",
        phone: "",
        email: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [userRole, setUserRole] = useState("courier");
    const [locationState, setLocationState] = useState("kz"); // "kz" по умолчанию
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Определяем роль пользователя из cookies
    useEffect(() => {
        const cookies = document.cookie.split(";").map(cookie => cookie.trim());
        const roleCookie = cookies.find(cookie => cookie.startsWith("userRole="));
        if (roleCookie) {
            const role = roleCookie.split("=")[1];
            setUserRole(role);
        }
    }, []);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            title: userRole === "corporate"
                ? "Заявка от корпоративного клиента на сайте"
                : "Заявка от курьера на сайте"
        }));
    }, [userRole]);

    // Определяем локацию из cookies (kz или by)
    useEffect(() => {
        const cookies = document.cookie.split(";").map(cookie => cookie.trim());
        const locCookie = cookies.find(cookie => cookie.startsWith("location="));
        if (locCookie) {
            const loc = locCookie.split("=")[1];
            setLocationState(loc);
        }
    }, []);

    // Определяем маску для телефона и ожидаемую длину цифр
    const phoneMask =
        locationState === "by" ? "+375 (99) 999-99-99" : "+7 (999) 999-99-99";
    const expectedDigitsLength = locationState === "by" ? 12 : 11;

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
            const response = await fetch(`${API_URL}/lead`, {
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

    // Выбираем заголовок формы в зависимости от роли пользователя
    const formTitle =
        userRole === "corporate"
            ? "Оставьте заявку, чтобы стать нашим партнёром"
            : "ЗАПОЛНИТЕ ФОРМУ";

    // Вычисляем, сколько цифр введено в поле телефона
    const digits = formData.phone.replace(/\D/g, "");
    const isPhoneFilled = digits.length === expectedDigitsLength;

    return (
        <div className={styles.formWrap}>
            <h2 className={styles.formTitle}>{formTitle}</h2>
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
                {userRole === "corporate" && (
                    <div className={styles.formGroup}>
                        <label className="modalLabel" htmlFor="companyName">Название компании</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            placeholder="Название компании"
                            className="modalInput"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div className={styles.formGroup} style={{ position: "relative" }}>
                    <label className="modalLabel" htmlFor="phone">Телефон</label>
                    {/* Флаг слева внутри поля */}
                    <div style={{
                        position: "absolute",
                        left: "10px",
                        top: "63%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        width: "24px",
                        height: "24px"
                    }}>
                        <Image
                            src={locationState === "by" ? "/images/belarus-flag.svg" : "/images/kazakhstan-flag.svg"}
                            alt={locationState === "by" ? "Belarus flag" : "Kazakhstan flag"}
                            width={24}
                            height={24}
                        />
                    </div>
                    <InputMask
                        mask={phoneMask}
                        maskPlaceholder=""
                        alwaysShowMask={false}
                        value={formData.phone}
                        onChange={handleChange}
                    >
                        {(inputProps) => (
                            <input
                                {...inputProps}
                                type="tel"
                                placeholder={locationState === "by" ? "+375" : "+7"}
                                name="phone"
                                id="phone"
                                className="modalInput"
                                required
                                // Добавляем отступ слева для флага
                                style={{ paddingLeft: "40px", paddingRight: "40px" }}
                            />
                        )}
                    </InputMask>
                    {isPhoneFilled && (
                        <AiOutlineCheckCircle
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "68%",
                                transform: "translateY(-50%)",
                                color: "green",
                                fontSize: "22px",
                            }}
                        />
                    )}
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
                <Button
                    variant="primary"
                    className="w-full mt-2"
                    type="submit"
                    disabled={!isPhoneFilled}
                >
                    Отправить &nbsp;&rarr;
                </Button>
            </form>
        </div>
    );
}