export class Log{

    logs: Array<string> = [];

    log(log: string){
        this.logs.push(log);
        console.log("LOG HANDLER: ",log)
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