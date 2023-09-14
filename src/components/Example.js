import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Example = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/fetchProducts`)
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

  const userId = localStorage.getItem("userId");

  const addtoCartHandler = (id) => {
    fetch(
      "http://localhost:8080/addToCart?" +
        new URLSearchParams({
          userId: userId,
          productId: id,
        })
    )
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((error) => {
        console.log("Fetch Error:", error);
      });
  };
  return (
    <>

    <h1>This is Example</h1>
      {/* {data.map((value) => (
        <ol key={value.id}>
          <ol>
            <div className="col-md-3">
              <div className="card-group" onClick={()=>{addtoCartHandler(value.id)}} style={{ width: "18rem" }}>
                <div className="card" >
                  <img src="..." className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Name :{value.productName} </h5>
                    <p className="card-text">
                      Color:{value.color}
                      <br />
                      Details: {value.description}
                      <br />
                      Price : {value.price}
                    </p>
                    <p className="card-text">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          addtoCartHandler(value.id);
                        }}
                      >
                        Add to card
                      </button>
                      <button type="button" className="btn btn-primary">
                        Buy Now
                      </button>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ol>
        </ol>
      ))} */}
    </>
  );
};

export default Example;
