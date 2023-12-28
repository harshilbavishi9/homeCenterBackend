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
const discountImgModel_1 = __importDefault(require("../model/discountImgModel"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
class DiscountController {
    constructor() {
        let me = this;
    }
    createDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = req.files;
                const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));
                const uploadResults = yield cloudinary_1.default.uploadMultipleImages(imagePaths);
                let discountData = {
                    images: imagePaths,
                    publicId: uploadResults.map((i) => i.public_id),
                    cloudinaryUrl: uploadResults.map((i) => i.url),
                };
                let discount = yield discountImgModel_1.default.create(discountData);
                return res.status(200).json({
                    message: "Images uploaded successfully",
                    status: true,
                    discount: discount,
                });
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
    getDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield discountImgModel_1.default.find({})
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
                            message: "discount not found",
                            status: false,
                        });
                    }
                })
                    .catch(() => {
                    return res.status(534).json({
                        message: "discount finding Some Error",
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
    getOneDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield discountImgModel_1.default.findById(req.params.id)
                    .then((data) => {
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
                })
                    .catch(() => {
                    return res.status(534).json({
                        message: "discount finding Some Error",
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
    deleteDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const discountId = req.params.id;
                const discount = yield discountImgModel_1.default.findById(discountId);
                if (discount) {
                    yield cloudinary_1.default.destroyImages(discount.publicId);
                    yield discountImgModel_1.default.findByIdAndDelete(discountId);
                    return res.status(200).json({
                        message: "Discount and associated images deleted successfully",
                        status: true,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Wrong object ID or discount not found",
                        status: false,
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
    editDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let discount = yield discountImgModel_1.default.findById(id);
                if (discount) {
                    yield cloudinary_1.default.destroyImages(discount.publicId);
                    const images = req.files;
                    const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));
                    const result = yield cloudinary_1.default.uploadMultipleImages(imagePaths);
                    let discountData = {
                        images: imagePaths,
                        publicId: result.map((i) => i.public_id),
                        cloudinaryUrl: result.map((i) => i.url),
                    };
                    let data = yield discountImgModel_1.default.findByIdAndUpdate({ _id: id }, discountData);
                    return res.status(200).json({
                        status: true,
                        message: "Discount and associated images deleted successfully",
                        data: data,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Wrong object ID or discount not found",
                        status: false,
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
}
exports.default = DiscountController;
