"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    productid: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'product', require: false, }],
    userid: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', require: false, },
}, { timestamps: true });
const likeModel = (0, mongoose_1.model)('like', likeSchema);
exports.default = likeModel;
