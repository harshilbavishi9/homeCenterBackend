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
const adModel_1 = __importDefault(require("../model/adModel"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
class AdController {
    constructor() {
        let me = this;
    }
    createAd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = req.files;
                const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));
                const uploadResults = yield cloudinary_1.default.uploadMultipleImages(imagePaths);
                let adData = {
                    images: imagePaths,
                    publicId: uploadResults.map((i) => i.public_id),
                    cloudinaryUrl: uploadResults.map((i) => i.url),
                };
                let ad = yield adModel_1.default.create(adData);
                return res.status(200).json({
                    message: "Images uploaded successfully",
                    status: true,
                    ad: ad,
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
    getAd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield adModel_1.default.find({})
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
                            message: "ad not found",
                            status: false,
                        });
                    }
                })
                    .catch(() => {
                    return res.status(534).json({
                        message: "ad finding Some Error",
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
    getOneAd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield adModel_1.default.findById(req.params.id)
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
                        message: "ad finding Some Error",
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
    deleteAd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adId = req.params.id;
                const ad = yield adModel_1.default.findById(adId);
                if (ad) {
                    yield cloudinary_1.default.destroyImages(ad === null || ad === void 0 ? void 0 : ad.publicId);
                    yield adModel_1.default.findByIdAndDelete(adId);
                    return res.status(200).json({
                        message: "ad and associated images deleted successfully",
                        status: true,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Wrong object ID or ad not found",
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
    editAd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let ad = yield adModel_1.default.findById(id);
                if (ad) {
                    yield cloudinary_1.default.destroyImages(ad === null || ad === void 0 ? void 0 : ad.publicId);
                    const images = req.files;
                    const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));
                    const result = yield cloudinary_1.default.uploadMultipleImages(imagePaths);
                    let adData = {
                        images: imagePaths,
                        publicId: result.map((i) => i.public_id),
                        cloudinaryUrl: result.map((i) => i.url),
                    };
                    let data = yield adModel_1.default.findByIdAndUpdate({ _id: id }, adData);
                    return res.status(200).json({
                        status: true,
                        message: "ad and associated images deleted successfully",
                        data: data,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Wrong object ID or ad not found",
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
exports.default = AdController;
