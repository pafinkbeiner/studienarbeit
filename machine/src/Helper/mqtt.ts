import * as mqtt from "async-mqtt"

// Connect to MQTT Broker
let client  = mqtt.connect(process.env.MQTT_BROKER || 'mqtt://paul-finkbeiner.de')
client.on("connect", () => {console.log("Connected to MQTT Broker!")})

export default client;