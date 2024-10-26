import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from "./Profile";

function Matches() {
    const [profiles, setProfiles] = useState([]);

    const handlegetReceivedInterests = async () => {
        try {
            const { data } = await axios.get(
                "/api/profile/getMatches",
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
        handlegetReceivedInterests();
    }, []);

    return (
        <div className="bg-[#ECDFD0] mt-16 min-h-screen p-5">
            <h1 className="text-2xl font-bold mb-4">Matched Profiles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {profiles.length > 0 ? (
                    profiles.map((profile, index) => (
                        <Profile profile={profile} key={index} type={"match"} />
                    ))
                ) : (
                    <p>No matches found.</p>
                )}
            </div>
        </div>
    );
}

export default Matches;
