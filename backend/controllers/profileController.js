import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
  try {
    const { name, timezone } = req.body;

    if (!name || !timezone) {
      return res
        .status(400)
        .json({ message: "Name and timezone are required", status: false });
    }
    const profile = new Profile({ name, timezone });
    await profile.save();
    res
      .status(201)
      .json({ message: "Profile created successfully", profile, status: true });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.status(200).json({ profiles, status: true });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ message: "No id provided", status: false });
    }
    await Profile.findByIdAndDelete(id);

    res.status(200).json({ message: "Profile deleted", status: true });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
