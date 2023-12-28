"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controller/productController"));
const auth_1 = require("../middleware/auth");
const multer_1 = require("../utils/multer");
const search_1 = require("../middleware/search");
const page_1 = require("../middleware/page");
const filterProduct_1 = require("../middleware/filterProduct");
const router = express_1.default.Router();
const Controller = new productController_1.default();
router.post('/create', auth_1.isAuthenticatedUser, multer_1.multiUpload, Controller.createProduct);
router.get('/all', page_1.paginationMiddleware, search_1.searchMiddleware, filterProduct_1.filterMiddleware, Controller.getAllProduct);
// router.get('/all', Controller.getAllProduct)
router.get('/single/:id', Controller.getProduct);
router.put('/:id', multer_1.multiUpload, Controller.updateProduct);
router.delete('/:id', Controller.deleteProduct);
exports.default = router;
