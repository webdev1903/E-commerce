import { useState, useContext } from "react";
import { FormLabel, Input, Button, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { AuthStatus } from "../context/AuthContext/action";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { state, dispatch } = useContext(AuthContext);
  if (state.authStatus) {
    return <Navigate to="/" />;
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const res = await axios.get(`http://localhost:2345/users/${data.email}`);
    let creds = res.data;
    if (creds.email === data.email && creds.password === data.password) {
      alert("login successful");
      dispatch({ type: AuthStatus });
    } else {
      alert("invalid credentials");
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
        <Button>Create you E-commerce account</Button>
      </Link>
    </Box>
  );
}
