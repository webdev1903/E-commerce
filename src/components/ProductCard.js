import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cart/cart.actions";

export default function ProductCard({ image, title, price, ratings, _id }) {
  const { state } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    if (!state.authStatus) {
      alert("Please login first");
    } else {
      dispatch(addItemToCart(state.token, _id));
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
