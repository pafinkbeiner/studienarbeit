import { subject } from ".."

export let positionX = (machineId: string, message: Buffer) => {
    console.log("InjectionUnit Handler", machineId)
}

export let fillingLevelLevel = (machineId: string, message: Buffer) => {
    subject.next(Number.parseInt(message.toString()));
    console.log("InjectionUnit Handler", machineId)
}

