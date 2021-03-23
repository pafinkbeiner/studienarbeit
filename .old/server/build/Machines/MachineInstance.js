"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineInstance = void 0;
var uuidv4_1 = require("uuidv4");
var Database_1 = require("../Helper/Database");
var Log_1 = require("../Helper/Log");
var Machine_1 = require("../models/Machine");
var Status_1 = require("../models/Status");
var MachineInstance = /** @class */ (function () {
    function MachineInstance(name) {
        var _this = this;
        this.closeLockingUnit = function (next) {
            _this.machineData.state = Machine_1.State.closeLockingUnit;
            if (_this.machineData.operation.power != true) {
                _this.machineData.state = Machine_1.State.none;
                return Status_1.MessageTemplates.failureMessage.msg = "Machine is not powered on";
            }
            // TODO add additional conditions
            // Automate closing locking unit
            _this.machineData.lockingUnit.position.x = _this.machineData.lockingUnit.position.min;
            _this.executeAction(_this.timerIntervall, _this.accuracy, function () {
                _this.machineData.lockingUnit.closingForce.force += _this.machineData.lockingUnit.closingForce.maxForce / _this.accuracy;
                if (_this.machineData.lockingUnit.position.x != undefined)
                    _this.machineData.lockingUnit.position.x += _this.machineData.lockingUnit.position.max / _this.accuracy;
            });
            // Savety Ruleset 
            _this.machineData.lockingUnit.closingForce.force = _this.machineData.lockingUnit.closingForce.maxForce;
            if (_this.machineData.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.injectMaterial); }, _this.timerIntervall);
        };
        this.mountInjectionUnit = function (next) {
            _this.machineData.state = Machine_1.State.mountInjectionUnit;
            if (_this.machineData.operation.power != true) {
                _this.machineData.state = Machine_1.State.none;
                return;
            }
            // Automate mounting Injection Unit
            _this.machineData.injectionUnit.position.x = _this.machineData.injectionUnit.position.min;
            _this.executeAction(_this.timerIntervall, _this.accuracy, function () {
                _this.machineData.injectionUnit.fillingLevel.level += _this.machineData.injectionUnit.fillingLevel.maxLevel / _this.accuracy;
                if (_this.machineData.injectionUnit.position.x != undefined)
                    _this.machineData.injectionUnit.position.x += _this.machineData.injectionUnit.position.max / _this.accuracy;
            });
            // Savety Ruleset
            _this.machineData.injectionUnit.fillingLevel.level = _this.machineData.injectionUnit.fillingLevel.maxLevel;
            if (_this.machineData.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.unmountInjectionUnit); }, _this.timerIntervall);
        };
        this.injectMaterial = function (next) {
            _this.machineData.state = Machine_1.State.injectMaterial;
            if (_this.machineData.operation.power != true) {
                _this.machineData.state = Machine_1.State.none;
                return;
            }
            // Automate mounting Injection Unit
            _this.executeAction(_this.timerIntervall, _this.accuracy, function () {
                _this.machineData.injectionUnit.fillingLevel.level -= _this.machineData.injectionUnit.fillingLevel.maxLevel / _this.accuracy;
            });
            //Savety Ruleset
            _this.machineData.injectionUnit.fillingLevel.level = _this.machineData.injectionUnit.fillingLevel.minLevel;
            if (_this.machineData.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.wait); }, _this.timerIntervall);
        };
        this.unmountInjectionUnit = function (next) {
            _this.machineData.state = Machine_1.State.unmountInjectionUnit;
            if (_this.machineData.operation.power != true) {
                _this.machineData.state = Machine_1.State.none;
                return;
            }
            // Automate mounting Injection Unit
            _this.machineData.injectionUnit.position.x = _this.machineData.injectionUnit.position.max;
            _this.executeAction(_this.timerIntervall, _this.accuracy, function () {
                _this.machineData.injectionUnit.fillingLevel.level -= _this.machineData.injectionUnit.fillingLevel.maxLevel / _this.accuracy;
                if (_this.machineData.injectionUnit.position.x != undefined)
                    _this.machineData.injectionUnit.position.x -= _this.machineData.injectionUnit.position.max / _this.accuracy;
            });
            // Savety Ruleset
            _this.machineData.injectionUnit.fillingLevel.level = _this.machineData.injectionUnit.fillingLevel.minLevel;
            _this.machineData.injectionUnit.position.x = _this.machineData.injectionUnit.position.max;
            if (_this.machineData.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.openLockingUnit); }, _this.timerIntervall);
        };
        this.wait = function (next) {
            _this.machineData.state = Machine_1.State.wait;
            if (_this.machineData.operation.power != true) {
                _this.machineData.state = Machine_1.State.none;
                return;
            }
            _this.executeAction(_this.timerIntervall, _this.accuracy, function () { });
            if (_this.machineData.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.closeLockingUnit); }, _this.timerIntervall);
        };
        this.openLockingUnit = function (next) {
            _this.machineData.state = Machine_1.State.openLockingUnit;
            if (_this.machineData.operation.power != true) {
                _this.machineData.state = Machine_1.State.none;
                return;
            }
            // Automate closing locking unit
            _this.machineData.lockingUnit.position.x = _this.machineData.lockingUnit.position.max;
            _this.executeAction(_this.timerIntervall, _this.accuracy, function () {
                _this.machineData.lockingUnit.closingForce.force -= _this.machineData.lockingUnit.closingForce.maxForce / _this.accuracy;
                if (_this.machineData.lockingUnit.position.x != undefined)
                    _this.machineData.lockingUnit.position.x -= _this.machineData.lockingUnit.position.max / _this.accuracy;
            });
            // Savety Ruleset 
            _this.machineData.lockingUnit.closingForce.force = _this.machineData.lockingUnit.closingForce.minForce;
            _this.machineData.lockingUnit.position.x = _this.machineData.lockingUnit.position.min;
            if (_this.machineData.operation.operationMode == Machine_1.OperationMode.automatic)
                setTimeout(function () { next(_this.mountInjectionUnit); }, _this.timerIntervall);
        };
        this.executeAction = function (timerIntervall, accuracy, action) {
            var steps = Math.round(100 / accuracy);
            var i = 0;
            var intId = setInterval(function () {
                action();
                i++;
                if (i >= steps)
                    clearInterval(intId);
            }, _this.timerIntervall / _this.accuracy);
        };
        this.accuracy = 10;
        this.timerIntervall = 1000;
        this.id = uuidv4_1.uuid();
        this._machineData =
            {
                name: name,
                state: Machine_1.State.none,
                machineDetails: { model: "Allrounder", serialNumber: 123456, sparDistance: 500, maxClosingForce: 1000 },
                operation: { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, operationMode: Machine_1.OperationMode.semiAutomatic },
                injectionUnit: { position: { max: 500, min: 0, x: 500 }, fillingLevel: { level: 0, minLevel: 0, maxLevel: 100 }, windowLocked: true },
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
            case 'name':
                this.machineData.name = value;
                break;
            case 'operation.power':
                this.machineData.operation.power = value == 'true' ? true : false;
                break;
            case 'savetyDoor.locked':
                this.machineData.savetyDoor.locked = value == 'true' ? true : false;
                break;
            case 'operation.operationMode':
                if (value == 'automatic')
                    this.machineData.operation.operationMode = Machine_1.OperationMode.automatic;
                else if (value == 'semiautomatic')
                    this.machineData.operation.operationMode = Machine_1.OperationMode.semiAutomatic;
                else if (value == 'stopped')
                    this.machineData.operation.operationMode = Machine_1.OperationMode.stopped;
                break;
            default: console.log("Variable not found!");
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
        this.machineData.machineDetails = { model: "Allrounder", serialNumber: 123456, sparDistance: 500, maxClosingForce: 1000 };
        this.machineData.operation = { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, operationMode: Machine_1.OperationMode.semiAutomatic };
        this.machineData.injectionUnit = { position: { max: 500, min: 0, x: 500 }, fillingLevel: { level: 0, minLevel: 0, maxLevel: 100 }, windowLocked: true };
        this.machineData.savetyDoor = { position: { max: 500, min: 0, x: 500 }, locked: false };
        this.machineData.lockingUnit = { locked: false, position: { max: 500, min: 0, x: 500 }, closingForce: { force: 0, maxForce: 1000, minForce: 0 } };
        this.machineData.materialInfo = { temp: 0, material: "pp", pressure: { force: 0, maxForce: 1000, minForce: 0 } };
    };
    ;
    MachineInstance.prototype.setMachineMode = function (data) {
        if (data == Machine_1.OperationMode.automatic || data == Machine_1.OperationMode.semiAutomatic) {
            this.machineData.operation.operationMode = data;
        }
        else {
            Log_1.LogHandler.getLogInstance().log("error while setting machine mode");
        }
    };
    // Automated Workflow
    MachineInstance.prototype.startAutomatedWorkflow = function () {
        if (this.machineData.operation.operationMode == Machine_1.OperationMode.automatic && this.machineData.operation.power == true && this.machineData.savetyDoor.locked == true) {
            console.log("Workflow started!");
            this.closeLockingUnit(this.mountInjectionUnit);
        }
        else {
            if (this.machineData.operation.operationMode != Machine_1.OperationMode.automatic) {
                console.log("Worklow could not get started, Operation mode is nota automatic");
            }
            if (this.machineData.operation.power != true) {
                console.log("Worklow could not get started, Power off");
            }
            if (this.machineData.savetyDoor.locked != true) {
                console.log("Worklow could not get started, Machine Door is not locked");
            }
        }
    };
    MachineInstance.prototype.persistData = function () {
        var _this = this;
        setInterval(function () {
            Database_1.DatabaseHandler.getDbInstance().update(_this.id, _this);
        }, 1000);
    };
    return MachineInstance;
}());
exports.MachineInstance = MachineInstance;
