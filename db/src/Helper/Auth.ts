import { NextFunction, Request, Response } from "express";
import { errorStatus } from "../models/Status";
import { DatabaseHandler } from "./Database";
import * as jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response ,next: NextFunction){

    let bearer: any = req.headers["authorization"];

    if(bearer != undefined){

        const token = bearer.split(" ")[1];

        jwt.verify(token, "secret", (err:any, authData: any) => {

            if(err){
                res.json(errorStatus.msg="Verification was not successfull!");
            }else{
                next();
            }

        });

    }else{
        res.json(errorStatus.msg="Bearer token was not provided!")
    }

}