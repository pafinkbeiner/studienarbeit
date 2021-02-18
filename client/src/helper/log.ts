import { AMachine } from "../models/Store";

export class Log{

    logs: Array<string> = [];

    add(log: string){
        this.logs.push(log);
    }
}

export class LogHandler{

    private static Log: Log;

    private constructor(){}

    public static getDbInstance(): Log{
        if(!LogHandler.Log){
            LogHandler.Log = new Log();
        }
        return LogHandler.Log;
    }
}