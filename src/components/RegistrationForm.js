import React, { useEffect, useState } from "react";
// import {useHistory} from "react-router-dom";
import { Route, Router, useNavigate } from "react-router-dom";
// import '../Smartmart.css';
import "../styles/Register.css";
import LoginForm from "./LoginForm";
const Registration = () => {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const body = {
    name,
    emailAddress,
    mobileNumber,
    password,
    confirmPassword,
    address,
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value]});
  };

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(body.name));
    localStorage.setItem("email", body.emailAddress);
  });

  const numberHandler = (e) => {
    // let numbers = /\D/gi;
    // e.value = .value.replace(numbers, "");

    if (e.charCode >= 48 && e.charCode <= 57) {
      return true;
    } else {
      alert("Please enter only numbers");
      return false;
    }
  };

  const submitHandler = () => {
    console.log("submit handler ");
    const regularExpression = /^(?=.\d) (?=. *[a-z])(?=.[A-Z])[a-zA-Z0-9]{8,}$/;
    if (name === "") {
      setMessage(" User Name is required");
      return false;
    }
    if (emailAddress === "") {
      setMessage("Email address required");
      return false;
    }
    if (mobileNumber === "") {
      setMessage("Mobile  required");
      return false;
    }
    if (address === "") {
      setMessage("Address  required");
      return false;
    }
    if (password === "") {
      setMessage("Password  required");
      return false;
    }
    if (password.length < 8) {
      setMessage("Min 8 characters required");
      return false;
    }
    if (password.length > 16) {
      setMessage("Max 16 characters are accepted");
      return false;
    }
    // if (!regularExpression.test(password)) {
    //   setMessage(
    //     "Password must contain alphabets numbers and special characters like '@','#',!"
    //   );
    //   return false;
    // }

    // if (!password.match(regularExpression)) {
    //   setMessage("Password set iendhi ra babu ");
    //   return false;
    // }

    if (password !== confirmPassword) {
      setMessage("Password not matched");
      return false;
    }

    fetch(`http://localhost:8080/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          setData(res.responseData);
          console.log("Arey babu id ra edhi");
          console.log(res.responseData.id);
          localStorage.setItem("userId", JSON.stringify(res.responseData.id));
          navigate("/home");
        }
        if (res.statusCode === 404) {
          setMessage(res.responseData);
        }
      });
  };

  return (
    <div className="form">
      {/* <form onSubmit={submitHandler} > */}
      <div className="form-body ">
        <div className="userName">
          {/* <label className="form_label" htmlFor="userName" >User Name</label>  */}
          <input
            className="form_input"
            type="text"
            name="name"
            id="name"
            placeholder="User Name"
            required
            value={name}
            onChange={(val) => setName(val.target.value)}
          ></input>
        </div>
        <br />
        <div className="emailAdress">
          {/* <label className="form_label" htmlFor="emailAddress">Email Address</label> */}
          <input
            className="form_input"
            type="email"
            name="emailAddress"
            id="emailAddress"
            placeholder="EmailAddress"
            value={emailAddress}
            onChange={(val) => setEmailAddress(val.target.value)}
            required
          ></input>
        </div>
        <br />
        <div>
          {/* <label className="form_label"  htmlFor="mobileNumber">Mobile Number</label> */}
          <input
            className="form_input"
            type="text"
            name="mobileNumber"
            id="mobileNumber"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(val) => setMobileNumber(val.target.value)}
            maxLength="10"
            onKeyPress={numberHandler}
            required
          ></input>
        </div>
        <br />
        <div>
          {/* <label className="form_label" htmlFor="address">Address</label> */}
          <input
            className="form_input"
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(val) => setAddress(val.target.value)}
            required
          ></input>
        </div>
        <br />
        <div>
          {/* <label className="form_label" htmlFor="password" >Password</label> */}
          <input
            className="form_input"
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(val) => setPassword(val.target.value)}
          ></input>
        </div>
        <br />
        <div>
          {/* <label className="form_label" htmlFor="confirmPassword">Confirm Password</label> */}
          <input
            className="form_input"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(val) => setConfirmPassword(val.target.value)}
          ></input>
        </div>
        {message}
        {/* {password !== confirmPassword ? (
          <p className="form_text"> password not matching </p>
         ):null} */}
        <button
          className="footer"
          type="submit"
          name="submit"
          onClick={submitHandler}
        >
          Register
        </button>

        <p className="footer">
          <a href="/">Existing user ? login</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
