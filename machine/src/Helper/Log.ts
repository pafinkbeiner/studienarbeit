
export class Log{

    private _logs: Array<string> = [];
    
    public get logs() : string[] {
        return this._logs;
    }
    
    public set logs(v : string[]) {
        this._logs = v;
    }

    public log(msg: string, obj?: object){

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
        
        if(obj != undefined){
            console.log(logString, obj);
        }else{
            console.log(logString);
        }
        // Persist log files
        this.logs.push(logString+"\n");
    }

    public getAll(){
        return this.logs;
    }

}

export class LogHandler{

    private static Log: Log;

    private constructor(){}

    public static getLogInstance(): Log{
        if(!LogHandler.Log){
            LogHandler.Log = new Log();
        }
        return LogHandler.Log;
    }
}