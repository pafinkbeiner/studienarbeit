import * as express from "express";
import {DatabaseHandler } from "../Helper/Database";
import { MachineInstance } from "../Machines/MachineInstance";

const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.sendFile("index.html")
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