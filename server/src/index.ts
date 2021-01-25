import client from "./Helper/mqtt";
var mqttWildcard = require('mqtt-wildcard');
import dotenv from "dotenv"

// Import of Handler
import * as OperationHandler from "./MQTTHandler/OperationHandler"
import * as InjectionUnitHandler from "./MQTTHandler/InjectionUnitHandler"
import * as SavetyDoorHandler from "./MQTTHandler/SavetyDoorHandler"
import * as LockingUnithandler from "./MQTTHandler/LockingUnitHandler"
import * as MaterialInfoHandler from "./MQTTHandler/MaterialInfoHandler"
import * as LogFileHandler from "./MQTTHandler/LogFileHandler"
import * as MachineHandler from "./MQTTHandler/MachineHandler"

import express from 'express';
import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import { Subject } from 'rxjs';



dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer);

const machines: string[] = [];
const subject = new Subject<{ name: string, color: { red: number, green: number, blue: number }}>();

const PORT = process.env.PORT || 3000;

io.on('connection', (socket: Socket) => {

    console.log("Socket: ", socket);

    socket.emit('set machines', machines);
    
    socket.on('color change', colorInfo => {
        subject.next(colorInfo);
        socket.broadcast.emit('color change', colorInfo);
    });

});

httpServer.listen(3000, () => { "Server Listening on port"+ 3000 })

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
