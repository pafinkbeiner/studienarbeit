import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
// import { useParams } from 'react-router';
import './Machine.css';
import Navbar from '../../components/Navbar/Navbar';
import client from '../../helper/mqtt';
import mqtt from "mqtt"


const Machine: React.FC = () => {

  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [messages, setMessages] = React.useState("");

  useEffect(() => {
    client.on(
      "message",
      (topic: string, payload: Buffer, packet: mqtt.Packet) => {
        setMessages(payload.toString() + "topic: " + topic);

        console.log("Message received: ", payload.toString());
      }
    );
  }, []);

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

        {/* Content */}
        <p>{messages}</p>

        {/* Content */}
        <h1>{"Hello"}</h1>
        <button onClick={trigger}>Logs</button>
      </IonContent>
    </IonPage>
  );
};

export default Machine;
