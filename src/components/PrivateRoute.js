import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { state } = useContext(AuthContext);

  if (state.authStatus === false) {
    return <Navigate to="/login" />;
  }
  return children;
}
