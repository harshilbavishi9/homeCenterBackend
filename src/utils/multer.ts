import multer from "multer";
import fs from "fs";

if (!fs.existsSync("./src/uploads")) {
  fs.mkdirSync("./src/uploads");
}
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage }).single("image");

export const multiUpload = multer({ storage: storage }).array("images", 10);
