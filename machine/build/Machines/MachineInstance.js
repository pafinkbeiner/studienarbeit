"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineInstance = void 0;
var timers_1 = require("timers");
var Database_1 = require("../Helper/Database");
var Log_1 = require("../Helper/Log");
var Machine_1 = require("../models/Machine");
var MachineInstance = /** @class */ (function () {
    function MachineInstance(name) {
        var _this = this;
        this.closeLockingUnit = function (next) {
            if (_this.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.injectMaterial); }, 1000);
        };
        this.mountInjectionUnit = function (next) {
            console.log("Workflow operation2");
            if (_this.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.unmountInjectionUnit); }, 1000);
        };
        this.injectMaterial = function (next) {
            console.log("Workflow operation3");
            if (_this.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.wait); }, 1000);
        };
        this.unmountInjectionUnit = function (next) {
            console.log("Workflow operation4");
            if (_this.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.openLockingUnit); }, 1000);
        };
        this.wait = function (next) {
            console.log("Workflow operation5");
            if (_this.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.closeLockingUnit); }, 1000);
        };
        this.openLockingUnit = function (next) {
            console.log("Workflow operation6");
            if (_this.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.mountInjectionUnit); }, 1000);
        };
        this.name = name || "";
        this.machineDetails = { model: "Allrounder", serialNumber: 123456, sparDistance: 500 };
        this.operation = { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, operationMode: Machine_1.OperationMode.semiAutomatic };
        this.injectionUnit = { position: { max: 500, min: 0, x: 500 } };
        this.savetyDoor = { position: { max: 500, min: 0, x: 500 }, locked: false };
        this.lockingUnit = { locked: false, position: { max: 500, min: 0, x: 500 }, };
        this.materialInfo = { temp: 0, material: "pp" };
        this.persistData();
    }
    MachineInstance.prototype.powerOn = function () {
        this.operation.power = true;
        this.operation.statusLED.red = true;
    };
    ;
    MachineInstance.prototype.resetToDefault = function () {
        this.machineDetails = { model: "Allrounder", serialNumber: 123456, sparDistance: 500 };
        this.operation = { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, operationMode: Machine_1.OperationMode.semiAutomatic };
        this.injectionUnit = { position: { max: 500, min: 0, x: 500 } };
        this.savetyDoor = { position: { max: 500, min: 0, x: 500 }, locked: false };
        this.lockingUnit = { locked: false, position: { max: 500, min: 0, x: 500 }, };
        this.materialInfo = { temp: 0, material: "pp" };
    };
    ;
    MachineInstance.prototype.setMachineMode = function (data) {
        if (data == Machine_1.OperationMode.automatic || data == Machine_1.OperationMode.semiAutomatic) {
            this.operation.operationMode = data;
        }
        else {
            Log_1.LogHandler.getLogInstance().log("error while setting machine mode");
        }
    };
    // Automated Workflow
    MachineInstance.prototype.startAutomatedWorkflow = function () {
        if (this.operation.operationMode == Machine_1.OperationMode.automatic) {
            console.log("Workflow started!");
            this.closeLockingUnit(this.mountInjectionUnit);
        }
        else {
            console.log("Worklow could not get started");
        }
    };
    MachineInstance.prototype.persistData = function () {
        var _this = this;
        timers_1.setInterval(function () {
            Database_1.DatabaseHandler.getDbInstance().set(_this.name, _this);
        }, 1000);
    };
    return MachineInstance;
}());
exports.MachineInstance = MachineInstance;
