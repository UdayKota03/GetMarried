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

      {showFullProfile && (
        <div className="mt-4 p-4 border-t">
          {profile.height ? (
            <p>
              <strong>height:</strong> {profile.height.feet} Feet{" "}
              {profile.height.inches} Inches
            </p>
          ) : (
            <p>No height data available</p>
          )}
          <p>
            <strong>Date of Birth:</strong> {profile.dob || "N/A"}
          </p>
          <p>
            <strong>Religion:</strong> {profile.religion || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {profile.gender || "N/A"}
          </p>
          <p>
            <strong>City:</strong> {profile.city || "N/A"}
          </p>
          <p>
            <strong>State:</strong> {profile.state || "N/A"}
          </p>
          <p>
            <strong>Country:</strong> {profile.country || "N/A"}
          </p>
          <p>
            <strong>Marital Status:</strong> {profile.maritalStatus || "N/A"}
          </p>
          <p>
            <strong>Community:</strong> {profile.community || "N/A"}
          </p>
          <p>
            <strong>Community Preference:</strong>{" "}
            {profile.community_preference || "N/A"}
          </p>
          <p>
            <strong>Time of Birth:</strong> {profile.timeOfBirth || "N/A"}
          </p>
          <p>
            <strong>Place of Birth:</strong> {profile.placeOfBirth || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
