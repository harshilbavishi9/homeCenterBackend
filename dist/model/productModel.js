"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_status_1 = require("../utils/model-status");
const ProductSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    withDiscount: {
        type: Number,
        required: true,
    },
    discount: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "discountProduct",
        required: true,
    },
    originalPrice: { type: Number, required: true, },
    Overview: { type: String, required: true, },
    countInStock: { type: Number, required: true, },
    subCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "subCategories",
        required: true,
    },
    color: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Color",
        required: true,
    },
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    ratings: { type: Number, required: false, },
    review: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "review",
        required: true,
    },
    isAvailable: { type: Number, required: false, default: model_status_1.ModelStatus.Deactivate },
    isTrending: { type: Number, required: false, default: model_status_1.ModelStatus.Deactivate },
    isSpecial: { type: Number, required: false, default: model_status_1.ModelStatus.Deactivate },
    isLatest: { type: Number, required: false, default: model_status_1.ModelStatus.Deactivate },
    isBestSeller: {
        type: Number,
        required: false,
        default: model_status_1.ModelStatus.Deactivate,
    },
    isFeatured: { type: Number, required: false, default: model_status_1.ModelStatus.Deactivate },
    images: [{ type: String, required: true, }],
    cloudinaryUrl: [{ type: String, required: false, }],
    publicId: [{ type: String, required: false, }],
    description: { type: String, required: true },
    order: { type: Number, require: false },
    viewCount: { type: Number, require: false },
    status: { type: String, required: false, default: model_status_1.ModelStatus.Deactivate },
}, { timestamps: true });
const Product = (0, mongoose_1.model)("product", ProductSchema);
exports.default = Product;
