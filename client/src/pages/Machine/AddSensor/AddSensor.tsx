import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
} from "@ionic/react";
import { v4 as uuidv4 } from 'uuid';
import React, {useState } from "react";
import { Sensor } from "../../../models/Store";


const AddMachine: React.FC<{ machineId: string, configureSensor: boolean, setConfigureSensor: (bol: boolean) => void, addSensor: (machineId: string, sensor: Sensor) => void }> = (props) => {

  const [newSensor, setNewSensor] = useState<Sensor>({ id: "", name: "", max: "", min: "", values: [], topic: ""});

  return (
    <>
      <IonModal isOpen={props.configureSensor}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <h5>Add a new Sensor</h5>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">Name</IonLabel>
                <IonInput
                  value={newSensor.name}
                  type="text"
                  placeholder="Enter Input"
                  onIonChange={(e) => setNewSensor((state: Sensor) => {
                    return {
                      ...state,
                      name: e.detail.value!
                    }
                  })}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">min</IonLabel>
                <IonInput
                  value={newSensor.min}
                  type="number"
                  placeholder="Enter Input"
                  onIonChange={(e) => setNewSensor((state: Sensor) => {
                    return {
                      ...state,
                      min: e.detail.value!
                    }
                  })}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">max</IonLabel>
                <IonInput
                  value={newSensor.max}
                  type="number"
                  placeholder="Enter Input"
                  onIonChange={(e) => setNewSensor((state: Sensor) => {
                    return {
                      ...state,
                      max: e.detail.value!
                    }
                  })}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="fixed">topic</IonLabel>
                <IonInput
                  value={newSensor.topic}
                  type="text"
                  placeholder="Enter Input"
                  onIonChange={(e) => setNewSensor((state: Sensor) => {
                    return {
                      ...state,
                      topic: e.detail.value!
                    }
                  })}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonButton onClick={() => {
                props.setConfigureSensor(false);
                setNewSensor({ id: "", name: "", max: "", min: "", values: [], topic: ""});
              }}>Close</IonButton>
            </IonCol>

            <IonCol size="6">
              <IonButton onClick={() => {
                props.addSensor(props.machineId, { ...newSensor, id: uuidv4() });
                props.setConfigureSensor(false);
              }}>Add</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonModal>

      {/* <IonCard style={{height: "100%"}} onClick={() => setModal(true)}>
          <IonCardContent className="ion-text-center" style={{height: "100%"}}>
              <h1 style={{color: "lightgrey", fontSize:"7rem"}}>+</h1>
          </IonCardContent>
        </IonCard> */}
    </>
  );
};

export default AddMachine;
