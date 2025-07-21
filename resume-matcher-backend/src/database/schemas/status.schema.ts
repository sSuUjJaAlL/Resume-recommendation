import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
  },

  fileName: {
    type: String,
  },

  fileMimeType: {
    type: String,
  },

  fileEncoding: {
    type: String,
  },

  fileSize: {
    type: Number,
  },
});

const fileModel = mongoose.model("FileStatus", statusSchema);
export default fileModel;
