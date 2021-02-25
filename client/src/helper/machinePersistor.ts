import axios from "axios";
import { AMachine } from "../models/Store";

export class Persitor{

    fileWrite(data: any) {
        axios.post(`http://localhost:5002/set/machines`, data)
    }
      
    async fileRead(): Promise<AMachine[]> {
        const res = await axios.get(`http://localhost:5002/get/machines`)
        console.log("Result from db: ", res.data);
        if(Object.keys.length < 1){
            axios.post("http://localhost:5002/set/machines", []);
            return [];
        }else{
            return res.data;
        }
    }
}

export class PersitorHandler{

    private static Persitor: Persitor;

    private constructor(){}

    public static getPersistorInstance(): Persitor{
        if(!PersitorHandler.Persitor){
            PersitorHandler.Persitor = new Persitor();
        }
        return PersitorHandler.Persitor;
    }
}