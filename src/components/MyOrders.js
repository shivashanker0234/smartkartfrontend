import React, { useEffect, useState } from "react";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    console.log("Orders bhaya");
    fetch(
      "http://localhost/8080/fetchOrders?" +
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
        } else {
          alert("Somthing went wrong try again");
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>List of your orders</h1>
    </div>
  );
};

export default MyOrders;
