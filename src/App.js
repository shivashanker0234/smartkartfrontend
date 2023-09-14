import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import Registration from "./components/RegistrationForm";
import Example from "./components/Example";
import About from "./components/FoundProducts";
import ProductDetails from "./components/ProductDetails";
import Product from "./components/Product";
import CartList from "./components/CartList";
import FoundProducts from "./components/FoundProducts";
import DashBoard from "./components/DashBoard";
import Empty from "./components/Empty";
import UpdateUser from "./components/UpdateUser";
import Demo from "./components/Demo";
import OrdersHistory from "./components/OrdersHistory";
import ProductUpdate from "./components/ProductUpdate";
import ConfirmOrder from "./components/ConfirmOrder";
import StaticUser from "./components/StaticUser";
import Welcome from "./components/Welcome";
// import Payment from "./components/Payment";
// import FoundProducts from "./components/FoundProducts";

function App() {
  return (
    <>
      {/* <ProductUpdate/> */}
      <BrowserRouter>
        <NavBar />
        {/* <Payment/> */}
        {/* <UpdateUser/> */}
        <Routes>
          <Route path="/" exact element={<LoginForm />}></Route>
          <Route path="/reg" exact element={<Registration />}></Route>
          <Route path="/home" exact element={<Home />}></Route>
          <Route path="/cart" exact element={<CartList />}></Route>
          <Route path="/productDetails/:id" exact element={<ProductDetails />}></Route>
          <Route path="/addProduct" exact element={<Product />}></Route>
          <Route
            path="/foundProducts/:name"
            exact
            element={<FoundProducts />}
          ></Route>
          <Route path="/dashboard" exact element={<DashBoard />}></Route>
          <Route path="/empty" exact element={<Empty />}></Route>
          {/* <Route path="/demo" exact element={<Demo />}></Route> */}
          <Route path="/orders" exact element={<OrdersHistory />}></Route>
          <Route path="/updateUser" exact element={<UpdateUser />}></Route>
          <Route path="/staticUser" exact element={<StaticUser/>}></Route>
          <Route path="/confirmOrder" exact element={<ConfirmOrder />}></Route>
          <Route path="/welcome" exact element={<Welcome/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
