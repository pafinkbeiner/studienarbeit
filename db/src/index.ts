import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import indexRouter from "./routes/index"
const createError = require("http-errors");
const cors = require('cors')


// initialize configuration
dotenv.config();

const app = express();

app.use(cors())

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = normalizePort(process.env.SERVER_PORT || 5002);

// Configure Express to parse JSON
app.use( express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure Express to serve static files in the public folder
app.use( express.static( path.join( __dirname, "public" ) ) );

// Configure routes
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({error: err});
  });

// start the express server
app.listen( port, () => {
	// tslint:disable-next-line:no-console
	console.log( `DB started at http://localhost:${ port }` );
} );

app.on("error", onError);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
	const port = parseInt(val, 10);

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

function onError(error: any) {

	console.error("Error");

}