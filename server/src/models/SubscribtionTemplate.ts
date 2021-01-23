import client from "../Helper/mqtt";

let createSubscribtions = (machineIds:string[]) => {

    const subs: string[] = [];

    machineIds.map( id => {

        subs.push(`machines/${id}/logs`)
        // State
        subs.push(`machines/${id}/data/state`)
        // Operation
        subs.push(`machines/${id}/data/operation/power`)
        subs.push(`machines/${id}/data/operation/statusLED/green`)
        subs.push(`machines/${id}/data/operation/statusLED/yellow`)
        subs.push(`machines/${id}/data/operation/statusLED/red`)
        subs.push(`machines/${id}/data/operation/running`)
        subs.push(`machines/${id}/data/operation/automatic`)
        // Injection Unit
        subs.push(`machines/${id}/data/injectionUnit/position/max`)
        subs.push(`machines/${id}/data/injectionUnit/position/min`)
        subs.push(`machines/${id}/data/injectionUnit/position/x`)
        subs.push(`machines/${id}/data/injectionUnit/fillingLevel/level`)
        subs.push(`machines/${id}/data/injectionUnit/fillingLevel/minLevel`)
        subs.push(`machines/${id}/data/injectionUnit/fillingLevel/maxLevel`)
        // Savety Door 
        subs.push(`machines/${id}/data/savetyDoor/position/max`)
        subs.push(`machines/${id}/data/savetyDoor/position/min`)
        subs.push(`machines/${id}/data/savetyDoor/position/x`)

    })

    // Subscribe
    client.subscribe(subs);
}

let removeSubcribtions = (machineIds:string[]) => {

    const subs: string[] = [];

    machineIds.map( id => {

        subs.push(`machines/${id}/logs`)
        subs.push(`machines/${id}/data/operation/power`)
        subs.push(`machines/${id}/data/state`)

    })

    // Unsubscribe
    client.unsubscribe(subs)
}


export {createSubscribtions, removeSubcribtions};