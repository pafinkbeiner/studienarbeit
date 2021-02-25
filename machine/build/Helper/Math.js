"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.speedMathFunc = exports.tempMathFunc = void 0;
/**
 * Max Temp [0-100] -> [0-50]
 * @param x
 */
function tempMathFunc(x) {
    return (-(1 / 50) * (x - 50) ^ 2 + 50);
}
exports.tempMathFunc = tempMathFunc;
/**
 * Max Speed [0-100] -> [0-50]
 * @param x
 */
function speedMathFunc(x) {
    return (-(1 / 50) * (x - 50) ^ 2 + 50);
}
exports.speedMathFunc = speedMathFunc;
