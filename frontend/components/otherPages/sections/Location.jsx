import React from "react";

export default function Location() {
    return (
        <>
            <h4 className="title">Местоположение</h4>
            <div className="text">
                Суюнбая . Сегодня открыто с 9:00 до 18:00.
            </div>
            <a href="#" className="brand-btn">
                Проложить маршрут
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={15}
                    height={14}
                    viewBox="0 0 15 14"
                    fill="none"
                >
                    <g clipPath="url(#clip0_881_14440)">
                        <path
                            d="M14.1111 0H5.55558C5.34062 0 5.16668 0.173943 5.16668 0.388901C5.16668 0.603859 5.34062 0.777802 5.55558 0.777802H13.1723L0.613941 13.3362C0.46202 13.4881 0.46202 13.7342 0.613941 13.8861C0.689884 13.962 0.789415 14 0.88891 14C0.988405 14 1.0879 13.962 1.16388 13.8861L13.7222 1.3277V8.94447C13.7222 9.15943 13.8962 9.33337 14.1111 9.33337C14.3261 9.33337 14.5 9.15943 14.5 8.94447V0.388901C14.5 0.173943 14.3261 0 14.1111 0Z"
                            fill="#405FF2"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_881_14440">
                            <rect
                                width={14}
                                height={14}
                                fill="white"
                                transform="translate(0.5)"
                            />
                        </clipPath>
                    </defs>
                </svg>
            </a>
            <div className="goole-iframe">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2901.4430458537927!2d76.964199586225!3d43.34684239773496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836d2b9c3841a3%3A0x5bf46e5d424c322c!2z0L_RgNC-0YHQvy4g0KHRg9GO0L3QsdCw0Y8gNDE5LCDQkNC70LzQsNGC0Ys!5e0!3m2!1sru!2skz!4v1733723200524!5m2!1sru!2skz"></iframe>
            </div>
        </>
    );
}