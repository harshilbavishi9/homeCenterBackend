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
const likeController_1 = __importDefault(require("../controller/likeController"));
const auth_1 = require("../middleware/auth");
const LikeRoutes = express.Router();
const Controller = new likeController_1.default();
LikeRoutes.post("/create", auth_1.isAuthenticatedUser, Controller.CreateLike);
LikeRoutes.get("/get", Controller.getLike);
LikeRoutes.delete("/delete/:id", Controller.deleteLike);
LikeRoutes.put("/edit/:id", Controller.editLike);
LikeRoutes.get("/get/:id", Controller.getOneLike);
LikeRoutes.post("/delete-product", Controller.deleteLikeProduct);
LikeRoutes.get("/get-product/:id", Controller.getLikeProduct);
exports.default = LikeRoutes;
