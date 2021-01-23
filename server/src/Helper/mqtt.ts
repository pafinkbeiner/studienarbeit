import * as mqtt from "async-mqtt"

// Connect to MQTT Broker
let client  = mqtt.connect('mqtt://paul-finkbeiner.de')
client.on("connect", () => {console.log("Connected to MQTT Broker!")})

export default client;