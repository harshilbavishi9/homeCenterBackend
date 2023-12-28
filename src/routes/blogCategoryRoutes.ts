import * as express from "express";
import BlogCategoryController from "../controller/blogCategoryController";
// import { searchMiddleware } from "../middleware/search";
import { multiUpload, upload } from "../utils/multer";
import { isAuthenticatedUser } from "../middleware/auth";
const Routes = express.Router();
const Controller = new BlogCategoryController();

Routes.post("/create", isAuthenticatedUser, Controller.createBlogCategory);

Routes.get("/all", Controller.getBlogCategory);

Routes.get("/single/:id", Controller.getOneBlogCategory);

Routes.delete("/:id", Controller.deleteBlogCategory);

Routes.put("/:id", Controller.editBlogCategory);

export default Routes;
