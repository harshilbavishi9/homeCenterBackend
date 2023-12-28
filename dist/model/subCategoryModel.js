"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_status_1 = require("../utils/model-status");
const subCategoryschema = new mongoose_1.Schema({
    name: { type: String, required: false },
    image: { type: String, required: [true, "Please Enter Your image"], unique: false },
    cloudinaryUrl: { type: String },
    publicId: { type: String },
    mainCategory: { type: mongoose_1.Schema.Types.ObjectId, ref: 'maincategory', required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'category', required: true },
    status: { type: Number, required: false, default: model_status_1.ModelStatus.Active },
}, { timestamps: true });
const subCategory = (0, mongoose_1.model)("subCategories", subCategoryschema);
exports.default = subCategory;
