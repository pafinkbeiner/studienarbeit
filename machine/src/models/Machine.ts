export interface Machine{
    name: string;
    state: State;
    // Maschinen Details
    machineDetails: {
        model: string; 
        serialNumber: number;
        sparDistance: number;
        maxClosingForce: number;
    },
    // Allgemein
    operation: {
        power: boolean;
        statusLED: {
            green: boolean;
            yellow: boolean;
            red: boolean;
        },
        running: boolean;
        operationMode: OperationMode
    },    
    // Spritzeinheit
    injectionUnit: {
        position: Position;
        fillingLevel: Level;
        windowLocked: boolean;
    },
    // Sicherheitstüre
    savetyDoor: {
        position: Position;
        locked: boolean;
    },
    // Schließeinheit
    lockingUnit: {
        locked: boolean;
        position: Position
        closingForce: Force;
    },
    // Material Informationen
    materialInfo :{
        temp: Number,
        material: string;
        pressure: Force;
    }
}

export enum OperationMode{
    automatic,
    semiAutomatic,
    stopped
}

export enum State{
    none, 
    closeLockingUnit,
    mountInjectionUnit,
    injectMaterial,
    unmountInjectionUnit,
    wait, 
    openLockingUnit
}

export interface Position{
    x?: number;
    y?: number;
    z?: number;
    min: 0;
    max:number;
}

export interface Level{
    level: number;
    maxLevel: 100;
    minLevel: 0;
}

export interface Force{
    force: number;
    maxForce: number;
    minForce: 0;
}