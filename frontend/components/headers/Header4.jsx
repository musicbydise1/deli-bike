'use client';
import React, { useState } from 'react';
import Nav from './Nav';
import Link from 'next/link';
import Image from 'next/image';
import { carItemsSearch } from '@/data/cars';
export default function Header4() {
  const [searchQuery, setSearchQuery] = useState('');

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
    <header className="boxcar-header header-style-v7">
      <div className="header-inner">
        <div className="boxcar-container">
          {/* Main box */}
          <div className="c-box">
            <div className="logo-inner">
              <a href="#nav-mobile" className="menu">
                <div className="menu-btn">
                  <span />
                  <span />
                </div>
                menu
              </a>
              <a href="#" className="search">
                <div className="icon">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.3333 1.875H6.66667C5.4025 1.875 4.375 2.9025 4.375 4.16667V15.8333C4.375 17.0975 5.4025 18.125 6.66667 18.125H13.3333C14.5975 18.125 15.625 17.0975 15.625 15.8333V4.16667C15.625 2.9025 14.5975 1.875 13.3333 1.875ZM14.375 15.8333C14.375 16.4075 13.9075 16.875 13.3333 16.875H6.66667C6.0925 16.875 5.625 16.4075 5.625 15.8333V4.16667C5.625 3.5925 6.0925 3.125 6.66667 3.125H13.3333C13.9075 3.125 14.375 3.5925 14.375 4.16667V15.8333ZM11.4583 5C11.4583 5.345 11.1783 5.625 10.8333 5.625H9.16667C8.82167 5.625 8.54167 5.345 8.54167 5C8.54167 4.655 8.82167 4.375 9.16667 4.375H10.8333C11.1783 4.375 11.4583 4.655 11.4583 5Z"
                      fill="#050B20"
                    />
                  </svg>
                </div>
                +75 965 04 4542
              </a>
            </div>
            <div className="logo">
              <Link href={`/home-2`}>
                <Image alt="" title="Boxcar" src="/images/logo-deli.svg" width={108} height={26} />
              </Link>
            </div>
            {/*Nav Box*/}
            <div className="nav-out-bar">
              <nav className="nav main-menu">
                <ul className="navigation" id="navbar">
                  <Nav />
                </ul>
              </nav>
              {/* Main Menu End*/}
            </div>
            <div className="right-box">
              <div className="layout-search">
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
                      .filter(elm => elm.title.toLowerCase().includes(searchQuery.toLowerCase()))
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
                    <svg
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3114_6864)">
                        <path
                          d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                          fill="#405FF2"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3114_6864">
                          <rect width={14} height={14} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="btn">
                <Link href={`/add-listings`} className="header-btn-two btn-anim">
                  Add Listing
                </Link>
              </div>
              <div className="mobile-navigation">
                <a href="#nav-mobile" title="">
                  <svg
                    width={22}
                    height={11}
                    viewBox="0 0 22 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={22} height={2} fill="#050B20" />
                    <rect y={9} width={22} height={2} fill="#050B20" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Mobile Menu  */}
        </div>
      </div>
      {/* Header Search */}
      <div className="search-popup">
        <span className="search-back-drop" />
        <button className="close-search">
          <span className="fa fa-times" />
        </button>
        <div className="search-inner">
          <form onSubmit={e => e.preventDefault()} method="post">
            <div className="form-group">
              <input
                type="search"
                name="search-field"
                defaultValue=""
                placeholder="Search..."
                required
              />
              <button type="submit">
                <i className="fa fa-search" />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* End Header Search */}
      <div id="nav-mobile" />
    </header>
  );
}
