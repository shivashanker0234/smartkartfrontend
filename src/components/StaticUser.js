import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const StaticUser = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

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

  const updateHandler = (id,e) => {
    e.preventDefault();

    console.log(name, emailAddress, mobileNumber, address);
    fetch("http://localhost:8080/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: userId,
        name,
        mobileNumber,
        address,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          console.group("Before orders page");

          navigate("/welcome");
          console.group("After orders page");
        } else {
          alert("Somthing went wrong try again");
        }
      });
  };

  return (
    <form className="form mt-3 h-1000">
      <p className="form-title">Update User</p>
      <div className="input-container">
        <input
          placeholder="Enter Name"
          type="text"
          value={name}
          onChange={(val) => setName(val.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Email Address"
          type="email"
          value={data.emailAddress}
          readOnly
          onChange={(val) => setEmailAddress(val.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Mobile Number"
          type="text"
          value={mobileNumber}
          onChange={(val) => setMobileNumber(val.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Address"
          type="text"
          value={address}
          onChange={(val) => setAddress(val.target.value)}
        />
      </div>
      <button
        className="submit"
        // type="button"
        onClick={(e) => updateHandler(data.id,e)}

        >
        Update
      </button>
      <button
        className="submit"
        // type="submit"
        onClick={() => navigate("/updateUser")}
      >
        Go back
      </button>
    </form>
  );
};
export default StaticUser;
