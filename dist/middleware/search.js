"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMiddleware = void 0;
const searchMiddleware = (req, res, next) => {
    const query = req.query.search;
    if (typeof query === 'string') {
        const searchRegex = new RegExp(query, 'i');
        req.searchRegex = searchRegex;
        next();
    }
    else {
        return res.status(400).json({ error: 'Invalid query parameter' });
    }
};
exports.searchMiddleware = searchMiddleware;
