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
  import { Sensor } from "../../../models/Store";
  
  
  const AddMachine: React.FC<{  
            	                machineId: string, 
                                editSensor: boolean, 
                                setEditSensor: (bol: boolean) => void, 
                                addSensor: (machineId: string, sensor: Sensor) => void, 
                                removeSensor: (machineId: string, sensorId: string) => void, 
                                selectedSensor: Sensor 
                            }> 
    = (props) => {
  
    const [Sensor, setSensor] = useState<Sensor>({ 
        id: props.selectedSensor.id , 
        name: props.selectedSensor.name, 
        max: props.selectedSensor.max, 
        min: props.selectedSensor.min, 
        values: props.selectedSensor.values, 
        topic: props.selectedSensor.topic
    });
  
    return (
      <>
        <IonModal isOpen={props.editSensor}>
          <IonGrid>
            <IonRow>
              <IonCol>
                <h5>Edit a Sensor</h5>
              </IonCol>
            </IonRow>
  
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="fixed">Id</IonLabel>
                  <IonInput
                    disabled={true}
                    value={Sensor.id}
                    type="text"
                    placeholder="Enter Input"
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="fixed">Name</IonLabel>
                  <IonInput
                    value={Sensor.name}
                    type="text"
                    placeholder="Enter Input"
                    onIonChange={(e) => setSensor((state: Sensor) => {
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
                    value={Sensor.min}
                    type="number"
                    placeholder="Enter Input"
                    onIonChange={(e) => setSensor((state: Sensor) => {
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
                    value={Sensor.max}
                    type="number"
                    placeholder="Enter Input"
                    onIonChange={(e) => setSensor((state: Sensor) => {
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
                    value={Sensor.topic}
                    type="text"
                    placeholder="Enter Input"
                    onIonChange={(e) => setSensor((state: Sensor) => {
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
                  props.setEditSensor(false);
                }}>Close</IonButton>
              </IonCol>
  
              <IonCol size="6">
                <IonButton onClick={() => {
                    /* TODO kann eventuell probleme geben */
                  props.removeSensor(props.machineId, Sensor.id);
                  props.addSensor(props.machineId, Sensor);
                  props.setEditSensor(false);
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
  