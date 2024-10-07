import express from "express";
import {loginUser, registerUser, sendOtpEmail, verifyOtpEmail} from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.post("/sendOtpEmail",sendOtpEmail);

router.post("/verifyOtpEmail",verifyOtpEmail);

// router.post('/sendOtpPhone', sendOtpPhone); not now

export default router;
