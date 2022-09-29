import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const AuthContext = createContext();

export default function AuthContexProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: false,
    authStatus: false,
    token: "",
  });
  console.log(state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}