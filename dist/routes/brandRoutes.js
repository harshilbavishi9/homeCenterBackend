"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brandController_1 = __importDefault(require("../controller/brandController"));
const auth_1 = require("../middleware/auth");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
const Controller = new brandController_1.default();
router.post("/create", auth_1.isAuthenticatedUser, multer_1.upload, Controller.createBrand);
router.get("/all", Controller.getAllBrand);
router.get("/single/:id", Controller.getBrand);
router.put("/:id", multer_1.upload, auth_1.isAuthenticatedUser, Controller.updateBrand);
router.delete("/:id", Controller.deleteBrand);
exports.default = router;
