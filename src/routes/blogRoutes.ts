import express, { Router } from "express";
import BlogController from "../controller/BlogController";
import { isAuthenticatedUser } from "../middleware/auth";
import { multiUpload, upload } from "../utils/multer";
const router: Router = express.Router();
const Controller = new BlogController();

router.post("/create", isAuthenticatedUser, multiUpload, Controller.createBlog);

router.get("/all", Controller.getAllBlog);

router.get("/single/:id", Controller.getBlog);

router.put("/:id", multiUpload, isAuthenticatedUser, Controller.updateBlog);

router.delete("/:id", Controller.deleteBlog);

export default router;
