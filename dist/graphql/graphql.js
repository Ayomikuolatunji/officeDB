"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(require("./Schema"));
const Resolver_1 = __importDefault(require("./Resolver"));
const graphql = () => {
    return {
        schema: Schema_1.default,
        rootValue: Resolver_1.default,
        graphiql: true,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.message;
            const message = err.message || 'An error occurred.';
            const code = err.originalError.message || 500;
            return { message: message, status: code, data: data };
        }
    };
};
exports.default = graphql;
