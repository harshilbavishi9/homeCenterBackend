"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationMiddleware = void 0;
const paginationMiddleware = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    req.pagination = {
        page,
        limit,
        skip
    };
    next();
};
exports.paginationMiddleware = paginationMiddleware;
