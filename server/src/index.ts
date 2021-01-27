// General
import dotenv from "dotenv"

// MQTT
import client from "./Helper/mqtt";
var mqttWildcard = require('mqtt-wildcard');

// Websockets
import io from "./Helper/ws"
import { Socket } from "socket.io";
import { Subject } from "rxjs";

// Import of MQTT Handler
import * as OperationHandler from "./MQTTHandler/OperationHandler"
import * as InjectionUnitHandler from "./MQTTHandler/InjectionUnitHandler"
import * as SavetyDoorHandler from "./MQTTHandler/SavetyDoorHandler"
import * as LockingUnithandler from "./MQTTHandler/LockingUnitHandler"
import * as MaterialInfoHandler from "./MQTTHandler/MaterialInfoHandler"
import * as LogFileHandler from "./MQTTHandler/LogFileHandler"
import * as MachineHandler from "./MQTTHandler/MachineHandler"

// Setup Enviroment Variables
dotenv.config();

export const subject = new Subject<number>()

io.on('connection', (socket: Socket) => {

    console.log(`Client with IP: ${socket.conn.remoteAddress} connected successfully to the ws Server!`);

    // setInterval( () => { socket.emit('machineRes', { test: "test" }); }, 8000 )

    subject.asObservable().subscribe(data => {
        socket.emit("machineRes",JSON.stringify(data));
    });


    socket.on('machine', machineId => {
        console.log("Change");
        socket.emit('machineRes', machineId);
    });
    
    socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    
});




client.on('message', function (topic, message) {

    // Machines
    if(topic == "machines") MachineHandler.executeMachineChange(message);
    // Logs
    if(mqttWildcard(topic,`machines/+/logs`) !== null) { LogFileHandler.logs(mqttWildcard(topic,`machines/+/logs`), message) }
    // State
    if(mqttWildcard(topic,`machines/+/data/state`) !== null) { MachineHandler.state(mqttWildcard(topic,`machines/+/data/state`), message) } 
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
