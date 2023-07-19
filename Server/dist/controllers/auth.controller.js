"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileHandler = exports.loginHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginHandler = (req, res) => {
    // req.body = {email: 'asasa', password: '2312313'}
    //validation, express-validator, joi, zod
    // store in database - mongodb, mysql, pg, etc
    // generate token - qwdioqwjqdoqdiqjoqij
    const token = jsonwebtoken_1.default.sign({
        test: 'test'
    }, 'secret', {
        expiresIn: 60 * 60 * 24
    });
    return res.json({
        token
    });
};
exports.loginHandler = loginHandler;
const profileHandler = (req, res) => {
    return res.json({
        message: "profile data"
    });
};
exports.profileHandler = profileHandler;
