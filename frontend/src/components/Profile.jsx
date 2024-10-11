import React, { useState } from "react";
import axios from "axios";

function Profile({ profile, key, type }) {
  const [showFullProfile, setShowFullProfile] = useState(false);

  const toggleProfile = () => {
    setShowFullProfile(!showFullProfile);
  };

  const handleInterestClick = async (toProfile) => {
    try {
      console.log(
        `Interest shown in ${toProfile.firstName} ${toProfile.lastName}`
      );
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
    } catch (err) {
      console.log("Error in send interest : ", err);
    }
  };

  const handleacceptInterest = async (toProfile) => {
    try {
      console.log(
        `Accept Interest ${toProfile.firstName} ${toProfile.lastName} , ${toProfile.interestId}`
      );
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
    } catch (error) {
      console.log("Error in accept interest. : ", error);
    }
  };

  return (
    <div
      className="p-4 bg-white shadow-lg rounded-md max-w-md w-full mx-auto my-4"
      key={key}
    >
      {/* Short Profile Summary */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            {profile.firstName} {profile.lastName}
          </h2>
        </div>
        <div>
          <button onClick={toggleProfile} className="btn btn-primary mr-2">
            {showFullProfile ? "Hide Profile" : "View Full Profile"}
          </button>

          {type === "profile" && (
            <button
              onClick={() => handleInterestClick(profile)}
              className="btn btn-secondary"
            >
              Show Interest
            </button>
          )}

          {type === "interest" && (
            <button
              onClick={() => handleacceptInterest(profile)}
              className="btn btn-secondary"
            >
              Accept Interest
            </button>
          )}
        </div>
      </div>

      {/* Full Profile - Toggle visibility based on state */}
      {showFullProfile && (
        <div className="mt-4 p-4 border-t">
          <p>
            <strong>height:</strong> {profile.height.feet} Feet{" "}
            {profile.height.inches} Inches
          </p>
          <p>
            <strong>dob:</strong> {profile.dob}
          </p>
          <p>
            <strong>religion:</strong> {profile.religion}
          </p>
          <p>
            <strong>gender:</strong> {profile.gender}
          </p>
          <p>
            <strong>city:</strong> {profile.city}
          </p>
          <p>
            <strong>state:</strong> {profile.state}
          </p>
          <p>
            <strong>country:</strong> {profile.country}
          </p>
          <p>
            <strong>maritalStatus:</strong> {profile.maritalStatus}
          </p>
          <p>
            <strong>community:</strong> {profile.community}
          </p>
          <p>
            <strong>community_preference:</strong>{" "}
            {profile.community_preference}
          </p>
          <p>
            <strong>timeOfBirth:</strong> {profile.timeOfBirth}
          </p>
          <p>
            <strong>placeOfBirth:</strong> {profile.placeOfBirth}
          </p>
          {/* Add other profile fields as necessary */}
        </div>
      )}
    </div>
  );
}

export default Profile;
