import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import mqtt from "mqtt";
// import { useParams } from 'react-router';
import "./Machines.css";
import client from "../../helper/mqtt";
import Navbar from "../../components/Navbar/Navbar";
import MachineCard from "./MachineCard/MachineCard";
import { AMachine, StoreModel } from "../../models/Store";
import { useParams } from "react-router";

const Machines: React.FC<{ storeModel: StoreModel }> = (props) => {

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
      <Navbar title="Machines" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Machines</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Content */}
        <p>{messages}</p>

        <div className="card-container">
          {props.storeModel != undefined ?
            props.storeModel.machines.map((machine) => {
              return <MachineCard key={machine.id} machine={machine} />;
            }) : <></>}

          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Add New Machine</IonCardTitle>
              <IonCardSubtitle>Add it</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Add a new machine to the array
              <IonButton
                onClick={() => props.storeModel.setMachines([
                  {
                    id: "aisodu",
                    name: "asdas",
                    sensors: [
                      {
                        id: "string",
                        name: "string",
                        min: 0,
                        max: 500,
                        value: 40,
                        pvalue: 30,
                        topic: "/machine/asjd",
                      },
                    ],
                  },
                ])}
              >Add</IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        <button onClick={trigger}>Logs</button>
      </IonContent>
    </IonPage>
  );
};

export default Machines;
