import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { v4 as uuidv4 } from 'uuid';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { pin, walk, warning, wifi, wine } from "ionicons/icons";
import { AMachine } from "../../../models/Store";


const AddMachine: React.FC<{addMachine: (machine: AMachine) => void;}> = (props) => {
  const [modal, setModal] = useState(false);

  const [machineName, setMachineName] = useState("");
  const [machineSensors, setMachineSensors] = useState([]);

  return (
    <>
      <IonModal isOpen={modal}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <h5>Create a new Machine</h5>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">Name</IonLabel>
                <IonInput
                  value={machineName}
                  type="text"
                  placeholder="Enter Input"
                  onIonChange={(e) => setMachineName(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonButton onClick={() => setModal(false)}>Close</IonButton>
            </IonCol>

            <IonCol size="6">
              <IonButton onClick={() => props.addMachine({
                  name: machineName,
                  id: uuidv4(),
                  sensors: machineSensors
              })}>Add</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonModal>

      <IonCard style={{height: "100%"}} onClick={() => setModal(true)}>
        <IonCardContent className="ion-text-center" style={{height: "100%"}}>
            <h1 style={{color: "lightgrey", fontSize:"7rem"}}>+</h1>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default AddMachine;
