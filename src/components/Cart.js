import React, { useState, useEffect } from "react";
import "../styles/Cart.css";
// import { useState } from 'react';

const Cart = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    fetch(
      "http//:localhost:8080/getCart?" +
        new URLSearchParams({
          userId: userId,
        })
    )
      .then((response) => response.json)
      .then((res) => {
        if (res.statusCode === 2000) {
          console.log(res);
          console.log(res.responseData);
          setData(res.response);
          // } else {
          //   alert("Somthing went wrong try again");
        }
      });
  }, []);

  const [quantity, setQuantity] = useState(1);
  const incrementHandler = () => {
    setQuantity = quantity + 1;
  };
  const decrementHandler = () => {
    setQuantity = quantity - 1;
  };

  return (
    <>
      {" "}
      {data.map((value) => (
        <ol key={value.id}>
          <ol>
            <div className="cart-wrap">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="main-heading">Smart Mart</div>
                    <div className="table-cart">
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="display-flex align-center">
                                <div className="img-product">
                                  <img
                                    src="https://www.91-img.com/pictures/laptops/asus/asus-x552cl-sx019d-core-i3-3rd-gen-4-gb-500-gb-dos-1-gb-61721-large-1.jpg"
                                    alt=""
                                    className="mCS_img_loaded"
                                  />
                                </div>
                                <div className="name-product">
                                  {/* {val.name} */}
                                  <br />
                                  G2356
                                </div>
                                <div className="price">150000</div>
                              </div>
                            </td>
                            <td className="product-count">
                              <form action="#" className="count-inlineflex">
                                <div
                                  onClick={decrementHandler}
                                  className="qtyminus"
                                >
                                  -
                                </div>
                                <input
                                  type="text"
                                  name="quantity"
                                  value={quantity}
                                  className="qty"
                                />
                                <div
                                  onClick={incrementHandler}
                                  className="qtyplus"
                                >
                                  +
                                </div>
                              </form>
                            </td>
                            <td>
                              <div className="total">150000.00</div>
                            </td>
                            <td>
                              {/* <a href="#" title="">
                            <img
                              src="images/icons/delete.png"
                              alt=""
                              className="mCS_img_loaded"
                            />
                          </a> */}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* <div className="col-lg-4">
                <div className="cart-totals">
                  <h3>Cart Totals</h3>
                  <form action="#" >
                    <table>
                      <tbody>
                        <tr>
                          <td>Subtotal</td>
                          <td className="subtotal">1500000</td>
                        </tr>
                        <tr>
                          <td>Shipping</td>
                          <td className="free-shipping">Free Shipping</td>
                        </tr>
                        <tr className="total-row">
                          <td>Total</td>
                          <td className="price-total">150000</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="btn-cart-totals">
                      <a href="#" className="update round-black-btn" title="">
                        Continue Shopping
                      </a>
                      <a href="#" className="checkout round-black-btn" title="">
                        Proceed to Checkout
                      </a>
                    </div>
                  </form>
                </div>
              </div> */}
                </div>
              </div>
            </div>
          </ol>
        </ol>
      ))}
    </>
  );
};
export default Cart;
