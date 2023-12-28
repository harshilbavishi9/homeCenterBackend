"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_status_1 = require("../utils/model-status");
const CartSchema = new mongoose_1.Schema({
    items: [{
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'product',
                require: false,
            },
            quantity: { type: Number, default: 1 },
            _id: false
        }],
    amount: { type: Number, required: false },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', require: false, },
    status: { type: Number, default: model_status_1.ModelStatus.Active }
}, { timestamps: true });
const CartModel = (0, mongoose_1.model)('Cart', CartSchema);
exports.default = CartModel;
