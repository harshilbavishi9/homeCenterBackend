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
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const mainCategoryModel_1 = __importDefault(require("../model/mainCategoryModel"));
class MainCategoryController {
    createMainCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = req.file;
                if (!image) {
                    return res.status(400).json({
                        success: false,
                        error: "Image is required",
                    });
                }
                const { result, url } = yield cloudinary_1.default.uploadSingleImage(image === null || image === void 0 ? void 0 : image.path);
                const newMainCategory = yield mainCategoryModel_1.default.create({
                    name: req.body.name,
                    image: image === null || image === void 0 ? void 0 : image.path.replace(/\\/g, "/"),
                    cloudinaryUrl: url,
                    publicId: result === null || result === void 0 ? void 0 : result.public_id,
                });
                return res.status(201).json({
                    success: true,
                    message: "Main category created successfully",
                    newMainCategory,
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: "Internal Server Error",
                });
            }
        });
    }
    getAllMainCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, skip } = req.pagination || { limit: 10, skip: 0 };
                const categories = yield mainCategoryModel_1.default
                    .find({
                    $or: [{ name: { $regex: req.searchRegex } }],
                })
                    .skip(req.query.skip ? parseInt(req.query.skip) : 0)
                    .limit(req.query.limit ? parseInt(req.query.limit) : 10);
                return res.status(200).json({
                    success: true,
                    message: "List of main categories",
                    length: categories.length,
                    categories,
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
    getMainCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield mainCategoryModel_1.default.findById(req.params.id);
                if (!category) {
                    return res.status(404).json({
                        success: false,
                        message: "Category not found",
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Main category details",
                    category,
                });
            }
            catch (error) {
                console.log("Error getting main category:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
    updateMainCategory(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mainCategoryId = req.params.id;
                const category = yield mainCategoryModel_1.default.findById(mainCategoryId);
                if (!category) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Category not found" });
                }
                yield Promise.all([
                    cloudinary_1.default.deleteSingleImage(category.publicId),
                ]);
                const url = yield cloudinary_1.default.uploadSingleImage((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                const updatedCategory = yield mainCategoryModel_1.default.findByIdAndUpdate(mainCategoryId, {
                    category: req.body,
                    image: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path.replace(/\\/g, "/"),
                    cloudinaryUrl: url.url,
                    publicId: (_c = url.result) === null || _c === void 0 ? void 0 : _c.public_id,
                }, { new: true });
                if (!updatedCategory) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Category not found" });
                }
                return res.status(200).json({
                    success: true,
                    message: "Main category updated successfully",
                    updatedCategory,
                });
            }
            catch (error) {
                console.log("Error updating main category:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
    deleteMainCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mainCategoryId = req.params.id;
                const category = yield mainCategoryModel_1.default.findByIdAndDelete(mainCategoryId);
                if (!category) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Category not found" });
                }
                yield Promise.all([
                    category.cloudinaryUrl &&
                        cloudinary_1.default.deleteSingleImage(category.publicId),
                ]);
                return res.status(200).json({
                    success: true,
                    message: "Main category deleted successfully",
                });
            }
            catch (error) {
                console.log("Error deleting main category:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
}
exports.default = MainCategoryController;
