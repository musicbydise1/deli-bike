"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import { BillingDetails } from "./BillingDetails";
import { OrderSummary } from "./OrderSummary";
import { PaymentOptions } from "./PaymentOptions";
import { useContextElement } from "@/context/Context";

export default function Checkout() {
  const { t } = useTranslation();
  const { cartProducts, totalPrice } = useContextElement();
  const router = useRouter();

  // Состояние для выбранного метода оплаты
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("direct_bank_transfer");

  // Состояние для данных пользователя
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    idCardFrontImage: "",
    idCardBackImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Загружаем данные пользователя из localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFormData({
          id: parsedData.id,
          firstName: parsedData.firstName || "",
          lastName: parsedData.lastName || "",
          address: parsedData.address || "",
          phoneNumber: parsedData.phoneNumber || "",
          email: parsedData.email || "",
          idCardFrontImage: parsedData.idCardFrontImage || "",
          idCardBackImage: parsedData.idCardBackImage || "",
        });
      } catch (error) {
        console.error("Ошибка парсинга userData", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const fileURL = URL.createObjectURL(files[0]);
      setFormData((prev) => ({
        ...prev,
        [name]: fileURL,
      }));
    }
  };

  const handleDeleteImage = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
  };

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(formData));
    setIsEditing(false);
  };

  // Функция для оформления заказа
  const handleOrder = async () => {
    // Подготовка данных для создания аренды
    const rentalPayload = {
      userId: formData.id,
      bikeId: cartProducts[0].id,
      startDate: "2023-03-01",
      endDate: "2023-03-05",
      totalPrice: totalPrice,
    };

    try {
      // Создаем аренду
      const rentalResponse = await fetch("http://localhost:4000/rentals/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rentalPayload),
      });
      if (!rentalResponse.ok) {
        throw new Error("Ошибка создания аренды: " + rentalResponse.status);
      }
      const rentalData = await rentalResponse.json();
      console.log("Аренда создана:", rentalData);

      // Создаем платеж
      const paymentPayload = {
        userId: formData.id,
        rentalId: rentalData.data.id,
        amount: totalPrice,
        paymentMethod: selectedPaymentMethod,
        status: "pending",
      };
      const paymentResponse = await fetch("http://localhost:4000/payments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentPayload),
      });
      if (!paymentResponse.ok) {
        throw new Error("Ошибка создания платежа: " + paymentResponse.status);
      }
      const paymentData = await paymentResponse.json();
      console.log("Платеж создан:", paymentData);

      // Перенаправляем пользователя в зависимости от метода оплаты
      if (selectedPaymentMethod === "direct_bank_transfer") {
        router.push("/invoice");
      } else if (selectedPaymentMethod === "cash") {
        router.push("/payment-requisites");
      }
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
      // Здесь можно вывести уведомление пользователю
    }
  };

  return (
      <section className="checkout-section layout-radius">
        <div className="boxcar-container">
          <div className="boxcar-title-three">
            <ul className="breadcrumb">
              <li>
                <Link href={`/`}>{t("breadcrumb.home")}</Link>
              </li>
              <li>
                <Link href={`/cart`}>{t("breadcrumb.cart")}</Link>
              </li>
              <li>
                <span>Оформление заказа</span>
              </li>
            </ul>
            <h2>{t("checkout.title")}</h2>
          </div>
          <div className="row">
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column" style={{ position: "relative" }}>
                <h6 className="title">{t("checkout.billingDetails")}</h6>
                <BillingDetails
                    isEditing={isEditing}
                    formData={formData}
                    onEdit={() => setIsEditing(true)}
                    onChange={handleChange}
                    onFileChange={handleFileChange}
                    onDeleteImage={handleDeleteImage}
                />
                {isEditing && (
                    <div className="form-submit" style={{ marginTop: "1rem" }}>
                      <Button variant="primary" className="w-full !ml-0" onClick={handleSave}>
                        Сохранить
                      </Button>
                    </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="side-bar">
                <OrderSummary cartProducts={cartProducts} totalPrice={totalPrice} t={t} />
                <PaymentOptions
                    selectedPaymentMethod={selectedPaymentMethod}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                    t={t}
                />
                <div className="form-submit">
                  <Button variant="primary" className="w-full !ml-0" onClick={handleOrder}>
                    Заказать
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}