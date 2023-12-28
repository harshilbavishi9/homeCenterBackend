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
const addressModel_1 = __importDefault(require("../model/addressModel"));
class AddressController {
    constructor() {
        let me = this;
    }
    createAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield addressModel_1.default.create(req.body)
                    .then((data) => {
                    return res.status(200).json({
                        message: "Address Created Successfully",
                        status: true,
                        data,
                    });
                })
                    .catch((err) => {
                    return res.status(200).json({
                        message: "Address Can Not Created",
                        status: true,
                    });
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    getAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield addressModel_1.default.find({
                    $or: [{ name: { $regex: req.searchRegex } }],
                })
                    .skip(req.query.skip ? parseInt(req.query.skip) : 0)
                    .limit(req.query.limit ? parseInt(req.query.limit) : 10)
                    .then((data) => {
                    if (data.length !== 0) {
                        return res.status(200).json({
                            data: data,
                            count: data.length,
                            status: true,
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: "address not found",
                            status: false,
                        });
                    }
                })
                    .catch(() => {
                    return res.status(534).json({
                        message: "address finding Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    getOneAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield addressModel_1.default.findById(req.params.id)
                    .then((data) => {
                    if (data) {
                        return res.status(200).json({
                            data: data,
                            status: true,
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: "wrong object id",
                            status: false,
                        });
                    }
                })
                    .catch(() => {
                    return res.status(534).json({
                        message: "address finding Some Error",
                        status: false,
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    deleteAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adId = req.params.id;
                yield addressModel_1.default.findById(adId);
                return res.status(200).json({
                    message: "address deleted successfully",
                    status: true,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal Server Error",
                    status: false,
                });
            }
        });
    }
    updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let address = yield addressModel_1.default.findById(req.params.id);
                if (address) {
                    return res.status(400).json({
                        status: false,
                        message: "Address Not Found",
                    });
                }
                yield addressModel_1.default.findByIdAndUpdate(req.params.id, req.body)
                    .then((data) => {
                    return res.status(200).json({
                        status: true,
                        message: "Address Updated Successfully",
                        data,
                    });
                })
                    .catch((err) => {
                    return res.status(400).json({
                        status: false,
                        message: "Address Can Not Updated",
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
}
exports.default = AddressController;
