import { createSubscribtions } from "../models/SubscribtionTemplate";

let executeMachineChange = (buffer: Buffer) => {

    let machineIds: string[] = JSON.parse(buffer.toString());

    console.log(machineIds);

    // Setup mqtt subscribtions
    createSubscribtions(machineIds);

}

export default executeMachineChange;