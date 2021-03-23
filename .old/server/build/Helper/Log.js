"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogHandler = exports.Log = void 0;
var Log = /** @class */ (function () {
    function Log() {
        this._logs = [];
    }
    Object.defineProperty(Log.prototype, "logs", {
        get: function () {
            return this._logs;
        },
        set: function (v) {
            this._logs = v;
        },
        enumerable: false,
        configurable: true
    });
    Log.prototype.log = function (msg, obj) {
        var logString = msg;
        if (msg.search('error') != -1 || msg.search('Error') != -1) {
            logString = "[ERROR] " + logString;
        }
        if (msg.search('debug') != -1 || msg.search('Debug') != -1) {
            logString = "[DEBUG] " + logString;
        }
        if (msg.search('info') != -1 || msg.search('Info') != -1) {
            logString = "[INFO] " + logString;
        }
        logString = logString + " at: " + Date.now();
        if (obj != undefined) {
            console.log(logString, obj);
        }
        else {
            console.log(logString);
        }
        // Persist log files
        this.logs.push(logString + "\n");
    };
    Log.prototype.getAll = function () {
        return this.logs;
    };
    return Log;
}());
exports.Log = Log;
var LogHandler = /** @class */ (function () {
    function LogHandler() {
    }
    LogHandler.getLogInstance = function () {
        if (!LogHandler.Log) {
            LogHandler.Log = new Log();
        }
        return LogHandler.Log;
    };
    return LogHandler;
}());
exports.LogHandler = LogHandler;
