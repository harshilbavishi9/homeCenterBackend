"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_status_1 = require("../utils/model-status");
const OrderSchema = new mongoose_1.Schema({
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "AddressModel",
        required: true,
    },
    cart: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cart",
        required: false,
    },
    product: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    PaymentStatus: {
        type: String,
        require: true,
        default: model_status_1.PaymentStatus.Pending,
    },
    orderStatus: {
        type: String,
        default: model_status_1.OrderStatus.Pending,
    },
    status: {
        type: Number,
        required: false,
        default: model_status_1.ModelStatus.Active,
    },
});
const OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = OrderModel;
