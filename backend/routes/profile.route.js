import express from "express";
import protectRoute from "../middleware/protectRoute.js"
import { createProfile, viewProfiles } from "../controllers/profile.controller.js";
import { checkEmailVerified } from "../middleware/checkEmailVerified.js";

const router = express.Router();

router.post("/createProfile",protectRoute,checkEmailVerified,createProfile);

router.post("/viewProfiles",protectRoute,checkEmailVerified,viewProfiles);


export default router;