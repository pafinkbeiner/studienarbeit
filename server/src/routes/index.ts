import * as express from "express";
import {DatabaseHandler } from "../Helper/Database";
import { LogHandler } from "../Helper/Log";
import { MachineInstance } from "../Machines/MachineInstance";
import { OperationMode } from "../models/Machine";

const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json(DatabaseHandler.getDbInstance().getAll())
});

router.get("/info", (req, res, next) => {
  res.json([
    {
      route: "/",
      name: "Standard Route",
      function: "Returns the whole information from the database."
    },
    {
      route: "/logs",
      name: "Log File Route",
      function: "Return the whole collection of log files."
    },
    {
      route: "/machines",
      name: "Machine Route",
      function: "Make Requests to the Machines."
    }
  ]);
});

export default router;