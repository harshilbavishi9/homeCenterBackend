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
const subCategoryModel_1 = __importDefault(require("../model/subCategoryModel"));
const subCategoryModel_2 = __importDefault(require("../model/subCategoryModel"));
// import { searchMiddleware } from "../middleware/search";
class CategoryController {
    createSubCategory(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = req.file;
                if (!image) {
                    return res
                        .status(400)
                        .json({ success: false, error: "Image is required" });
                }
                const result = yield cloudinary_1.default.uploadSingleImage(image === null || image === void 0 ? void 0 : image.path);
                const newCategory = yield subCategoryModel_1.default.create({
                    name: req.body.name,
                    mainCategory: req.body.mainCategory,
                    category: req.body.category,
                    image: image === null || image === void 0 ? void 0 : image.path.replace(/\\/g, "/"),
                    cloudinaryUrl: result.url,
                    publicId: (_a = result.result) === null || _a === void 0 ? void 0 : _a.public_id,
                });
                return res.status(201).json({
                    success: true,
                    message: "Subcategory created successfully",
                    newCategory,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    getAllSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pipeline = [];
                pipeline.push({
                    $lookup: {
                        from: "maincategories",
                        localField: "mainCategory",
                        foreignField: "_id",
                        as: "mainCategory",
                    },
                });
                pipeline.push({
                    $unwind: "$mainCategory",
                });
                pipeline.push({
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category",
                    },
                });
                pipeline.push({
                    $unwind: "$category",
                });
                if (req.searchRegex) {
                    pipeline.push({
                        $match: {
                            $or: [
                                { name: { $regex: req.searchRegex } },
                                {
                                    "mainCategory.name": { $regex: req.searchRegex },
                                },
                                { "category.name": { $regex: req.searchRegex } },
                            ],
                        },
                    });
                }
                if (req.pagination) {
                    pipeline.push({
                        $skip: req.pagination.skip,
                    });
                    pipeline.push({
                        $limit: req.pagination.limit,
                    });
                }
                let categories = yield subCategoryModel_2.default.aggregate(pipeline);
                return res.status(200).json({
                    success: true,
                    message: "List of categories",
                    length: categories.length,
                    categories,
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
    getSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield subCategoryModel_1.default.findById(req.params.id)
                    .populate("mainCategory")
                    .populate("category")
                    .exec();
                if (!category) {
                    return res
                        .status(404)
                        .json({ success: false, message: "SubCategory not found" });
                }
                return res.status(200).json({
                    success: true,
                    message: "category details",
                    category,
                });
            }
            catch (error) {
                console.log("Error deleting user:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
    updateSubCategory(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const CategoryId = req.params.id;
                const category = yield subCategoryModel_1.default.findById(CategoryId);
                if (!category) {
                    return res
                        .status(404)
                        .json({ success: false, message: "SubCategory not found" });
                }
                cloudinary_1.default.deleteSingleImage(category.publicId);
                const result = yield cloudinary_1.default.uploadSingleImage((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
                console.log(result);
                const updatedCategory = yield subCategoryModel_1.default.findByIdAndUpdate(CategoryId, {
                    category: req.body.category,
                    mainCategory: req.body.mainCategory,
                    image: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path.replace(/\\/g, "/"),
                    cloudinaryUrl: result === null || result === void 0 ? void 0 : result.url,
                    publicId: (_c = result === null || result === void 0 ? void 0 : result.result) === null || _c === void 0 ? void 0 : _c.public_id,
                }, { new: true });
                if (!updatedCategory) {
                    return res
                        .status(404)
                        .json({ success: false, message: "SubCategory not found" });
                }
                return res.status(200).json({
                    success: true,
                    message: " category updated successfully",
                    updatedCategory,
                });
            }
            catch (error) {
                console.log("Error fetching users:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    }
    deleteSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const CategoryId = req.params.id;
                const category = yield subCategoryModel_1.default.findByIdAndDelete(CategoryId);
                if (!category) {
                    return res
                        .status(404)
                        .json({ success: false, message: "SubCategory not found" });
                }
                yield Promise.all([
                    category.cloudinaryUrl &&
                        cloudinary_1.default.deleteSingleImage(category.publicId),
                ]);
                return res.status(200).json({
                    success: false,
                    message: "category deleted successfully",
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
exports.default = CategoryController;
