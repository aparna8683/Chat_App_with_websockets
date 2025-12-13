import React, { useState } from "react";
import { useAuth } from "../store/useAuthStore";

const SignUpPage = () => {
  const { authUser } = useAuth();
  const [showPasswod, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const { signup, isSignininUp } = useAuth();
  const validateForm = () => {};

  return <div>SignUpPage</div>;
};

export default SignUpPage;
