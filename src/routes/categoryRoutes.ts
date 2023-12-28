import express, { Router } from "express";
import CategoryController from "../controller/categoryController";
import { isAuthenticatedUser } from "../middleware/auth";
import { upload } from "../utils/multer";
const router: Router = express.Router();
const Controller = new CategoryController();

router.post("/create", isAuthenticatedUser, upload, Controller.createCategory);

router.get("/all", Controller.getAllCategory);

router.get("/single/:id", Controller.getCategory);

router.put("/:id", upload, isAuthenticatedUser, Controller.updateCategory);

router.delete("/:id", Controller.deleteCategory);

export default router;
