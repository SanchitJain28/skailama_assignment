import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
      default: "UTC",
    },
  },
  { timestamps: true },
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
