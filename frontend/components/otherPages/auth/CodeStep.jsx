import React, { useState, useRef, useEffect } from "react";

export default function CodeStep({ handleCodeSubmit, handleResendCode }) {
    // Массив для хранения 4 цифр кода
    const [otp, setOtp] = useState(["", "", "", ""]);
    // Ссылки на инпуты для управления фокусом и классами
    const inputRefs = useRef([]);

    // Таймер для повторной отправки кода (60 секунд)
    const [counter, setCounter] = useState(60);

    // Запускаем обратный отсчёт
    useEffect(() => {
        if (counter <= 0) return; // Если время вышло, ничего не делаем
        const timerId = setTimeout(() => {
            setCounter(counter - 1);
        }, 1000);
        return () => clearTimeout(timerId);
    }, [counter]);

    // Проверка, заполнены ли все поля, и автоматическое подтверждение
    const checkAndSubmit = (newOtp) => {
        if (newOtp.every((digit) => digit !== "")) {
            handleCodeSubmit(newOtp.join(""));
        }
    };

    // Обработка ввода в инпут
    const handleChange = (value, index) => {
        // Убираем нецифровые символы
        const cleaned = value.replace(/\D/g, "");

        // Если введено сразу несколько цифр – обрабатываем как вставку
        if (cleaned.length > 1) {
            handlePaste(cleaned, index);
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = cleaned;
        setOtp(newOtp);

        // Добавляем или убираем класс 'filled' у текущего инпута
        const inputEl = inputRefs.current[index];
        if (cleaned) {
            inputEl.classList.add("filled");
        } else {
            inputEl.classList.remove("filled");
        }

        // Если введена цифра и не последний инпут – переводим фокус на следующий
        if (cleaned && index < 3) {
            inputRefs.current[index + 1].focus();
        }

        checkAndSubmit(newOtp);
    };

    // Обработка нажатия клавиши Backspace:
    // Если поле пустое, переводим фокус на предыдущее
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Функция обработки вставки кода (paste)
    // pastedValue — строка с цифрами, index — с какого инпута начинать вставку
    const handlePaste = (pastedValue, index) => {
        // Оставляем только цифры
        const cleanedData = pastedValue.replace(/\D/g, "");
        if (!cleanedData) return;

        const newOtp = [...otp];
        // Заполняем инпуты начиная с index
        for (let i = 0; i < cleanedData.length; i++) {
            if (index + i < 4) {
                newOtp[index + i] = cleanedData[i];
                const inputEl = inputRefs.current[index + i];
                if (inputEl) {
                    inputEl.classList.add("filled");
                }
            }
        }
        setOtp(newOtp);

        // Если есть незаполненное поле – переводим фокус на него
        const nextEmpty = newOtp.findIndex((digit) => digit === "");
        if (nextEmpty !== -1) {
            inputRefs.current[nextEmpty].focus();
        }

        checkAndSubmit(newOtp);
    };

    // Обработчик события paste для инпута
    const onPaste = (e, index) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("Text");
        handlePaste(pastedData, index);
    };

    // Обёртка для вызова handleResendCode и сброса таймера
    const onResendClick = () => {
        handleResendCode();
        setCounter(60);
    };

    return (
        <div className="form-box">
            <h2 className="code-step-title">Введите смс код</h2>
            <p className="code-step-subtitle">
                SMS с кодом отправлено. Если не получите сообщение в течение 2&nbsp;минут,
                вам позвонит наш робот. Последние 4&nbsp;цифры номера будут кодом для входа.
                Не нужно отвечать на звонок.
            </p>

            {/* Оборачиваем в форму для семантики, но сабмит не нужен */}
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
                        />
                    ))}
                </div>

                {/* Обёртка для кнопки и текстового сообщения с таймером */}
                <div className="resend-wrapper" style={{position: "relative", height: "2rem"}}>
                    {/* Кнопка "Выслать новый код" */}
                    <button
                        type="button"
                        className="resend-button"
                        onClick={onResendClick}
                        disabled={counter > 0}
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

                    {/* Текст с оставшимся временем */}
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
        </div>
    );
}