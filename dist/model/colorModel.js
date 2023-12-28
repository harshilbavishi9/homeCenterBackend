"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_status_1 = require("../utils/model-status");
const Colorschema = new mongoose_1.Schema({
    name: { type: String, required: false },
    status: { type: Number, required: false, default: model_status_1.ModelStatus.Active },
}, { timestamps: true });
const Color = (0, mongoose_1.model)("Color", Colorschema);
exports.default = Color;
