"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("./routes/index"));
var createError = require("http-errors");
var cors = require('cors');
// initialize configuration
dotenv_1.default.config();
var app = express_1.default();
app.use(cors());
// port is now available to the Node.js runtime
// as if it were an environment variable
var port = normalizePort(process.env.SERVER_PORT || 5002);
// Configure Express to parse JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
// Configure Express to serve static files in the public folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Configure routes
app.use("/", index_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) { return next(createError(404)); });
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});
// start the express server
app.listen(port, function () {
    // tslint:disable-next-line:no-console
    console.log("DB started at http://localhost:" + port);
});
app.on("error", onError);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    console.error("Error");
}
