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
const bannerModel_1 = __importDefault(require("../model/bannerModel"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
class BannerController {
    constructor() {
        let me = this;
    }
    createBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = req.files;
                const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));
                const uploadResults = yield cloudinary_1.default.uploadMultipleImages(imagePaths);
                let bannerData = {
                    images: imagePaths,
                    publicId: uploadResults.map((i) => i.public_id),
                    cloudinaryUrl: uploadResults.map((i) => i.url),
                };
                let banner = yield bannerModel_1.default.create(bannerData);
                return res.status(200).json({
                    message: "Images uploaded successfully",
                    status: true,
                    banner: banner,
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
    getBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield bannerModel_1.default.find({})
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
                            message: "banner not found",
                            status: false,
                        });
                    }
                })
                    .catch(() => {
                    return res.status(534).json({
                        message: "banner finding Some Error",
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
    getOneBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield bannerModel_1.default.findById(req.params.id)
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
                        message: "banner finding Some Error",
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
    deleteBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bannerId = req.params.id;
                const banner = yield bannerModel_1.default.findById(bannerId);
                if (banner) {
                    yield cloudinary_1.default.destroyImages(banner === null || banner === void 0 ? void 0 : banner.publicId);
                    yield bannerModel_1.default.findByIdAndDelete(bannerId);
                    return res.status(200).json({
                        message: "Banner and associated images deleted successfully",
                        status: true,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Wrong object ID or banner not found",
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
    editBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let banner = yield bannerModel_1.default.findById(id);
                if (banner) {
                    yield cloudinary_1.default.destroyImages(banner.publicId);
                    const images = req.files;
                    const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));
                    const result = yield cloudinary_1.default.uploadMultipleImages(imagePaths);
                    let bannerData = {
                        images: imagePaths,
                        publicId: result.map((i) => i.public_id),
                        cloudinaryUrl: result.map((i) => i.url),
                    };
                    let data = yield bannerModel_1.default.findByIdAndUpdate({ _id: id }, bannerData);
                    return res.status(200).json({
                        status: true,
                        message: "Banner and associated images deleted successfully",
                        data: data,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Wrong object ID or banner not found",
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
exports.default = BannerController;
