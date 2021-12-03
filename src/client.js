import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Modals from "./components/Modals/modals";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./pages/ErrorPage/Error";
import Products from "./pages/Products/Products";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Cart from './pages/Cart/Cart'

import Home from "./pages/Home/Home";
import "antd/dist/antd.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Client() {
  const [Render, setRender] = useState(false);
  function renderPage() {
    setRender(!Render);
  }
  return (
    <div className="App">
      <Header></Header>
      <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/Products/:category" component={Products}></Route>
        <Route path="/DetailProduct/:id" component={DetailProduct}></Route>
        <Route path='/Cart' component={Cart}></Route>

        <Route component={ErrorPage} />
      </Switch>
      <Footer></Footer>
      <Modals></Modals>
      <ToastContainer />
    </div>
  );
}

export default Client;
