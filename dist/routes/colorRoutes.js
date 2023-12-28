"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colorController_1 = __importDefault(require("../controller/colorController"));
const auth_1 = require("../middleware/auth");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
const Controller = new colorController_1.default();
router.post("/create", auth_1.isAuthenticatedUser, multer_1.upload, Controller.createColor);
router.get("/all", Controller.getAllColor);
router.get("/single/:id", Controller.getColor);
router.put("/:id", multer_1.upload, auth_1.isAuthenticatedUser, Controller.updateColor);
router.delete("/:id", Controller.deleteColor);
exports.default = router;
