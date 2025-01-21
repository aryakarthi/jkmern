import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    profile_img_url: { type: String },
    verification_token: { type: String },
    verification_token_expiration: { type: Date },
    reset_password_token: { type: String },
    reset_password_token_expiration: { type: Date },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;


