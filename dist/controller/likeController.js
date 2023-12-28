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
exports.LikeController = void 0;
const likeModel_1 = __importDefault(require("../model/likeModel"));
const ObjectId = require("mongodb").ObjectId;
class LikeController {
    constructor() {
        let me = this;
    }
    CreateLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userid, productid } = req.body;
                if (!productid || !userid) {
                    return res.status(512).json({
                        message: "All Field Required ",
                        status: false,
                    });
                }
                const existingLike = yield likeModel_1.default.findOne({ userid: userid });
                if (existingLike) {
                    if (existingLike.productid !== null && existingLike.productid !== undefined) {
                        const productIndex = existingLike.productid.findIndex((product) => (product === null || product === void 0 ? void 0 : product.toString()) === productid);
                        if (productIndex !== -1) {
                            return res.status(400).json({
                                data: existingLike,
                                message: "Product already in Like",
                                status: true,
                            });
                        }
                        else {
                            existingLike.productid.push(productid);
                        }
                    }
                    yield existingLike.save();
                    return res.status(200).json({
                        data: existingLike,
                        message: "Product Added Successfully",
                        status: true,
                    });
                }
                else {
                    const newLike = new likeModel_1.default({
                        userid: userid,
                        productid: productid,
                    });
                    yield newLike.save();
                    return res.status(200).json({
                        data: newLike,
                        message: "Like Created Successfully",
                        status: true,
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    getLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield likeModel_1.default.find({})
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
                            message: "like not found",
                            count: 0,
                            status: false,
                        });
                    }
                })
                    .catch((err) => {
                    return res.status(534).json({
                        message: "like finding Some Error",
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
    deleteLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield likeModel_1.default.findById(req.params.id)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        yield likeModel_1.default.findByIdAndDelete(req.params.id);
                        return res.status(200).json({
                            message: "like Deleted Successfully",
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
                        message: "like deleting Some Error",
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
    editLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userid, productid } = req.body;
                yield likeModel_1.default.findById(req.params.id)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data) {
                        let likeData = {
                            productid: productid,
                            userid: userid,
                        };
                        yield likeModel_1.default.findByIdAndUpdate(req.params.id, likeData)
                            .then((data) => {
                            return res.status(200).json({
                                message: "like Updated Successfully",
                                status: true,
                            });
                        })
                            .catch((err) => {
                            return res.status(200).json({
                                message: "like updating Some Error",
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
    getOneLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield likeModel_1.default.findById(req.params.id)
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
                    return res.status(534).json({
                        message: "like finding Some Error",
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
    deleteLikeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productid, userid } = req.body;
                if (!productid || !userid) {
                    return res.status(512).json({
                        message: "productid and userid Field Required ",
                        status: false,
                    });
                }
                yield likeModel_1.default.findOne({ userid: userid })
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (data) {
                        const objectId = new ObjectId(productid);
                        const productIds = (_a = data.productid) !== null && _a !== void 0 ? _a : [];
                        const arr = [];
                        for (var i = 0; i < productIds.length; i++) {
                            if (!objectId.equals(productIds[i])) {
                                arr.push(productIds[i]);
                            }
                        }
                        yield likeModel_1.default.findByIdAndUpdate(data.id, { productid: arr })
                            .then(() => {
                            return res.status(200).json({
                                message: "like Updated Successfully",
                                status: true,
                            });
                        })
                            .catch((err) => {
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
                        message: "Like finding Some Error",
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
    getLikeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield likeModel_1.default.findOne({ userid: id })
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
                        message: "like finding Some Error",
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
exports.LikeController = LikeController;
exports.default = LikeController;
