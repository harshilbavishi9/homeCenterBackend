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
const blogCategoryModel_1 = __importDefault(require("../model/blogCategoryModel"));
class BlogCategoryController {
    constructor() { }
    createBlogCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield blogCategoryModel_1.default
                    .create(req.body)
                    .then((data) => {
                    return res.status(201).json({
                        status: true,
                        message: "Blog Category Crated Successfully",
                        data: data,
                    });
                })
                    .catch((err) => {
                    return res.status(400).json({
                        status: false,
                        message: "Blog Category Not Created",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    getBlogCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield blogCategoryModel_1.default
                    .find({})
                    .then((data) => {
                    return res.status(200).json({
                        status: true,
                        message: "Success",
                        data: data,
                    });
                })
                    .catch((err) => {
                    return res.status(404).json({
                        status: false,
                        message: "Blog Category Not Found",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    getOneBlogCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield blogCategoryModel_1.default
                    .findById({ _id: req.params.id })
                    .then((data) => {
                    return res.status(200).json({
                        status: true,
                        message: "Success",
                        data: data,
                    });
                })
                    .catch((err) => {
                    return res.status(404).json({
                        status: false,
                        message: "Blog Category Not Found",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    deleteBlogCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield blogCategoryModel_1.default
                    .findByIdAndDelete({ _id: req.params.id })
                    .then((data) => {
                    return res.status(200).json({
                        status: true,
                        message: "Blog Deleted Successfully",
                    });
                })
                    .catch((err) => {
                    return res.status(400).json({
                        status: false,
                        message: "Blog Not Deleted",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    editBlogCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield blogCategoryModel_1.default
                    .findByIdAndUpdate({ _id: req.params.id }, req.body)
                    .then((data) => {
                    return res.status(200).json({
                        status: true,
                        message: "Blog Updated Successfuly",
                        data: data,
                    });
                })
                    .catch((err) => {
                    return res.status(400).json({
                        status: false,
                        message: "Blog Not Updated",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
}
exports.default = BlogCategoryController;
