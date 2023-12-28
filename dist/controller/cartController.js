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
exports.CartController = void 0;
const cartModel_1 = __importDefault(require("../model/cartModel"));
const ObjectId = require("mongodb").ObjectId;
class CartController {
    constructor() {
        let me = this;
    }
    CreateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, userId, quantity } = req.body;
                const newItem = {
                    productId: productId,
                    quantity: quantity,
                };
                const existingCart = yield cartModel_1.default.findOne({ userId: userId });
                if (existingCart) {
                    const existingProductIndex = existingCart.items.findIndex((item) => item.productId.toString() === productId.toString());
                    if (existingProductIndex !== -1) {
                        existingCart.items.splice(existingProductIndex, 1)[0];
                    }
                    else {
                        existingCart.items.push(newItem);
                    }
                    yield existingCart.save()
                        .then((data) => {
                        return res.status(200).json({
                            status: true,
                            message: "Cart updated successfully",
                            data: data,
                        });
                    })
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({
                            message: "Internal Server Error",
                            status: false,
                        });
                    });
                }
                else {
                    const newCart = new cartModel_1.default({
                        userId: userId,
                        items: [newItem],
                    });
                    yield newCart.save()
                        .then((data) => {
                        return res.status(200).json({
                            status: true,
                            message: "Cart created successfully",
                            data: data,
                        });
                    })
                        .catch((error) => {
                        console.log(error);
                        return res.status(500).json({
                            message: "Internal Server Error",
                            status: false,
                        });
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cartModel_1.default.find({}).populate("items.productId", "title withDiscount originalPrice publicId").exec()
                    .then((data) => {
                    if (data.length !== 0) {
                        return res.status(200).json({
                            data: data,
                            count: data.length,
                            status: true,
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: "cart not found",
                            count: 0,
                            status: false,
                        });
                    }
                })
                    .catch((err) => {
                    return res.status(534).json({
                        message: "cart finding Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cartModel_1.default.findById(req.params.id)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        yield cartModel_1.default.findByIdAndDelete(req.params.id);
                        return res.status(200).json({
                            message: "cart Deleted Successfully",
                            status: true,
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: "wrong object id",
                            status: false,
                        });
                    }
                }))
                    .catch((err) => {
                    return res.status(534).json({
                        message: "cart deleting Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    editCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userid, productid } = req.body;
                yield cartModel_1.default.findById(req.params.id)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        let cartData = {
                            productid: productid,
                            userid: userid,
                        };
                        yield cartModel_1.default.findByIdAndUpdate(req.params.id, cartData)
                            .then((data) => {
                            return res.status(200).json({
                                message: "cart Updated Successfully",
                                status: true,
                            });
                        })
                            .catch((err) => {
                            return res.status(200).json({
                                message: "cart updating Some Error",
                                status: true,
                            });
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: "wrong object id",
                            status: false,
                        });
                    }
                }))
                    .catch((err) => {
                    return res.status(534).json({
                        message: "some thing wrong",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    getOneCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cartModel_1.default.findById(req.params.id).populate("items.productId", "title withDiscount originalPrice publicId").exec()
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data && (data === null || data === void 0 ? void 0 : data.items.length) > 0) {
                        let amount = 0;
                        for (let i = 0; i < (data === null || data === void 0 ? void 0 : data.items.length); i++) {
                            amount += (data === null || data === void 0 ? void 0 : data.items[i].quantity) * (data === null || data === void 0 ? void 0 : data.items[i].productId.withDiscount);
                        }
                        data.amount = amount;
                        yield data.save();
                        return res.status(200).json({
                            status: true,
                            message: "Success",
                            length: data === null || data === void 0 ? void 0 : data.items.length,
                            data: data,
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: "wrong object id",
                            status: false,
                        });
                    }
                }))
                    .catch((err) => {
                    return res.status(534).json({
                        message: "cart finding Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    deleteCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productid, userid } = req.body;
                if (!productid || !userid) {
                    return res.status(512).json({
                        message: "productid and userid Field Required ",
                        status: false,
                    });
                }
                yield cartModel_1.default.findOne({ userid: userid })
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        const objectId = new ObjectId(productid);
                        const productIds = data === null || data === void 0 ? void 0 : data.productid;
                        const arr = [];
                        if (productIds) {
                            for (var i = 0; i < productIds.length; i++) {
                                if (!objectId.equals(productIds[i])) {
                                    arr.push(productIds[i]);
                                }
                            }
                        }
                        yield cartModel_1.default.findByIdAndUpdate(data.id, { productid: arr })
                            .then(() => {
                            return res.status(200).json({
                                message: "cart Updated Successfully",
                                status: true,
                            });
                        })
                            .catch(() => {
                            return res.status(534).json({
                                message: "product removing Some Error",
                                status: false,
                            });
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: "wrong object id",
                            status: false,
                        });
                    }
                }))
                    .catch((err) => {
                    return res.status(534).json({
                        message: "Cart finding Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    getCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield cartModel_1.default.findOne({ userid: id })
                    .populate({
                    path: "productid",
                    select: ["productimage", "code", "title", "description"],
                })
                    .exec()
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        return res.status(200).json({
                            data: data,
                            status: true,
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: "wrong object id",
                            status: false,
                        });
                    }
                }))
                    .catch((err) => {
                    console.log(err);
                    return res.status(534).json({
                        message: "cart finding Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
}
exports.CartController = CartController;
exports.default = CartController;
