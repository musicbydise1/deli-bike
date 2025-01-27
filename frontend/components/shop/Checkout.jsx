"use client";
import React from "react";
import Image from "next/image";
import SelectComponent from "../common/SelectComponent";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Checkout() {
  const { t } = useTranslation(); // Хук для локализации
  const { cartProducts, totalPrice } = useContextElement();

  return (
      <section className="checkout-section layout-radius">
        <div className="boxcar-container">
          <div className="boxcar-title-three">
            <ul className="breadcrumb">
              <li>
                <Link href={`/`}>{t("breadcrumb.home")}</Link>
              </li>
              <li>
                <span>{t("breadcrumb.cart")}</span>
              </li>
            </ul>
            <h2>{t("checkout.title")}</h2>
          </div>
          <div className="row">
            {/* content-column */}
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <div className="inner-column">
                <h6 className="title">{t("checkout.billingDetails")}</h6>
                <form onSubmit={(e) => e.preventDefault()} className="row g-0">
                  <div className="form-column col-lg-6">
                    <div className="form_boxes">
                      <label>{t("checkout.firstName")}</label>
                      <input
                          required
                          type="text"
                          name="name"
                          placeholder={t("checkout.firstNamePlaceholder")}
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-6">
                    <div className="form_boxes">
                      <label>{t("checkout.lastName")}</label>
                      <input
                          required
                          type="text"
                          name="last-name"
                          placeholder={t("checkout.lastNamePlaceholder")}
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div className="form_boxes">
                      <label>{t("checkout.companyName")}</label>
                      <SelectComponent options={[t("select.selectOption")]} />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div className="form_boxes">
                      <label>{t("checkout.countryRegion")} *</label>
                      <SelectComponent
                          options={[
                            t("select.selectOption"),
                            t("countries.pakistan"),
                            t("countries.america"),
                          ]}
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div className="form_boxes">
                      <label>{t("checkout.streetName")}</label>
                      <input
                          required
                          type="text"
                          name="address"
                          placeholder={t("checkout.streetNamePlaceholder")}
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div className="form_boxes">
                      <label>{t("checkout.apartmentOptional")}</label>
                      <input
                          type="text"
                          name="address2"
                          placeholder={t("checkout.apartmentPlaceholder")}
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div className="form_boxes">
                      <label>{t("checkout.townCity")} *</label>
                      <SelectComponent
                          options={[
                            t("select.selectOption"),
                            t("countries.pakistan"),
                            t("countries.america"),
                          ]}
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div className="form_boxes">
                      <label>{t("checkout.state")}</label>
                      <SelectComponent
                          options={[t("checkout.statePlaceholder")]}
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div className="form_boxes">
                      <label>{t("checkout.zipCode")}</label>
                      <input
                          required
                          type="number"
                          name="zip"
                          placeholder="02111"
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div className="form_boxes">
                      <label>{t("checkout.phone")}</label>
                      <input
                          required
                          type="number"
                          name="phone"
                          placeholder="+70 8485 283 181"
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div className="form_boxes">
                      <label>{t("checkout.email")}</label>
                      <input
                          required
                          type="email"
                          name="email"
                          placeholder={t("checkout.emailPlaceholder")}
                      />
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <h6 className="title">{t("checkout.additionalInfo")}</h6>
                    <div className="form_boxes v2">
                      <label>{t("checkout.orderNotes")}</label>
                      <div className="drop-menu">
                      <textarea
                          name="text"
                          placeholder={t("checkout.orderNotesPlaceholder")}
                          defaultValue={""}
                      />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* side-bar */}
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="side-bar">
                <div className="order-box">
                  <h6 className="title">{t("checkout.yourOrder")}</h6>
                  <ul className="order-list">
                    <li>
                      {t("checkout.product")}
                      <span>{t("checkout.subtotal")}</span>
                    </li>
                    {cartProducts.map((elm, i) => (
                        <li key={i} className="v2">
                          {elm.title} x{elm.quantity}
                          <span>${elm.discountedPrice.toFixed(2)}</span>
                        </li>
                    ))}

                    <li>
                      {t("checkout.subtotal")}
                      <span>${totalPrice.toFixed(2)}</span>
                    </li>
                    <li>
                      {t("checkout.shipping")}
                      <span>${(20).toFixed(2)}</span>
                    </li>
                    <li>
                      {t("checkout.total")}
                      <span>${(totalPrice + 20).toFixed(2)}</span>
                    </li>
                  </ul>
                </div>
                <div className="payment-options">
                  <ul>
                    <li>
                      <div className="shipp">
                        <input type="radio" id="c4" name="cc2" />
                        <label htmlFor="c4">
                          <span />
                          <small>{t("checkout.directBankTransfer")}</small>
                        </label>
                      </div>
                      <p>{t("checkout.directBankTransferDesc")}</p>
                    </li>
                    <li>
                      <div className="shipp">
                        <input type="radio" id="c5" name="cc2" />
                        <label htmlFor="c5">
                          <span />
                          <small>{t("checkout.checkPayments")}</small>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="shipp">
                        <input type="radio" id="c6" name="cc2" />
                        <label htmlFor="c6">
                          <span />
                          <small>{t("checkout.cashOnDelivery")}</small>
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="shipp">
                        <input type="radio" id="c7" name="cc2" />
                        <label htmlFor="c7">
                          <span />
                          <small>{t("checkout.paypal")}</small>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="form-submit">
                  <button type="submit" className="theme-btn w-100">
                    {t("checkout.placeOrder")}{" "}
                    <Image
                        alt=""
                        width={14}
                        height={14}
                        src="/images/arrow.svg"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}