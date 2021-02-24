import axios from "axios";

export class Persitor{

    data: string = JSON.stringify([
        {name: "Machine 1", id:"789jf824j29f8j2", sensors: [{name: "sensor1", min: 8, max: 23, id: "235j2ioj235oi2j52i5j", topic: "/sakdj/topic",values: [{value: 5, date: "12345"},{value: 6, date: "1235"},{value: 8, date: "1236"} ]}], logs: ["log1", "[ERROR] An error occured while starting machine..."], es:"/test"}, 
        {name: "Machine 2", id:"789jf82asdasdasdj2", sensors: [], logs: ["[DEBUG] The System is starting up....", "[INFO] System started"], es: ""}
      ]);
    // data:string = "[]";

    fileWrite(index: string, data: string) {
        this.data = data;
        axios.post(`http://localhost:5002/set/${index}/`, data)
    }
      
    async fileRead(index: string): Promise<string> {
        const res = await axios.get(`http://localhost:5002/all`)
        return res.data;
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