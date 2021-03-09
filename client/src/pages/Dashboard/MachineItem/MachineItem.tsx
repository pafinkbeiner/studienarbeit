import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react";
import { sendOutline, sendSharp } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import { AMachine, Sensor } from "../../../models/Store";


const MachineItem: React.FC<{ machine: AMachine, setSelectedMachine: (machine: AMachine) => void, setSelectedSensor: (sensor: Sensor) => void; }> = (props) => {

    return (
            <IonCard onClick={() => {
              props.setSelectedMachine(props.machine);
              if(props.machine.sensors.length > 0) props.setSelectedSensor(props.machine.sensors[0]);
            }}>
            <img height="100px" src="https://www.arburg.com/fileadmin/redaktion/bilder/vollbild_650x320px/144999_920s.jpg" />
            <IonCardHeader>
              <IonCardTitle>{props.machine.name}</IonCardTitle>
              { 
                props.machine.active == true ? "(Active)" : "(Not Active)"
              }
            </IonCardHeader>
            <IonCardContent>
                <Link to={`Machine/${props.machine.id}`}>
                    <IonIcon ios={sendOutline} md={sendSharp}/>
                </Link>
            </IonCardContent>
          </IonCard>
    );
};

export default MachineItem;
