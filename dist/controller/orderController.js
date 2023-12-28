"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = __importDefault(require("../model/orderModel"));
const cartModel_1 = __importDefault(require("../model/cartModel"));
class OrderController {
    constructor() { }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { address, cart, user, PaymentStatus, product } = req.body;
                let findCartAmount = yield cartModel_1.default.findOne({ _id: cart });
                if (!findCartAmount) {
                    return res.status(400).json({
                        success: false,
                        message: "Cart is empty",
                    });
                }
                yield orderModel_1.default.create({
                    address,
                    product: findCartAmount.items.map((item) => item.productId._id),
                    user,
                    PaymentStatus,
                    totalAmount: findCartAmount.amount,
                })
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    yield cartModel_1.default.findByIdAndDelete(cart);
                    return res.status(200).json({
                        success: true,
                        message: "Order created successfully",
                        data,
                    });
                }))
                    .catch((error) => {
                    console.log(error);
                    return res.status(400).json({
                        success: false,
                        message: "Order is not created",
                    });
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    getOrdersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield orderModel_1.default.find({ _id: req.params.id })
                    .populate("product")
                    .populate("user")
                    .then((data) => {
                    return res.status(200).json({
                        success: true,
                        message: "Orders fetched successfully",
                        data,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error",
                    });
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    getOrdersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield orderModel_1.default.find({ user: req.params.id })
                    .populate("product")
                    .populate("user")
                    .then((data) => {
                    return res.status(200).json({
                        success: true,
                        message: "Orders fetched successfully",
                        data,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(400).json({
                        success: false,
                        message: "Orders Not fetched",
                    });
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    getOrdersByProductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield orderModel_1.default.find({ product: req.params.id })
                    .populate("product")
                    .populate("user")
                    .then((data) => {
                    return res.status(200).json({
                        success: true,
                        message: "Orders fetched successfully",
                        data,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: "Internal server error",
                    });
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    getAllOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orderModel_1.default.find();
                return res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully",
                    order,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield orderModel_1.default.findByIdAndDelete(req.params.id)
                    .then((data) => {
                    return res.status(200).json({
                        success: true,
                        message: "Order deleted successfully",
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message: "Order Not deleted",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
}
exports.default = OrderController;
