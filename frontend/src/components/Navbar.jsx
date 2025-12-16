import React from "react";
import { useAuth } from "../store/useAuthStore";
import { MessageSquare, Settings, User, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { authUser, logout } = useAuth();
  return (
    <header>
      <div>
        <div className="flex items-center space-around ">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transitions-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
            </Link>
          </div>
          <div>
            <div className="flex items-center justify-items-center gap-2">
              <Link
                to={"/settings"}
                className="btn btn-sm gap-2 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              {authUser && (
                <>
                  <Link to={"/profile"} className="btn btn-sm gap-2">
                    <User />
                    <span className="hidden sm:inline"> Profile</span>
                  </Link>
                  <button className="flex items-center gap-2" onClick={logout}>
                    <LogOutIcon className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </header>
  );
};

export default Navbar;
