import { Box } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import axios from "axios";
import Address from "../components/address";
import OrderSummary from "../components/orderSummary";

const getUser = async (id) => {
  const res = await axios.get(`http://localhost:2345/users/${id}`);
  //   console.log(res);
  return res;
};

export default function Checkout() {
  const { state } = useContext(AuthContext);
  const id = state.user._id;
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    getUser(id).then((res) => setData(res.data.cart));
    Total();
  }, []);

  function Total() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].price * data[i].quantity;
    }
    return sum.toFixed(2);
  }
  return (
    <Box>
      <Address />
      <OrderSummary data={data} />
    </Box>
  );
}
