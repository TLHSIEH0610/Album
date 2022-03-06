import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  id: Number,
  name: String,
  coverPage: String,
  photos: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Album = mongoose.model("Album", albumSchema);

export default Album;
