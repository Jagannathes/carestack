import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
//postSchema.index({field1: 1, field2: 1}, {unique: true});
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;