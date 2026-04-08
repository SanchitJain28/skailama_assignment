import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventLogs,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent); 
router.get("/:eventId/logs", getEventLogs);
export default router;