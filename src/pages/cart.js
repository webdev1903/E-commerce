import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Image,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import CartItem from "../components/cartItem";
import { useNavigate } from "react-router-dom";
import { Loading } from "../context/AuthContext/action";

const getUser = async (token) => {
  const res = await axios.get(`http://localhost:2345/carts`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res;
};

export default function Cart() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const id = state.user._id;
  const token = state.token;
  const navigate = useNavigate();

  useEffect(() => {
    updatedData();
    Total();
  }, []);

  if (state.loading) {
    return <h1>...Loading</h1>;
  }

  const updatedData = async () => {
    dispatch({ type: Loading });
    const res = await getUser(token);
    setData(res.data);
    dispatch({ type: Loading });
  };

  function Total() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      let prod = data[i].product_id;
      sum += prod.price * data[i].quantity;
    }
    return sum.toFixed(2);
  }

  const handleRemove = async (id) => {
    const res = await axios.delete(`http://localhost:2345/carts/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    updatedData();
  };

  const handleQuantity = async (id, quantity) => {
    const res = await axios.patch(
      `http://localhost:2345/carts/${id}`,
      {
        quantity,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    updatedData();
  };

  const handleCheckout = async () => {
    let orderId = localStorage.getItem("orderId");
    if (!orderId) {
      const res = await axios.post(
        `http://localhost:2345/orders`,
        {
          products: data.map((e) => e._id),
          total: Total(),
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      localStorage.setItem("orderId", res.data._id);
    } else {
      const res = await axios.patch(
        `http://localhost:2345/orders/${orderId}`,
        {
          products: data.map((e) => e._id),
          total: Total(),
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
    }
    navigate("/checkout");
  };

  if (data.length === 0) {
    return <h1>No items in Cart</h1>;
  }
  return (
    <Box>
      <TableContainer>
        <Table variant="simple" colorScheme="whiteAlpha">
          <TableCaption placement="top">Cart Items</TableCaption>
          <Thead>
            <Tr textAlign="center">
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((e, i) => (
              <CartItem
                image={e.product_id.image}
                title={e.product_id.title}
                price={e.product_id.price}
                quantity={e.quantity}
                handleRemove={handleRemove}
                key={Date.now() * Math.random()}
                handleQuantity={handleQuantity}
                _id={e._id}
              />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>
                <Heading as="h6" size="md">
                  Grand Total
                </Heading>
              </Th>
              <Th></Th>
              <Th>
                <Heading as="h6" size="md">
                  {Total()}
                </Heading>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Button onClick={handleCheckout}>Checkout</Button>
    </Box>
  );
}
