"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogController_1 = __importDefault(require("../controller/BlogController"));
const auth_1 = require("../middleware/auth");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
const Controller = new BlogController_1.default();
router.post("/create", auth_1.isAuthenticatedUser, multer_1.multiUpload, Controller.createBlog);
router.get("/all", Controller.getAllBlog);
router.get("/single/:id", Controller.getBlog);
router.put("/:id", multer_1.multiUpload, auth_1.isAuthenticatedUser, Controller.updateBlog);
router.delete("/:id", Controller.deleteBlog);
exports.default = router;
