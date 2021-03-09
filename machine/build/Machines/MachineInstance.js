"use strict";
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
exports.MachineInstance = void 0;
var uuidv4_1 = require("uuidv4");
var Database_1 = require("../Helper/Database");
var Machine_1 = require("../models/Machine");
var mqtt_1 = __importDefault(require("../Helper/mqtt"));
var MachineInstance = /** @class */ (function () {
    function MachineInstance(name) {
        var _this = this;
        this.closeLockingUnit = function (next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.machineData.state = Machine_1.State.closeLockingUnit;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/state", JSON.stringify(this.machineData.state))];
                    case 1:
                        _a.sent();
                        if (this.machineData.operation.power != true)
                            return [2 /*return*/];
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/oil/level", JSON.stringify(this.machineData.operation.oil.level))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/running", JSON.stringify(this.machineData.operation.running))
                            // Automate closing locking unit
                        ];
                    case 3:
                        _a.sent();
                        // Automate closing locking unit
                        this.machineData.lockingUnit.position.x = this.machineData.lockingUnit.position.min;
                        return [4 /*yield*/, this.executeAction(this.timerIntervall, this.accuracy, function () { return __awaiter(_this, void 0, void 0, function () {
                                var e_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.machineData.lockingUnit.closingForce.force += this.machineData.lockingUnit.closingForce.maxForce / this.accuracy;
                                            if (this.machineData.lockingUnit.position.x != undefined)
                                                this.machineData.lockingUnit.position.x += this.machineData.lockingUnit.position.max / this.accuracy;
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 4, , 5]);
                                            return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/lockingUnit/closingForce/force", JSON.stringify(this.machineData.lockingUnit.closingForce.force))];
                                        case 2:
                                            _a.sent();
                                            return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/lockingUnit/position/x", JSON.stringify(this.machineData.lockingUnit.position.x))];
                                        case 3:
                                            _a.sent();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            e_1 = _a.sent();
                                            this.log("Error while performing mqtt upload in state: " + this.machineData.state, 2);
                                            return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 4:
                        _a.sent();
                        // Savety Ruleset 
                        this.machineData.lockingUnit.closingForce.force = this.machineData.lockingUnit.closingForce.maxForce;
                        if (this.machineData.operation.automatic == true)
                            setTimeout(function () { next(_this.injectMaterial); }, this.timerIntervall);
                        return [2 /*return*/];
                }
            });
        }); };
        this.mountInjectionUnit = function (next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.machineData.state = Machine_1.State.mountInjectionUnit;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/state", JSON.stringify(this.machineData.state))];
                    case 1:
                        _a.sent();
                        if (this.machineData.operation.power != true)
                            return [2 /*return*/];
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/oil/level", JSON.stringify(this.machineData.operation.oil.level))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/running", JSON.stringify(this.machineData.operation.running))
                            // Automate mounting Injection Unit
                        ];
                    case 3:
                        _a.sent();
                        // Automate mounting Injection Unit
                        this.machineData.injectionUnit.position.x = this.machineData.injectionUnit.position.min;
                        this.executeAction(this.timerIntervall, this.accuracy, function () { return __awaiter(_this, void 0, void 0, function () {
                            var e_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.machineData.injectionUnit.fillingLevel.level += this.machineData.injectionUnit.fillingLevel.maxLevel / this.accuracy;
                                        if (this.machineData.injectionUnit.position.x != undefined)
                                            this.machineData.injectionUnit.position.x += this.machineData.injectionUnit.position.max / this.accuracy;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/injectionUnit/fillingLevel/level", JSON.stringify(this.machineData.injectionUnit.fillingLevel.level))];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/injectionUnit/position/x", JSON.stringify(this.machineData.injectionUnit.position.x))];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        e_2 = _a.sent();
                                        this.log("Error while performing mqtt upload in state: " + this.machineData.state, 2);
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        // Savety Ruleset
                        this.machineData.injectionUnit.fillingLevel.level = this.machineData.injectionUnit.fillingLevel.maxLevel;
                        if (this.machineData.operation.automatic == true)
                            setTimeout(function () { next(_this.unmountInjectionUnit); }, this.timerIntervall);
                        return [2 /*return*/];
                }
            });
        }); };
        this.injectMaterial = function (next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.machineData.state = Machine_1.State.injectMaterial;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/state", JSON.stringify(this.machineData.state))];
                    case 1:
                        _a.sent();
                        if (this.machineData.operation.power != true)
                            return [2 /*return*/];
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/oil/level", JSON.stringify(this.machineData.operation.oil.level))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/running", JSON.stringify(this.machineData.operation.running))
                            // Automate mounting Injection Unit
                        ];
                    case 3:
                        _a.sent();
                        // Automate mounting Injection Unit
                        this.executeAction(this.timerIntervall, this.accuracy, function () { return __awaiter(_this, void 0, void 0, function () {
                            var e_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.machineData.injectionUnit.fillingLevel.level -= this.machineData.injectionUnit.fillingLevel.maxLevel / this.accuracy;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/injectionUnit/fillingLevel/level", JSON.stringify(this.machineData.injectionUnit.fillingLevel.level))];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_3 = _a.sent();
                                        this.log("Error while performing mqtt upload in state: " + this.machineData.state, 2);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        //Savety Ruleset
                        this.machineData.injectionUnit.fillingLevel.level = this.machineData.injectionUnit.fillingLevel.minLevel;
                        if (this.machineData.operation.automatic == true)
                            setTimeout(function () { next(_this.wait); }, this.timerIntervall);
                        return [2 /*return*/];
                }
            });
        }); };
        this.unmountInjectionUnit = function (next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.machineData.state = Machine_1.State.unmountInjectionUnit;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/state", JSON.stringify(this.machineData.state))];
                    case 1:
                        _a.sent();
                        if (this.machineData.operation.power != true)
                            return [2 /*return*/];
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/oil/level", JSON.stringify(this.machineData.operation.oil.level))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/running", JSON.stringify(this.machineData.operation.running))
                            // Automate mounting Injection Unit
                        ];
                    case 3:
                        _a.sent();
                        // Automate mounting Injection Unit
                        this.machineData.injectionUnit.position.x = this.machineData.injectionUnit.position.max;
                        this.executeAction(this.timerIntervall, this.accuracy, function () { return __awaiter(_this, void 0, void 0, function () {
                            var e_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.machineData.injectionUnit.fillingLevel.level -= this.machineData.injectionUnit.fillingLevel.maxLevel / this.accuracy;
                                        if (this.machineData.injectionUnit.position.x != undefined)
                                            this.machineData.injectionUnit.position.x -= this.machineData.injectionUnit.position.max / this.accuracy;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/injectionUnit/fillingLevel/level", JSON.stringify(this.machineData.injectionUnit.fillingLevel.level))];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/injectionUnit/position/x", JSON.stringify(this.machineData.injectionUnit.position.x))];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        e_4 = _a.sent();
                                        this.log("Error while performing mqtt upload in state: " + this.machineData.state, 2);
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        // Savety Ruleset
                        this.machineData.injectionUnit.fillingLevel.level = this.machineData.injectionUnit.fillingLevel.minLevel;
                        this.machineData.injectionUnit.position.x = this.machineData.injectionUnit.position.max;
                        if (this.machineData.operation.automatic == true)
                            setTimeout(function () { next(_this.openLockingUnit); }, this.timerIntervall);
                        return [2 /*return*/];
                }
            });
        }); };
        this.wait = function (next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.machineData.state = Machine_1.State.wait;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/state", JSON.stringify(this.machineData.state))];
                    case 1:
                        _a.sent();
                        if (this.machineData.operation.power != true)
                            return [2 /*return*/];
                        // use up 1 oil
                        this.subOil();
                        this.executeAction(this.timerIntervall, this.accuracy, function () { });
                        if (this.machineData.operation.automatic == true)
                            setTimeout(function () { next(_this.closeLockingUnit); }, this.timerIntervall);
                        return [2 /*return*/];
                }
            });
        }); };
        this.openLockingUnit = function (next) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.machineData.state = Machine_1.State.openLockingUnit;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/state", JSON.stringify(this.machineData.state))];
                    case 1:
                        _a.sent();
                        if (this.machineData.operation.power != true)
                            return [2 /*return*/];
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/oil/level", JSON.stringify(this.machineData.operation.oil.level))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/running", JSON.stringify(this.machineData.operation.running))
                            // Automate closing locking unit
                        ];
                    case 3:
                        _a.sent();
                        // Automate closing locking unit
                        this.machineData.lockingUnit.position.x = this.machineData.lockingUnit.position.max;
                        this.executeAction(this.timerIntervall, this.accuracy, function () { return __awaiter(_this, void 0, void 0, function () {
                            var e_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.machineData.lockingUnit.closingForce.force -= this.machineData.lockingUnit.closingForce.maxForce / this.accuracy;
                                        if (this.machineData.lockingUnit.position.x != undefined)
                                            this.machineData.lockingUnit.position.x -= this.machineData.lockingUnit.position.max / this.accuracy;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 4, , 5]);
                                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/lockingUnit/closingForce/level", JSON.stringify(this.machineData.lockingUnit.closingForce.force))];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/lockingUnit/position/x", JSON.stringify(this.machineData.lockingUnit.position.x))];
                                    case 3:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 4:
                                        e_5 = _a.sent();
                                        this.log("Error while performing mqtt upload in state: " + this.machineData.state, 2);
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        // Savety Ruleset 
                        this.machineData.lockingUnit.closingForce.force = this.machineData.lockingUnit.closingForce.minForce;
                        this.machineData.lockingUnit.position.x = this.machineData.lockingUnit.position.min;
                        if (this.machineData.operation.automatic == true)
                            setTimeout(function () { next(_this.mountInjectionUnit); }, this.timerIntervall);
                        return [2 /*return*/];
                }
            });
        }); };
        this.executeAction = function (timerIntervall, accuracy, action) {
            var steps = Math.round(100 / accuracy);
            var i = 0;
            var intId = setInterval(function () {
                //React to NOT AUS
                if (_this.machineData.operation.power == false) {
                    clearInterval(intId);
                    mqtt_1.default.publish("machines/" + _this.id + "/data/operation/statusLED/red", JSON.stringify(true));
                }
                //Execute provided action
                action();
                i++;
                if (i >= steps)
                    clearInterval(intId);
            }, _this.timerIntervall / _this.accuracy);
        };
        this.accuracy = 10;
        this.timerIntervall = 5000;
        this.id = uuidv4_1.uuid();
        this._machineData =
            {
                name: name,
                state: Machine_1.State.none,
                machineDetails: { model: "Allrounder", serialNumber: 123456 },
                operation: { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, automatic: false, oil: { level: 2000, minLevel: 0, maxLevel: 2500 } },
                injectionUnit: { position: { max: 500, min: 0, x: 500 }, fillingLevel: { level: 0, minLevel: 0, maxLevel: 100 } },
                savetyDoor: { position: { max: 500, min: 0, x: 500 }, locked: false },
                lockingUnit: { locked: false, position: { max: 500, min: 0, x: 500 }, closingForce: { force: 0, maxForce: 1000, minForce: 0 } },
                materialInfo: { temp: 0, material: "pp", pressure: { force: 0, maxForce: 1000, minForce: 0 } },
            };
        // Persisting Data initially    
        Database_1.DatabaseHandler.getDbInstance().set(this.id, this);
        this.persistData();
    }
    Object.defineProperty(MachineInstance.prototype, "machineData", {
        get: function () {
            return this._machineData;
        },
        set: function (machine) {
            this._machineData = machine;
            this.persistData();
        },
        enumerable: false,
        configurable: true
    });
    MachineInstance.prototype.changeState = function (key, value) {
        switch (key) {
            /* Essentials */
            case 'name':
                this.machineData.name = value;
                break;
            case 'operation.power':
                this.machineData.operation.power = value == 'true' ? true : false;
                break;
            case 'savetyDoor.locked':
                this.machineData.savetyDoor.locked = value == 'true' ? true : false;
                break;
            /* machine Details */
            case 'machineDetails.model':
                this.machineData.machineDetails.model = value;
                break;
            case 'machineDetails.serialNumber':
                this.machineData.machineDetails.serialNumber = Number.parseInt(value);
                break;
            /* Injection Unit */
            case 'injectionUnit.position.max':
                this.machineData.injectionUnit.position.max = Number.parseInt(value);
                break;
            case 'injectionUnit.position.min':
                this.machineData.injectionUnit.position.min = Number.parseInt(value);
                break;
            case 'injectionUnit.position.x':
                this.machineData.injectionUnit.position.x = Number.parseInt(value);
                break;
            case 'injectionUnit.fillingLevel.level':
                this.machineData.injectionUnit.fillingLevel.level = Number.parseInt(value);
                break;
            case 'injectionUnit.fillingLevel.minLevel':
                this.machineData.injectionUnit.fillingLevel.minLevel = Number.parseInt(value);
                break;
            case 'injectionUnit.fillingLevel.maxLevel':
                this.machineData.injectionUnit.fillingLevel.maxLevel = Number.parseInt(value);
                break;
            /* Savety Door */
            case 'savetyDoor.position.max':
                this.machineData.savetyDoor.position.max = Number.parseInt(value);
                break;
            case 'savetyDoor.position.min':
                this.machineData.savetyDoor.position.min = Number.parseInt(value);
                break;
            case 'savetyDoor.position.x':
                this.machineData.savetyDoor.position.x = Number.parseInt(value);
                break;
            case 'savetyDoor.locked':
                this.machineData.savetyDoor.locked = (value == "true") ? true : false;
                break;
            /* Locking Unit */
            case 'lockingUnit.position.max':
                this.machineData.lockingUnit.position.max = Number.parseInt(value);
                break;
            case 'lockingUnit.position.min':
                this.machineData.lockingUnit.position.max = Number.parseInt(value);
                break;
            case 'lockingUnit.position.x':
                this.machineData.lockingUnit.position.max = Number.parseInt(value);
                break;
            case 'lockingUnit.locked':
                this.machineData.lockingUnit.locked = (value == "true") ? true : false;
                break;
            case 'lockingUnit.closingForce.maxForce':
                this.machineData.lockingUnit.closingForce.maxForce = Number.parseInt(value);
                break;
            case 'lockingUnit.closingForce.minForce':
                this.machineData.lockingUnit.closingForce.minForce = Number.parseInt(value);
                break;
            case 'lockingUnit.closingForce.force':
                this.machineData.lockingUnit.closingForce.force = Number.parseInt(value);
                break;
            /* Material Info */
            case 'materialInfo.temp':
                this.machineData.materialInfo.temp = Number.parseInt(value);
                break;
            case 'materialInfo.material':
                this.machineData.materialInfo.material = value;
                break;
            case 'materialInfo.pressure.maxForce':
                this.machineData.materialInfo.pressure.maxForce = Number.parseInt(value);
                break;
            case 'materialInfo.pressure.minForce':
                this.machineData.materialInfo.pressure.minForce = Number.parseInt(value);
                break;
            case 'materialInfo.pressure.force':
                this.machineData.materialInfo.pressure.force = Number.parseInt(value);
                break;
            default: return "Variable could not get found!";
        }
    };
    // Function to check if the value change of property machineData is valid
    MachineInstance.prototype.checkConstraints = function () {
        return true;
    };
    MachineInstance.prototype.powerOn = function () {
        this.machineData.operation.power = true;
        this.machineData.operation.statusLED.red = true;
    };
    ;
    MachineInstance.prototype.resetToDefault = function () {
        this.machineData.state = Machine_1.State.none;
        this.machineData.machineDetails = { model: "Allrounder", serialNumber: 123456 };
        this.machineData.operation = { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, automatic: false, oil: { level: 2000, minLevel: 0, maxLevel: 2500 } };
        this.machineData.injectionUnit = { position: { max: 500, min: 0, x: 500 }, fillingLevel: { level: 0, minLevel: 0, maxLevel: 100 } };
        this.machineData.savetyDoor = { position: { max: 500, min: 0, x: 500 }, locked: false };
        this.machineData.lockingUnit = { locked: false, position: { max: 500, min: 0, x: 500 }, closingForce: { force: 0, maxForce: 1000, minForce: 0 } };
        this.machineData.materialInfo = { temp: 0, material: "pp", pressure: { force: 0, maxForce: 1000, minForce: 0 } };
    };
    ;
    // Automated Workflow
    MachineInstance.prototype.startAutomatedWorkflow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Start Workflow");
                        //TEMP
                        this.machineData.operation.automatic = true;
                        this.log("Automatic change: operation mode to automatic");
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/automatic", JSON.stringify(this.machineData.operation.automatic))];
                    case 1:
                        _a.sent();
                        this.machineData.operation.power = true;
                        this.log("Automatic change: powered on the machine");
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/state", JSON.stringify(this.machineData.operation.power))];
                    case 2:
                        _a.sent();
                        this.machineData.savetyDoor.locked = true;
                        this.log("Automatic change: locked the savety door");
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/savetyDoor/locked", JSON.stringify(this.machineData.savetyDoor.locked))];
                    case 3:
                        _a.sent();
                        this.machineData.operation.statusLED.green = true;
                        this.log("Automatic change: enable green led");
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/statusLED/green", JSON.stringify(this.machineData.operation.statusLED.green))];
                    case 4:
                        _a.sent();
                        this.machineData.operation.statusLED.red = false;
                        this.log("Automatic change: disabled red led");
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/statusLED/red", JSON.stringify(this.machineData.operation.statusLED.red))];
                    case 5:
                        _a.sent();
                        this.machineData.operation.running = true;
                        this.log("Automatic change: running to true");
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/running", JSON.stringify(this.machineData.operation.running))];
                    case 6:
                        _a.sent();
                        this.persistData();
                        //END TEMP
                        this.log("Workflow started!");
                        this.closeLockingUnit(this.mountInjectionUnit);
                        return [2 /*return*/];
                }
            });
        });
    };
    MachineInstance.prototype.persistData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Database_1.DatabaseHandler.getDbInstance().update(this.id, this)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MachineInstance.prototype.subOil = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.machineData.operation.oil.level -= (Math.floor(Math.random() * 10) + 1);
                        if (this.machineData.operation.oil.level <= this.machineData.operation.oil.minLevel) {
                            //refill or stop machine
                            //refill
                            this.machineData.operation.oil.level = this.machineData.operation.oil.maxLevel;
                        }
                        // Publish to mqtt broker
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/oil/level", JSON.stringify(this.machineData.operation.oil.level))];
                    case 1:
                        // Publish to mqtt broker
                        _a.sent();
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/logs", JSON.stringify("Oil consumed!! " + Date.now().toLocaleString()))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MachineInstance.prototype.log = function (msg, level) {
        return __awaiter(this, void 0, void 0, function () {
            var logString, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        level = level == undefined ? 0 : undefined;
                        logString = msg;
                        if (msg.search('error') != -1 || msg.search('Error') != -1 || level == 2) {
                            logString = "[ERROR] " + logString;
                        }
                        if (msg.search('debug') != -1 || msg.search('Debug') != -1 || level == 1) {
                            logString = "[DEBUG] " + logString;
                        }
                        if (msg.search('info') != -1 || msg.search('Info') != -1 || level == 0) {
                            logString = "[INFO] " + logString;
                        }
                        logString = logString + " at: " + Date.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/logs", JSON.stringify(logString))];
                    case 2:
                        _a.sent();
                        console.log(logString);
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        this.log("Failed sending log string: ", e_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MachineInstance.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.machineData.operation.power = false;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/power", JSON.stringify(this.machineData.operation.power))];
                    case 1:
                        _a.sent();
                        this.machineData.state = Machine_1.State.none;
                        this.machineData.operation.running = false;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/running", JSON.stringify(this.machineData.operation.running))];
                    case 2:
                        _a.sent();
                        this.machineData.state = Machine_1.State.none;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/state", JSON.stringify(this.machineData.state))];
                    case 3:
                        _a.sent();
                        this.machineData.operation.statusLED.red = true;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/statusLED/red", JSON.stringify(true))];
                    case 4:
                        _a.sent();
                        this.machineData.operation.statusLED.green = false;
                        return [4 /*yield*/, mqtt_1.default.publish("machines/" + this.id + "/data/operation/statusLED/green", JSON.stringify(false))];
                    case 5:
                        _a.sent();
                        this.log("Stop initiated!!", 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    return MachineInstance;
}());
exports.MachineInstance = MachineInstance;
