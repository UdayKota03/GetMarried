import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    emailOtp: { type: String, default: null },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerified: {
        type: Boolean,
        default: false, // Default value is false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false, 
    }
});

const User = mongoose.model("User", userSchema);

export default User;
