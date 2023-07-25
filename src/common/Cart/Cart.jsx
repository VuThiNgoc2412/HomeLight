import React from "react";
import "./style.css";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
  // Stpe: 7   calucate total of items
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.quantity * item.originPrice,
    0
  );

  const navigate = useHistory();
  const handleBuy = () => {
    var tokenn = localStorage.getItem("token");
    var email = document.getElementById("email").value;
    var arrived = document.getElementById("arrived").value;
    var phone = document.getElementById("phone").value;
    console.log(CartItem)
    axios
      .post(
        "http://26.30.1.50:8080/api/v1.0/Order",
        {
          email: email,
          productList: CartItem,
          arrived: arrived,
          phone: phone,
        },
        {
          headers: {
            Authorization: "Bearer " + tokenn,
          },
        }
      )
      .then((response) => {
        alert("Do you want to buy them?");
        navigate.push(`/account`);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  // prodcut qty total
  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

          <div className="cart-details">
            {CartItem.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}

            {/* yasma hami le cart item lai display garaaxa */}
            {CartItem.map((item) => {
              const productQty = item.originPrice * item.quantity;

              return (
                <div className="cart-list product d_flex" key={item.id}>
                  <div className="img">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="cart-details">
                    <h3>{item.productName}</h3>
                    <h4>
                      ${item.originPrice}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="removeCart">
                      <button className="removeCart">
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div className="cartControl d_flex">
                      <button
                        className="incCart"
                        onClick={() => addToCart(item)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="desCart"
                        onClick={() => decreaseQty(item)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className=" d_flex">
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div>
            <input id="email" type="email" placeholder="Email" />
            <input type="text" id="arrived" placeholder="Arrived" />
            <input type="text" id="phone" placeholder="Phone" />
            <button onClick={() => handleBuy()} className="secondary__btn">
              Buy
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
