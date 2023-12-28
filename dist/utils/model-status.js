"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.OrderStatus = exports.LandMarkStatus = exports.ModelDataCount = exports.ModelVerifiedStatus = exports.ModelStatus = void 0;
var ModelStatus;
(function (ModelStatus) {
    ModelStatus[ModelStatus["Deactivate"] = 0] = "Deactivate";
    ModelStatus[ModelStatus["Active"] = 1] = "Active";
})(ModelStatus || (exports.ModelStatus = ModelStatus = {}));
var ModelVerifiedStatus;
(function (ModelVerifiedStatus) {
    ModelVerifiedStatus[ModelVerifiedStatus["Waiting"] = 0] = "Waiting";
    ModelVerifiedStatus[ModelVerifiedStatus["Active"] = 1] = "Active";
})(ModelVerifiedStatus || (exports.ModelVerifiedStatus = ModelVerifiedStatus = {}));
var ModelDataCount;
(function (ModelDataCount) {
    ModelDataCount[ModelDataCount["length"] = 0] = "length";
    ModelDataCount[ModelDataCount["defaultpage"] = 1] = "defaultpage";
    ModelDataCount[ModelDataCount["PAGE"] = 10] = "PAGE";
})(ModelDataCount || (exports.ModelDataCount = ModelDataCount = {}));
/*
    0 - not selected
    1 - home
    2 - offie
*/
var LandMarkStatus;
(function (LandMarkStatus) {
    LandMarkStatus[LandMarkStatus["Select"] = 0] = "Select";
    LandMarkStatus[LandMarkStatus["Home"] = 1] = "Home";
    LandMarkStatus[LandMarkStatus["Office"] = 2] = "Office";
})(LandMarkStatus || (exports.LandMarkStatus = LandMarkStatus = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "Pending";
    OrderStatus["Processing"] = "Processing";
    OrderStatus["Shipped"] = "Shipped";
    OrderStatus["Delivered"] = "Delivered";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Pending"] = "Pending";
    PaymentStatus["CashOndelivery"] = "CashOndelivery";
    PaymentStatus["Online"] = "Online";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
