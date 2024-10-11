import React, { useState } from "react";
import axios from 'axios';
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
  const [user, setuser] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlechanges = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const handleregister = async(e)=>{
    try {
        e.preventDefault();
        const {data} = await axios.post("/api/auth/register" , {
            user : user
        })

        if(data.success){
            localStorage.setItem("email" , data.email);
        }
        console.log("User saved.");
        navigate("/verify");
        return;
    } catch (error) {
        console.log("Error in handleregister. : " , error);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form onSubmit={handleregister}>
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              onChange={handlechanges}
              placeholder="Enter your full name"
              className="w-full input input-bordered h-8"
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Phone</span>
            </label>
            <input
              type="text"
              name="phone"
              onChange={handlechanges}
              placeholder="Enter your phone number"
              className="w-full input input-bordered h-8"
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              onChange={handlechanges}
              placeholder="Enter your email"
              className="w-full input input-bordered h-8"
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              onChange={handlechanges}
              placeholder="Enter your password"
              className="w-full input input-bordered h-8"
            />
          </div>

          <div className="mb-6">
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handlechanges}
              placeholder="Confirm your password"
              className="w-full input input-bordered h-8"
            />
          </div>
          <div className="pb-2">
            <Link to="/login" className="hover:text-blue-500">Already have an account? Login</Link>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
