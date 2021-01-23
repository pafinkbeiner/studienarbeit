export class Database{

    db: Array<{id: string, data: any}> = [];

    set(key:string, data: any){
        this.db.push({id: key, data: data});
    }

    update(key:string, data: any){
        if(this.db.find(item => item.id == key)){
            //Delete old one and store new one
            this.db.splice(this.db.findIndex(item => item.id == key));
            this.db.push({id: key, data: data});
        }
    }

    get(key: string): any{
        return this.db.find(item => item.id == key);
    }

    getAll(){
        return this.db;
    }

    remove(key: string){
        this.db = this.db.filter(item => item.id != key);
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