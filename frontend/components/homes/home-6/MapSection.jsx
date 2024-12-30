import React from "react";

export default function MapSection() {
  return (
    <section className="map-section">
      <div className="goole-iframe">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2901.4430458537927!2d76.964199586225!3d43.34684239773496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836d2b9c3841a3%3A0x5bf46e5d424c322c!2z0L_RgNC-0YHQvy4g0KHRg9GO0L3QsdCw0Y8gNDE5LCDQkNC70LzQsNGC0Ys!5e0!3m2!1sru!2skz!4v1733723200524!5m2!1sru!2skz"></iframe>
      </div>
      <div className="boxcar-container">
        <div className="map-box">
          <h2 className="title">Свяжитесь с нами</h2>
          <ul>
            <li>info@deli-bike.kz – по любым вопросам</li>
            <li>tsico.any@gmail.com – по вопросам корпоративного сотрудничества</li>
          </ul>
          <div className="text">Свяжитесь с нашим отделом продаж</div>
          <a href="#" className="btn-two">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={26}
                height={26}
                viewBox="0 0 26 26"
                fill="none"
            >
              <path
                  d="M17.3333 2.4375H8.66667C7.02325 2.4375 5.6875 3.77325 5.6875 5.41667V20.5833C5.6875 22.2268 7.02325 23.5625 8.66667 23.5625H17.3333C18.9768 23.5625 20.3125 22.2268 20.3125 20.5833V5.41667C20.3125 3.77325 18.9768 2.4375 17.3333 2.4375ZM18.6875 20.5833C18.6875 21.3298 18.0798 21.9375 17.3333 21.9375H8.66667C7.92025 21.9375 7.3125 21.3298 7.3125 20.5833V5.41667C7.3125 4.67025 7.92025 4.0625 8.66667 4.0625H17.3333C18.0798 4.0625 18.6875 4.67025 18.6875 5.41667V20.5833ZM14.8958 6.5C14.8958 6.9485 14.5318 7.3125 14.0833 7.3125H11.9167C11.4682 7.3125 11.1042 6.9485 11.1042 6.5C11.1042 6.0515 11.4682 5.6875 11.9167 5.6875H14.0833C14.5318 5.6875 14.8958 6.0515 14.8958 6.5Z"
                  fill="#050B20"
              />
            </svg>
            +7 (727) 390 29 27
          </a>
          <ul className="shaduel-list">
            <span>Сервис-Центр:</span>
            <li>Понедельник: 9:00-13:00</li>
            <li>Вторник: 9:00-13:00</li>
            <li>Среда: 9:00-13:00</li>
            <li>Четверг: 9:00-13:00</li>
            <li>Пятница: 9:00-13:00</li>
            <li>Суббота: 9:00-13:00</li>
            <li>Воскресенье: CLOSED</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
