import { Box, Text, Flex } from "@chakra-ui/react";

export default function PopOver({ data }) {
  // console.log(data);
  return (
    <Flex
      direction="column"
      position="absolute"
      top="50px"
      backgroundColor="white"
      width="500px"
      maxH="400px"
      overflowY="scroll"
      zIndex="2"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {data.map((el) => (
        <Box key={el.id} border="1px solid" borderColor="black" padding="5px">
          <Text>{el.title}</Text>
        </Box>
      ))}
    </Flex>
  );
}
