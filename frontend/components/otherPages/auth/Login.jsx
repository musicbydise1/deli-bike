"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../../public/css/pages/login/Login.css";

// Компоненты шагов
import PhoneStep from "./PhoneStep";
import CodeStep from "./CodeStep";
import RegisterStep from "./RegisterStep";
import ErrorMessage from "./ErrorMessage";

export default function Login() {
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const userRole = localStorage.getItem("userRole");
        if (userRole === "admin" || userRole === "corporate") {
            router.push("/other-login");
        }
    }, [router]);

    // Шаги авторизации: phone -> code -> register
    const [step, setStep] = useState("phone");

    // Вводимые данные
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");

    // Данные для регистрации
    const [registerData, setRegisterData] = useState({
        phoneNumber: "", // Предзаполним при переходе к регистрации
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        role: "courier", // Значение по умолчанию
    });

    const [errorMessage, setErrorMessage] = useState("");

    // 1. Отправка телефона для получения кода
    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        // Преобразуем номер телефона в формат с цифрами без лишних символов
        const formattedPhone = phone.replace(/\D/g, "");

        try {
            const response = await fetch(`${API_URL}/auth/sendCode`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: formattedPhone }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Ошибка при отправке кода");
            }

            setStep("code");
        } catch (error) {
            console.error("Ошибка при отправке телефона:", error.message);
            setErrorMessage(error.message);
        }
    };

    // 2. Проверка кода и авторизация
    const handleCodeSubmit = async (codeStr) => {
        setErrorMessage("");
        // Обновляем состояние кода
        setCode(codeStr);
        const formattedPhone = phone.replace(/\D/g, "");
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: formattedPhone, code: codeStr }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Ошибка проверки кода");
            }

            if (data.isSuccess) {
                if (data.data.registrationRequired) {
                    // Сохраняем код и номер телефона в registerData,
                    // чтобы при регистрации они были переданы в body
                    setRegisterData((prev) => ({
                        ...prev,
                        phoneNumber: formattedPhone,
                        code: codeStr,
                    }));
                    setStep("register");
                } else {
                    localStorage.setItem("accessToken", data.data.accessToken);

                    // Дозапрашиваем профиль
                    const userResponse = await fetch(`${API_URL}/user/profile`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${data.data.accessToken}`,
                        },
                    });

                    const userData = await userResponse.json();

                    localStorage.setItem("userData", JSON.stringify(userData.data));
                    localStorage.setItem("userRole", userData.data.roles[0].name);

                    router.push("/dashboard");
                }
            } else {
                throw new Error("Ошибка авторизации");
            }
        } catch (error) {
            console.error("Ошибка при проверке кода:", error.message);
            setErrorMessage(error.message);
        }
    };

    const handleResendCode = async () => {
        setErrorMessage("");

        const formattedPhone = phone.replace(/\D/g, "");

        try {
            const response = await fetch(`${API_URL}/auth/sendCode`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: formattedPhone }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Ошибка при отправке кода");
            }
            // Можно добавить уведомление об успешной отправке кода
        } catch (error) {
            console.error("Ошибка при отправке телефона:", error.message);
            setErrorMessage(error.message);
        }
    };

    // 3. Регистрация (если пользователь не найден)
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const frontImageUrl = registerData.idCardFrontImage
                ? URL.createObjectURL(registerData.idCardFrontImage)
                : "";
            const backImageUrl = registerData.idCardBackImage
                ? URL.createObjectURL(registerData.idCardBackImage)
                : "";

            // Извлекаем ненужные поля, оставляя остальные (в том числе code)
            const { password, confirmPassword, ...rest } = registerData;

            const body = {
                ...rest,
                idCardFrontImage: frontImageUrl,
                idCardBackImage: backImageUrl,
            };

            console.log(body);

            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            localStorage.setItem("accessToken", data.data.accessToken);

            // Дозапрашиваем профиль
            const userResponse = await fetch(`${API_URL}/user/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.data.accessToken}`,
                },
            });

            const userData = await userResponse.json();

            localStorage.setItem("userData", JSON.stringify(userData.data));
            localStorage.setItem("userRole", userData.data.roles[0].name);

            router.push("/dashboard");
        } catch (error) {
            console.error("Ошибка регистрации:", error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <section
            className="login-section layout-radius"
            style={{ background: "transparent" }}
        >
            <div className="inner-container">
                <div className="right-box">
                    <div className="form-sec">
                        {/* Сообщение об ошибке (если есть) */}
                        <ErrorMessage errorMessage={errorMessage} />

                        {/* Отображаем нужный шаг */}
                        {step === "phone" && (
                            <PhoneStep
                                phone={phone}
                                setPhone={setPhone}
                                handlePhoneSubmit={handlePhoneSubmit}
                            />
                        )}

                        {step === "code" && (
                            <CodeStep
                                code={code}
                                setCode={setCode}
                                handleCodeSubmit={handleCodeSubmit}
                                handleResendCode={handleResendCode}
                            />
                        )}

                        {step === "register" && (
                            <RegisterStep
                                registerData={registerData}
                                setRegisterData={setRegisterData}
                                handleRegisterSubmit={handleRegisterSubmit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}