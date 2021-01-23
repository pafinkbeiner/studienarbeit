import { uuid } from "uuidv4";
import { DatabaseHandler } from "../Helper/Database";
import { Machine, State } from "../models/Machine";
import { MachineTemplate } from "../models/MachineTemplate";
import { MessageTemplates } from "../models/Status";
import client from "../Helper/mqtt";

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
        this.timerIntervall = 5000;
        this.id = uuid(); 

        this._machineData = 
            {
                name: name,
                state: State.none,
                machineDetails : { model: "Allrounder", serialNumber: 123456},
                operation : { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, automatic: false },
                injectionUnit : { position: { max: 500, min: 0, x: 500 }, fillingLevel: { level: 0, minLevel: 0, maxLevel: 100 }},
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
            /* machine Details */
            case 'machineDetails.model': this.machineData.machineDetails.model = value; break;
            case 'machineDetails.serialNumber': this.machineData.machineDetails.serialNumber = Number.parseInt( value ); break;
            /* Injection Unit */
            case 'injectionUnit.position.max': this.machineData.injectionUnit.position.max = Number.parseInt( value ); break;               
            case 'injectionUnit.position.min': this.machineData.injectionUnit.position.min = Number.parseInt( value ); break;
            case 'injectionUnit.position.x': this.machineData.injectionUnit.position.x = Number.parseInt( value ); break;
            case 'injectionUnit.fillingLevel.level': this.machineData.injectionUnit.fillingLevel.level =  Number.parseInt( value ); break;
            case 'injectionUnit.fillingLevel.minLevel': this.machineData.injectionUnit.fillingLevel.minLevel =  Number.parseInt( value ); break;
            case 'injectionUnit.fillingLevel.maxLevel': this.machineData.injectionUnit.fillingLevel.maxLevel =  Number.parseInt( value ); break;
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
        this.machineData.machineDetails = { model: "Allrounder", serialNumber: 123456};
        this.machineData.operation = { power: false, statusLED: { green: false, yellow: false, red: false, }, running: false, automatic: false };
        this.machineData.injectionUnit = { position: { max: 500, min: 0, x: 500 }, fillingLevel: { level: 0, minLevel: 0, maxLevel: 100 }};
        this.machineData.savetyDoor = { position: { max: 500, min: 0, x: 500 }, locked: false };
        this.machineData.lockingUnit = { locked: false, position: { max: 500, min: 0, x: 500 }, closingForce: {force: 0, maxForce: 1000, minForce: 0}};
        this.machineData.materialInfo = { temp: 0, material: "pp" , pressure: {force: 0, maxForce: 1000, minForce: 0}};
    };
    // Automated Workflow

    startAutomatedWorkflow() {

        //TEMP
        this.machineData.operation.automatic = true;
        this.machineData.operation.power = true;
        this.machineData.savetyDoor.locked = true;
        this.persistData();
        //END TEMP

        console.log("Workflow started!")
        this.closeLockingUnit(this.mountInjectionUnit);
    }

    closeLockingUnit = (next: Function) => {
        this.machineData.state = State.closeLockingUnit;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        // Automate closing locking unit
        this.machineData.lockingUnit.position.x = this.machineData.lockingUnit.position.min;

        this.executeAction(this.timerIntervall, this.accuracy, async() => {
            this.machineData.lockingUnit.closingForce.force += this.machineData.lockingUnit.closingForce.maxForce / this.accuracy;
            if(this.machineData.lockingUnit.position.x != undefined) this.machineData.lockingUnit.position.x += this.machineData.lockingUnit.position.max / this.accuracy;
            try{ 
                await client.publish(`machines/${this.id}/data/lockingUnit/closingForce/force`, JSON.stringify(this.machineData.lockingUnit.closingForce.force));
                await client.publish(`machines/${this.id}/data/lockingUnit/position/x`, JSON.stringify(this.machineData.lockingUnit.position.x));
            }catch(e){ console.log("Error while mqtt operation in state: ",this.machineData.state); }
        });

        // Savety Ruleset 
        this.machineData.lockingUnit.closingForce.force = this.machineData.lockingUnit.closingForce.maxForce;
        
        if(this.machineData.operation.automatic == true) setTimeout(() => { next(this.injectMaterial); }, this.timerIntervall);
    }

    mountInjectionUnit = (next: Function) => {
        this.machineData.state = State.mountInjectionUnit;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        // Automate mounting Injection Unit
        this.machineData.injectionUnit.position.x = this.machineData.injectionUnit.position.min;

        this.executeAction(this.timerIntervall, this.accuracy, async() => {
            this.machineData.injectionUnit.fillingLevel.level += this.machineData.injectionUnit.fillingLevel.maxLevel / this.accuracy;
            if(this.machineData.injectionUnit.position.x != undefined) this.machineData.injectionUnit.position.x += this.machineData.injectionUnit.position.max / this.accuracy;
            try{ 
                await client.publish(`machines/${this.id}/data/injectionUnit/fillingLevel/level`, JSON.stringify(this.machineData.injectionUnit.fillingLevel.level));
                await client.publish(`machines/${this.id}/data/injectionUnit/position/x`, JSON.stringify(this.machineData.injectionUnit.position.x));
            }catch(e){ console.log("Error while mqtt operation in state: ",this.machineData.state); }
        });

        // Savety Ruleset
        this.machineData.injectionUnit.fillingLevel.level = this.machineData.injectionUnit.fillingLevel.maxLevel;

        if(this.machineData.operation.automatic == true) setTimeout(() => { next(this.unmountInjectionUnit); }, this.timerIntervall);
    }

    injectMaterial = (next: Function) => {
        this.machineData.state = State.injectMaterial;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        // Automate mounting Injection Unit

        this.executeAction(this.timerIntervall, this.accuracy, async() => {
            this.machineData.injectionUnit.fillingLevel.level -= this.machineData.injectionUnit.fillingLevel.maxLevel / this.accuracy;
            try{ 
                await client.publish(`machines/${this.id}/data/injectionUnit/fillingLevel/level`, JSON.stringify(this.machineData.injectionUnit.fillingLevel.level));
            }catch(e){ console.log("Error while mqtt operation in state: ",this.machineData.state); }
        });

        //Savety Ruleset
        this.machineData.injectionUnit.fillingLevel.level = this.machineData.injectionUnit.fillingLevel.minLevel;

        if(this.machineData.operation.automatic == true) setTimeout(() => { next(this.wait);}, this.timerIntervall);
    }

    unmountInjectionUnit = (next: Function) => {
        this.machineData.state = State.unmountInjectionUnit;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        // Automate mounting Injection Unit
        this.machineData.injectionUnit.position.x = this.machineData.injectionUnit.position.max;

        this.executeAction(this.timerIntervall, this.accuracy, async() => {
            this.machineData.injectionUnit.fillingLevel.level -= this.machineData.injectionUnit.fillingLevel.maxLevel / this.accuracy;
            if(this.machineData.injectionUnit.position.x != undefined) this.machineData.injectionUnit.position.x -= this.machineData.injectionUnit.position.max / this.accuracy;
            try{ 
                await client.publish(`machines/${this.id}/data/injectionUnit/fillingLevel/level`, JSON.stringify(this.machineData.injectionUnit.fillingLevel.level));
                await client.publish(`machines/${this.id}/data/injectionUnit/position/x`, JSON.stringify(this.machineData.injectionUnit.position.x));
            }catch(e){ console.log("Error while mqtt operation in state: ",this.machineData.state); }
        });
    
        // Savety Ruleset
        this.machineData.injectionUnit.fillingLevel.level = this.machineData.injectionUnit.fillingLevel.minLevel;
        this.machineData.injectionUnit.position.x = this.machineData.injectionUnit.position.max;

        if(this.machineData.operation.automatic == true) setTimeout(() => { next(this.openLockingUnit);}, this.timerIntervall);
    }

    wait = (next: Function) => {
        this.persistData();
        this.machineData.state = State.wait;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        this.executeAction(this.timerIntervall, this.accuracy, () => {});

        if(this.machineData.operation.automatic == true) setTimeout(() => { next(this.closeLockingUnit);}, this.timerIntervall);
    }

    openLockingUnit = (next: Function) => {
        this.persistData();
        this.machineData.state = State.openLockingUnit;

        if(this.machineData.operation.power != true){
            this.machineData.state = State.none;
            return;
        }

        // Automate closing locking unit
        this.machineData.lockingUnit.position.x = this.machineData.lockingUnit.position.max;

        this.executeAction(this.timerIntervall, this.accuracy, async() => {
            this.machineData.lockingUnit.closingForce.force -= this.machineData.lockingUnit.closingForce.maxForce / this.accuracy;
            if(this.machineData.lockingUnit.position.x != undefined) this.machineData.lockingUnit.position.x -= this.machineData.lockingUnit.position.max / this.accuracy;
            try{ 
                await client.publish(`machines/${this.id}/data/lockingUnit/closingForce/level`, JSON.stringify(this.machineData.lockingUnit.closingForce.force));
                await client.publish(`machines/${this.id}/data/lockingUnit/position/x`, JSON.stringify(this.machineData.lockingUnit.position.x));
            }catch(e){ console.log("Error while mqtt operation in state: ",this.machineData.state); }
        });
    
        // Savety Ruleset 
        this.machineData.lockingUnit.closingForce.force = this.machineData.lockingUnit.closingForce.minForce;
        this.machineData.lockingUnit.position.x = this.machineData.lockingUnit.position.min;

        if(this.machineData.operation.automatic == true) setTimeout(() => { next(this.mountInjectionUnit);}, this.timerIntervall);
    }

    async persistData(){

        await DatabaseHandler.getDbInstance().update(this.id, this);

        //Publish data over MQTT
        //Path: monitoring/machines/{this.id}
        try{
            await client.publish(`machines/${this.id}/params`, JSON.stringify(this));
            console.log("Send machine data", this.id);
        }catch(e){
            console.log("Failed: ",e);
        }

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

    async log(msg: string){

        var logString: string = msg;

        if(msg.search('error') != -1 || msg.search('Error') != -1){
            logString = "[ERROR] "+logString;
        }
        if(msg.search('debug') != -1 || msg.search('Debug') != -1){
            logString = "[DEBUG] "+logString;
        }
        if(msg.search('info') != -1 || msg.search('Info') != -1){
            logString = "[INFO] "+logString;
        }

        logString = logString+" at: "+Date.now();

        try{
            await client.publish(`machines/${this.id}/logs`, JSON.stringify(logString));
        }catch(e){
            console.log("Failed sending log string: ",e);
        }

    }

}