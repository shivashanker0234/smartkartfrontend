import React, { useEffect, useState } from "react";

const ProductUpdate = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/fetchProducts")
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          setData(res.responseData);
        } else {
          alert("Somthing went wrong ");
        }
      });
  },[]);

  return (
    <div>
      {data.map((value) => (
        <ol key={value.id}>
          <ol>
      <div className="card m-3">
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{value.productName} {value.price}   </h5>

          <p className="card-text">
            Color : {value.color} 
           {value.description}
           {value.details}
          </p>
          <h5>
            <button
              className="btn btn-outline-danger"
              style={{ margin: "2px" }}
            >
              Delete
            </button>
          </h5>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
      </ol>
        </ol>
      ))}
    </div>
  );
};

export default ProductUpdate;
