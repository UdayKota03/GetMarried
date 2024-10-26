import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";

function ExploreProfiles() {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
    try {
      const { data } = await axios.post(
        "/api/profile/viewProfiles",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log(data);
      setProfiles(data);
    } catch (error) {
      console.log("Error in fetchProfiles: ", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div
      className="bg-[#ECDFD0] mt-16 min-h-screen p-5"
    >
      <h1 className="text-2xl font-bold mb-4">Explore Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <Profile profile={profile} key={index} type={"profile"} />
          ))
        ) : (
          <p>No profiles available.</p>
        )}
      </div>
    </div>
  );
}

export default ExploreProfiles;
