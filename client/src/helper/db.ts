import { AMachine } from "../models/Store";
import { Persitor, PersitorHandler } from "./machinePersistor";

export class Database{

    persistor = PersitorHandler.getPersistorInstance();
    machines: Array<AMachine> = [];

    async override(machines: AMachine[]){
        this.machines = machines; 
        this.persistor.fileWrite(this.machines);
    }

    push(machine: AMachine){
        this.machines.push(machine);
        this.persistor.fileWrite(this.machines);
    }

    update(machine: AMachine){
        this.machines.splice(this.machines.findIndex(m => m.id == machine.id), 1, machine);
        this.persistor.fileWrite(this.machines);
    }

    get(machineId: string): AMachine | undefined{
        return this.machines.find(m => m.id == machineId);
    }

    getAll(){
        return this.machines;
    }

    remove(machineId: string){
        if(machineId === "*"){
            this.machines = [];
        }else{
            this.machines = this.machines.splice(this.machines.findIndex(m => m.id == machineId), 1);
        }
        this.persistor.fileWrite(this.machines);
    }
}

export class DatabaseHandler{

    private static database: Database;

    private constructor(){}

    public static getDbInstance(): Database{
        if(!DatabaseHandler.database){
            DatabaseHandler.database = new Database();
            /* Load content into database.machines */
            PersitorHandler.getPersistorInstance().fileRead().then(data => {
                DatabaseHandler.database.machines = data;
            })
        }
        return DatabaseHandler.database;
    }
}