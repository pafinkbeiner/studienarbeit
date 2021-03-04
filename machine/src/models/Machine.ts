export interface Machine{
    name: string;
    state: State;
    // Maschinen Details
    machineDetails: {
        model: string; 
        serialNumber: number;
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
        automatic: boolean;
        oil: Level;
    },    
    // Spritzeinheit
    injectionUnit: {
        position: Position;
        fillingLevel: Level;
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
    min: number;
    max:number;
}

export interface Level{
    level: number;
    maxLevel: number;
    minLevel: number;
}

export interface Force{
    force: number;
    maxForce: number;
    minForce: number;
}