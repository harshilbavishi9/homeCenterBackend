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
const discountProductModel_1 = __importDefault(require("../model/discountProductModel"));
class DiscountController {
    constructor() { }
    createDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield discountProductModel_1.default.create(req.body)
                    .then((data) => {
                    return res.status(201).json({
                        status: true,
                        message: "Discount Created Successfully",
                        data: data,
                    });
                })
                    .catch((error) => {
                    return res.status(400).json({
                        status: false,
                        message: "Discount is not Created",
                    });
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    getAllDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield discountProductModel_1.default.find({})
                    .then((data) => {
                    return res.status(200).json({
                        status: true,
                        message: "Success",
                        data: data,
                    });
                })
                    .catch((error) => {
                    return res.status(400).json({
                        status: false,
                        message: "Discount is not Avilable",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    getDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield discountProductModel_1.default.findById({ _id: req.params.id })
                    .then((data) => {
                    return res.status(200).json({
                        status: true,
                        message: "Success",
                        data: data,
                    });
                })
                    .catch((error) => {
                    return res.status(400).json({
                        status: false,
                        message: "Discount is not Avilable",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    updateDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield discountProductModel_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body)
                    .then((data) => {
                    return res.status(200).json({
                        status: true,
                        message: "Discount Updated Successfully",
                        data: data,
                    });
                })
                    .catch((error) => {
                    return res.status(400).json({
                        status: false,
                        message: "Discount is not Updated",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
    deleteDiscount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield discountProductModel_1.default.findByIdAndDelete({ _id: req.params.id })
                    .then((data) => {
                    return res.status(200).json({
                        status: true,
                        message: "Discount Deleted Successfully",
                    });
                })
                    .catch((error) => {
                    return res.status(400).json({
                        status: false,
                        message: "Discount is not Avilable",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "Internal Server Error",
                });
            }
        });
    }
}
exports.default = DiscountController;
