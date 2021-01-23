import * as express from "express";
import {DatabaseHandler } from "../Helper/Database";
import { MachineInstance } from "../Machines/MachineInstance";

const router = express.Router();

// Array with all machines
let machines: Array<MachineInstance> = [];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json(DatabaseHandler.getDbInstance().getAll())
});

router.get("/get/:machineId", (req, res, next) => {

    const machine: MachineInstance = DatabaseHandler.getDbInstance().get(req.params.machineId);
    if(machine != undefined){
        res.json(machine)
    }else{
        res.json("No machine found!");
    }

});

router.get("/new/:name", function(req, res, next){
  let machine: MachineInstance = new MachineInstance(req.params.name);
  machines.push(machine);
  res.json({id: machine.id});
});

router.get("/delete/:id", function(req, res, next){

    if(machines.find(item => item.id == req.params.id) != undefined){
        DatabaseHandler.getDbInstance().remove(req.params.id)
        machines = machines.filter(item => item.id != req.params.id);
        res.json("Successfully Deleted Machine with id: "+req.params.id);
    }else{
        res.json("No machine found!");
    }
});

router.get("/operation/:machineId/:name", function(req, res, next){

    const machine = machines.find(item => item.id == req.params.machineId);

    if(machine == undefined) res.json("Machine was not found.");

    switch (req.params.name) {
        case "startAutomatedWorkflow":  machine?.startAutomatedWorkflow(); break;
        case "powerOn":                 machine?.powerOn(); break;
        case "resetToDefault":          machine?.resetToDefault(); break;
        case "closeLockingUnit":        machine?.closeLockingUnit(machine?.mountInjectionUnit); break;
        case "mountInjectionUnit":      machine?.mountInjectionUnit(machine?.injectMaterial); break;
        case "injectMaterial":          machine?.injectMaterial(machine?.unmountInjectionUnit); break;
        case "unmountInjectionUnit":    machine?.unmountInjectionUnit(machine?.wait); break;
        case "wait":                    machine?.wait(machine?.openLockingUnit); break;
        case "openLockingUnit":         machine?.openLockingUnit(machine?.closeLockingUnit); break;

        default: res.json("Operation not found!"); break;
    }

    res.json("Operation: "+ req.params.name+ " started successfully.");

});

router.get("/variable/:machineId/:name/:newValue", function(req, res, next){

    const machine = machines.find(item => item.id == req.params.machineId);

    if(machine == undefined) res.json("Machine was not found.");

    // console.log(req.body)

    // const newState = req.body;

    if(machine != undefined){
        const result = machine?.changeState(req.params.name, req.params.newValue);
        res.json({ msg: "Variable change resulted in: "+result });
    }



    // if(newState == undefined) res.json("Machine state was not provided!");

    // if(newState != undefined && machine != undefined) DatabaseHandler.getDbInstance().update(machine.id, newState);



});

export default router;