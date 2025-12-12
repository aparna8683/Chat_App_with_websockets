import React from "react";
import { useAuth } from "../store/useAuthStore";

const SettingsPage = () => {
  const { authUser } = useAuth();
  return <div>SettingsPage</div>;
};

export default SettingsPage;
