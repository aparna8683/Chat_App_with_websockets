import React, { useState } from "react";
import { useAuth } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import { MessageSquare, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const { signup, isSigningUp } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim() || !formData.password.trim()) {
      return toast.error("All fields are required");
    }
    if (!formData.email.trim()) {
      return toast.error("All fields are required");
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    signup(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md space-y-8 p-6">
        {/* Logo / Heading */}
        <div className="text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your free account
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 size-5 text-base-content/40" />
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="Aparna Singh"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-5 text-base-content/40" />
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="aparna@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 size-5 text-base-content/40" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      {/* right side */}
      {/* <AuthImagePattern
        title="Join our Community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      /> */}
    </div>
  );
};

export default SignUpPage;
