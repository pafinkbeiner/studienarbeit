import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
 
// The second argument is used to tell the DB to save after each push
// If you put false, you'll have to call the save() method.
// The third argument is to ask JsonDB to save the database in an human readable format. (default false)
// The last argument is the separator. By default it's slash (/)
var db = new JsonDB(new Config("db", true, false, '/'));


export class Database{

    set(key:string, data: any){
        db.push(`/${key}`,data);
    }

    update(key:string, data: any){
        this.remove(key);
        this.set(key, data);
    }

    get(key: string): any{
        return db.getData(`/${key}`);
    }

    getAll(){
        return db.getData(`/`);
    }

    remove(key: string){
        db.delete(`/${key}`);
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