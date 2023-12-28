"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const bannerController_1 = __importDefault(require("../controller/bannerController"));
// import { searchMiddleware } from "../middleware/search";
const multer_1 = require("../utils/multer");
const auth_1 = require("../middleware/auth");
const bannerRoutes = express.Router();
const Controller = new bannerController_1.default();
bannerRoutes.post("/create", auth_1.isAuthenticatedUser, multer_1.multiUpload, Controller.createBanner);
bannerRoutes.get("/all", Controller.getBanner);
bannerRoutes.get("/get/:id", Controller.getOneBanner);
bannerRoutes.delete("/delete/:id", Controller.deleteBanner);
bannerRoutes.put("/edit/:id", multer_1.multiUpload, Controller.editBanner);
exports.default = bannerRoutes;
