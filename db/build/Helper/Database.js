"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHandler = exports.Database = void 0;
var node_json_db_1 = require("node-json-db");
var JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
var db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("db", true, false, '/'));
var Database = /** @class */ (function () {
    function Database() {
    }
    Database.prototype.set = function (key, data) {
        db.push("/" + key, data);
    };
    Database.prototype.update = function (key, data) {
        this.remove(key);
        this.set(key, data);
    };
    Database.prototype.get = function (key) {
        return db.getData("/" + key);
    };
    Database.prototype.getAll = function () {
        return db.getData("/");
    };
    Database.prototype.remove = function (key) {
        db.delete("/" + key);
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
