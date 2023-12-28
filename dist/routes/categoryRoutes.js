"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../controller/categoryController"));
const auth_1 = require("../middleware/auth");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
const Controller = new categoryController_1.default();
router.post("/create", auth_1.isAuthenticatedUser, multer_1.upload, Controller.createCategory);
router.get("/all", Controller.getAllCategory);
router.get("/single/:id", Controller.getCategory);
router.put("/:id", multer_1.upload, auth_1.isAuthenticatedUser, Controller.updateCategory);
router.delete("/:id", Controller.deleteCategory);
exports.default = router;
