"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discountProductController_1 = __importDefault(require("../controller/discountProductController"));
const auth_1 = require("../middleware/auth");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
const Controller = new discountProductController_1.default();
router.post("/create", multer_1.upload, Controller.createDiscount);
router.get("/all", Controller.getAllDiscount);
router.get("/single/:id", Controller.getDiscount);
router.put("/:id", multer_1.upload, auth_1.isAuthenticatedUser, Controller.updateDiscount);
router.delete("/:id", Controller.deleteDiscount);
exports.default = router;
