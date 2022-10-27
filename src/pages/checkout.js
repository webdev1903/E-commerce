import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import axios from "axios";
import Address from "../components/address";
import OrderSummary from "../components/orderSummary";

const getAddresses = async (id, token) => {
  const res = await axios.get(`http://localhost:2345/addresses/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  //   console.log(res);
  return res;
};

export default function Checkout() {
  const { state } = useContext(AuthContext);
  const id = state.user._id;
  const token = state.token;
  const [data, setData] = useState([]);
  const address = useRef();

  useEffect(() => {
    getAddresses(id, token).then((res) => (address.current = res.data));
    // Total();
  }, []);

  // function Total() {
  //   let sum = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     sum += data[i].price * data[i].quantity;
  //   }
  //   return sum.toFixed(2);
  // }
  return (
    <Box>
      <Flex></Flex>
      <Address />
      <OrderSummary data={data} />
    </Box>
  );
}
