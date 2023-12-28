"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_status_1 = require("../utils/model-status");
const reviewSchema = new mongoose_1.Schema({
    title: { type: String, require: false },
    experience: { type: String, require: false },
    ratings: { type: Number, require: false },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "product",
        require: false,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", require: false },
    status: { type: Number, required: false, default: model_status_1.ModelStatus.Active },
}, { timestamps: true });
const Review = (0, mongoose_1.model)("review", reviewSchema);
exports.default = Review;
