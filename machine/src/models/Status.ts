import { DatabaseHandler } from "../Helper/Database";
import { LogHandler } from "../Helper/Log";

export interface Status{
    success: boolean;
    msg: string;
    code?: number;
    addInfo?: string[];
}

export class MessageTemplates{

    private static _successMessage: Status = {
        success: true,
        msg: "Operation was performed successfully.",
        code: 200
    }

    private static _failureMesssage: Status = {
        success: true,
        msg: "Operation was performed unsuccessfully!.",
        code: 500
    }

    
    public static get successMessage() : Status {
        LogHandler.getLogInstance().log(this._successMessage.msg);
        return this._successMessage; 
    }

    public static get failureMessage(): Status{
        LogHandler.getLogInstance().log(this._successMessage.msg);
        return this._failureMesssage;
    }
    
}