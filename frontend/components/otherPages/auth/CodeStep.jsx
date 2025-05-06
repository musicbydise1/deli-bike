import React, { useState, useRef, useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function CodeStep({ handleCodeSubmit, handleResendCode }) {
    // Массив для хранения 4 цифр кода
    const [otp, setOtp] = useState(["", "", "", ""]);
    // Ссылки на инпуты для управления фокусом и классами
    const inputRefs = useRef([]);

    // Таймер для повторной отправки кода (60 секунд)
    const [counter, setCounter] = useState(60);
    // Состояние загрузки при отправке кода
    const [isLoading, setIsLoading] = useState(false);

    // Запускаем обратный отсчёт
    useEffect(() => {
        if (counter <= 0) return;
        const timerId = setTimeout(() => {
            setCounter(counter - 1);
        }, 1000);
        return () => clearTimeout(timerId);
    }, [counter]);

    // Асинхронная отправка кода с отображением загрузки
    const submitCode = async (code) => {
        setIsLoading(true);
        try {
            await handleCodeSubmit(code);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Проверка, заполнены ли все поля, и автоматическое подтверждение
    const checkAndSubmit = (newOtp) => {
        if (newOtp.every((digit) => digit !== "")) {
            submitCode(newOtp.join(""));
        }
    };

    // Обработка ввода в инпут
    const handleChange = (value, index) => {
        if (isLoading) return;
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length > 1) {
            handlePaste(cleaned, index);
            return;
        }
        const newOtp = [...otp];
        newOtp[index] = cleaned;
        setOtp(newOtp);

        const inputEl = inputRefs.current[index];
        if (inputEl) {
            cleaned ? inputEl.classList.add("filled") : inputEl.classList.remove("filled");
        }
        if (cleaned && index < 3) {
            inputRefs.current[index + 1].focus();
        }
        checkAndSubmit(newOtp);
    };

    // Обработка нажатия клавиши Backspace
    const handleKeyDown = (e, index) => {
        if (isLoading) return;
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Функция обработки вставки кода
    const handlePaste = (pastedValue, index) => {
        if (isLoading) return;
        const cleanedData = pastedValue.replace(/\D/g, "");
        if (!cleanedData) return;
        const newOtp = [...otp];
        cleanedData.split("").forEach((digit, i) => {
            if (index + i < 4) {
                newOtp[index + i] = digit;
                const inputEl = inputRefs.current[index + i];
                if (inputEl) inputEl.classList.add("filled");
            }
        });
        setOtp(newOtp);
        const nextEmpty = newOtp.findIndex((digit) => digit === "");
        if (nextEmpty !== -1) inputRefs.current[nextEmpty].focus();
        checkAndSubmit(newOtp);
    };

    // Обработчик события paste для инпута
    const onPaste = (e, index) => {
        e.preventDefault();
        handlePaste(e.clipboardData.getData("Text"), index);
    };

    // Обёртка для вызова handleResendCode и сброса таймера
    const onResendClick = () => {
        if (isLoading) return;
        handleResendCode();
        setCounter(60);
    };

    return (
        <div className="form-box">
            <h2 className="code-step-title">Введите смс код</h2>
            {isLoading ? (
                <div
                    className="loading-wrapper"
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}
                >
                    <AiOutlineLoading size={70} className="animate-spin" />
                </div>
            ) : (
                <>
                    <p className="code-step-subtitle">
                        SMS с кодом отправлено. Если не получите сообщение в течение 2 минут,
                        вам позвонит наш робот. Последние 4 цифры номера будут кодом для входа.
                        Не нужно отвечать на звонок.
                    </p>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="otp-container">
                            {[0, 1, 2, 3].map((i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    className="otp-input"
                                    value={otp[i]}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    onPaste={(e) => onPaste(e, i)}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    disabled={isLoading}
                                />
                            ))}
                        </div>

                        <div className="resend-wrapper" style={{ position: "relative", height: "2rem" }}>
                            <button
                                type="button"
                                className="resend-button"
                                onClick={onResendClick}
                                disabled={counter > 0 || isLoading}
                                style={{
                                    opacity: counter === 0 ? 1 : 0,
                                    pointerEvents: counter === 0 ? "auto" : "none",
                                    display: counter > 0 ? "none" : "block",
                                    transition: "opacity 1s ease-in-out",
                                    position: "absolute",
                                    width: "100%",
                                }}
                            >
                                Выслать новый код
                            </button>

                            <div
                                className="resend-timer"
                                style={{
                                    opacity: counter > 0 ? 1 : 0,
                                    display: counter > 0 ? "block" : "none",
                                    transition: "opacity 1s ease-in-out",
                                    position: "absolute",
                                    width: "100%",
                                    textAlign: "center",
                                    lineHeight: "2rem",
                                }}
                            >
                                Получить новый код можно через {counter} секунд
                            </div>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
