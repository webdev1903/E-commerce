import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { Flex, Box, Table, Tbody, Tr, Td, Th, Button } from "@chakra-ui/react";
import { Token, AuthStatus, User } from "../context/AuthContext/action";
import { Navigate } from "react-router-dom";

export default function Account() {
  const { state, dispatch } = useContext(AuthContext);
  const userDetails = state.user;
  const handleLogout = () => {
    dispatch({ type: AuthStatus });
    dispatch({ type: Token, payload: "" });
    dispatch({ type: User, payload: {} });
    return <Navigate to="/home" />;
  };
  return (
    <Flex direction="column" justify="center" align="center">
      <Box>Account Details</Box>
      <Table>
        <Tbody>
          <Tr>
            <Th>Name</Th>
            <Td>{userDetails.name}</Td>
          </Tr>
          <Tr>
            <Th>Email</Th>
            <Td>{userDetails.email}</Td>
          </Tr>
          <Tr>
            <Th>Contact no</Th>
            <Td>{userDetails.contact}</Td>
          </Tr>
        </Tbody>
      </Table>
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  );
}
