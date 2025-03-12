"use client";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import "../../../../public/css/pages/login/Login.css"

export default function CorporateLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // useEffect(() => {
    //     const userRole = localStorage.getItem("userRole");
    //     if (userRole !== "admin" || userRole !== "corporate") {
    //         router.push("/login");
    //     }
    // }, [router]);

    const handleCorporateLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/auth/other-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Ошибка авторизации");
            }



            // Сохраняем полученные данные в localStorage
            localStorage.setItem("accessToken", data.data.accessToken);

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

            // Перенаправляем на корпоративную панель
            router.push("/dashboard");
        } catch (error) {
            console.error("Ошибка авторизации:", error.message);
        }
    };

    return (
        <section className="login-section layout-radius" style={{ background: "transparent" }}>
            <div className="inner-container">
                <div className="right-box">
                    <div className="form-sec">
                        {/* Вывод ошибки, если есть */}
                        <div className="login-text mb-4">
                            <h2>Вход для корпоративных клиентов</h2>
                        </div>
                        <form onSubmit={handleCorporateLogin}>
                            <div className="form_boxes">
                                <label>Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form_boxes">
                                <label>Пароль</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-submit">
                                <Button className="w-full !ml-0" variant="primary" type="submit">
                                    Войти
                                </Button>
                            </div>
                        </form>
                        <div className="politic-privacy">
                            <p>
                                Вводя данные, вы соглашаетесь с{" "}
                                <Link href="/terms">
                                    <span>Политикой Конфиденциальности</span>
                                </Link>{" "}
                                и{" "}
                                <Link href="/terms">
                                    <span>Согласием на обработку персональных данных</span>
                                </Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}