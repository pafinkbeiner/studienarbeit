import { Dispatch, SetStateAction } from "react";


// State
export interface AMachine{
    id: string;
    name: string;
    sensors: Sensor[];
    logs: string[];
    es: string;
    active?: boolean| undefined;
}

export interface Sensor{
    id: string;
    name: string;
    min: any;
    max: any;
    values: Array<{value: number, date: string}>;
    topic: string;
}

// Final Export
export interface StoreModel{
    machines: AMachine[];
    loading: boolean;
    setMachines: Dispatch<SetStateAction<AMachine[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    addMachine: (machine: AMachine) => void;
    removeMachine: (machineId: string) => void;
    addSensor: (machineId: string, sensor: Sensor) => void;
    removeSensor: (machineId: string, sensorId: string) => void;
    addEs: (machineId: string, es: string) => void;
    addLog: (machineId: string, log: string) => void;
    addSensorValue: (machineId: string, sensorId: string, value: string) => void;
    setMachineStatus: (machineId: string, active: boolean) => void;
}
