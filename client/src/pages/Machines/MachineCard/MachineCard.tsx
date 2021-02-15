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
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { pin, walk, warning, wifi, wine } from "ionicons/icons";
import { AMachine } from "../../../models/Store";

const MachineCard: React.FC<{ machine: AMachine }> = (props) => {
    
  return (
    <IonCard routerLink={`/Machine/${props.machine.id}`}>
      <img src="https://www.arburg.com/fileadmin/redaktion/bilder/vollbild_650x320px/144999_920s.jpg" />
      <IonCardHeader>
        <IonCardTitle>{props.machine.name}</IonCardTitle>
        <IonCardSubtitle>{props.machine.id}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {props.machine.sensors.length > 1 ? (
          <>
            {props.machine.sensors.map((sensor, index) => {
                return (index == props.machine.sensors.length) ? <>{sensor.name}</> : <>{sensor.name}, </>;
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
