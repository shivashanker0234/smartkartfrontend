import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const [data, setData] = useState('');
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // const [id, setId] = useState(data.id);

    useEffect(() => {
    fetch(
      "http://localhost:8080/getUserById?" +
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
          alert("Somthing went wrong");
        }
      });
  }, []);
  
  const updateHandler = (id) => {
    console.log("Update user by id " + id);
    console.log(name, mobileNumber, address);
    fetch("http://localhost:8080/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: userId,
        name:data.name,
        mobileNumber:data.mobileNumber,
        address:data.address,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          navigate("/orders");
        } else {
          alert("Somthing went wrong try again");
        }
      });
  };

  return (
    <div>
      <div className="form mt-3 h-10">
        <div className="form-floating m-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={data.name}
            // onChange={(val) => {
            //   setName(val.target.value);
            // }}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating m-3 ">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            readOnly
            value={data.emailAddress}
            // onChange={(val) => setEmailAddress(val.target.value)}
          />
          <label htmlFor="floatingInput">EmailAddress</label>
        </div>
        <div className="form-floating m-3">
          <input
            type="text"
            className="form-control"
            id="floatingPassword"
            value={data.mobileNumber}
            // onChange={(val) => setMobileNumber(val.target.value)}
          />
          <label htmlFor="floatingPassword">Mobile Number</label>
        </div>
        <div className="form-floating m-3">
          <input
            type="text"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={data.address}
            // onChange={(val) => setAddress(val.target.value)}
          />
          <label htmlFor="floatingPassword">Address</label>
        </div>
        <button
          className="btn btn-warning"
          onClick={() => updateHandler(data.id)}
        >
          Continue with this Address
        </button>
        <div>
        <button className="btn btn-warning" onClick={()=>navigate("/staticUser")}>
          Update Address
        </button></div>
      </div>
    </div>
  );
};

export default UpdateUser;
