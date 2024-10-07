import Profile from "../models/profile.model.js";

// Create user profile after email verification
export const createProfile = async (req, res) => {
  try {
    const { email } = req.user;
    const {
      firstName,
      lastName,
      dob,
      height,
      religion,
      gender,
      city,
      state,
      country,
      contact,
      maritalStatus,
      community,
      community_preference,
      photos,
      timeOfBirth,
      placeOfBirth,
    } = req.body;

    // Check if a profile already exists for the email
    const profileExists = await Profile.findOne({ email });
    if (profileExists) {
      return res
        .status(400)
        .json({ message: "Profile already exists for this email" });
    }

    // Create new profile object
    const profile = new Profile({
      email, // Use email to link profile
      firstName,
      lastName,
      dob,
      height,
      religion,
      gender,
      city,
      state,
      country,
      contact,
      maritalStatus,
      community,
      community_preference,
      photos,
      timeOfBirth,
      placeOfBirth,
    });

    // Save profile to the database
    await profile.save();

    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    console.log("Error in createProfile controller " + err.message);
    res.status(500).json({ error: "Failed to create profile" });
  }
};

export const viewProfiles = async (req, res) => {
  try {
    const { email } = req.user; // Extract user gender from the token
    console.log("User Info:", email);

    const userprofiles = await Profile.find({ email });

    const { gender, community_preference,height, dob} = userprofiles[0];

    // console.log(userprofiles);
    const currentDate = new Date();
    const userAge = currentDate.getFullYear() - new Date(dob).getFullYear();

    let heightFilter = {};
    let ageFilter = {};

    // Apply height filter based on the user's gender
    if (gender === "male") {
      // For males, find females with height less than the user's height
      heightFilter = {
        $or: [
          {
            "height.feet": { $lt: height.feet }, // Less feet
          },
          {
            "height.feet": height.feet,
            "height.inches": { $lt: height.inches }, // Same feet but less inches
          },
        ],
      };

      ageFilter = {
        dob: { $gte: new Date(currentDate.setFullYear(currentDate.getFullYear() - userAge)) } // Younger
      };
    } else if (gender === "female") {
      // For females, find males with height greater than the user's height
      heightFilter = {
        $or: [
          {
            "height.feet": { $gt: height.feet }, // More feet
          },
          {
            "height.feet": height.feet,
            "height.inches": { $gt: height.inches }, // Same feet but more inches
          },
        ],
      };
      ageFilter = {
        dob: { $lte: new Date(currentDate.setFullYear(currentDate.getFullYear() - userAge)) } // Older
      };
    }

    const profiles = await Profile.find({
      gender: { $ne: gender },
      community_preference: community_preference,
      ...heightFilter,
      ...ageFilter
    });

    res.status(200).json(profiles);
  } catch (error) {
    console.log("Error in viewProfiles controller " + err.message);
    res.status(500).json({ error: "Failed to view profiles" });
  }
};
