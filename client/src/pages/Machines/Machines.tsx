import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import mqtt from "mqtt"
// import { useParams } from 'react-router';
import './Machines.css';
import client from "../../helper/mqtt"
import Navbar from '../../components/Navbar/Navbar';

const Machines: React.FC = () => {

  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [messages, setMessages] = React.useState("");
 
  useEffect(() => {
    
    client.on('message', (topic: string, payload: Buffer, packet: mqtt.Packet) => {

      setMessages(payload.toString()+"topic: "+topic);

      console.log("Message received: ", payload.toString())

    });

  }, []);

  const trigger = () => {
    client.subscribe(`machines/+/logs`);
  }

  return (
    <IonPage>

      <Navbar title="Machines"/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Machines</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Content */}
        <p>{messages}</p>

        <button onClick={trigger}>Logs</button>
 
      </IonContent>
    </IonPage>
  );
};

export default Machines;
