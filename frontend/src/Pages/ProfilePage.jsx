import React, { useState } from "react";
import { useAuth } from "../store/useAuthStore";
import { Camera } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuth();
  const [selectedImage, setSelectedImage]=useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // You can handle image upload logic here
    // updateProfile({ profilePic: file })
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="text-gray-400 text-sm">Your profile information</p>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImage || authUser?.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-600"
            />

            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-1 right-1 bg-primary p-2 rounded-full cursor-pointer hover:bg-primary/80 transition
                ${
                  isUpdatingProfile
                    ? "animate-pulse pointer-events-none opacity-70"
                    : ""
                }
              `}
            >
              <Camera size={16} className="text-white" />
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>

          {isUpdatingProfile && (
            <p className="text-sm text-gray-400">Updating profile...</p>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm border border-gray-700">
            <span className="text-gray-400">Name</span>
            <span className="text-white">{authUser?.fullName || "—"}</span>
          </div>

          <div className="flex justify-between text-sm border border-gray-700">
            <span className="text-gray-400">Email</span>
            <span className="text-white">{authUser?.email || "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
