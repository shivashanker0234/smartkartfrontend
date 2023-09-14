import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const yesHandler = () => {
    // navigate("/demo");
    navigate("/updateUser");

  };

  const noHandler = () => {
    navigate("/home");
  };
  return (
    <div>
      <div
        className="card text-bg-info mb-3"
        style={{
          width: "25rem",
          height: "20rem",
          marginLeft: "10rem",
          marginTop: "3rem",
        }}
      >
        <div className="card-header">Order Confirmation</div>
        <div className="card-body">
          <h5 className="card-title">Do you want to Place Order ?</h5>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          <button
            className="btn btn-success"
            style={{ marginLeft: "6rem" }}
            onClick={yesHandler}
          >
            Yes
          </button>
          <button className="btn btn-warning" onClick={noHandler}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
