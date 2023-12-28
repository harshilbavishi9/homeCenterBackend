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
exports.generateToken = exports.updateUserVerification = exports.isOtpExpired = exports.updateOtp = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const otpModel_1 = __importDefault(require("../model/otpModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_status_1 = require("../utils/model-status");
function updateOtp({ mobile, otp, expiresIn, }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield otpModel_1.default.findOneAndUpdate({ mobile }, { otp, expiresIn, mobile });
    });
}
exports.updateOtp = updateOtp;
function isOtpExpired(otpTimestamp) {
    const currentTime = new Date().getTime();
    return currentTime - otpTimestamp > 300000;
}
exports.isOtpExpired = isOtpExpired;
function updateUserVerification(user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user) {
            yield userModel_1.default.findByIdAndUpdate(user._id, {
                mobileVerified: model_status_1.ModelStatus.Active,
            });
        }
    });
}
exports.updateUserVerification = updateUserVerification;
function generateToken(user) {
    if (user) {
        const { _id, mobile, firstName, lastName, gender } = user;
        const userToken = { _id, mobile, firstName, lastName, gender };
        return jsonwebtoken_1.default.sign({ userToken }, process.env.TOKEN_KEY, {
            expiresIn: "15d",
        });
    }
    return "";
}
exports.generateToken = generateToken;
