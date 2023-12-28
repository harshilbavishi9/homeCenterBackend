"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = __importDefault(require("../controller/reviewController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const Controller = new reviewController_1.default();
router.post("/create", auth_1.isAuthenticatedUser, Controller.CreateReview);
router.get("/get", Controller.getReview);
router.delete("/delete/:id", Controller.deleteReview);
router.put("/edit/:id", Controller.editReview);
router.get("/get/:id", Controller.getOneReview);
router.post("/get/reviewproduct", Controller.getReviewProduct);
exports.default = router;
