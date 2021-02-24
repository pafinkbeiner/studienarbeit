import { Role } from "./Role";

export interface User{
    username: string;
    mail: string;
    password: string;
    role: Role; 
}