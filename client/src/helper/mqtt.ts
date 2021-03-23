import mqtt from 'mqtt'
const client = mqtt.connect(process.env.REACT_APP_MQTT || `tcp://test.mosquitto.org:8080`);

const str = [

    `machines/+/logs`,

    `machines/+/data/state`,

    `machines/+/data/operation/power`,
    `machines/+/data/operation/statusLED/green`,
    `machines/+/data/operation/statusLED/yellow`,
    `machines/+/data/operation/statusLED/red`,
    `machines/+/data/operation/running`,
    `machines/+/data/operation/automatic`,

    `machines/+/data/injectionUnit/position/max`,
    `machines/+/data/injectionUnit/position/min`,
    `machines/+/data/injectionUnit/position/x`,
    `machines/+/data/injectionUnit/fillingLevel/level`,
    `machines/+/data/injectionUnit/fillingLevel/minLevel`,
    `machines/+/data/injectionUnit/fillingLevel/maxLevel`,

    `machines/+/data/savetyDoor/position/max`,
    `machines/+/data/savetyDoor/position/min`,
    `machines/+/data/savetyDoor/position/x`,
    `machines/+/data/savetyDoor/locked`,

    `machines/+/data/lockingUnit/position/max`,
    `machines/+/data/lockingUnit/position/min`,
    `machines/+/data/lockingUnit/position/x`,
    `machines/+/data/lockingUnit/locked`,
    `machines/+/data/lockingUnit/closingForce/maxForce`,
    `machines/+/data/lockingUnit/closingForce/minForce`,
    `machines/+/data/lockingUnit/closingForce/force`,

    `machines/+/data/materialInfo/temp`,
    `machines/+/data/materialInfo/material`,
    `machines/+/data/materialInfo/pressure/maxForce`,
    `machines/+/data/materialInfo/pressure/minForce`,
    `machines/+/data/materialInfo/pressure/force`,

];

client.on("connect", () => {

    console.log("Connected sucessfully!")

    str.map(topic => client.subscribe(topic));

})

export default client;