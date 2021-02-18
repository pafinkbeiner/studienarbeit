import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from "@ionic/react";
import { cubeOutline, cubeSharp, sendOutline, sendSharp } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
import { AMachine, Sensor } from "../../../models/Store";


const MachineItem: React.FC<{ machine: AMachine, setSelectedMachine: (machine: AMachine) => void }> = (props) => {

    return (
            <IonCard onClick={() => {props.setSelectedMachine(props.machine)}}>
            <img height="100px" src="https://www.arburg.com/fileadmin/redaktion/bilder/vollbild_650x320px/144999_920s.jpg" />
            <IonCardHeader>
              <IonCardTitle>{props.machine.name}</IonCardTitle>
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
