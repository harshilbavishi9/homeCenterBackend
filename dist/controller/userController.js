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
const userModel_1 = __importDefault(require("../model/userModel"));
const otp_1 = require("../utils/otp");
const otpModel_1 = __importDefault(require("../model/otpModel"));
const userServices_1 = require("../services/userServices");
class UserController {
    signUpSignIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mobile } = req.body;
                const user = yield userModel_1.default.findOne({ mobile });
                const otp = (0, otp_1.generateOtp)();
                const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
                if (user) {
                    yield (0, userServices_1.updateOtp)({ mobile, otp, expiresIn: otpExpiration });
                    return res.json({ success: true, message: "OTP sent successfully" });
                }
                const newUser = yield userModel_1.default.create({ mobile });
                yield otpModel_1.default.create({ otp, mobile, expiresIn: otpExpiration, newUser });
                return res.json({
                    success: true,
                    message: "User created and OTP sent successfully",
                });
            }
            catch (error) {
                console.log(error);
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mobile, email, otp } = req.body;
            try {
                const findUser = yield userModel_1.default.findOne({ mobile });
                const otpEntry = yield otpModel_1.default.findOne({
                    $or: [{ mobile, email }],
                    otp,
                });
                if (!otpEntry || (0, userServices_1.isOtpExpired)(otpEntry.expiresIn)) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid OTP",
                    });
                }
                yield (0, userServices_1.updateUserVerification)(findUser);
                const token = (0, userServices_1.generateToken)(findUser);
                return res.status(200).json({
                    success: true,
                    message: "OTP Verified successfully",
                    findUser,
                    token,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedUser) {
                    return res
                        .status(404)
                        .json({ status: false, message: "User not found" });
                }
                return res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    user: updatedUser,
                });
            }
            catch (error) {
                console.log("Error updating user:", error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield userModel_1.default.findByIdAndDelete(req.params.id);
                if (!deletedUser) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found",
                    });
                }
                return res
                    .status(200)
                    .json({ success: true, message: "User deleted successfully" });
            }
            catch (error) {
                console.log("Error deleting user:", error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.find({
                    $or: [
                        { firstName: { $regex: req.searchRegex } },
                        { lastName: { $regex: req.searchRegex } },
                        { email: { $regex: req.searchRegex } },
                        { gender: { $regex: req.searchRegex } },
                        { mobile: { $regex: req.searchRegex } },
                    ],
                })
                    .skip(req.query.skip ? parseInt(req.query.skip) : 0)
                    .limit(req.query.limit ? parseInt(req.query.limit) : 10);
                return res.status(200).json({
                    success: true,
                    message: "Success",
                    length: users.length,
                    users: users,
                });
            }
            catch (error) {
                console.error("Error fetching users:", error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findById(req.params.id);
                return res.json({
                    success: true,
                    message: "Success",
                    user: user,
                });
            }
            catch (error) {
                console.log("Error fetching user:", error);
                return res.status(500).json({
                    success: false,
                    message: "Internal server error",
                });
            }
        });
    }
}
exports.default = UserController;
