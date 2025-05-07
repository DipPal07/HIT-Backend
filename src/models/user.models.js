import mongoose, { Schema } from "mongoose";
import { availableUseRoles, userRoleEnum } from "../utils/constant.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://avatar.iran.liara.run/public/38",
      trim: true,
    },
    role: {
      type: String,
      enum: availableUseRoles,
      default: userRoleEnum.STUDENT,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpires: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.BCRYPT_SALT)
    );
  }
  next();
});
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateEmailVerificationToken = function () {
  return crypto.randomBytes(16).toString("hex");
};

const User = mongoose.model("User", userSchema);
export default User;
