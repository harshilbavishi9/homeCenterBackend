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
const blogModel_1 = __importDefault(require("../model/blogModel"));
class BlogController {
    constructor() { }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, category } = req.body;
            const images = req.files;
            try {
                if (title == "" || description == "" || (images === null || images === void 0 ? void 0 : images.length) == 0) {
                    return res.status(400).json({
                        status: false,
                        message: "All Fiels Are Required",
                    });
                }
                const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));
                const uploadResults = yield cloudinary_1.default.uploadMultipleImages(imagePaths);
                let blogData = {
                    title: title,
                    description: description,
                    category: category,
                    images: imagePaths,
                    publicId: uploadResults.map((i) => i.public_id),
                    cloudinaryUrl: uploadResults.map((i) => i.url),
                };
                yield blogModel_1.default.create(blogData)
                    .then((data) => {
                    return res.status(201).json({
                        status: true,
                        message: "Blog Created Successfully",
                        data: data,
                    });
                })
                    .catch((err) => {
                    return res.status(400).json({
                        status: false,
                        message: "Blog Not Created",
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
    getAllBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield blogModel_1.default.find({}).populate("category");
                return res.status(200).json({
                    status: true,
                    data: result,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    getBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield blogModel_1.default.findById({ _id: req.params.id })
                .populate("category")
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
                    message: "Blog can not find",
                });
            });
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let blog = yield blogModel_1.default.findById(id);
                if (blog) {
                    yield cloudinary_1.default.destroyImages(blog.publicId);
                    const images = req.files;
                    const imagePaths = images.map((image) => image.path.replace(/\\/g, "/"));
                    const result = yield cloudinary_1.default.uploadMultipleImages(imagePaths);
                    let blogData = {
                        title: req.body.title,
                        description: req.body.description,
                        category: req.body.category,
                        images: imagePaths,
                        publicId: result.map((i) => i.public_id),
                        cloudinaryUrl: result.map((i) => i.url),
                    };
                    let data = yield blogModel_1.default.findByIdAndUpdate({ _id: id }, blogData);
                    return res.status(200).json({
                        status: true,
                        message: "blog and associated images deleted successfully",
                        data: data,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Wrong object ID or blog not found",
                        status: false,
                    });
                }
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    messaage: "Internal Server Error",
                });
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogId = req.params.id;
                const blog = yield blogModel_1.default.findById(blogId);
                if (blog) {
                    yield cloudinary_1.default.destroyImages(blog.publicId);
                    yield blogModel_1.default.findByIdAndDelete(blogId);
                    return res.status(200).json({
                        message: "blog and associated images deleted successfully",
                        status: true,
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Wrong object ID or blog not found",
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
exports.default = BlogController;
