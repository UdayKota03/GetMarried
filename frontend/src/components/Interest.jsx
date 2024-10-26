import React, { useEffect, useState } from "react";
import axios from 'axios';
import Profile from "./Profile";

function Interest() {
  const [profiles, setProfiles] = useState([]);

  const handlegetReceivedInterests = async () => {
    try {
      const { data } = await axios.get(
        "/api/profile/getReceivedInterests",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("Received data :", data);
      setProfiles(data);
    } catch (error) {
      console.log("Error in fetchProfiles: ", error);
    }
  };

  useEffect(() => {
    handlegetReceivedInterests();
  }, []);

  return (
    <div className="bg-[#ECDFD0] mt-16 min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">Received Interests</h1>
      <div className="flex flex-col gap-4">
        {profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <Profile profile={profile?.profile} key={index} type={"interest"} />
          ))
        ) : (
          <p>No interests received.</p>
        )}
      </div>
    </div>
  );
}

export default Interest;
