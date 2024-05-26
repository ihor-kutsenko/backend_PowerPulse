import { Schema, model } from "mongoose";

const emailPattern = /^\w+(?:[\w.-]*\w)?@[a-zA-Z_]+(?:\.[a-zA-Z]+)+$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: emailPattern,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Set password for user"],
  },
});

const User = model("user", userSchema);
export default User;
