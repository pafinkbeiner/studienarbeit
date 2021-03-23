import * as mqtt from "async-mqtt"
import dotenv from "dotenv"
dotenv.config();

// Connect to MQTT Broker
let client  = mqtt.connect(process.env.MQTT_BROKER || 'mqtt://test.mosquitto.org')
client.on("connect", () => {console.log("Connected to MQTT Broker!")})

export default client;