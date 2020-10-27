"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSub = void 0;
var PubSub = /** @class */ (function () {
    function PubSub() {
    }
    PubSub.subscribe = function (eventName, func) {
        PubSub.events[eventName] = PubSub.events[eventName] || [];
        PubSub.events[eventName].push(func);
    };
    PubSub.unsubscribe = function (eventName, func) {
        if (PubSub.events[eventName]) {
            for (var i = 0; i < PubSub.events[eventName].length; i++) {
                if (PubSub.events[eventName][i] === func) {
                    PubSub.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    };
    PubSub.emit = function (eventName, data) {
        if (PubSub.events[eventName]) {
            PubSub.events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    };
    PubSub.events = {};
    return PubSub;
}());
exports.PubSub = PubSub;
