"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplates = void 0;
var Log_1 = require("../Helper/Log");
var MessageTemplates = /** @class */ (function () {
    function MessageTemplates() {
    }
    Object.defineProperty(MessageTemplates, "successMessage", {
        get: function () {
            Log_1.LogHandler.getLogInstance().log(this._successMessage.msg);
            return this._successMessage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MessageTemplates, "failureMessage", {
        get: function () {
            Log_1.LogHandler.getLogInstance().log(this._successMessage.msg);
            return this._failureMesssage;
        },
        enumerable: false,
        configurable: true
    });
    MessageTemplates._successMessage = {
        success: true,
        msg: "Operation was performed successfully.",
        code: 200
    };
    MessageTemplates._failureMesssage = {
        success: true,
        msg: "Operation was performed unsuccessfully!.",
        code: 500
    };
    return MessageTemplates;
}());
exports.MessageTemplates = MessageTemplates;
