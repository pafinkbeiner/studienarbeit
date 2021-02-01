
export let executeMachineChange = (buffer: Buffer) => {
    console.log(JSON.parse(buffer.toString()))
}

export let state = (machineId: string, message: Buffer) => {
    console.log("Machine Handler", machineId)
}
