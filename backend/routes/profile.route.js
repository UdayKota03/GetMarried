import express from "express";
import protectRoute from "../middleware/protectRoute.js"
import { acceptInterest, createProfile, getMatches, getReceivedInterests, showInterest, viewProfiles } from "../controllers/profile.controller.js";
import { checkEmailVerified } from "../middleware/checkEmailVerified.js";

const router = express.Router();

router.post("/createProfile",protectRoute,checkEmailVerified,createProfile);

router.post("/viewProfiles",protectRoute,checkEmailVerified,viewProfiles);

router.post("/showInterest", protectRoute, checkEmailVerified, showInterest);

router.get("/getReceivedInterests",protectRoute, checkEmailVerified, getReceivedInterests)

router.post("/acceptInterest",protectRoute, checkEmailVerified, acceptInterest);

router.get("/getMatches",protectRoute, checkEmailVerified, getMatches)


export default router;