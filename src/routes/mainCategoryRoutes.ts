import express, { Router } from "express";
import mainCategoryController from "../controller/mainCategoryController";
import { isAuthenticatedUser } from "../middleware/auth";
import { upload } from "../utils/multer";
import { paginationMiddleware } from "../middleware/page";
import { searchMiddleware } from "../middleware/search";

const router: Router = express.Router();
const Controller = new mainCategoryController();

router.post(
	"/create",
	isAuthenticatedUser,
	upload,
	Controller.createMainCategory,
);

router.get(
	"/all",
	paginationMiddleware,
	searchMiddleware,
	Controller.getAllMainCategory,
);

router.get("/single/:id", Controller.getMainCategory);

router.put("/:id", upload, Controller.updateMainCategory);

router.delete("/:id", Controller.deleteMainCategory);

export default router;
