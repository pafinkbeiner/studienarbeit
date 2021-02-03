import * as mqtt from "async-mqtt"
import dotenv from "dotenv"
dotenv.config();

console.log(process.env.MQTT_BROKER)
// Connect to MQTT Broker
let client  = mqtt.connect('mqtt://test.mosquitto.org')
client.on("connect", () => {console.log("Connected to MQTT Broker!")})

export default client;