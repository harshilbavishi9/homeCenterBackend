import * as express from "express";
import LikeController from "../controller/likeController";
import { isAuthenticatedUser } from "../middleware/auth";
const LikeRoutes = express.Router();
const Controller = new LikeController();

LikeRoutes.post("/create", isAuthenticatedUser, Controller.CreateLike);

LikeRoutes.get("/get", Controller.getLike);

LikeRoutes.delete("/delete/:id", Controller.deleteLike);

LikeRoutes.put("/edit/:id", Controller.editLike);

LikeRoutes.get("/get/:id", Controller.getOneLike);

LikeRoutes.post("/delete-product", Controller.deleteLikeProduct);

LikeRoutes.get("/get-product/:id", Controller.getLikeProduct);

export default LikeRoutes;
