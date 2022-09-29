import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Box>
      <Link to="/">E-commerce</Link>
      {/* <Link to="/signup">Signup</Link> */}
      <Link to="/login">Signup/Login</Link>
    </Box>
  );
}
