"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_status_1 = require("../utils/model-status");
const otpSchema = new mongoose_1.Schema({
    mobile: { type: String, require: false, },
    email: { type: String, require: false, },
    otp: { type: String, require: false },
    expiresIn: { type: Number, require: false },
    status: { type: Number, required: false, default: model_status_1.ModelStatus.Active }
}, { timestamps: true });
const OtpModel = (0, mongoose_1.model)('Otp', otpSchema);
exports.default = OtpModel;
