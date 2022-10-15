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

const getUser = async (id) => {
  const res = await axios.get(`http://localhost:2345/users/${id}`);
  //   console.log(res);
  return res;
};

export default function Cart() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const id = state.user._id;
  const navigate = useNavigate();
  //   console.log(data);

  useEffect(() => {
    // const res = getUser(id).then((res) => setData(res.data.cart));
    updatedData();
    Total();
    // console.log("U", res);
  }, []);

  const updatedData = async () => {
    const res = await getUser(id);
    setData(res.data.cart);
  };

  if (data.length === 0) {
    return <h1>No items in Cart</h1>;
  }

  function Total() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].price * data[i].quantity;
    }
    return sum.toFixed(2);
  }

  const handleRemove = async (index) => {
    data.splice(index, 1);
    const res = await axios.patch(`http://localhost:2345/users/${id}/cart`, {
      cart: data,
    });
    // console.log(res);
    updatedData();
  };

  const handleQuantity = async (ch, index) => {
    // console.log(ch, index);
    for (let i = 0; i < data.length; i++) {
      if (i === index) {
        data[i].quantity += ch;
      }
    }
    const res = await axios.patch(`http://localhost:2345/users/${id}/cart`, {
      cart: data,
    });
    // console.log(res);
    updatedData();
  };

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
            {data.map(
              (e, i) => (
                <CartItem
                  image={e.image}
                  title={e.title}
                  price={e.price}
                  quantity={e.quantity}
                  handleRemove={handleRemove}
                  key={Date.now() * Math.random()}
                  handleQuantity={handleQuantity}
                  index={i}
                />
              )
              //   <Tr textAlign="center">
              //     <Td>
              //       <Image
              //         src={e.image}
              //         alt="broken image"
              //         h={["30px", "50px", "100px"]}
              //       />
              //       <Text>{e.title}</Text>
              //     </Td>
              //     <Td>
              //       <Button onClick={() => setQuantity((prev) => prev - 1)}>
              //         ➖
              //       </Button>
              //       <Button>{quantity}</Button>
              //       <Button onClick={() => setQuantity((prev) => prev + 1)}>
              //         ➕
              //       </Button>
              //     </Td>
              //     <Td>Rs. {e.price}</Td>
              //   </Tr>
            )}
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
      <Button onClick={() => navigate("/checkout")}>Checkout</Button>
    </Box>
  );
}
