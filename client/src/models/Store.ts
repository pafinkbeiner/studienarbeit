import { State } from 'zustand';

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
export interface StoreModel extends State{
    machines: Machine[];
    alert: string;
    loading: boolean;
    addSensor: (payload: {machineId: string, sensor: Sensor}) => void;
    addMachine: (machine: Machine) => void;
}
