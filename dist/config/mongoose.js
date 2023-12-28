"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let DATABASE = process.env.DBURL || "mongodb+srv://harshil97:icb1HIh2xIOI5dO2@cluster0.1qoanql.mongodb.net/?retryWrites=true&w=majority";
function connects() {
    return (0, mongoose_1.connect)(DATABASE, { retryWrites: true, w: 'majority' })
        .then(() => {
        console.log("Database Connected !!");
    })
        .catch((error) => {
        console.log("Database Not Connected", error);
    });
}
exports.default = connects;
