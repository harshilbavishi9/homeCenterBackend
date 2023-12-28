"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    images: { type: Array, require: false },
    publicId: { type: Array, require: false },
    cloudinaryUrl: { type: Array, require: false },
    title: { type: String, require: false },
    description: { type: String, require: false },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "blogcategory",
        required: true,
    },
}, { timestamps: true });
const Blog = (0, mongoose_1.model)("blog", blogSchema);
exports.default = Blog;
