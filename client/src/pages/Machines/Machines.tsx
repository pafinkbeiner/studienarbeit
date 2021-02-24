import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
// import { useParams } from 'react-router';
import "./Machines.css";

import Navbar from "../../components/Navbar/Navbar";
import MachineCard from "./MachineCard/MachineCard";
import { StoreModel } from "../../models/Store";
import AddMachine from "./AddMachine/AddMachine";

const Machines: React.FC<{ storeModel: StoreModel }> = (props) => {

  return (
    <IonPage>
      <Navbar title="Machines" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Machines</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            {props.storeModel && (
              props.storeModel.machines.map((machine) => {
                return (
                  <IonCol key={machine.id}>
                    <MachineCard machine={machine} />
                  </IonCol>
                );
              })
            )}

            <IonCol size="6">
              <AddMachine addMachine={props.storeModel.addMachine}/>
            </IonCol>
          </IonRow>
        </IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default Machines;
