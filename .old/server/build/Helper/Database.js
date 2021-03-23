"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHandler = exports.Database = void 0;
var Database = /** @class */ (function () {
    function Database() {
        this.db = [];
    }
    Database.prototype.set = function (key, data) {
        this.db.push({ id: key, data: data });
    };
    Database.prototype.update = function (key, data) {
        if (this.db.find(function (item) { return item.id == key; })) {
            //Delete old one and store new one
            this.db.splice(this.db.findIndex(function (item) { return item.id == key; }));
            this.db.push({ id: key, data: data });
        }
    };
    Database.prototype.get = function (key) {
        return this.db.find(function (item) { return item.id == key; });
    };
    Database.prototype.getAll = function () {
        return this.db;
    };
    Database.prototype.remove = function (key) {
        this.db = this.db.filter(function (item) { return item.id != key; });
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
