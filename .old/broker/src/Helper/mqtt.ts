import * as mqtt from "async-mqtt"

// Connect to MQTT Broker
let client  = mqtt.connect(process.env.MQTT_BROKER || 'mqtt://paul-finkbeiner.de')
client.on("connect", () => {
    console.log("Connected to MQTT Broker!")

    client.subscribe(`machines/+/logs`)

    // State
    client.subscribe(`machines/+/data/state`)
    // Operation
    client.subscribe(`machines/+/data/operation/power`)
    client.subscribe(`machines/+/data/operation/statusLED/green`)
    client.subscribe(`machines/+/data/operation/statusLED/yellow`)
    client.subscribe(`machines/+/data/operation/statusLED/red`)
    client.subscribe(`machines/+/data/operation/running`)
    client.subscribe(`machines/+/data/operation/automatic`)
    // Injection Unit
    client.subscribe(`machines/+/data/injectionUnit/position/max`)
    client.subscribe(`machines/+/data/injectionUnit/position/min`)
    client.subscribe(`machines/+/data/injectionUnit/position/x`)
    client.subscribe(`machines/+/data/injectionUnit/fillingLevel/level`)
    client.subscribe(`machines/+/data/injectionUnit/fillingLevel/minLevel`)
    client.subscribe(`machines/+/data/injectionUnit/fillingLevel/maxLevel`)
    // Savety Door 
    client.subscribe(`machines/+/data/savetyDoor/position/max`)
    client.subscribe(`machines/+/data/savetyDoor/position/min`)
    client.subscribe(`machines/+/data/savetyDoor/position/x`)
    client.subscribe(`machines/+/data/savetyDoor/locked`)
    // Locking Unit
    client.subscribe(`machines/+/data/lockingUnit/position/max`)
    client.subscribe(`machines/+/data/lockingUnit/position/min`)
    client.subscribe(`machines/+/data/lockingUnit/position/x`)
    client.subscribe(`machines/+/data/lockingUnit/locked`)
    client.subscribe(`machines/+/data/lockingUnit/closingForce/maxForce`)
    client.subscribe(`machines/+/data/lockingUnit/closingForce/minForce`)
    client.subscribe(`machines/+/data/lockingUnit/closingForce/force`)
    // Material Info
    client.subscribe(`machines/+/data/materialInfo/temp`)
    client.subscribe(`machines/+/data/materialInfo/material`)
    client.subscribe(`machines/+/data/materialInfo/pressure/maxForce`)
    client.subscribe(`machines/+/data/materialInfo/pressure/minForce`)
    client.subscribe(`machines/+/data/materialInfo/pressure/force`)
})



export default client;