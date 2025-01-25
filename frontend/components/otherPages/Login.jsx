"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Импортируем useRouter
import Image from "next/image";

export default function Login() {
  const router = useRouter(); // Инициализация useRouter
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "courier", // Значение по умолчанию
  });
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

        // Получаем информацию о пользователе
        const userResponse = await fetch("http://localhost:4000/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
          throw new Error("Не удалось получить данные пользователя");
        }

        const userData = await userResponse.json();

        // Сохраняем данные пользователя в localStorage
        localStorage.setItem("userData", JSON.stringify(userData.data));
        // console.log(userData.data.roles[0].name);
          localStorage.setItem("userRole", userData.data.roles[0].name);

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
      if (registerData.password !== registerData.confirmPassword) {
          setErrorMessage("Пароли не совпадают");
          return;
      }
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

      // Перенаправление на страницу входа после успешной регистрации
      router.push("/dashboard");
    } catch (error) {
      console.error("Ошибка регистрации:", error.message);
      setErrorMessage(error.message);
    }
  };


    const handleRoleChange = (value) => {
        setRegisterData({ ...registerData, role: value });
        console.log("Выбрана роль:", value); // Для проверки
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
                        <label>Email</label>
                        <input
                            required
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={(e) =>
                                setLoginData({ ...loginData, email: e.target.value })
                            }
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
                              <label>Email</label>
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
                              />
                          </div>
                          <div className="form_boxes">
                              <label>Имя</label>
                              <input
                                  required
                                  type="text"
                                  name="firstName"
                                  value={registerData.firstName}
                                  onChange={(e) =>
                                      setRegisterData({
                                          ...registerData,
                                          firstName: e.target.value,
                                      })
                                  }
                              />
                          </div>
                          <div className="form_boxes">
                              <label>Фамилия</label>
                              <input
                                  required
                                  type="text"
                                  name="lastName"
                                  value={registerData.lastName}
                                  onChange={(e) =>
                                      setRegisterData({
                                          ...registerData,
                                          lastName: e.target.value,
                                      })
                                  }
                              />
                          </div>
                          <div className="form_boxes">
                              <label>Номер телефона</label>
                              <input
                                  required
                                  type="text"
                                  name="phoneNumber"
                                  value={registerData.phoneNumber}
                                  onChange={(e) =>
                                      setRegisterData({
                                          ...registerData,
                                          phoneNumber: e.target.value,
                                      })
                                  }
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
                              />
                          </div>
                          <div className="form_boxes">
                              <label>Подтверждение пароля</label>
                              <input
                                  required
                                  type="password"
                                  name="confirmPassword"
                                  value={registerData.confirmPassword || ""}
                                  onChange={(e) =>
                                      setRegisterData({
                                          ...registerData,
                                          confirmPassword: e.target.value,
                                      })
                                  }
                              />
                          </div>


                          <div className="main mb-4">
                              <input
                                  type="radio"
                                  name="role"
                                  className="check"
                                  id="courier"
                                  value="courier"
                                  checked={registerData.role === "courier"}
                                  onChange={(e) => handleRoleChange(e.target.value)}
                              />
                              <label for="courier">
                                  <div className="containerr">
                                      <div className="cRadioBtn">
                                          <div className="overlay"></div>
                                          <div className="drops xsDrop"></div>
                                          <div className="drops mdDrop"></div>
                                          <div className="drops lgDrop"></div>
                                      </div>
                                  </div>
                                  <span className="m-0">Курьер</span>
                              </label>
                              <input
                                  type="radio"
                                  name="role"
                                  className="check"
                                  id="corporate"
                                  value="corporate"
                                  checked={registerData.role === "corporate"}
                                  onChange={(e) => handleRoleChange(e.target.value)}
                              />
                              <label for="corporate">
                                  <div className="containerr">
                                      <div className="cRadioBtn">
                                          <div className="overlay"></div>
                                          <div className="drops xsDrop"></div>
                                          <div className="drops mdDrop"></div>
                                          <div className="drops lgDrop"></div>
                                      </div>
                                  </div>
                                  <span className="m-0">Корпоративный</span>
                              </label>
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
                        <p style={{color: "red"}}>{errorMessage}</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </section>
    );
}