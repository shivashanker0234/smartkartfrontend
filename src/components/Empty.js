import React from "react";
import { useNavigate } from "react-router-dom";

const Empty = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="card text-bg-info mb-3"
        style={{ margin: "2rem", maxHeight: "20rem" }}
      >
        <div className="card-header">Sorry !!</div>
        <div className="card-body">
          <h5 className="card-title">Your Cart is empty !</h5>
          <p className="card-text">
            Sorry, We have nothing to show you in your cart. Please add some
            products into the cart
          </p>
        </div>
        <button className="btn btn-success" onClick={()=>navigate("/home")}>Go to Shopping !!</button>
      </div>
    </div>
  );
};

export default Empty;
