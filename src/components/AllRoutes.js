import { Routes, Route } from "react-router-dom";
import Signup from "../pages/signup";
import Login from "../pages/login";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}
