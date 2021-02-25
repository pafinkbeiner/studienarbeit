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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var Database_1 = require("../Helper/Database");
var mqtt_1 = __importDefault(require("../Helper/mqtt"));
var MachineInstance_1 = require("../Machines/MachineInstance");
var router = express.Router();
// Array with all machines
var machines = [];
/* GET home page. */
router.get("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.json(Database_1.DatabaseHandler.getDbInstance().getAll());
            return [2 /*return*/];
        });
    });
});
router.get("/get/:machineId", function (req, res, next) {
    var machine = Database_1.DatabaseHandler.getDbInstance().get(req.params.machineId);
    if (machine != undefined) {
        res.json(machine);
    }
    else {
        res.json("No machine found!");
    }
});
router.get("/new/:name", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var machine, machineIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    machine = new MachineInstance_1.MachineInstance(req.params.name);
                    machines.push(machine);
                    machineIds = [];
                    Database_1.DatabaseHandler.getDbInstance().getAll().map(function (item) {
                        machineIds.push(item.id);
                    });
                    return [4 /*yield*/, mqtt_1.default.publish("machines", JSON.stringify(machineIds))];
                case 1:
                    _a.sent();
                    res.json({ id: machine.id });
                    return [2 /*return*/];
            }
        });
    });
});
router.get("/delete/:id", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var machineIds_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(machines.find(function (item) { return item.id == req.params.id; }) != undefined)) return [3 /*break*/, 2];
                    Database_1.DatabaseHandler.getDbInstance().remove(req.params.id);
                    machines = machines.filter(function (item) { return item.id != req.params.id; });
                    machineIds_1 = [];
                    Database_1.DatabaseHandler.getDbInstance().getAll().map(function (item) {
                        machineIds_1.push(item.id);
                    });
                    return [4 /*yield*/, mqtt_1.default.publish("machines", JSON.stringify(machineIds_1))];
                case 1:
                    _a.sent();
                    res.json("Successfully Deleted Machine with id: " + req.params.id);
                    return [3 /*break*/, 3];
                case 2:
                    res.json("No machine found!");
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
router.get("/operation/:machineId/:name", function (req, res, next) {
    console.log("Perform Operation" + req.params.name + " on machine with id: " + req.params.machineId);
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
        case "stop":
            machine === null || machine === void 0 ? void 0 : machine.stop();
            break;
        default:
            res.json("Operation not found!");
            break;
    }
    res.json("Operation: " + req.params.name + " started successfully.");
});
router.get("/variable/:machineId/:name/:newValue", function (req, res, next) {
    var machine = machines.find(function (item) { return item.id == req.params.machineId; });
    if (machine == undefined)
        res.json("Machine was not found.");
    // console.log(req.body)
    // const newState = req.body;
    if (machine != undefined) {
        var result = machine === null || machine === void 0 ? void 0 : machine.changeState(req.params.name, req.params.newValue);
        res.json({ msg: "Variable change resulted in: " + result });
    }
    // if(newState == undefined) res.json("Machine state was not provided!");
    // if(newState != undefined && machine != undefined) DatabaseHandler.getDbInstance().update(machine.id, newState);
});
router.post("/new", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var machine, machineIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    machine = new MachineInstance_1.MachineInstance(req.body.name);
                    machines.push(machine);
                    machineIds = [];
                    Database_1.DatabaseHandler.getDbInstance().getAll().map(function (item) {
                        machineIds.push(item.id);
                    });
                    return [4 /*yield*/, mqtt_1.default.publish("machines", JSON.stringify(machineIds))];
                case 1:
                    _a.sent();
                    res.redirect("back");
                    return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
