import mongoose, { Schema, model, models } from "mongoose";
//
const UserSchema = new Schema(
  {
    name: {
      default: null,
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    image: String,
  },
  {
    timestamps: true,
  },
);
//
export default models.User || model("User", UserSchema);
