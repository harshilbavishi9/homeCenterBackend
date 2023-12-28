import express, { Router } from "express";
import SubCategoryController from "../controller/subCategoryController";
import { upload } from "../utils/multer";
import { isAuthenticatedUser } from "../middleware/auth";
import { paginationMiddleware } from "../middleware/page";
import { searchMiddleware } from "../middleware/search";
const router: Router = express.Router();
const Controller = new SubCategoryController();

router.post(
	"/create",
	isAuthenticatedUser,
	upload,
	Controller.createSubCategory,
);

router.get(
	"/all",
	paginationMiddleware,
	searchMiddleware,
	Controller.getAllSubCategory,
);

router.get("/single/:id", Controller.getSubCategory);

router.put("/:id", upload, Controller.updateSubCategory);

router.delete("/:id", Controller.deleteSubCategory);

export default router;
