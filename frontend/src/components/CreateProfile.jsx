import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    heightFeet: "",
    heightInches: "",
    religion: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    contact: "",
    maritalStatus: "",
    community: "",
    community_preference: "",
    timeOfBirth: "",
    placeOfBirth: "",
    photos: "",
  });

  const handleChanges = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    console.log(profile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/profile/createProfile", {profilee : profile} , {
        headers :{
            Authorization : `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      if (data.success) {
        console.log("Profile created successfully.");
        navigate("/profiles");
      }
    } catch (error) {
      console.log("Error creating profile: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{backgroundColor : "#ECDFD0" , marginTop:"70px" , minHeight:"100vh" , height:"100%" , padding:"20px"}}>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              onChange={handleChanges}
              placeholder="Enter your first name"
              className="w-full input input-bordered h-8"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              onChange={handleChanges}
              placeholder="Enter your last name"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Date of Birth</span>
            </label>
            <input
              type="date"
              name="dob"
              onChange={handleChanges}
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Height (feet & inches)</span>
            </label>
            <div className="flex space-x-4">
              <input
                type="number"
                name="heightFeet"
                onChange={handleChanges}
                placeholder="Feet"
                className="w-1/2 input input-bordered h-8"
                required
              />
              <input
                type="number"
                name="heightInches"
                onChange={handleChanges}
                placeholder="Inches"
                className="w-1/2 input input-bordered h-8"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Religion</span>
            </label>
            <input
              type="text"
              name="religion"
              onChange={handleChanges}
              placeholder="Enter your religion"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Gender</span>
            </label>
            <select
              name="gender"
              onChange={handleChanges}
              className="w-full input input-bordered h-8"
              required
            >
              <option value="" disabled selected>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">City</span>
            </label>
            <input
              type="text"
              name="city"
              onChange={handleChanges}
              placeholder="Enter your city"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">State</span>
            </label>
            <input
              type="text"
              name="state"
              onChange={handleChanges}
              placeholder="Enter your state"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Country</span>
            </label>
            <input
              type="text"
              name="country"
              onChange={handleChanges}
              placeholder="Enter your country"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Contact</span>
            </label>
            <input
              type="text"
              name="contact"
              onChange={handleChanges}
              placeholder="Enter your contact number"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Marital Status</span>
            </label>
            <select
              name="maritalStatus"
              onChange={handleChanges}
              className="w-full input input-bordered h-8"
              required
            >
              <option value="" disabled selected>
                Select your marital status
              </option>
              <option value="never married">Never Married</option>
              <option value="separated">Separated</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Community</span>
            </label>
            <input
              type="text"
              name="community"
              onChange={handleChanges}
              placeholder="Enter your community"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Community Preference</span>
            </label>
            <input
              type="text"
              name="community_preference"
              onChange={handleChanges}
              placeholder="Enter your community preference"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Photos URL</span>
            </label>
            <input
              type="text"
              name="photos"
              onChange={handleChanges}
              placeholder="Enter a photo URL"
              className="w-full input input-bordered h-8"
              required
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Time of Birth (Optional)</span>
            </label>
            <input
              type="text"
              name="timeOfBirth"
              onChange={handleChanges}
              placeholder="Enter time of birth"
              className="w-full input input-bordered h-8"
            />
          </div>

          <div className="mb-4">
            <label className="label p-2">
              <span className="text-base label-text">Place of Birth (Optional)</span>
            </label>
            <input
              type="text"
              name="placeOfBirth"
              onChange={handleChanges}
              placeholder="Enter place of birth"
              className="w-full input input-bordered h-8"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
