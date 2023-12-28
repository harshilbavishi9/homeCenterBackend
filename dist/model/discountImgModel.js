"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DiscountSchema = new mongoose_1.Schema({
    images: { type: Array, require: false },
    publicId: { type: Array, require: false },
    cloudinaryUrl: { type: Array, require: false },
}, { timestamps: true });
const DiscountModel = (0, mongoose_1.model)("Discount", DiscountSchema);
exports.default = DiscountModel;
