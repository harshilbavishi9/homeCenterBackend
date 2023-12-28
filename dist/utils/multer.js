"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiUpload = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
if (!fs_1.default.existsSync("./src/uploads")) {
    fs_1.default.mkdirSync("./src/uploads");
}
var storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage }).single("image");
exports.multiUpload = (0, multer_1.default)({ storage: storage }).array("images", 10);
