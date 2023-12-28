"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const userModel_1 = __importDefault(require("../model/userModel"));
exports.isAuthenticatedUser = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ status: false, message: "Please Login to access this resource" });
    }
    try {
        const decodedData = (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_KEY);
        req.user = yield userModel_1.default.findById(decodedData === null || decodedData === void 0 ? void 0 : decodedData.user_id);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ status: false, message: "Invalid Token Please Login Again" });
    }
}));
// export const authorizeRoles = (...roles: string[]) => {
//   return (req: CustomRequest, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user.role)) {
//       res.status(403).json({ status: false, message: `Role: ${req.user.role} is not allowed to access this resource` });
//       return next()
//     }
//     next();
//   };
// };
