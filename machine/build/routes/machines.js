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
var Database_1 = require("../Helper/Database");
var MachineInstance_1 = require("../Machines/MachineInstance");
var router = express.Router();
// Array with all machines
var machines = [];
/* GET home page. */
router.get("/", function (req, res, next) {
    res.json(Database_1.DatabaseHandler.getDbInstance().getAll());
});
router.get("/new/:name", function (req, res, next) {
    var machine = new MachineInstance_1.MachineInstance(req.params.name);
    machines.push(machine);
    res.json({ id: machine.id });
});
router.get("/delete/:id", function (req, res, next) {
    if (machines.find(function (item) { return item.id == req.params.id; }) != undefined) {
        Database_1.DatabaseHandler.getDbInstance().remove(req.params.id);
        machines = machines.filter(function (item) { return item.id != req.params.id; });
        res.json("Successfully Deleted Machine with id: " + req.params.id);
    }
    else {
        res.json("No machine found!");
    }
});
router.get("/operation/:machineId/:name", function (req, res, next) {
    var machine = machines.find(function (item) { return item.id == req.params.machineId; });
    if (machine == undefined)
        res.json("Machine was not found.");
    switch (req.params.name) {
        case "startAutomatedWorkflow":
            machine === null || machine === void 0 ? void 0 : machine.startAutomatedWorkflow();
            break;
        case "powerOn":
            machine === null || machine === void 0 ? void 0 : machine.powerOn();
            break;
        case "resetToDefault":
            machine === null || machine === void 0 ? void 0 : machine.resetToDefault();
            break;
        case "closeLockingUnit":
            machine === null || machine === void 0 ? void 0 : machine.closeLockingUnit(machine === null || machine === void 0 ? void 0 : machine.mountInjectionUnit);
            break;
        case "mountInjectionUnit":
            machine === null || machine === void 0 ? void 0 : machine.mountInjectionUnit(machine === null || machine === void 0 ? void 0 : machine.injectMaterial);
            break;
        case "injectMaterial":
            machine === null || machine === void 0 ? void 0 : machine.injectMaterial(machine === null || machine === void 0 ? void 0 : machine.unmountInjectionUnit);
            break;
        case "unmountInjectionUnit":
            machine === null || machine === void 0 ? void 0 : machine.unmountInjectionUnit(machine === null || machine === void 0 ? void 0 : machine.wait);
            break;
        case "wait":
            machine === null || machine === void 0 ? void 0 : machine.wait(machine === null || machine === void 0 ? void 0 : machine.openLockingUnit);
            break;
        case "openLockingUnit":
            machine === null || machine === void 0 ? void 0 : machine.openLockingUnit(machine === null || machine === void 0 ? void 0 : machine.closeLockingUnit);
            break;
        default:
            res.json("Operation not found!");
            break;
    }
    res.json("Operation: " + req.params.name + " started successfully.");
});
router.post("/variable/:machineId", function (req, res, next) {
    var machine = machines.find(function (item) { return item.id == req.params.machineId; });
    if (machine == undefined)
        res.json("Machine was not found.");
    var newState = req.body.data;
    if (newState == undefined)
        res.json("Machine state was not provided!");
    //TODO
    if (newState != undefined && machine != undefined)
        Database_1.DatabaseHandler.getDbInstance().update(machine.id, machine.machineData = newState);
    res.json("State changed successfully.");
});
exports.default = router;
