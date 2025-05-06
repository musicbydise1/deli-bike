import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import InputMask from "react-input-mask";
import { AiOutlineCheckCircle, AiOutlineLoading } from "react-icons/ai";

export default function PhoneStep({ phone, setPhone, handlePhoneSubmit }) {
    // Подсчитываем только цифры (включая введённую '7')
    const digits = phone.replace(/\D/g, "");
    // Считаем маску заполненной, если ровно 11 цифр (например, +7 и ещё 10 цифр)
    const isPhoneFilled = digits.length === 11;

    // Состояние загрузки при отправке
    const [isLoading, setIsLoading] = useState(false);

    // Обёртка для отправки номера
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isPhoneFilled) return;
        setIsLoading(true);
        try {
            await handlePhoneSubmit(e);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-box">
            <div className="login-text">
                <h2>Введите номер телефона</h2>
                <p>Для входа в личный кабинет</p>
            </div>

            <form onSubmit={onSubmit}>
                <div className="form_boxes" style={{ position: "relative" }}>
                    <label>Телефон</label>

                    <InputMask
                        mask="+7 (999) 999-99-99"
                        maskPlaceholder=""
                        alwaysShowMask={false}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    >
                        {(inputProps) => (
                            <input
                                {...inputProps}
                                required
                                type="tel"
                                placeholder="+7"
                                name="phone"
                                style={{ paddingRight: "40px" }}
                            />
                        )}
                    </InputMask>

                    {/* Галочка, если пользователь ввёл все 11 цифр */}
                    {isPhoneFilled && (
                        <AiOutlineCheckCircle
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "green",
                                fontSize: "22px",
                            }}
                        />
                    )}
                </div>

                <div className="form-submit">
                    {/* Кнопка неактивна, пока номер не заполнен или идёт загрузка */}
                    <Button
                        className="w-full !ml-0"
                        variant="primary"
                        type="submit"
                        disabled={!isPhoneFilled || isLoading}
                    >
                        {isLoading ? (
                            <AiOutlineLoading className="animate-spin text-xl" />
                        ) : (
                            "Получить код"
                        )}
                    </Button>
                    <Button
                        className="w-full !ml-0 mt-4"
                        variant="secondary"
                        onClick={() => window.open('https://t.me/DeliBikeBot', '_blank')}
                    >
                        Привязать Telegram
                    </Button>
                </div>

                <div className="politic-privacy">
                    <p>
                        Вводя номер телефона, вы соглашаетесь с{' '}
                        <Link href={`/terms`}>
                            <span>Политикой Конфиденциальности</span>
                        </Link>{' '}
                        и даёте{' '}
                        <Link href={`/`}>
                            <span>Согласие на обработку персональных данных</span>
                        </Link>.
                    </p>
                </div>
            </form>
        </div>
    );
}
