import {executeMachineChange} from "./Handler/MachineHandler";
import { power } from "./Handler/OperationHandler";
import client from "./Helper/mqtt";
var mqttWildcard = require('mqtt-wildcard');
import * as OperationHandler from "./Handler/OperationHandler"
import * as InjectionUnitHandler from "./Handler/InjectionUnitHandler"

// 
client.on('message', function (topic, message) {

    if(topic == "machines") executeMachineChange(message);

    // Machines
    if(mqttWildcard(topic,`machines/+/logs`) !== null) { console.log("Hey") }
    // State
    if(mqttWildcard(topic,`machines/+/data/state`) !== null) { console.log("Hey") } 
    // Operation
    if(mqttWildcard(topic,`machines/+/data/operation/power`) !== null) { OperationHandler.power(mqttWildcard(topic,`machines/+/data/operation/power`)); }
    if(mqttWildcard(topic,`machines/+/data/operation/statusLED/green`) !== null) { OperationHandler.statusLEDGreen(mqttWildcard(topic,`machines/+/data/operation/statusLED/green`)); }
    if(mqttWildcard(topic,`machines/+/data/operation/statusLED/yellow`) !== null) { OperationHandler.statusLEDYellow(mqttWildcard(topic,`machines/+/data/operation/statusLED/yellow`)); }
    if(mqttWildcard(topic,`machines/+/data/operation/statusLED/red`) !== null) { OperationHandler.statusLEDRed(mqttWildcard(topic,`machines/+/data/operation/statusLED/red`)); }
    if(mqttWildcard(topic,`machines/+/data/operation/running`) !== null) { OperationHandler.running(mqttWildcard(topic,`machines/+/data/operation/running`)); }
    if(mqttWildcard(topic,`machines/+/data/operation/automatic`) !== null) { OperationHandler.automatic(mqttWildcard(topic,`machines/+/data/operation/automatic`)); }
    // Injection Unit
    if(mqttWildcard(topic,`machines/+/data/injectionUnit/position/max`) !== null) { InjectionUnitHandler.positionMax(mqttWildcard(topic,`machines/+/data/injectionUnit/position/max`)); }
    if(mqttWildcard(topic,`machines/+/data/injectionUnit/position/min`) !== null) { InjectionUnitHandler.positionMin(mqttWildcard(topic,`machines/+/data/injectionUnit/position/min`)); }
    if(mqttWildcard(topic,`machines/+/data/injectionUnit/position/x`) !== null) { InjectionUnitHandler.positionX(mqttWildcard(topic,`machines/+/data/injectionUnit/position/x`)); }
    if(mqttWildcard(topic,`machines/+/data/injectionUnit/fillingLevel/level`) !== null) { InjectionUnitHandler.fillingLevelLevel(mqttWildcard(topic,`machines/+/data/injectionUnit/fillingLevel/level`)); }
    if(mqttWildcard(topic,`machines/+/data/injectionUnit/fillingLevel/minLevel`) !== null) { InjectionUnitHandler.fillingLevelMinLevel(mqttWildcard(topic,`machines/+/data/injectionUnit/fillingLevel/minLevel`)); }
    if(mqttWildcard(topic,`machines/+/data/injectionUnit/fillingLevel/maxLevel`) !== null) { InjectionUnitHandler.fillingLevelMaxLevel(mqttWildcard(topic,`machines/+/data/injectionUnit/fillingLevel/maxLevel`)); }
    // Savety Door 
    if(mqttWildcard(topic,`machines/+/data/savetyDoor/position/max`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/savetyDoor/position/min`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/savetyDoor/position/x`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/savetyDoor/locked`) !== null) { console.log("Hey") }
    // Locking Unit
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/position/max`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/position/min`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/position/x`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/locked`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/closingForce/maxForce`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/closingForce/minForce`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/lockingUnit/closingForce/force`) !== null) { console.log("Hey") }
    // Material Info
    if(mqttWildcard(topic,`machines/+/data/materialInfo/temp`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/materialInfo/material`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/materialInfo/pressure/maxForce`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/materialInfo/pressure/minForce`) !== null) { console.log("Hey") }
    if(mqttWildcard(topic,`machines/+/data/materialInfo/pressure/force`) !== null) { console.log("Hey") }

    console.log(`Topic: ${topic} und Message: ${message}`);

})
