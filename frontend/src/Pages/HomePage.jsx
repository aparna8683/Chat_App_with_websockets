import React from "react";
import { useAuth } from "../store/useAuthStore";

const HomePage = () => {
  const { authUser } = useAuth();
  return <div>HomePage</div>;
};

export default HomePage;
