import { DatabaseHandler } from "../Helper/Database";

export interface Status{
    success: boolean;
    msg: string;
    code?: number;
    addInfo?: string[];
}

export const successStatus: Status = {
    success: true,
    msg: "Operation was performed successfully!",
    code: 200
}

export const errorStatus: Status = {
    success: false,
    msg: "Operation was performed unsuccessfully!",
    code: 500
}