import { Machine, OperationMode } from "./Machine";

export interface MachineTemplate{

    id: string;
    // Data
    machineData: Machine;
    // Should be a number between 0-100
    accuracy: number;
    // Intervall time for Machine actions
    timerIntervall: number;

    // Funktionen
    powerOn: Function;
    resetToDefault: Function;
    persistData: Function;
    checkConstraints: () => boolean;
    setMachineMode: (data: OperationMode) => any;

    //Automated Workflow
    closeLockingUnit: (next: Function) => any;
    mountInjectionUnit: (next: Function) => any;
    injectMaterial: (next: Function) => any;
    unmountInjectionUnit: (next: Function) => any;
    wait: (next: Function) => any;
    openLockingUnit: (next: Function) => any;
}