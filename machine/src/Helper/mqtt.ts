import * as mqtt from "async-mqtt"
import dotenv from "dotenv"
dotenv.config();
const broker = process.env.MQTT_BROKER || 'mqtt://test.mosquitto.org';
// Connect to MQTT Broker
let client  = mqtt.connect(broker)
client.on("connect", () => {console.log("Connected to MQTT Broker!", broker)})

export default client;