import Event from "../models/Event.js";
import EventLog from "../models/EventLog.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, profiles, timezone } =
      req.body;

    if (!title || !startDate || !endDate || !profiles || !timezone) {
      return res.status(400).json({
        message:
          "Title, startDate, endDate, profiles, and timezone are required",
        status: false,
      });
    }

    const event = new Event({
      title,
      description,
      startDate,
      endDate,
      profiles,
      timezone,
    });
    await event.save();

    res
      .status(201)
      .json({ message: "Event created successfully", event, status: true });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("profiles")
      .sort({ createdAt: -1 });

    res.status(200).json({ events, status: true });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "No id provided", status: false });
    }
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted", status: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      startDate,
      endDate,
      profiles,
      timezone,
      updatedBy,
    } = req.body;

    if (!id || !updatedBy) {
      return res
        .status(400)
        .json({ message: "No id or updatedBy provided", status: false });
    }

    const oldEvent = await Event.findById(id);
    if (!oldEvent) {
      return res
        .status(404)
        .json({ message: "Event not found", status: false });
    }

    const previousData = {
      title: oldEvent.title,
      description: oldEvent.description,
      startDate: oldEvent.startDate,
      endDate: oldEvent.endDate,
      profiles: oldEvent.profiles,
      timezone: oldEvent.timezone,
    };

    const newData = {
      title: title || oldEvent.title,
      description: description || oldEvent.description,
      startDate: startDate || oldEvent.startDate,
      endDate: endDate || oldEvent.endDate,
      profiles: profiles || oldEvent.profiles,
      timezone: timezone || oldEvent.timezone,
    };

    await EventLog.create({
      eventId: id,
      updatedBy: updatedBy,
      previousData: previousData,
      newData: newData,
    });
    const updatedEvent = await Event.findByIdAndUpdate(id, newData, {
      new: true,
    }).populate("profiles");

    if (!updatedEvent) {
      return res.status(404).json({
        message: "Event not found",
        status: false,
        event: updatedEvent,
      });
    }

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
      status: true,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

export const getEventLogs = async (req, res) => {
  try {
    const { eventId } = req.params;

    const logs = await EventLog.find({ eventId })
      .populate("updatedBy", "name timezone")
      .sort({ createdAt: -1 });

    res.status(200).json({ logs, status: true });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};
