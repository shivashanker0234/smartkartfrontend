import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    console.log("Arey babu serching ra " + name);
    fetch(
      "http://localhost:8080/search?" +
        new URLSearchParams({
          name: name,
        })
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 2000) {
          console.log(res);
          console.log(res.responseData);
          setData(res.responseData);
          console.log("Before products found " + res.responseData.productName);
          // navigate('/foundProducts/${name}')
          navigate("foundProducts/${name}");
          console.log("After products found");
        } else {
          alert("Somthing went wrong try again");
        }
      });
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm   navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          Smart Mart
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/home">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
              {localStorage.getItem("email")}
              </a>
            </li> */}

            <li className="nav-item dropdown dmenu">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbardrop"
                data-toggle="dropdown"
              >
                More
              </a>
              <div className="dropdown-menu sm-menu">
                <a className="dropdown-item" href="/orders">
                  Orders
                </a>
                <a className="dropdown-item" href="/cart">
                  Cart
                </a>
                <a className="dropdown-item" href="#">
                  LogOut
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {localStorage.getItem("email")}
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              onChange={(val) => setName(val.target.value)}
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-default my-2 my-sm-0"
              type="button"
              onClick={(e) => searchHandler(e)}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
