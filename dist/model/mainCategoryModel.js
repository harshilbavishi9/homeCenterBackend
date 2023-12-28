"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mainCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Please Enter Your image"],
        unique: false
    },
    cloudinaryUrl: {
        type: String
    },
    publicId: {
        type: String
    },
    status: {
        type: String
    }
}, { timestamps: true });
const mainCategory = (0, mongoose_1.model)('maincategory', mainCategorySchema);
exports.default = mainCategory;
