import { Router } from "express";
import OrderController from "../controller/orderController";
const OrderRroutes = Router();
const Controller = new OrderController();

OrderRroutes.post("/create", Controller.createOrder);
OrderRroutes.get("/get/:id", Controller.getOrdersById);
OrderRroutes.get("/get/user/:id", Controller.getOrdersByUserId);
OrderRroutes.get("/get/product/:id", Controller.getOrdersByProductId);
OrderRroutes.get("/all", Controller.getAllOrder);
OrderRroutes.delete("/:id", Controller.deleteOrder);

export default OrderRroutes;
