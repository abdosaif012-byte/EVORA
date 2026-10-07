import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import "../CSS/cart.css";

export function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // GET CART
  const getCart = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/cart", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log(data);

    setCart(data);
  };

  // UPDATE QUANTITY
  const updateCart = async (id, newQuantity) => {
    const response = await fetch(`http://127.0.0.1:8000/api/cart/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: newQuantity,
      }),
    });

    const data = await response.json();

    console.log(data);

    getCart();
  };

  // DELETE CART ITEM
  const deleteCartItem = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log(data);

    getCart();
  };

  // CHECKOUT
  const checkout = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      toast.success("Order placed successfully!");
      getCart();
    } else {
      alert(data.message || "Something went wrong.");
    }
    navigate("/profile");
  };

  useEffect(() => {
    getCart();
  }, []);

  // TOTAL CART COST
  const totalCartCost = cart.reduce((total, item) => {
    return total + Number(item.product.price) * item.quantity;
  }, 0);

  // TOTAL ITEM COUNT
  const totalItemCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <Toaster position="top-right" />

      <div className="cart-page__layout">

        {/* LEFT COLUMN */}
        <div className="cart-column">

          {/* PRODUCT LIST */}
          <section className="cart-list">

            <h1 className="cart-list__title">
              My Cart
            </h1>

            {cart.length === 0 ? (
              <p className="cart-list__empty">
                Cart is empty
              </p>
            ) : (
              <div className="cart-list__items">

                {cart.map((item) => {

                  const productTotal =
                    Number(item.product.price) *
                    item.quantity;

                  return (
                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      {/* IMAGE */}
                      <img
                        className="cart-item__image"
                        src={item.product.image}
                        width="120"
                        height="150"
                        style={{
                          objectFit: "cover",
                        }}
                        alt={item.product.title}
                      />

                      {/* DETAILS */}
                      <div className="cart-item__details">

                        <h3 className="cart-item__title">
                          {item.product.title}
                        </h3>

                        <p className="cart-item__price">
                          ${item.product.price} each
                        </p>

                        {/* QUANTITY */}
                        <div className="cart-item__quantity">

                          <button
                            className="cart-item__quantity-btn"
                            onClick={() =>
                              updateCart(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity === 1}
                          >
                            −
                          </button>

                          <span className="cart-item__quantity-value">
                            {item.quantity}
                          </span>

                          <button
                            className="cart-item__quantity-btn"
                            onClick={() =>
                              updateCart(
                                item.id,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>

                        </div>
                      </div>

                      {/* SIDE */}
                      <div className="cart-item__side">

                        <p className="cart-item__total">
                          ${productTotal.toFixed(2)}
                        </p>

                        <button
                          className="cart-item__delete"
                          onClick={() =>
                            deleteCartItem(item.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  );
                })}

              </div>
            )}

          </section>
        </div>

        {/* RIGHT COLUMN */}
        {cart.length > 0 && (
          <div className="cart-column cart-column--receipt">

            <section className="cart-receipt">

              <h2 className="cart-receipt__title">
                Order Summary
              </h2>

              {/* TOTAL ITEMS */}
              <div className="cart-receipt__row">

                <span className="cart-receipt__label">
                  Total items
                </span>

                <span className="cart-receipt__value">
                  {totalItemCount}
                </span>

              </div>

              {/* TOTAL PRICE */}
              <div className="cart-receipt__row cart-receipt__row--total">

                <span className="cart-receipt__label">
                  Total price
                </span>

                <span className="cart-receipt__value">
                  ${totalCartCost.toFixed(2)}
                </span>

              </div>

              {/* CHECKOUT */}
              <button
                className="cart-checkout-btn"
                onClick={checkout}
              >
                Checkout
              </button>

            </section>

          </div>
        )}

      </div>
    </div>
  );
}