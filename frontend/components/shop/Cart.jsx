"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import {BiTrashAlt} from "react-icons/bi";
import Button from "@/components/ui/button/Button"; // Предположим, что используется next-i18next

export default function Cart() {
  const { t } = useTranslation(); // Хук для получения перевода
  const { cartProducts, setCartProducts, totalPrice } = useCart();
  console.log(cartProducts);

  const setQuantity = (id, quantity) => {
    if (quantity >= 1) {
      const item = cartProducts.filter((elm) => elm.id == id)[0];
      const items = [...cartProducts];
      const itemIndex = items.indexOf(item);
      item.quantity = quantity;
      items[itemIndex] = item;
      setCartProducts(items);
    }
  };

  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  return (
      <section className="cart-page layout-radius">
        <div className="boxcar-container">
          <div className="cart-title">
            <ul className="breadcrumb">
              <li>
                <Link href={`/`}>{t("breadcrumb.home")}</Link>
              </li>
              <li>
                <span>{t("breadcrumb.cart")}</span>
              </li>
            </ul>
            <h2>{t("cart.title")}</h2>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="cart-table">
                {cartProducts.length ? (
                    <table>
                      <thead>
                      <tr>
                        <th>{t("cart.product")}</th>
                        <th>{t("cart.price")}</th>
                        <th>{t("cart.quantity")}</th>
                        <th>{t("cart.subtotal")}</th>
                        <th />
                      </tr>
                      </thead>
                      <tbody>
                      {cartProducts.map((elm, i) => (
                          <tr key={i}>
                            <td>
                              <div className="shop-cart-product">
                                <div className="shop-product-cart-img">
                                  <Image
                                      alt=""
                                      width={80}
                                      height={80}
                                      src={elm.imageUrls[0]}
                                  />
                                </div>
                                <div className="shop-product-cart-info">
                                  <h3>
                                    <Link
                                        href={`/bike/${elm.id}`}
                                        title=""
                                    >
                                      {elm.name} {elm.model}
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                            </td>
                            <td>
                          <span className="price">
                            {elm.price.toLocaleString("ru-RU")} ₸
                          </span>
                            </td>
                            <td>
                              <div className="number">
                            <span
                                className="minus"
                                onClick={() =>
                                    setQuantity(elm.id, elm.quantity - 1)
                                }
                            >
                              -
                            </span>
                                <input
                                    type="number"
                                    value={elm.quantity}
                                    min={1}
                                    onChange={(e) =>
                                        setQuantity(elm.id, e.target.value / 1)
                                    }
                                />
                                <span
                                    className="plus"
                                    onClick={() =>
                                        setQuantity(elm.id, elm.quantity + 1)
                                    }
                                >
                              +
                            </span>
                              </div>
                            </td>
                            <td>
                          <span className="price">
                            {(elm.price * elm.quantity).toLocaleString("ru-RU")} ₸
                          </span>
                            </td>
                            <td>
                              <a
                                  onClick={() => removeItem(elm.id)}
                                  className="remove-cart-item"
                              >
                                <BiTrashAlt />
                              </a>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                ) : (
                    <div className="row">
                      <div className="col-6">{t("cart.emptyMessage")}</div>
                      <div className="col-12">
                        <Link
                            href="/bikes"
                            title=""
                            className="mt-4"
                        >
                          <Button className="mt-4 !ml-0">{t("cart.shopNow")}</Button>
                        </Link>
                      </div>
                    </div>
                )}
              </div>
              {/*cart-table*/}
            </div>
            <div className="col-lg-3">
              <div className="cart-totals">
                <h3>{t("cart.totals")}</h3>
                <table>
                  <tbody>
                  <tr>
                    <th>{t("cart.subtotal")}</th>
                    <td>{totalPrice.toLocaleString("ru-RU")} ₸</td>
                  </tr>
                  <tr>
                    <th>{t("cart.total")}</th>
                    <td>{(totalPrice ? totalPrice + 20 : 0).toLocaleString("ru-RU")} ₸</td>
                  </tr>
                  </tbody>
                </table>
                <Link href="/checkout/" title="">
                  <Button className="!ml-0 w-full">
                  {t("cart.proceedToCheckout")}{" "}
                  </Button>
                </Link>
              </div>
              {/*cart-totals end*/}
            </div>
          </div>
        </div>
      </section>
  );
}