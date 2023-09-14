import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CartList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [quantity, setQuantity] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    fetch(
      "http://localhost:8080/getCart?" +
        new URLSearchParams({
          userId: userId,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          setData(res.responseData);
        }
        if (res.statusCode === 404) {
          console.log("404- status code ");
          console.log(res);
          console.log(res.responseData);
          navigate("/empty");
        }
      });
  }, []);

  const increaseHandler = (id) => {
    console.log("Quantity : " + quantity);
    console.log("userID" + userId);
    console.log("ProductID" + id);
    fetch(
      "http://localhost:8080/increaseQuantity?" +
        new URLSearchParams({
          userId: userId,
          productId: id,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          toast.success("One item added to cart Successfully");
          console.log(res);
          console.log(res.responseData);
          window.location.reload();
          setData(res.responseData);
        } else {
          alert("somthing went wrong");
        }
      });
  };

  const decreaseHandler = (id) => {
    console.log("Quantiyu : " + quantity);
    console.log("userID" + userId);
    console.log("ProductID" + id);
    fetch(
      "http://localhost:8080/decreaseQuantity?" +
        new URLSearchParams({
          userId: userId,
          productId: id,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          toast.success("One item added to cart Successfully");
          console.log(res);
          console.log(res.responseData);
          <div class="container text-center">
            <div class="row">
              <div class="col">Column</div>
              <div class="col">Column</div>
              <div class="col">Column</div>
            </div>
          </div>;
          window.location.reload();
        } else {
          alert("somthing went wrong");
        }
      });
  };

  const buyNowHandler = (id) => {
    console.log("buy now check");
    fetch(
      "http://localhost:8080/buyNow?" +
        new URLSearchParams({
          userId: userId,
          productId: id,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          navigate("/confirmOrder");
          console.log(res.responseData);
        } else {
          alert("Somthing went wrong try again");
        }
      });
  };

  const removeHandler = (id) => {
    console.log("Remove from cart");
    fetch(
      "http://localhost:8080/removeFromCart?" +
        new URLSearchParams({
          userId: userId,
          productId: id,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          window.location.reload(false);
          toast.info("Product removed  from cart successfully");
          console.log(" before Navigting cart ");

          console.log("After Navigation");
        } else {
          alert("Somthing went wrong");
        }
      });
  };

  useEffect(() => {
    fetch(
      "http://localhost:8080/countCartQuantity?" +
        new URLSearchParams({
          userId: userId,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          setQuantity(res.responseData);
        }
      });
  }, []);

  useEffect(() => {
    fetch(
      "http://localhost:8080/countCartPrice?" +
        new URLSearchParams({
          userId: userId,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          setCartPrice(res.responseData);
        }
      });
  }, []);

  return (
    <div>
      <div className="row g-0" style={{ paddingLeft: "100px" }}>
        <div className="col-md-3">
          <h4>Product </h4>
        </div>
        <div className="col-md-2">
          <h4>Color </h4>
        </div>{" "}
        <div className="col-lg-2">
          <h4>Quantity</h4>
        </div>{" "}
        <div className="col-sm-2">
          <h4>Total Price </h4>
        </div>{" "}
        <div className="col-md-1">
          <h4>Buy </h4>
        </div>
        <div className="col-md-1">
          <h4>Remove </h4>
        </div>
      </div>
      {data.map((value) => (
        <ol key={value.id}>
          <ol>
            {/* <div className="container" width="1000px"> */}
            <div
              className="card mb-3"
              style={{ margin: "10px", height: "120px" }}
            >
              <div className="row g-0">
                <div className="col-lg-1">
                  <h5 style={{ margin: "2px", color: "Highlight" }}>
                    {" "}
                    {value.product.productName}{" "}
                  </h5>
                  <img
                    src="http://img.tjskl.org.cn/pic/z2577d9d-200x200-1/pinarello_lungavita_2010_single_speed_bike.jpg"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-sm-2">
                  <h5
                    className="card-title"
                    style={{ marginTop: "30px", color: "GrayText" }}
                  >
                    Price: {value.product.price}
                  </h5>
                </div>
                <div className="col-sm-2">
                  <h5
                    className="card-title"
                    style={{ marginTop: "30px", color: "GrayText" }}
                  >
                    {value.product.color}
                  </h5>
                </div>
                <div className="col-sm-2">
                  <button
                    className="btn btn-success"
                    style={{ margin: "1px", width: "50px" }}
                    onClick={() => increaseHandler(value.product.id)}
                  >
                    +
                  </button>
                  <div
                    className="form-control text-center"
                    style={{ width: "50px" }}
                  >
                    {value.quantity}
                  </div>
                  <button
                    className="btn btn-success"
                    style={{ margin: "1px", width: "50px" }}
                    onClick={() => decreaseHandler(value.product.id)}
                  >
                    -
                  </button>
                </div>

                <div className="col-md-2">
                  <h5
                    className="card-title"
                    style={{ marginTop: "30px", color: "GrayText" }}
                  >
                    {value.totalPrice}
                  </h5>
                </div>
                <div className="col-sm-1">
                  <button
                    className="btn btn-primary"
                    style={{ margin: "25px" }}
                    onClick={() => buyNowHandler(value.product.id)}
                  >
                    Buy Now
                  </button>
                </div>
                <div className="col-sm-1">
                  <button
                    className="btn btn-danger"
                    style={{ margin: "25px" }}
                    onClick={() => removeHandler(value.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            {/* </div> */}
          </ol>
        </ol>
      ))}
      <div className="card" style={{ marginLeft: "70px", marginRight: "10px" }}>
        <div className="card-body">
          <h2
            className="card-title"
            style={{ merginLeft: "100px", color: "Highlight" }}
          >
            Total Quantity :{quantity}
          </h2>
          <h2
            className="card-title"
            style={{ merginLeft: "100px", color: "Highlight" }}
          >
            Total : ₹ {cartPrice}
          </h2>

          <button
            className="btn btn-primary"
            style={{ margin: "20px", width: "200px" }}
          >
            CheckOut
          </button>
          <button
            className="btn btn-success"
            style={{ margin: "20px", width: "200px" }}
            onClick={() => {
              navigate("/home");
            }}
          >
            Continue shopping
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        theme="dark"
        toastStyle={{
          marginTop: "4rem",
          borderRadius: "20px",
          height: "2rem",
        }}
      />
    </div>
  );
};

export default CartList;
