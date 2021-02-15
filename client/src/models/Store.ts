import { Dispatch, SetStateAction } from "react";


// State
export interface AMachine{
    id: string;
    name: string;
    sensors: Sensor[];
}

export interface Sensor{
    id: string;
    name: string;
    min: any;
    max: any;
    value: any;
    pvalue: any;
    topic: string;
}

// Final Export
export interface StoreModel{
    machines: AMachine[];
    alert: string;
    loading: boolean;
    setMachines: Dispatch<SetStateAction<AMachine[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setAlert: Dispatch<SetStateAction<string>>;
    addMachine: (machine: AMachine) => void;
    removeMachine: (machineId: string) => void;
}
