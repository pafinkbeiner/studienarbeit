import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import { AMachine } from "../../../models/Store";


const MachineCard: React.FC<{ machine: AMachine }> = (props) => {
    
  return (
    <IonCard routerLink={`/Machine/${props.machine.id}`} routerDirection="none">
      <img src="https://www.arburg.com/fileadmin/redaktion/bilder/vollbild_650x320px/144999_920s.jpg" />
      <IonCardHeader>
        <IonCardTitle>{props.machine.name}</IonCardTitle>
        <IonCardSubtitle>{props.machine.id}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {props.machine.sensors.length > 0 ? (
          <>
            <b style={{color:"#9E9E9E"}}>Sensoren: </b>
            {props.machine.sensors.map((sensor, index) => {
                return (index == props.machine.sensors.length - 1) ? <>{sensor.name}</> : <>{sensor.name}, </>;
            })}
          </>
        ) : (
          <>
            Es wurden bei der Maschine <b>{props.machine.name}</b> keine Sensoren
            erfasst!
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default MachineCard;
