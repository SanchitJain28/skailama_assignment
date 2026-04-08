import express from "express";
import { createProfile, deleteProfile, getProfiles } from "../controllers/profileController.js";

const router = express.Router();

router.post("/", createProfile);
router.get("/", getProfiles);
router.delete("/:id", deleteProfile);

export default router;
 