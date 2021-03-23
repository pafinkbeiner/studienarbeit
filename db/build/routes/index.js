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
var express = __importStar(require("express"));
var Auth_1 = require("../Helper/Auth");
var Database_1 = require("../Helper/Database");
var Status_1 = require("../models/Status");
var router = express.Router();
//////////////////////// MAIN ROUTES ////////////////////////
/*
 * GET
 * Returns data to a specific key
 */
router.get("/", function (req, res, next) {
    var info = {
        name: "SWE-DB",
        routes: [
            {
                name: "GET",
                route: "/get/:key",
                method: "GET"
            },
            {
                name: "SET",
                route: "/get/:key",
                method: "POST"
            },
            {
                name: "SET",
                route: "/set/:key/:data",
                method: "GET"
            },
            {
                name: "ALL",
                route: "/all",
                method: "GET"
            },
            {
                name: "Delete",
                route: "/delete/:key",
                method: "GET"
            },
            {
                name: "Wipe",
                route: "/wipe",
                method: "GET"
            }
        ]
    };
    res.json(info);
});
/*
 * GET
 * Returns data to a specific key
 */
router.get("/get/:key", function (req, res, next) {
    if (req.params.key == undefined)
        res.json(Status_1.errorStatus.msg = "Key was not provided");
    res.json(Database_1.DatabaseHandler.getDbInstance().get(req.params.key));
});
/**
 * POST
 * Saves data to a specified key
 * key -> req.params.key
 * data -> req.body.data
 */
router.post("/set/:key", function (req, res, next) {
    if (req.params.key == undefined)
        res.json(Status_1.errorStatus.msg = "Key was not provided");
    if (req.body == undefined)
        res.json(Status_1.errorStatus.msg = "Data was not provided");
    console.log("SET", req.body);
    Database_1.DatabaseHandler.getDbInstance().set(req.params.key, req.body);
    res.json(Status_1.successStatus.msg = "Item with id " + req.params.key + " was added successfully");
});
/**
 * GET
 * Alternativ way of saving key value pairs
 * key -> req.params.key
 * data -> req.params.data
 */
router.get("/set/:key/:data", function (req, res, next) {
    console.log("Set data", req.params.data);
    if (req.params.key == undefined)
        res.json(Status_1.errorStatus.msg = "Key was not provided");
    if (req.params.data == undefined)
        res.json(Status_1.errorStatus.msg = "Data was not provided");
    Database_1.DatabaseHandler.getDbInstance().set(req.params.key, req.params.data);
    res.json(Status_1.successStatus.msg = "Item with id " + req.params.key + " was added to db successfully");
});
///////////////////////////////// OTHER ROUTES //////////////////////////////////////
/**
 * GET
 * Returns everything that is saved in the Database
 */
router.get("/all", function (req, res, next) {
    res.json(Database_1.DatabaseHandler.getDbInstance().getAll());
});
/**
 * GET
 * Deletes Element with a specific key
 * key -> req.params.key
 */
router.get("/delete/:key", Auth_1.authMiddleware, function (req, res, next) {
    if (req.params.key == undefined)
        res.json(Status_1.errorStatus.msg = "Key was not provided");
    Database_1.DatabaseHandler.getDbInstance().remove(req.params.key);
    res.json(Status_1.successStatus.msg = "Item with id " + req.params.key + " was removed successfully");
});
/**
 * GET
 * Wipes db
 */
router.get("/wipe", function (req, res, next) {
    Database_1.DatabaseHandler.getDbInstance().set("", {});
    res.json(Status_1.successStatus.msg = "Wipe was successfully");
});
exports.default = router;
