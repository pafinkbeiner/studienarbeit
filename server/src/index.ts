import {executeMachineChange} from "./Handler/MachineHandler";
import { power } from "./Handler/OperationHandler";
import client from "./Helper/mqtt";
var mqttWildcard = require('mqtt-wildcard');
import * as OperationHandler from "./Handler/OperationHandler"
import * as InjectionUnitHandler from "./Handler/InjectionUnitHandler"
import * as SavetyDoorHandler from "./Handler/SavetyDoorHandler"
import * as LockingUnithandler from "./Handler/LockingUnithandler"
import * as MaterialInfoHandler from "./Handler/MaterialInfoHandler"
import * as LogFileHandler from "./Handler/LogFileHandler"

// 
client.on('message', function (topic, message) {

    if(topic == "machines") executeMachineChange(message);

    // Machines
    if(mqttWildcard(topic,`machines/+/logs`) !== null) { console.log("Hey") }
    // State
    if(mqttWildcard(topic,`machines/+/data/state`) !== null) { console.log("Hey") } 
    // Operation
    if(mqttWildcard(topic,`machines/+/data/operation/power`) !== null) { OperationHandler.power(mqttWildcard(topic,`machines/+/data/operation/power`), message); }
    if(mqttWildcard(topic,`machines/+/data/operation/statusLED/green`) !== null) { OperationHandler.statusLEDGreen(mqttWildcard(topic,`machines/+/data/operation/statusLED/green`), message); }
    if(mqttWildcard(topic,`machines/+/data/operation/statusLED/yellow`) !== null) { OperationHandler.statusLEDYellow(mqttWildcard(topic,`machines/+/data/operation/statusLED/yellow`), message); }
    if(mqttWildcard(topic,`machines/+/data/operation/statusLED/red`) !== null) { OperationHandler.statusLEDRed(mqttWildcard(topic,`machines/+/data/operation/statusLED/red`), message); }
    if(mqttWildcard(topic,`machines/+/data/operation/running`) !== null) { OperationHandler.running(mqttWildcard(topic,`machines/+/data/operation/running`), message); }
    if(mqttWildcard(topic,`machines/+/data/operation/automatic`) !== null) { OperationHandler.automatic(mqttWildcard(topic,`machines/+/data/operation/automatic`), message); }
    // Injection Unit
    if(mqttWildcard(topic,`machines/+/data/injectionUnit/position/x`) !== null) { InjectionUnitHandler.positionX(mqttWildcard(topic,`machines/+/data/injectionUnit/position/x`), message); }
    if(mqttWildcard(topic,`machines/+/data/injectionUnit/fillingLevel/level`) !== null) { InjectionUnitHandler.fillingLevelLevel(mqttWildcard(topic,`machines/+/data/injectionUnit/fillingLevel/level`), message); }
    // Savety Door 
    if(mqttWildcard(topic,`machines/+/data/savetyDoor/position/x`) !== null) { SavetyDoorHandler.positionX(mqttWildcard(topic,`machines/+/data/savetyDoor/position/x`), message); }
    if(mqttWildcard(topic,`machines/+/data/savetyDoor/locked`) !== null) { SavetyDoorHandler.locked(mqttWildcard(topic,`machines/+/data/savetyDoor/locked`), message); }
    // Locking Unit
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/position/x`) !== null) { LockingUnithandler.positionX(mqttWildcard(topic,`machines/+/data/lockingUnit/position/x`), message); }
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/locked`) !== null) { LockingUnithandler.locked(mqttWildcard(topic,`machines/+/data/lockingUnit/locked`), message); }
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/closingForce/force`) !== null) { LockingUnithandler.closingForceForce(mqttWildcard(topic,`machines/+/data/lockingUnit/closingForce/force`), message); }
    // Material Info
    if(mqttWildcard(topic,`machines/+/data/materialInfo/temp`) !== null) { MaterialInfoHandler.temp(mqttWildcard(topic,`machines/+/data/materialInfo/temp`), message); }
    if(mqttWildcard(topic,`machines/+/data/materialInfo/material`) !== null) { MaterialInfoHandler.material(mqttWildcard(topic,`machines/+/data/materialInfo/material`), message); }
    if(mqttWildcard(topic,`machines/+/data/materialInfo/pressure/force`) !== null) { MaterialInfoHandler.pressureForce(mqttWildcard(topic,`machines/+/data/materialInfo/pressure/force`), message); }

    //console.log(`Topic: ${topic} und Message: ${message}`);

})
