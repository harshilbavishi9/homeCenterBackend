"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_status_1 = require("../utils/model-status");
const AddressModelSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    number: { type: String, require: true },
    pincode: { type: String, require: true },
    buildingNo: { type: String, require: true },
    streetName: { type: String, require: true },
    landmark: { type: String, require: false },
    addressType: { type: Number, default: model_status_1.LandMarkStatus.Select, require: false },
    user: { type: mongoose_1.Types.ObjectId, require: false },
}, { timestamps: true });
const AddressModelModel = (0, mongoose_1.model)("AddressModel", AddressModelSchema);
exports.default = AddressModelModel;
