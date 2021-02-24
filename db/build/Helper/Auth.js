"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var Status_1 = require("../models/Status");
var jwt = __importStar(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    var bearer = req.headers["authorization"];
    if (bearer != undefined) {
        var token = bearer.split(" ")[1];
        jwt.verify(token, "secret", function (err, authData) {
            if (err) {
                res.json(Status_1.errorStatus.msg = "Verification was not successfull!");
            }
            else {
                next();
            }
        });
    }
    else {
        res.json(Status_1.errorStatus.msg = "Bearer token was not provided!");
    }
}
exports.authMiddleware = authMiddleware;
