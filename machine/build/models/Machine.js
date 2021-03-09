"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
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
