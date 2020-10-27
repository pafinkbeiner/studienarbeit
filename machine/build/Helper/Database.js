"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHandler = exports.Database = void 0;
var Database = /** @class */ (function () {
    function Database() {
        this.db = {};
    }
    Database.prototype.set = function (key, data) {
        this.db[key] = data;
    };
    Database.prototype.get = function (key) {
        return this.db[key];
    };
    Database.prototype.getAll = function () {
        return this.db;
    };
    return Database;
}());
exports.Database = Database;
var DatabaseHandler = /** @class */ (function () {
    function DatabaseHandler() {
    }
    DatabaseHandler.getDbInstance = function () {
        if (!DatabaseHandler.database) {
            DatabaseHandler.database = new Database();
        }
        return DatabaseHandler.database;
    };
    return DatabaseHandler;
}());
exports.DatabaseHandler = DatabaseHandler;
