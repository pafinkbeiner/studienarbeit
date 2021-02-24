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
  import React, { useState } from "react";
  
  
  const AddMachine: React.FC<{ modal: boolean, setModal: (bl: boolean) => void ;machineId: string; addEs: (machineId: string,es: string) => void;}> = (props) => {
   
    const [es, setEs] = useState("")
  
    return (
      <>
        <IonModal isOpen={props.modal}>
          <IonGrid>
            <IonRow>
              <IonCol>
                <h5>Add the Emergency Stop MQTT Path</h5>
              </IonCol>
            </IonRow>
  
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="fixed">Path</IonLabel>
                  <IonInput
                    value={es}
                    type="text"
                    placeholder="Enter Input"
                    onIonChange={(e) => setEs(e.detail.value!)}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
  
            <IonRow>
              <IonCol size="6">
                <IonButton onClick={() => props.setModal(false)}>Close</IonButton>
              </IonCol>
  
              <IonCol size="6">
                <IonButton onClick={() => { props.addEs(props.machineId, es) ; props.setModal(false); setEs("") }}>Add</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonModal>
      </>
    );
  };
  
  export default AddMachine;
  