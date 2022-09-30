import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { Error, User } from "../context/AuthContext/action";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    return dispatch({ type: Error });
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [err, setErr] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post(`http://localhost:2345/register`, data);
      console.log(res.data);
      dispatch({ type: User, payload: res.data });
    } catch (error) {
      dispatch({ type: Error });
      setErr(error.response.data);
    }
  };
  return (
    <Box>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="Avasarala"
          value={data.name}
          onChange={handleChange}
          isRequired
        ></Input>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="avasaral@some.com"
          value={data.email}
          onChange={handleChange}
          isRequired
        ></Input>
        <FormLabel>Contact</FormLabel>
        <Input
          type="number"
          name="contact"
          placeholder="9876543210"
          value={data.contact}
          onChange={handleChange}
          isRequired
        ></Input>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          placeholder="not guessable"
          value={data.password}
          onChange={handleChange}
          isRequired
        ></Input>
        <Button onClick={handleSignup}>Sign Up</Button>
      </FormControl>
      {state.error && <Text color="red">{err}</Text>}
    </Box>
  );
}
