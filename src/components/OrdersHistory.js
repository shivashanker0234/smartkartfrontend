import React, { useEffect, useState } from "react";

const OrdersHistory = () => {
  const [data, SetData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("Arey babu orders ra evii");
    fetch(
      "http://localhost:8080/fetchOrders?" +
        new URLSearchParams({
          userId: userId,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          SetData(res.responseData);
        }
      });
  }, []);

  return (
    <div>
      <div className="row g-0" style={{ paddingLeft: "50px", color: "white" }}>
        <div className="col-sm-2" style={{ marginLeft: "50px" }}>
          <h5>Order Id </h5>
        </div>
        <div className="col-lg-2">
          <h5>Product Name</h5>
        </div>
        <div className="col-md-2">
          <h5>Quantity </h5>
        </div>
        <div className="col-md-2">
          <h5>Total </h5>
        </div>
        <div className="col-md-3">
          <h5>Order Date </h5>
        </div>
      </div>
      {data.map((value) => (
        <ol key={value.id}>
          <ol>
            <div
              className="card mb-1"
              style={{
                margin: "10px",
                height: "50px",
                color: "black",
                fontFamily: "inherit",
              }}
            >
              <div className="row g-0">
                <div
                  className="col-sm-2"
                  style={{ marginLeft: "50px", marginTop: "10px" }}
                >
                  {value.id}
                </div>
                <div className="col-sm-2" style={{ marginTop: "10px" }}>
                  {value.product.productName}
                </div>
                <div className="col-sm-2" style={{ marginTop: "10px" }}>
                  {value.quantity}
                </div>
                <div className="col-md-2" style={{ marginTop: "10px" }}>
                  {value.totalPrice}
                </div>
                <div className="col-md-2">{value.date}</div>
              </div>
            </div>
          </ol>
        </ol>
      ))}
    </div>
  );
};

export default OrdersHistory;
