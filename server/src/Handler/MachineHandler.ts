import { createSubscribtions } from "../models/SubscribtionTemplate";

export let machineIds: string[] = [];

export let executeMachineChange = (buffer: Buffer) => {

    machineIds = JSON.parse(buffer.toString());

    // Setup mqtt subscribtions
    //createSubscribtions(machineIds);

}

