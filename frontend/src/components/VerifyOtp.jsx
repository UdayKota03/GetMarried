import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setotp] = useState("");

  const handleotpchange = (e) => {
    setotp(e.target.value);
  };
  const getotp = async () => {
    try {
      const { data } = await axios.post(
        "/api/auth/sendOtpEmail",
        {
          email: localStorage.getItem("email"),
        }
      );

      if (!data.success) {
        return;
      }

      console.log("Opt sent");
      return;
    } catch (error) {
      console.log("Error in getotp. : ", error);
    }
  };

  const handlesubmit = async () => {
    try {
      console.log("Handle click");
      console.log(otp);
      const { data } = await axios.post(
        "/api/auth/verifyOtpEmail",
          {
            email: localStorage.getItem("email"),
            otp: otp,
          }
      );

      if (!data.success) {
        return;
      }

      navigate("/login");

      console.log("Verification done.");
    } catch (error) {
      console.log("Error in verification : ", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Verify OTP
        </h2>
        <div>
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">OTP</span>
            </label>
            <input
              type="text"
              name="otp"
              onChange={handleotpchange}
              placeholder="Enter the OTP sent to your email"
              className="w-full input input-bordered h-8"
              required
            />
            <button onClick={getotp}>Get OTP</button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handlesubmit}
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
