import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./ProductDetails";
// import { useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  console.log("May be productId Anukonta :" + id);

  useEffect(() => {
    fetch(`http://localhost:8080/fetchProducts`)
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          setData(res.responseData);
        } else {
          alert("Somthing went wrong try again");
        }
      });
  }, []);

  const addtoCartHandler = (id) => {
    console.log("userID" + userId);
    console.log("ProductID" + id);
    fetch(
      "http://localhost:8080/addToCart?" +
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
          setMessage(res.responseData);
        } else if (res.statusCode === 404) {
          console.log(res.responseData);
          toast.warning(res.responseData);
        } else if (res.statusCode === 202) {
          toast.info("Item Added to Cart and Updated Successfully");
          console.log(res);
          setMessage(res.responseData);
        } else {
          alert("somthing went wrong");
        }
      });
  };
  const productDetailsHandler = (id) => {
    console.log("Product page Product ID is ");
    console.log(id);
    fetch(
      `http://localhost:8080/getProductById?` +
        new URLSearchParams({
          productId: id,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          // <Link to={`/productDetails/${id}`}></Link>
          // <Link to={{ pathname: `/productDetails`, state: data.id }}></Link>;
          navigate(`/productDetails/${id}`);
        }
      });

    // <Link to={`/productDetails/${id}`}>{productId}</Link>
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
          console.log(res.responseData);
          navigate("/confirmOrder");
          console.log("Navigated to confirm order");
        } else {
          alert("Somthing went wrong try again");
        }
      });
  };

  const fetchCartHandler = () => {
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
          navigate("/cart");
        } else {
          alert("Somthing went wrong try again");
        }
      });
  };

  return (
    <>
      {data.map((value) => (
        <ol key={value.id}>
          <ol>
            <div className="row-m-1">
              <div
                className="card-group"
                style={{ width: "18rem", margin: "5px" }}
              >
                <div
                  className="card"
                  onClick={() => productDetailsHandler(value.id)}
                >
                  <img
                    src={value.image}
                    className="card-img-top"
                    alt="..."
                    onClick={() => productDetailsHandler(value.id)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name :{value.productName} </h5>
                    {/* <Link to={`/productDetails/${value.id}`}>
                      {value.productName}
                    </Link> */}

                    <p className="card-text">
                      Color:{value.color}
                      <br />
                      Details: {value.description}
                      <br />
                      Price : {value.price}
                      <br />
                      email:{localStorage.getItem("email")}
                    </p>
                    <p className="card-text" margin="100px">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => {
                          addtoCartHandler(value.id);
                        }}
                      >
                        Add to card
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        style={{ marginBotto: "10px" }}
                        onClick={() => buyNowHandler(value.id)}
                      >
                        Buy Now
                      </button>
                      {/* <Link to={`/productDetails/${id}`}>link</Link> */}
                    </p>
                  </div>
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
          </ol>
        </ol>
      ))}
    </>
  );
};
export default Home;
