import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const LoginForm = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  // const demo = { emailAddress, password };
  const [demo, SetDemo] = useState([]);
  const [message,setMessage]=useState('');

  const navi = useNavigate();
  const regularExpression  = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  useEffect(() => {
    localStorage.setItem("email", emailAddress);
  });

  const apicall = () => {
    if (emailAddress === "") {
      setMessage("Please Enter Email");
      return false;
    }
    if (password === "") {
      setMessage("Please Enter password");
      return false;
    }
    fetch(
      `http://localhost:8080/login?` +
        new URLSearchParams({
          emailAddress: emailAddress,
          password: password,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          //alert(res.responseData)
          SetDemo(res.responseData);
          localStorage.setItem("userId", res.responseData.id);
          console.log("Arey userID edhi"+res.responseData.id);
          navi("/home");       
        }
        if(res.statusCode===404){
          console.log(res);
          console.log(res.responseData);
          setMessage(res.responseData);

        }
      });
  };
  return (
    <div className="login-page">
      <div className="form" >
        <input
          type="email"
          name="emailAddress"
          id="emailAddress"
          placeholder="EmailAddress"
          value={emailAddress}
          onChange={(val) => setEmailAddress(val.target.value)}
          required
        ></input>
        <br />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(val) => setPassword(val.target.value)}
          required
        ></input>
        {message}
        <br />
        <button className="footer" name="submit" onClick={apicall}>
          login
        </button>
        <p className="message">
          Not registered? <a href="/reg">Create an account</a>
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
