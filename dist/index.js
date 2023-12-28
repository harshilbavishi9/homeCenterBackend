"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("./config/mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
(0, mongoose_1.default)();
// setup bodyparser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '/uploads')));
app.use('/uploads', express_1.default.static('uploads'));
// route connection
app.use('/', indexRoutes_1.default);
// server connection
app.listen(Number(process.env.PORT), () => {
    console.log(`app listening on port ${process.env.PORT}!`);
});
