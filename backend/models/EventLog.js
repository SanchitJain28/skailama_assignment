import mongoose from "mongoose";
const { Schema } = mongoose;

const eventLogSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    previousData: { type: Object, required: true },
    newData: { type: Object, required: true },
  },
  { timestamps: true }, 
);

const EventLog = mongoose.model("EventLog", eventLogSchema);
export default EventLog;
