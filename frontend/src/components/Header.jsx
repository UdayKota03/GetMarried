import React from "react";
import Logo from "../assets/header_photo.jpg";
import useStore from "../store/store";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useStore();
  return (
    <>
      <div className="hero bg-cusLightBlue min-h-screen pt-28">
        <div className="hero-content flex-col  space-x-4">
          <div className="hero-content flex-row  space-x-4">
            <img src={Logo} className="w-1/2 h-1/2 rounded-lg" />
            <div>
              <h1 className="text-5xl font-bold text">
                GET<span className="text-customBlue">MARRIED!</span>
              </h1>
              <p className="py-6 text-2xl font-robotic">
                Find your soulmate with GetMarried—where genuine connections
                lead to lasting love and happiness.
              </p>
              {(localStorage.getItem("jwt") && user.isProfile) ? (
                <div className="px-32">
                  <button className="btn bg-blue-600 hover:bg-transparent border-none">
                    View Profile
                  </button>
                </div>
              ) : (
                ""
              )}

              {(localStorage.getItem("jwt") && !user.isProfile) ? (
                <div className="px-32">
                  <Link to="/createprofile">
                  <button className="btn bg-blue-600 hover:bg-transparent border-none">
                    Create Profile
                  </button>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
