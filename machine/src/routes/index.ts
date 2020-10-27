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

// router.get("/new/:id", function(req, res, next){
//   let machine: MachineInstance = new MachineInstance(req.params.id || "Machine");
//   machine.machineData.savetyDoor.locked = true;
//   machine.powerOn();
//   machine.setMachineMode(OperationMode.automatic);
//   res.send(machine.startAutomatedWorkflow());
// });

router.get("/info", (req, res, next) => {
  res.json([
    {
      route: "/",
      name: "Standard Route",
      function: "Returns the whole information from the database."
    },
    {
      route: "/new/:id",
      name: "New Machine Route",
      function: "Creates a new Machine with the specified name."
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