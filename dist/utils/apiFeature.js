"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword
            ? {
                title: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};
        this.query = this.query.find(Object.assign({}, keyword));
        return this;
    }
    filter() {
        const queryCopy = Object.assign({}, this.queryStr);
        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        // Filter For Price and Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|eq|ne)\b/g, (key) => `$${key}`);
        const parsedQuery = JSON.parse(queryStr);
        // Handle special cases
        if (parsedQuery.isfeatured) {
            this.query = this.query.find({ isFeatured: true });
        }
        else if (parsedQuery.istrending) {
            this.query = this.query.find({ isTrending: true });
        }
        else if (parsedQuery.isspecial) {
            this.query = this.query.find({ isSpecial: true });
        }
        else if (parsedQuery.isbestseller) {
            this.query = this.query.find({ isBestSeller: true });
        }
        else if (parsedQuery.latest === "latest") {
            this.query = this.query.find().sort({ createdAt: -1 }).limit(7);
        }
        else if (parsedQuery.subcategories) {
            this.query = this.query.find({
                subcategories: parsedQuery.subcategories,
            });
        }
        else {
            this.query = this.query.find(parsedQuery);
        }
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
exports.default = ApiFeatures;
