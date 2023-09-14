import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProductDetails = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  console.log("Thapa techinical Id is " + id);
  // const thisProduct =productsData["mens-clothing"].find((res)=>res.id==productId)

  const addtoCartHandler = (id) => {
    console.log("revolking add to cart handler");
    fetch(
      "http://localhost:8080/addToCart?" +
        new URLSearchParams({
          productId: id,
          userId: userId,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          // setCart(res.responseData);
          toast.success(res.responseData);
        }
        if (res.statusCode === 202) {
          console.log(res);
          console.log(res.responseData);
          toast.success("Updated cart successfully ");
        }
      });
  };

  useEffect(() => {
    console.log("product id is 1 by static");
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
          setData(res.responseData);
        } else {
          alert("Somthing went wrong try again");
        }
      });
  }, []);
  return (
    <div>
      <div className="card mb-3" style={{ height: "350px", margin: "30px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={data.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{data.productName}</h5>
              <h5 className="card-title">₹ {data.price}/-</h5>

              <p className="card-text">
                {data.description}
                <br />
                {data.details}
              </p>
              <button
                onClick={() => navigate("/home")}
                className="btn btn-outline-primary"
              >
                Continue shopping
              </button>
              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/updateUser")}
              >
                Buy Now{" "}
              </button>
              <button
                onClick={() => addtoCartHandler(data.id)}
                className="btn btn-outline-warning"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        toastStyle={{
          marginTop: "4rem",
          borderRadius: "20px",
          height: "2rem",
        }}
      />
    </div>
  );
};
export default ProductDetails;
