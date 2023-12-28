import { Schema, model, Document, ObjectId } from "mongoose";

export interface IBlogModel extends Document {
  images?: [string];
  publicId?: [string];
  cloudinaryUrl?: [string];
  title: string;
  description: string;
  category: ObjectId;
  timeStamp?: number;
}

const blogSchema = new Schema<IBlogModel>(
  {
    images: { type: Array, require: false },
    publicId: { type: Array, require: false },
    cloudinaryUrl: { type: Array, require: false },
    title: { type: String, require: false },
    description: { type: String, require: false },
    category: {
      type: Schema.Types.ObjectId,
      ref: "blogcategory",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model<IBlogModel>("blog", blogSchema);

export default Blog;
