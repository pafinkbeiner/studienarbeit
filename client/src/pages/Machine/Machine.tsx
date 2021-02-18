import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import './Machine.css';
import Navbar from '../../components/Navbar/Navbar';
import client from '../../helper/mqtt';
import mqtt from "mqtt"
import { AMachine, StoreModel } from '../../models/Store';
import AddSensor from './AddSensor/AddSensor';


const Machine: React.FC<{ storeModel: StoreModel }> = (props) => {

  const [id, setId] = useState("");
  const [machine, setmachine] = useState<any>(undefined)

  useEffect(() => {
    
    const le = ((window.location.href).toString().split("/")[(window.location.href).toString().split("/").length - 1]).toString();
    console.log(le);
    if(props.storeModel.machines.length > 0) setId(props.storeModel.machines[0].id.toString());
    console.log(id);
    console.log(props.storeModel.machines);
    setmachine(props.storeModel.machines.find(item => item.id == id))

    console.log("Found",machine)

    // Subscribe to mqtt feed
    return () => {
      // Unsubscribe from mqtt feed
    }
  }, [props])

  //MQTT for later
  // const [connectionStatus, setConnectionStatus] = React.useState(false);
  // const [messages, setMessages] = React.useState("");

  // useEffect(() => {
  //   client.on(
  //     "message",
  //     (topic: string, payload: Buffer, packet: mqtt.Packet) => {
  //       setMessages(payload.toString() + "topic: " + topic);

  //       console.log("Message received: ", payload.toString());
  //     }
  //   );
  // }, []);

  const trigger = () => {
    client.subscribe(`machines/+/logs`);
  };

  return (
    <IonPage>

      <Navbar title="Machine"/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Machine</IonTitle>
          </IonToolbar>
        </IonHeader>

        <h1>{machine && machine.name}</h1>
        {/* <AddSensor addSensor={props.storeModel.addSensor}/> */}
        <IonButton onClick={trigger}>Logs</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Machine;
