

// State
export interface Machine{
    id: string;
    name: string;
    sensors: Sensor[];
}

export interface Sensor{
    name: string;
    min: any;
    max: any;
    value: any;
    pvalue: any;
    topic: string;
}

// Final Export
export interface StoreModel{
    machines: Machine[];
    alert: string;
    loading: boolean;
    addSensor: Action<StoreModel, {machineId: string, sensor: Sensor}>;
    addMachine: Action<StoreModel, Machine>;
}
