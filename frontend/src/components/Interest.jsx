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

      console.log(data);
      setProfiles(data);
    } catch (error) {
      console.log("Error in fetchProiles. : ", error);
    }
  };

  useEffect(() => {
    handlegetReceivedInterests();
  }, []);
  return (
    <>
      <div className="" style={{backgroundColor : "#ECDFD0" , marginTop:"70px" , minHeight:"100vh" , height:"100%" , padding:"20px"}}>
        {profiles.length > 0 &&
          profiles.map((profile, index) => {
            return <Profile profile={profile} key={index} type={"interest"} />;
          })}
      </div>
    </>
  );
}

export default Interest;
