'use client';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Link from 'next/link';
import Image from 'next/image';
import { carItemsSearch } from '@/data/cars';

export default function Header3() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Состояние авторизации
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token); // Если токен есть, пользователь авторизован
  }, []);

  const handleFocus = () => {
    document.getElementById('box-content-search').classList.add('active');
    document.getElementById('box-content-search').closest('.layout-search').classList.add('active');
  };

  const handleBlur = () => {
    document.getElementById('box-content-search').classList.remove('active');
    document
      .getElementById('box-content-search')
      .closest('.layout-search')
      .classList.remove('active');
  };

  return (
    <header className="boxcar-header hheader-style-v4 v6">
      <div className="header-inner">
        <div className="boxcar-container">
          {/* Main box */}
          <div className="c-box">
            <div className="nav-list">
              <div className="logo-inner">
                <div className="logo">
                  <Link href={`/home-2`}>
                    <Image
                      alt=""
                      title="Boxcar"
                      src="/images/logo-deli-dark.svg"
                      width={108}
                      height={26}
                    />
                  </Link>
                </div>
              </div>
              {/* Nav Box */}
              <div className="nav-out-bar">
                <nav className="nav main-menu">
                  <ul className="navigation" id="navbar">
                    {/* Показываем навигацию только если пользователь авторизован */}
                    {isAuthenticated && <Nav />}
                  </ul>
                </nav>
                {/* Main Menu End */}
              </div>
            </div>
            <div className="right-box">
              {isAuthenticated ? (
                <>
                  <div className="layout-search style1">
                    <div className="search-box">
                      <svg
                        className="icon"
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.29301 1.2876C3.9872 1.2876 1.29431 3.98048 1.29431 7.28631C1.29431 10.5921 3.9872 13.2902 7.29301 13.2902C8.70502 13.2902 10.0036 12.7954 11.03 11.9738L13.5287 14.4712C13.6548 14.5921 13.8232 14.6588 13.9979 14.657C14.1725 14.6552 14.3395 14.5851 14.4631 14.4617C14.5867 14.3382 14.6571 14.1713 14.6591 13.9967C14.6611 13.822 14.5947 13.6535 14.474 13.5272L11.9753 11.0285C12.7976 10.0006 13.293 8.69995 13.293 7.28631C13.293 3.98048 10.5988 1.2876 7.29301 1.2876ZM7.29301 2.62095C9.87824 2.62095 11.9584 4.70108 11.9584 7.28631C11.9584 9.87153 9.87824 11.9569 7.29301 11.9569C4.70778 11.9569 2.62764 9.87153 2.62764 7.28631C2.62764 4.70108 4.70778 2.62095 7.29301 2.62095Z"
                          fill="white"
                        />
                      </svg>
                      <input
                        type="search"
                        placeholder="Search Cars eg. Audi Q7"
                        className="show-search"
                        name="name"
                        tabIndex={2}
                        defaultValue=""
                        aria-required="true"
                        required
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="box-content-search" id="box-content-search">
                      <ul className="box-car-search">
                        {carItemsSearch
                          .filter(elm =>
                            elm.title.toLowerCase().includes(searchQuery.toLowerCase()),
                          )
                          .map(car => (
                            <li key={car.id}>
                              <Link
                                href={`/inventory-page-single-v1/${car.id}`}
                                className="car-search-item"
                              >
                                <div className="box-img">
                                  <Image alt="img" src={car.imgSrc} width={70} height={70} />
                                </div>
                                <div className="info">
                                  <p className="name">{car.title}</p>
                                  <span className="price">${car.newPrice}</span>
                                </div>
                              </Link>
                            </li>
                          ))}
                      </ul>
                      <Link href={`/inventory-page-single-v1`} className="btn-view-search">
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="btn">
                    <Link href={`/dashboard`} className="header-btn-two">
                      Личный кабинет
                    </Link>
                  </div>
                  <div className="btn">
                    <Link href={`/add-listings`} className="header-btn-two">
                      Добавить Заказ
                    </Link>
                  </div>
                </>
              ) : (
                <Link href={`/login`} title="" className="box-account">
                  <div className="icon">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_147_6490)">
                        <path
                          d="M7.99998 9.01221C3.19258 9.01221 0.544983 11.2865 0.544983 15.4161C0.544983 15.7386 0.806389 16.0001 1.12892 16.0001H14.871C15.1935 16.0001 15.455 15.7386 15.455 15.4161C15.455 11.2867 12.8074 9.01221 7.99998 9.01221ZM1.73411 14.8322C1.9638 11.7445 4.06889 10.1801 7.99998 10.1801C11.9311 10.1801 14.0362 11.7445 14.2661 14.8322H1.73411Z"
                          fill="#FF8517"
                        />
                        <path
                          d="M7.99999 0C5.79171 0 4.12653 1.69869 4.12653 3.95116C4.12653 6.26959 5.86415 8.15553 7.99999 8.15553C10.1358 8.15553 11.8735 6.26959 11.8735 3.95134C11.8735 1.69869 10.2083 0 7.99999 0ZM7.99999 6.98784C6.50803 6.98784 5.2944 5.62569 5.2944 3.95134C5.2944 2.3385 6.43231 1.16788 7.99999 1.16788C9.54259 1.16788 10.7056 2.36438 10.7056 3.95134C10.7056 5.62569 9.49196 6.98784 7.99999 6.98784Z"
                          fill="#FF8517"
                        />
                      </g>
                    </svg>
                  </div>
                  Войти
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="nav-mobile" />
    </header>
  );
}
