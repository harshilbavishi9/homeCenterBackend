import * as express from "express";
import CartController from "../controller/cartController";
import { isAuthenticatedUser } from "../middleware/auth";
const cartRoutes = express.Router();
const Controller = new CartController();

cartRoutes.post("/create", isAuthenticatedUser, Controller.CreateCart);

cartRoutes.get("/get", Controller.getCart);

cartRoutes.delete("/delete/:id", Controller.deleteCart);

cartRoutes.put("/edit/:id", Controller.editCart);

cartRoutes.get("/get/:id", Controller.getOneCart);

cartRoutes.post("/delete-product", Controller.deleteCartProduct);

cartRoutes.get("/get-product/:id", Controller.getCartProduct);

export default cartRoutes;
