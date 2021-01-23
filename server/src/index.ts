import {executeMachineChange} from "./Handler/MachineHandler";
import client from "./Helper/mqtt";

// Subscribtion
client.subscribe("machines");

// 
client.on('message', function (topic, message) {

    if(topic == "machines") executeMachineChange(message);
    

    console.log(`Topic: ${topic} und Message: ${message}`);

})
