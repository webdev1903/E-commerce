import { useState } from "react";
import { Td, Tr, Image, Text, Button } from "@chakra-ui/react";

export default function CartItem({
  image,
  title,
  price,
  handleRemove,
  quantity,
  handleQuantity,
  _id,
}) {
  //   const [quantity, setQuantity] = useState(1);

  if (quantity === 0) {
    handleRemove(_id);
  }
  return (
    <Tr>
      <Td>
        <Image src={image} h={["30px", "50px", "100px"]} />
        <Text>{title}</Text>
      </Td>
      <Td>
        <Button onClick={handleQuantity.bind(null, _id, quantity - 1)}>
          ➖
        </Button>
        <Button>{quantity}</Button>
        <Button onClick={handleQuantity.bind(null, _id, quantity + 1)}>
          ➕
        </Button>
      </Td>
      <Td>Rs. {price}</Td>
      <Td>
        <Button onClick={handleRemove.bind(null, _id)}>Remove</Button>
      </Td>
    </Tr>
  );
}
