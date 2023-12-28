"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainCategoryController_1 = __importDefault(require("../controller/mainCategoryController"));
const auth_1 = require("../middleware/auth");
const multer_1 = require("../utils/multer");
const page_1 = require("../middleware/page");
const search_1 = require("../middleware/search");
const router = express_1.default.Router();
const Controller = new mainCategoryController_1.default();
router.post("/create", auth_1.isAuthenticatedUser, multer_1.upload, Controller.createMainCategory);
router.get("/all", page_1.paginationMiddleware, search_1.searchMiddleware, Controller.getAllMainCategory);
router.get("/single/:id", Controller.getMainCategory);
router.put("/:id", multer_1.upload, Controller.updateMainCategory);
router.delete("/:id", Controller.deleteMainCategory);
exports.default = router;
