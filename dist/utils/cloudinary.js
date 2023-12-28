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
const cloudinary_1 = __importDefault(require("cloudinary"));
const promises_1 = require("fs/promises");
class CloudinaryService {
    constructor() {
        cloudinary_1.default.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    uploadSingleImage(localFilePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const mainFolderName = "main";
            const filePathOnCloudinary = `${mainFolderName}/${localFilePath.replace(/\\/g, "/")}`;
            try {
                const result = yield cloudinary_1.default.v2.uploader.upload(localFilePath, {
                    public_id: filePathOnCloudinary,
                });
                yield this.deleteLocalFile(localFilePath);
                return { message: "Success", url: result.secure_url, result };
            }
            catch (error) {
                console.error(`Error uploading single image to Cloudinary: ${error}`);
                throw error;
            }
        });
    }
    uploadMultipleImages(imagePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Promise.all(imagePaths.map((imagePath) => __awaiter(this, void 0, void 0, function* () {
                    const mainFolderName = "main";
                    const filePathOnCloudinary = `${mainFolderName}/${imagePath.replace(/\\/g, "/")}`;
                    const result = yield cloudinary_1.default.v2.uploader.upload(imagePath, {
                        public_id: filePathOnCloudinary,
                    });
                    yield this.deleteLocalFile(imagePath);
                    return result;
                })));
            }
            catch (error) {
                console.error(`Error uploading multiple images to Cloudinary: ${error}`);
                throw error;
            }
        });
    }
    destroyImages(imagePublicIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield cloudinary_1.default.v2.api.delete_resources(imagePublicIds);
            }
            catch (error) {
                console.error(`Error destroying images: ${error}`);
                throw error;
            }
        });
    }
    deleteSingleImage(imagePublicId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cloudinary_1.default.v2.uploader.destroy(imagePublicId);
                if (result.result === "ok") {
                    console.log(`Image deleted successfully: ${imagePublicId}`);
                }
                else {
                    console.error(`Error deleting single image: ${result.result}`);
                    throw new Error(`Failed to delete image: ${result.result}`);
                }
            }
            catch (error) {
                console.error(`Error deleting single image: ${error}`);
                throw error;
            }
        });
    }
    deleteLocalFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, promises_1.unlink)(filePath);
                console.log(`Local file deleted successfully: ${filePath}`);
            }
            catch (unlinkError) {
                console.error(`Error deleting local file: ${unlinkError}`);
            }
        });
    }
}
exports.default = new CloudinaryService();
