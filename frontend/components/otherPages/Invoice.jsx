'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Invoice() {
  const { cartProducts, totalPrice } = useCart();

  // Локальный стейт для хранения данных пользователя
  const [userData, setUserData] = useState(null);

  // Получаем сегодняшнюю дату в формате RU
  const currentDate = new Date().toLocaleDateString('ru-RU');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
        } catch (error) {
          console.error('Ошибка парсинга userData из localStorage:', error);
        }
      }
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDownloadPDF = () => {
    console.log('Загрузка PDF-файла...');
  };

  const firstName = userData?.firstName || 'Имя';
  const lastName = userData?.lastName || 'Фамилия';
  const address = userData?.address || 'Адрес не указан';
  const email = userData?.email || 'Почта не указана';
  const phoneNumber = userData?.phoneNumber || 'Телефон не указан';

  return (
    <section className="invoice-section">
      <div className="cus-container2">
        <div className="top flex items-center gap-3">
          <a onClick={handlePrint} className="btn-default cursor-pointer">
            Распечатать счёт
            <svg
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block ml-2"
            >
              <path
                d="M13.6111 0H5.05558C4.84062 0 4.66668 0.173943 4.66668 0.388901C4.66668 0.603859 4.84062 0.777802 5.05558 0.777802H12.6723L0.113941 13.3362C-0.0379805 13.4881 -0.0379805 13.7342 0.113941 13.8861C0.189884 13.962 0.289415 14 0.38891 14C0.488405 14 0.5879 13.962 0.663879 13.8861L13.2222 1.3277V8.94447C13.2222 9.15943 13.3962 9.33337 13.6111 9.33337C13.8261 9.33337 14 9.15943 14 8.94447V0.388901C14 0.173943 13.8261 0 13.6111 0Z"
                fill="white"
              />
            </svg>
          </a>

          <button onClick={handleDownloadPDF} className="btn-default">
            Скачать PDF
          </button>

          <Link href="/dashboard" className="btn-default">
            Личный кабинет
          </Link>
        </div>

        <div className="box-invoice">
          <div className="header">
            <div className="wrap-top">
              <div className="box-left">
                <div className="logo">
                  <Image
                    alt="DeliBike"
                    title="DeliBike"
                    src="/images/logo-deli-dark2.svg"
                    width={111}
                    height={48}
                  />
                </div>
              </div>
              <div className="box-right">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="title">Счёт №</div>
                  <span className="code-num">0043128641</span>
                </div>
              </div>
            </div>
            <div className="wrap-date">
              <div className="box-left">
                <label>Дата счёта:</label>
                <span className="date">{currentDate}</span>
              </div>
              <div className="box-right">
                <label>Дата оплаты:</label>
                <span className="date">{currentDate}</span>
              </div>
            </div>
            <div className="wrap-info">
              <div className="box-left">
                <div className="title">Поставщик</div>
                <div className="sub">MD Line (МД Лайн)</div>
                <p className="desc">Суюнбая</p>
              </div>
              <div className="box-right">
                <div className="title">Клиент</div>
                <div className="sub">
                  {firstName} {lastName}
                </div>
                <p className="desc">
                  {address} <br />
                  {email} <br />
                  {phoneNumber}
                </p>
              </div>
            </div>
            <div className="wrap-table">
              <table className="invoice-table">
                <thead>
                  <tr className="title">
                    <th>Описание</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Итого</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((elm, i) => (
                    <tr key={i} className="content">
                      <td>
                        {elm.name} {elm.model}
                      </td>
                      <td>{elm.price.toLocaleString('ru-RU')} ₸</td>
                      <td>{elm.quantity}</td>
                      <td>{(elm.price * elm.quantity).toLocaleString('ru-RU')} ₸</td>
                    </tr>
                  ))}
                  <tr className="content">
                    <td className="total">Итог к оплате</td>
                    <td />
                    <td />
                    <td className="total">{totalPrice.toLocaleString('ru-RU')} ₸</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="footer">
            <ul className="box-contact">
              <li>www.delibike.kz</li>
              <li>info@delibike.kz</li>
              <li>+7 (123) 123 45-67</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
