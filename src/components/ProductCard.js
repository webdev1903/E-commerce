import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { useContext } from "react";
import axios from "axios";

export default function ProductCard({ image, title, price, ratings }) {
  const { state } = useContext(AuthContext);

  const handleAddToCart = async () => {
    if (!state.authStatus) {
      alert("Please login first");
    } else {
      // console.log(state.user._id);
      // console.log(image, price, title, ratings);
      const res = await axios.patch(
        `http://localhost:2345/users/${state.user._id}`,
        { image, title, price, ratings, quantity: 1 }
      );
      // console.log(res);
    }
  };
  return (
    <Flex direction="column" justify="center" align="center">
      <Image src={image} h="200px" width="80%" />
      <Text>{title}</Text>
      <Button>Price : Rs.{price}</Button>
      <Button>
        Ratings : {ratings.rate} ({ratings.count})
      </Button>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </Flex>
  );
}
