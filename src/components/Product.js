import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Product.css";

const Product = () => {
  const [id, setId] = useState();
  const [productName, setProductName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  // const [image, setimage] = useState("");

  const [data, setData] = useState([]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };

    reader.readAsDataURL(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Adding product check");
   
    fetch(`http://localhost:8080/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id,
        productName,
        color,
        price,
        description,
        details,
        image,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {
          console.log(res);
          console.log(res.responseData);
          setData(res.responseData);
          console.log("response code working ra ba");
          toast("One Product Inserted successfully");
        } else {
          alert("Somthing went wrong try again");
        }
      });
  };

  return (
    <div className="product-page">
      <div className="form">
        <h2>Product Form</h2>
        <div className="login-form">
          <input
            type="text"
            name="id"
            id="id"
            placeholder="Product ID"
            onChange={(val) => setId(val.target.value)}
          ></input>
          <br />

          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="Product Name"
            // value={productName}
            onChange={(val) => setProductName(val.target.value)}
          ></input>
          <br />

          <input
            type="text"
            name="price"
            id="price"
            placeholder="Product Price"
            // value={price}
            onChange={(val) => setPrice(val.target.value)}
          ></input>
          <br />

          <input
            type="text"
            name="color"
            id="color"
            placeholder="Product Color"
            // value={color}
            onChange={(val) => setColor(val.target.value)}
          ></input>
          <br />

          <input
            type="text"
            name="description"
            id="description"
            placeholder="Product Description"
            // value={description}
            onChange={(val) => setDescription(val.target.value)}
          ></input>
          <br />

          <input
            type="text"
            name="details"
            id="details"
            placeholder="Product Details"
            // value={details}

            onChange={(val) => setDetails(val.target.value)}
          ></input>
          <br />
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileInputChange}
          />
          {/* {image && <img src={image} alt="Selected" />} */}
          <br />
          <button onClick={(e) => submitHandler(e)}>Add Product</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Product;
