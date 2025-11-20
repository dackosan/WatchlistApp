import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  if (!auth || !auth.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
