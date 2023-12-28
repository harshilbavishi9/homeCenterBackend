"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subCategoryController_1 = __importDefault(require("../controller/subCategoryController"));
const multer_1 = require("../utils/multer");
const auth_1 = require("../middleware/auth");
const page_1 = require("../middleware/page");
const search_1 = require("../middleware/search");
const router = express_1.default.Router();
const Controller = new subCategoryController_1.default();
router.post("/create", auth_1.isAuthenticatedUser, multer_1.upload, Controller.createSubCategory);
router.get("/all", page_1.paginationMiddleware, search_1.searchMiddleware, Controller.getAllSubCategory);
router.get("/single/:id", Controller.getSubCategory);
router.put("/:id", multer_1.upload, Controller.updateSubCategory);
router.delete("/:id", Controller.deleteSubCategory);
exports.default = router;
