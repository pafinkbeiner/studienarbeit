import { AMachine } from "../models/Store";

export class Database{

    machines: Array<AMachine> = [];

    set(machine: AMachine){
        this.machines.push(machine);
    }

    update(machine: AMachine){
        this.machines.splice(this.machines.findIndex(m => m.id == machine.id), 1, machine);
    }

    get(machineId: string): any{
        return this.machines.find(m => m.id == machineId);
    }

    getAll(){
        return this.machines;
    }

    remove(machineId: string){
        this.machines.splice(this.machines.findIndex(m => m.id == machineId), 1);
    }
}

export class DatabaseHandler{

    private static database: Database;

    private constructor(){}

    public static getDbInstance(): Database{
        if(!DatabaseHandler.database){
            DatabaseHandler.database = new Database();
        }
        return DatabaseHandler.database;
    }
}