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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { pin, walk, warning, wifi, wine } from "ionicons/icons";
import { AMachine } from "../../../models/Store";

const Machines: React.FC<{machine: AMachine}> = (props) => {
  return (
    <IonCard>
    <img src="https://www.arburg.com/fileadmin/redaktion/bilder/vollbild_650x320px/144999_920s.jpg" />
    <IonCardHeader>
      <IonCardSubtitle>DestinatIonCIonCard-subtitle</IonCardSubtitle>
      <IonCardTitle>Madison, WI</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836.
    </IonCardContent>
  </IonCard>
  );
};

export default Machines;
