import * as express from "express";
import AddressController from "../controller/addressController";
import { isAuthenticatedUser } from "../middleware/auth";
const AddressRoutes = express.Router();
const Controller = new AddressController();

AddressRoutes.post("/create", isAuthenticatedUser, Controller.createAddress);

AddressRoutes.get("/all", Controller.getAddress);

AddressRoutes.get("/get/:id", Controller.getOneAddress);

AddressRoutes.delete("/delete/:id", Controller.deleteAddress);

AddressRoutes.put("/edit/:id", Controller.updateAddress);

export default AddressRoutes;
