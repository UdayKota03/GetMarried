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
      console.log("Error in fetchProiles. : ", error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);
  return (
    <>
      <div className="" style={{backgroundColor : "#ECDFD0" , marginTop:"70px" , minHeight:"100vh" , height:"100%" , padding:"20px"}}>
        {profiles.length > 0 &&
          profiles.map((profile, index) => {
            return <Profile profile={profile} key={index} type={"profile"} />;
          })}
      </div>
    </>
  );
}

export default ExploreProfiles;
