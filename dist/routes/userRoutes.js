"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const auth_1 = require("../middleware/auth");
const page_1 = require("../middleware/page");
const search_1 = require("../middleware/search");
const router = express_1.default.Router();
const Controller = new userController_1.default();
router.post('/singupsignin', Controller.signUpSignIn);
router.post('/verifyotp', Controller.verifyOtp);
router.get('/getallusers', page_1.paginationMiddleware, search_1.searchMiddleware, auth_1.isAuthenticatedUser, Controller.getAllUser);
router.get('/getuser/:id', auth_1.isAuthenticatedUser, Controller.getUser);
router.put('/:id', auth_1.isAuthenticatedUser, Controller.updateUser);
router.delete('/:id', auth_1.isAuthenticatedUser, Controller.deleteUser);
exports.default = router;
