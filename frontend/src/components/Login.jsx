import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useStore from "../store/store";

const Login = () => {
  const navigate = useNavigate();
  const {user , setUser} = useStore();
  const [userdetails, setuserdetails] = useState({ email: "", password: "" });

  const handleuserchanges = (e) => {
    setuserdetails({ ...userdetails, [e.target.name]: e.target.value });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/auth/login", {
      email: userdetails.email,
      password: userdetails.password,
    });

    if (!data.success) {
      return;
    }

    console.log(data?.user);

    setUser(data?.user);

    console.log(user);

    localStorage.setItem("jwt", data.token);

    navigate("/user");
    return;
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handelsubmit}>
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={handleuserchanges}
              placeholder="Enter your email"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={handleuserchanges}
              placeholder="Enter your password"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
