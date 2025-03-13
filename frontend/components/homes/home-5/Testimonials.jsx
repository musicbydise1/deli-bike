"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {clients, testimonials2} from "@/data/testimonials";
import Button from "@/components/ui/button/Button";
export default function Testimonials() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole"); // Assuming "userRole" is the key in localStorage
    setUserRole(role);
  }, []);

  return (
    <section className="boxcar-testimonial-section-three">
      <div className="large-container">
        <div className="right-box">
          <div className="row">
            {/* content-column */}
            <div className="content-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="boxcar-title textiominal-title light">
                  <h2>Кому Deli-bike подойдет?</h2>
                  <div className="text">
                    Электровелосипеды DELI-BIKE сокращают расходы и <br/>
                    повышают скорость доставки. <br/>
                    DELI-BIKE подходит как для Курьеров, так и для компаний, <br/>
                    занимающихся доставкой (розничные сети, общепит, <br/>
                    службы доставки и т.д.).
                  </div>
                </div>
              </div>
            </div>
            {/* testimonial-block */}
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="row">
                {clients.map((client, index) => (
                    <div
                        key={index}
                        className="testimonial-block-three col-lg-6 col-md-6 col-sm-12"
                    >
                      <div className="inner-box">
                        <div className="content-box">
                          {/* Заголовок */}
                          <h3 className="client-title">{client.title}</h3>
                          {/* Список описаний */}
                          <ul className="client-description">
                            {client.description.map((item, idx) => (
                                <li key={idx}>
                                  <strong>{item.title}</strong>
                                  <br/>
                                  <small>{item.text}</small>
                                </li>
                            ))}
                            <div className="button-container">
                              {userRole === client.type ? (
                                  <Button className="m-0 w-full" variant="secondary">
                                    Оставить заявку
                                  </Button>
                              ) : (
                                  <Button className="m-0 w-full" variant="primary-outline">
                                    Подробнее
                                  </Button>
                              )}
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
