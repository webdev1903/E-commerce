import { Routes, Route } from "react-router-dom";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Home from "../pages/home";
import Account from "../pages/account";
import PrivateRoute from "./PrivateRoute";
import Product from "../pages/products";
import Cart from "../pages/cart";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/products" element={<Product />}></Route>
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}
