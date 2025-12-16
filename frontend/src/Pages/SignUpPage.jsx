import React, { useState } from "react";
import { useAuth } from "../store/useAuthStore";
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

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      toast.error("All fields are required");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 space-y-8">
        {/* Heading */}
        <div className="text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mt-2">
              Create Account
            </h1>
            <p className="text-gray-400">Get started with your free account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 size-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Aparna Singh"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 size-5 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="aparna@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 size-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full bg-primary hover:bg-primary/80 text-white font-semibold py-2 rounded transition"
          >
            {isSigningUp ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
