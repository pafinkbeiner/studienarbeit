"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.OperationMode = void 0;
var OperationMode;
(function (OperationMode) {
    OperationMode[OperationMode["automatic"] = 0] = "automatic";
    OperationMode[OperationMode["semiAutomatic"] = 1] = "semiAutomatic";
    OperationMode[OperationMode["stopped"] = 2] = "stopped";
})(OperationMode = exports.OperationMode || (exports.OperationMode = {}));
var State;
(function (State) {
    State[State["none"] = 0] = "none";
    State[State["closeLockingUnit"] = 1] = "closeLockingUnit";
    State[State["mountInjectionUnit"] = 2] = "mountInjectionUnit";
    State[State["injectMaterial"] = 3] = "injectMaterial";
    State[State["unmountInjectionUnit"] = 4] = "unmountInjectionUnit";
    State[State["wait"] = 5] = "wait";
    State[State["openLockingUnit"] = 6] = "openLockingUnit";
})(State = exports.State || (exports.State = {}));
