"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Импортируем useRouter
import Image from "next/image";

export default function Login() {
  const router = useRouter(); // Инициализация useRouter
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Обработчик для авторизации
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка входа");
      }

      const result = await response.json();

      if (result.isSuccess) {
        const token = result.data.accessToken;

        // Сохраняем токен в localStorage
        localStorage.setItem("accessToken", token);

        // Перенаправление на главную страницу
        router.push("/dashboard");
      } else {
        throw new Error(result.message || "Ошибка входа");
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error.message);
      setErrorMessage(error.message);
    }
  };


  // Обработчик для регистрации
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка регистрации");
      }

      const data = await response.json();
      console.log("Успешная регистрация:", data);
      localStorage.setItem("token", data.token);

      // Перенаправление на страницу входа после успешной регистрации
      router.push("/dashboard");
    } catch (error) {
      console.error("Ошибка регистрации:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
      <section className="login-section layout-radius">
        <div className="inner-container">
          <div className="right-box">
            <div className="form-sec">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                      className="nav-link active"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                  >
                    Вход
                  </button>
                  <button
                      className="nav-link"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                  >
                    Регистрация
                  </button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                >
                  <div className="form-box">
                    <form onSubmit={handleLoginSubmit}>
                      <div className="form_boxes">
                        <label>Электронная почта</label>
                        <input
                            required
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({ ...loginData, email: e.target.value })
                            }
                            placeholder="example@gmail.com"
                        />
                      </div>
                      <div className="form_boxes">
                        <label>Пароль</label>
                        <input
                            required
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={(e) =>
                                setLoginData({ ...loginData, password: e.target.value })
                            }
                            placeholder="********"
                        />
                      </div>
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Войти
                          <Image
                              alt=""
                              src="/images/arrow.svg"
                              width={14}
                              height={14}
                          />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                >
                  <div className="form-box two">
                    <form onSubmit={handleRegisterSubmit}>
                      <div className="form_boxes">
                        <label>Электронная почта</label>
                        <input
                            required
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={(e) =>
                                setRegisterData({
                                  ...registerData,
                                  email: e.target.value,
                                })
                            }
                            placeholder="example@gmail.com"
                        />
                      </div>
                      <div className="form_boxes">
                        <label>Пароль</label>
                        <input
                            required
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={(e) =>
                                setRegisterData({
                                  ...registerData,
                                  password: e.target.value,
                                })
                            }
                            placeholder="********"
                        />
                      </div>
                      <div className="form-submit">
                        <button type="submit" className="theme-btn">
                          Регистрация
                          <Image
                              alt=""
                              src="/images/arrow.svg"
                              width={14}
                              height={14}
                          />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {errorMessage && (
                  <div className="error-message">
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  </div>
              )}
            </div>
          </div>
        </div>
      </section>
  );
}
