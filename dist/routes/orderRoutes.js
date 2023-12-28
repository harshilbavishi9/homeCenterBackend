"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controller/orderController"));
const OrderRroutes = (0, express_1.Router)();
const Controller = new orderController_1.default();
OrderRroutes.post("/create", Controller.createOrder);
OrderRroutes.get("/get/:id", Controller.getOrdersById);
OrderRroutes.get("/get/user/:id", Controller.getOrdersByUserId);
OrderRroutes.get("/get/product/:id", Controller.getOrdersByProductId);
OrderRroutes.get("/all", Controller.getAllOrder);
OrderRroutes.delete("/:id", Controller.deleteOrder);
exports.default = OrderRroutes;
