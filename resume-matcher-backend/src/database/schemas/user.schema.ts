import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },

  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
  },
});

const userModel = mongoose.model("Users", userSchema);
export default userModel;
