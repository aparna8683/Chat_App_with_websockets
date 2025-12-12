import React from "react";
import { useAuth } from "../store/useAuthStore";

const Login = () => {
  const { authUser } = useAuth();
  return <div>LoginPage</div>;
};

export default Login;
