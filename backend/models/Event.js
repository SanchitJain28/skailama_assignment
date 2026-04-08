import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    profiles: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    timezone: { type: String, required: true },
  },
  { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
