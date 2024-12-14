import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function Profile({ profile, type }) {
  const [showFullProfile, setShowFullProfile] = useState(false);

  const toggleProfile = () => {
    setShowFullProfile(!showFullProfile);
  };

  const handleInterestClick = async (toProfile) => {
    try {
      console.log(`Interest shown in ${toProfile.firstName} ${toProfile.lastName}`);
      const { data } = await axios.post(
        "/api/profile/showInterest",
        { interestedUserId: toProfile._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(data);
      toast.success('Interest shown successfully!');
    } catch (err) {
      console.log("Error in sending interest: ", err);
      toast.error('Failed to show interest.');
    }
  };

  const handleAcceptInterest = async (toProfile) => {
    try {
      console.log(`Accept Interest from ${toProfile.firstName} ${toProfile.lastName}`);
      const { data } = await axios.post(
        "/api/profile/acceptInterest",
        { interestId: toProfile.interestId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(data);
      toast.success('Interest accepted successfully!');
    } catch (error) {
      console.log("Error in accepting interest: ", error);
      toast.error('Failed to accept interest.');
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-md max-w-md w-full mx-auto my-4 transition-all duration-300 ease-in-out hover:shadow-xl">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {profile.firstName} {profile.lastName}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={toggleProfile}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {showFullProfile ? "Hide Profile" : "View Full Profile"}
          </button>

          {type === "profile" && (
            <button
              onClick={() => handleInterestClick(profile)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Show Interest
            </button>
          )}

          {type === "interest" && (
            <button
              onClick={() => handleAcceptInterest(profile)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Accept Interest
            </button>
          )}
        </div>
      </div>

      {showFullProfile && (
        <div className="mt-4 p-4 border-t">
          {profile.photos && profile.photos.length > 0 && (
            <div className="w-full h-64 mb-4">
              <img
                src={profile.photos[0].url}
                alt="Profile Photo"
                className="w-full h-full object-cover rounded"
              />
            </div>
          )}
          <p>
            <strong>Height:</strong>{" "}
            {profile.height ? `${profile.height.feet} Feet ${profile.height.inches} Inches` : "N/A"}
          </p>
          <p><strong>Date of Birth:</strong> {profile.dob || "N/A"}</p>
          <p><strong>Religion:</strong> {profile.religion || "N/A"}</p>
          <p><strong>Gender:</strong> {profile.gender || "N/A"}</p>
          <p><strong>City:</strong> {profile.city || "N/A"}</p>
          <p><strong>State:</strong> {profile.state || "N/A"}</p>
          <p><strong>Country:</strong> {profile.country || "N/A"}</p>
          <p><strong>Marital Status:</strong> {profile.maritalStatus || "N/A"}</p>
          <p><strong>Community:</strong> {profile.community || "N/A"}</p>
          <p><strong>Community Preference:</strong> {profile.community_preference || "N/A"}</p>
          <p><strong>Time of Birth:</strong> {profile.timeOfBirth || "N/A"}</p>
          <p><strong>Place of Birth:</strong> {profile.placeOfBirth || "N/A"}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;