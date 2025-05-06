"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { BiTrashAlt } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { t } = useTranslation();
  const { cartProducts, setCartProducts, totalPrice } = useCart();
  const [isProceedLoading, setIsProceedLoading] = useState(false);
  const router = useRouter();

  const setQuantity = (id, quantity) => {
    if (quantity >= 1) {
      const updated = cartProducts.map(item =>
          item.id === id ? { ...item, quantity } : item
      );
      setCartProducts(updated);
    }
  };

  const removeItem = id => {
    setCartProducts(prev => prev.filter(item => item.id !== id));
  };

  const handleProceed = () => {
    setIsProceedLoading(true);
    router.push('/checkout');
  };

  return (
      <section className="cart-page layout-radius">
        <div className="boxcar-container">
          <div className="cart-title">
            <ul className="breadcrumb">
              <li><Link href={`/`}>{t("breadcrumb.home")}</Link></li>
              <li><span>/</span></li>
              <li><span>{t("breadcrumb.cart")}</span></li>
            </ul>
            <h2>{t("cart.title")}</h2>
          </div>

          <div className="row">
            <div className="col-lg-9">
              <div className="cart-table">
                {cartProducts.length > 0 ? (
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
                      {cartProducts.map((item, idx) => (
                          <tr key={idx}>
                            <td>
                              <div className="shop-cart-product">
                                <div className="shop-product-cart-img">
                                  <Image
                                      src={item.imageUrls[0]}
                                      alt={item.name}
                                      width={80}
                                      height={80}
                                  />
                                </div>
                                <div className="shop-product-cart-info">
                                  <h3>
                                    <Link href={`/bike/${item.id}`}>{item.name} {item.model}</Link>
                                  </h3>
                                </div>
                              </div>
                            </td>
                            <td><span className="price">{item.price.toLocaleString('ru-RU')} ₸</span></td>
                            <td>
                              <div className="number">
                                <span className="minus" onClick={() => setQuantity(item.id, item.quantity - 1)}>-</span>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min={1}
                                    onChange={e => setQuantity(item.id, Number(e.target.value))}
                                />
                                <span className="plus" onClick={() => setQuantity(item.id, item.quantity + 1)}>+</span>
                              </div>
                            </td>
                            <td><span className="price">{(item.price * item.quantity).toLocaleString('ru-RU')} ₸</span></td>
                            <td>
                              <button className="remove-cart-item" onClick={() => removeItem(item.id)}>
                                <BiTrashAlt />
                              </button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                ) : (
                    <div className="row">
                      <div className="col-6">{t("cart.emptyMessage")}</div>
                      <div className="col-12 mt-4">
                        <Link href="/bikes">
                          <Button>{t("cart.shopNow")}</Button>
                        </Link>
                      </div>
                    </div>
                )}
              </div>
            </div>

            {cartProducts.length > 0 && (
                <div className="col-lg-3">
                  <div className="cart-totals">
                    <h3>{t("cart.totals")}</h3>
                    <table>
                      <tbody>
                      <tr>
                        <th>{t("cart.subtotal")}</th>
                        <td>{totalPrice.toLocaleString('ru-RU')} ₸</td>
                      </tr>
                      <tr>
                        <th>{t("cart.total")}</th>
                        <td>{(totalPrice ? totalPrice + 20 : 0).toLocaleString('ru-RU')} ₸</td>
                      </tr>
                      </tbody>
                    </table>

                    <Button
                        className="!ml-0 w-full mt-4"
                        variant="primary"
                        onClick={handleProceed}
                        disabled={isProceedLoading}
                    >
                      {isProceedLoading ? <AiOutlineLoading className="animate-spin" /> : t("cart.proceedToCheckout")}
                    </Button>
                  </div>
                </div>
            )}

          </div>
        </div>
      </section>
  );
}
