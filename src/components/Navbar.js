import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearch = () => {
    console.log(searchText);
  };
  return (
    <Flex justify="space-between">
      <Box>
        <Link to="/">E-commerce</Link>
      </Box>
      <Box>
        <InputGroup>
          <Input
            type="text"
            placeholder="search for your favourite products"
            value={searchText}
            onChange={handleChange}
            w="300px"
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <InputRightElement size="xs">
            <Button
              colorScheme="blue"
              aria-label="Search database"
              onClick={handleSearch}
            >
              <SearchIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box>
        <Link to="/login">Signup/Login</Link>
      </Box>
    </Flex>
  );
}
