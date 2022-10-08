import { useState, useContext } from "react";
import { FormLabel, Input, Button, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { AuthStatus, Error, User, Token } from "../context/AuthContext/action";
import { Navigate } from "react-router-dom";
import { CartContext } from "../context/CartContext/CartContextProvider";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { state, dispatch } = useContext(AuthContext);
  // const {handleCartCount} = useContext(CartContext)
  if (state.authStatus) {
    return <Navigate to="/" />;
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    try {
      const res = await axios.post(`http://localhost:2345/login`, data);
      dispatch({ type: AuthStatus });
      dispatch({ type: Token, payload: res.data.token });
      dispatch({ type: User, payload: res.data.user });
      // dispatch({})
      //   console.log(res);
    } catch (error) {
      alert(error.response.data);
    }
  };
  return (
    <Box>
      <form mb="50px">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="avasarala@some.com"
          value={data.email}
          onChange={handleChange}
        ></Input>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          placeholder="if you remember"
          onChange={handleChange}
          value={data.password}
        ></Input>
        <Button onClick={handleLogin}>Login</Button>
      </form>
      <Text>New to E-commerce</Text>
      <Link to="/signup">
        <Button>Create your E-commerce account</Button>
      </Link>
    </Box>
  );
}
