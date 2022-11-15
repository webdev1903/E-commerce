import { useState } from "react";
import { Td, Tr, Image, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
  getCartItems,
} from "../redux/cart/cart.actions";

export default function CartItem({
  image,
  title,
  price,
  quantity,
  _id,
  token,
}) {
  const dispatch = useDispatch();
  if (quantity === 0) {
    dispatch(removeCartItem(_id, token));
  }
  return (
    <Tr>
      <Td>
        <Image src={image} h={["50px", "100px", "100px"]} />
        <Text>{title}</Text>
      </Td>
      <Td>
        <Button
          onClick={() =>
            dispatch(updateCartItem(_id, { quantity: quantity - 1 }, token))
          }
        >
          ➖
        </Button>
        <Button>{quantity}</Button>
        <Button
          onClick={() =>
            dispatch(updateCartItem(_id, { quantity: quantity + 1 }, token))
          }
        >
          ➕
        </Button>
      </Td>
      <Td>Rs. {price}</Td>
      <Td>
        <Button
          onClick={() => {
            dispatch(removeCartItem(_id, token));
          }}
        >
          Remove
        </Button>
      </Td>
    </Tr>
  );
}
