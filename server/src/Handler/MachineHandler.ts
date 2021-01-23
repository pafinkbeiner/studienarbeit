import { createSubscribtions } from "../models/SubscribtionTemplate";

export let machineIds: string[] = [];

export let executeMachineChange = (buffer: Buffer) => {

    machineIds = JSON.parse(buffer.toString());

    console.log(machineIds);

    // Setup mqtt subscribtions
    createSubscribtions(machineIds);

}

