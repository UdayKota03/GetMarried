import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res.send(400).json("Password Do not match");
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: "Email already exists - Please Login" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });
    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in register controller " + error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const JWT_SECRET = process.env.JWT_SECRET;

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }


    const token = jwt.sign({ userId: user._id.toString(),email: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Error in login controller: " + error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendOtpEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const otp = uuidv4().slice(0, 6); // Generate a 6-digit OTP
    user.emailOtp = otp;
    // console.log(user.emailOtp);
    await user.save();

    // Set up Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Email Verification",
      text: `Your OTP for email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    console.log("Error in sendOtpMail controller " + err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyOtpEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // console.log(`Expected OTP: ${user.emailOtp}, Provided OTP: ${otp}`);
    if (user.emailOtp !== otp)
      return res.status(400).json({ msg: "Invalid OTP" });

    user.isEmailVerified = true;
    user.emailOtp = null; // Clear the OTP after verification
    await user.save();

    res.json({ msg: "Email verified successfully", user });
  } catch (err) {
    console.log("Error in sendOtpMail controller " + err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};