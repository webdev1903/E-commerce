import { useState, useEffect, useContext } from "react";
import { Box, Image } from "@chakra-ui/react";
import Popover from "../components/popover";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";

export default function Home() {
  const [slidingImage, setSlidingImage] = useState("prod1.jpg");
  const { state } = useContext(AuthContext);

  useEffect(() => {
    carousel();
  }, []);

  const carousel = () => {
    const arr = [
      "prod1.jpg",
      "prod2.jpg",
      "prod3.jpg",
      "prod4.jpg",
      "prod5.jpg",
    ];
    let i = 1;
    const id = setInterval(() => {
      if (i == 4) {
        i = 0;
      }
      setSlidingImage(arr[i]);
      i++;
    }, 3000);
  };
  return (
    <>
      <Box>
        {/* {state.popover.length > 0 && <Popover data={state.popover}></Popover>} */}
        <Box w="100%" margin="auto">
          <Image
            src={slidingImage}
            alt="broken image"
            w="100%"
            h="100%"
          ></Image>
        </Box>
      </Box>
    </>
  );
}
