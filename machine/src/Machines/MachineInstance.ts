import { uuid } from "uuidv4";
import { getHeapStatistics } from "v8";
import { DatabaseHandler } from "../Helper/Database";
import { LogHandler } from "../Helper/Log";
import { Machine, OperationMode, State } from "../models/Machine";
import { MachineTemplate } from "../models/MachineTemplate";
import { MessageTemplates } from "../models/Status";

export class MachineInstance implements MachineTemplate{

    id: string;
    private _machineData: Machine;
    accuracy: number;
    timerIntervall: number;
    
    get machineData(){
        return this._machineData;
    }
    set machineData(machine: Machine){
        this._machineData = machine;
        this.persistData();
    }

    constructor(name: string){
        this.accuracy = 10;
        this.timerIntervall = 1000;
        this.id = uuid(); 

        this._machineData = 
            {
                name: name,
                state: State.none,
                machineDetails : { model: "Allrounder", serialNumber: 123456, sparDistance: 500 , maxClosingForce: 1000},
                operation : { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, operationMode: OperationMode.semiAutomatic },
                injectionUnit : { position: { max: 500, min: 0, x: 500 }, fillingLevel: { level: 0, minLevel: 0, maxLevel: 100 }, windowLocked: true},
                savetyDoor : { position: { max: 500, min: 0, x: 500 }, locked: false },
                lockingUnit : { locked: false, position: { max: 500, min: 0, x: 500 }, closingForce: {force: 0, maxForce: 1000, minForce: 0}},
                materialInfo : { temp: 0, material: "pp" , pressure: {force: 0, maxForce: 1000, minForce: 0}},
            };

        // Persisting Data initially    
        DatabaseHandler.getDbInstance().set(this.id, this)
        this.persistData();
    }

    changeState(key: string, value: string){
        switch(key){
            /* Essentials */
            case 'name': this.machineData.name = value; break;
            case 'operation.power': this.machineData.operation.power = value == 'true' ? true : false; break;
            case 'savetyDoor.locked': this.machineData.savetyDoor.locked = value == 'true' ? true : false; break;
            case 'operation.operationMode': 
                if(value == 'automatic') this.machineData.operation.operationMode = OperationMode.automatic;
                else if(value == 'semiautomatic') this.machineData.operation.operationMode = OperationMode.semiAutomatic;
                else if(value == 'stopped') this.machineData.operation.operationMode = OperationMode.stopped;
            break;
            /* machine Details */
            case 'machineDetails.model': this.machineData.machineDetails.model = value; break;
            case 'machineDetails.serialNumber': this.machineData.machineDetails.serialNumber = Number.parseInt( value ); break;
            case 'machineDetails.sparDistance': this.machineData.machineDetails.sparDistance = Number.parseInt( value ); break;
            case 'machineDetails.maxClosingForce': this.machineData.machineDetails.maxClosingForce = Number.parseInt( value ) ;break;
            /* Injection Unit */
            case 'injectionUnit.position.max': this.machineData.injectionUnit.position.max = Number.parseInt( value ); break;               
            case 'injectionUnit.position.min': this.machineData.injectionUnit.position.min = Number.parseInt( value ); break;
            case 'injectionUnit.position.x': this.machineData.injectionUnit.position.x = Number.parseInt( value ); break;
            case 'injectionUnit.fillingLevel.level': this.machineData.injectionUnit.fillingLevel.level =  Number.parseInt( value ); break;
            case 'injectionUnit.fillingLevel.minLevel': this.machineData.injectionUnit.fillingLevel.minLevel =  Number.parseInt( value ); break;
            case 'injectionUnit.fillingLevel.maxLevel': this.machineData.injectionUnit.fillingLevel.maxLevel =  Number.parseInt( value ); break;
            case 'injectionUnit.windowLocked': this.machineData.injectionUnit.windowLocked = (value == "true") ? true : false ; break;
            /* Savety Door */
            case 'savetyDoor.position.max': this.machineData.savetyDoor.position.max = Number.parseInt(value); break;
            case 'savetyDoor.position.min': this.machineData.savetyDoor.position.min = Number.parseInt(value); break;
            case 'savetyDoor.position.x': this.machineData.savetyDoor.position.x = Number.parseInt(value); break;
            case 'savetyDoor.locked': this.machineData.savetyDoor.locked = (value == "true") ? true : false; break;
            /* Locking Unit */
            case 'lockingUnit.position.max': this.machineData.lockingUnit.position.max = Number.parseInt(value); break;
            case 'lockingUnit.position.min': this.machineData.lockingUnit.position.max = Number.parseInt(value); break;
            case 'lockingUnit.position.x': this.machineData.lockingUnit.position.max = Number.parseInt(value); break;
            case 'lockingUnit.locked': this.machineData.lockingUnit.locked = (value == "true") ? true : false ; break;
            case 'lockingUnit.closingForce.maxForce': this.machineData.lockingUnit.closingForce.maxForce = Number.parseInt(value); break;
            case 'lockingUnit.closingForce.minForce': this.machineData.lockingUnit.closingForce.minForce = Number.parseInt(value); break;
            case 'lockingUnit.closingForce.force': this.machineData.lockingUnit.closingForce.force = Number.parseInt(value); break;
            /* Material Info */
            case 'materialInfo.temp': this.machineData.materialInfo.temp = Number.parseInt(value); break;
            case 'materialInfo.material': this.machineData.materialInfo.material = value; break;
            case 'materialInfo.pressure.maxForce': this.machineData.materialInfo.pressure.maxForce = Number.parseInt(value); break;
            case 'materialInfo.pressure.minForce': this.machineData.materialInfo.pressure.minForce = Number.parseInt(value); break;
            case 'materialInfo.pressure.force': this.machineData.materialInfo.pressure.force = Number.parseInt(value); break;

            default: return "Variable could not get found!";
        }

    }

    // Function to check if the value change of property machineData is valid
    checkConstraints(){
        return true;
    }

    powerOn() {
        this.machineData.operation.power = true;
        this.machineData.operation.statusLED.red = true;
    };

    resetToDefault() {
        this.machineData.state = State.none;
        this.machineData.machineDetails = { model: "Allrounder", serialNumber: 123456, sparDistance: 500 , maxClosingForce: 1000};
        this.machineData.operation = { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, operationMode: OperationMode.semiAutomatic };
        this.machineData.injectionUnit = { position: { max: 500, min: 0, x: 500 }, fillingLevel: { level: 0, minLevel: 0, maxLevel: 100 }, windowLocked: true};
        this.machineData.savetyDoor = { position: { max: 500, min: 0, x: 500 }, locked: false };
        this.machineData.lockingUnit = { locked: false, position: { max: 500, min: 0, x: 500 }, closingForce: {force: 0, maxForce: 1000, minForce: 0}};
        this.machineData.materialInfo = { temp: 0, material: "pp" , pressure: {force: 0, maxForce: 1000, minForce: 0}};
    };

    setMachineMode(data: OperationMode) {
        if (data == OperationMode.automatic || data == OperationMode.semiAutomatic) {
            this.machineData.operation.operationMode = data;
        } else {
            LogHandler.getLogInstance().log("error while setting machine mode");
        }
    }

    // Automated Workflow

    startAutomatedWorkflow() {

        //TEMP
        this.machineData.operation.operationMode = OperationMode.automatic;
        this.machineData.operation.power = true;
        this.machineData.savetyDoor.locked = true;
        this.persistData();
        //END TEMP

        if (this.machineData.operation.operationMode == OperationMode.automatic && this.machineData.operation.power == true && this.machineData.savetyDoor.locked == true) {
            console.log("Workflow started!");
            this.closeLockingUnit(this.mountInjectionUnit);
        } else {
            if(this.machineData.operation.operationMode != OperationMode.automatic) console.log("Worklow could not get started, Operation mode is not automatic");
            if(this.machineData.operation.power != true) console.log("Worklow could not get started, Power off");
            if(this.machineData.savetyDoor.locked != true) console.log("Worklow could not get started, Machine Door is not locked");
        }
    }

    closeLockingUnit = (next: Function) => {
        this.machineData.state = State.closeLockingUnit;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return MessageTemplates.failureMessage.msg = "Machine is not powered on";
        }

        // TODO add additional conditions

        // Automate closing locking unit
        this.machineData.lockingUnit.position.x = this.machineData.lockingUnit.position.min;

        this.executeAction(this.timerIntervall, this.accuracy, () => {
            this.machineData.lockingUnit.closingForce.force += this.machineData.lockingUnit.closingForce.maxForce / this.accuracy;
            if(this.machineData.lockingUnit.position.x != undefined) this.machineData.lockingUnit.position.x += this.machineData.lockingUnit.position.max / this.accuracy;
        });

        // Savety Ruleset 
        this.machineData.lockingUnit.closingForce.force = this.machineData.lockingUnit.closingForce.maxForce;
        
        if(this.machineData.operation.operationMode == OperationMode.automatic) setTimeout(() => { next(this.injectMaterial); }, this.timerIntervall);
    }

    mountInjectionUnit = (next: Function) => {
        this.machineData.state = State.mountInjectionUnit;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        // Automate mounting Injection Unit
        this.machineData.injectionUnit.position.x = this.machineData.injectionUnit.position.min;

        this.executeAction(this.timerIntervall, this.accuracy, () => {
            this.machineData.injectionUnit.fillingLevel.level += this.machineData.injectionUnit.fillingLevel.maxLevel / this.accuracy;
            if(this.machineData.injectionUnit.position.x != undefined) this.machineData.injectionUnit.position.x += this.machineData.injectionUnit.position.max / this.accuracy;
        });

        // Savety Ruleset
        this.machineData.injectionUnit.fillingLevel.level = this.machineData.injectionUnit.fillingLevel.maxLevel;

        if(this.machineData.operation.operationMode == OperationMode.automatic) setTimeout(() => { next(this.unmountInjectionUnit); }, this.timerIntervall);
    }

    injectMaterial = (next: Function) => {
        this.machineData.state = State.injectMaterial;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        // Automate mounting Injection Unit

        this.executeAction(this.timerIntervall, this.accuracy, () => {
            this.machineData.injectionUnit.fillingLevel.level -= this.machineData.injectionUnit.fillingLevel.maxLevel / this.accuracy;
        });

        //Savety Ruleset
        this.machineData.injectionUnit.fillingLevel.level = this.machineData.injectionUnit.fillingLevel.minLevel;

        if(this.machineData.operation.operationMode == OperationMode.automatic) setTimeout(() => { next(this.wait);}, this.timerIntervall);
    }

    unmountInjectionUnit = (next: Function) => {
        this.machineData.state = State.unmountInjectionUnit;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        // Automate mounting Injection Unit
        this.machineData.injectionUnit.position.x = this.machineData.injectionUnit.position.max;

        this.executeAction(this.timerIntervall, this.accuracy, () => {
            this.machineData.injectionUnit.fillingLevel.level -= this.machineData.injectionUnit.fillingLevel.maxLevel / this.accuracy;
            if(this.machineData.injectionUnit.position.x != undefined) this.machineData.injectionUnit.position.x -= this.machineData.injectionUnit.position.max / this.accuracy;
        });
    
        // Savety Ruleset
        this.machineData.injectionUnit.fillingLevel.level = this.machineData.injectionUnit.fillingLevel.minLevel;
        this.machineData.injectionUnit.position.x = this.machineData.injectionUnit.position.max;

        if(this.machineData.operation.operationMode == OperationMode.automatic) setTimeout(() => { next(this.openLockingUnit);}, this.timerIntervall);
    }

    wait = (next: Function) => {
        this.machineData.state = State.wait;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        this.executeAction(this.timerIntervall, this.accuracy, () => {});

        if(this.machineData.operation.operationMode == OperationMode.automatic) setTimeout(() => { next(this.closeLockingUnit);}, this.timerIntervall);
    }

    openLockingUnit = (next: Function) => {
        this.machineData.state = State.openLockingUnit;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        // Automate closing locking unit
        this.machineData.lockingUnit.position.x = this.machineData.lockingUnit.position.max;

        this.executeAction(this.timerIntervall, this.accuracy, () => {
            this.machineData.lockingUnit.closingForce.force -= this.machineData.lockingUnit.closingForce.maxForce / this.accuracy;
            if(this.machineData.lockingUnit.position.x != undefined) this.machineData.lockingUnit.position.x -= this.machineData.lockingUnit.position.max / this.accuracy;
        });
    
        // Savety Ruleset 
        this.machineData.lockingUnit.closingForce.force = this.machineData.lockingUnit.closingForce.minForce;
        this.machineData.lockingUnit.position.x = this.machineData.lockingUnit.position.min;

        if(this.machineData.operation.operationMode == OperationMode.automatic) setTimeout(() => { next(this.mountInjectionUnit);}, this.timerIntervall);
    }

    persistData(){

        DatabaseHandler.getDbInstance().update(this.id, this);

        //Publish data over MQTT
        //Path: monitoring/machines/{this.id}

    }

    executeAction = (timerIntervall: number, accuracy: number, action: (...args: any[]) => void ) => {

        var steps: number = Math.round(100 / accuracy); 
        var i = 0;

        var intId = setInterval(() => {
            action();
            i++;
            if(i >= steps) clearInterval(intId);
        }, this.timerIntervall/this.accuracy);

    }

}