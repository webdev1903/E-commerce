import { useState } from "react";
import { Td, Tr, Image, Text, Button } from "@chakra-ui/react";

export default function CartItem({
  image,
  title,
  price,
  handleRemove,
  quantity,
  handleQuantity,
  index,
}) {
  //   const [quantity, setQuantity] = useState(1);

  const updateQuantity = () => {};
  return (
    <Tr>
      <Td>
        <Image src={image} h={["30px", "50px", "100px"]} />
        <Text>{title}</Text>
      </Td>
      <Td>
        <Button onClick={handleQuantity.bind(null, -1, index)}>➖</Button>
        <Button>{quantity}</Button>
        <Button onClick={handleQuantity.bind(null, 1, index)}>➕</Button>
      </Td>
      <Td>Rs. {price}</Td>
      <Td>
        <Button onClick={handleRemove.bind(null, index)}>Remove</Button>
      </Td>
    </Tr>
  );
}
