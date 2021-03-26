import { IonBadge, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './PreMain.css';
import Navbar from '../../components/Navbar/Navbar';
import { Sensor, StoreModel } from '../../models/Store';
import MachineChart from '../Machine/MachineTable/MachineChart';
import Algorithm from './Algorithm/Algorithm';


const PreMain: React.FC<{storeModel:StoreModel}> = (props) => {

  const [selectedSensor, setSelectedSensor] = useState<Sensor>();

  return (
    <IonPage>

      <Navbar title="Predictive Maintenance"/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Predictive Maintenance</IonTitle>
          </IonToolbar>
        </IonHeader>

<IonGrid>
  <IonRow>
    <IonCol size="12" sizeLg="6" style={{backgroundColor: "", height: "46.5vh", marginBottom: "0.5vh"}}>
      {/* Column 1 - Machine Overview */}
        
        <IonList>

        <IonListHeader>Choose a Machine</IonListHeader>

        {
          props.storeModel.machines && 
          props.storeModel.machines.map((machine) => {
            return (
              <IonItem>
                <IonLabel>{machine.name}</IonLabel>
                <IonBadge color="primary" slot="end">{machine.sensors.length}</IonBadge>
                {
                  machine.sensors && machine.sensors.length > 0 &&
                    <IonSelect value={machine.sensors} placeholder="Selsect a Sensor" onIonChange={(e) => {
                      let sensor: Sensor|undefined = props.storeModel.machines.find(m => m.id === machine.id)?.sensors.find(s => s.id === e.detail.value);
                      if(sensor !== undefined){
                        setSelectedSensor(sensor);
                      }
                    }}>
                    {
                      machine.sensors.map(sensor => {
                        return (
                          <IonSelectOption value={sensor.id}>{sensor.name}</IonSelectOption>
                        )
                      })
                    }
                  </IonSelect>
                }
              </IonItem>
            )
          })
        }

        </IonList>

    </IonCol>
    <IonCol size="12" sizeLg="6" style={{backgroundColor: "#1E1E1E", height: "46.5vh", marginBottom: "0.5vh"}}>
      {/* Column 2 - Log Messages */}

      {
          (selectedSensor) && 
          <>
                <h3>Selected Sensor:</h3>
                {selectedSensor.name}
                <p>min: {selectedSensor.min}</p>
                <p>max: {selectedSensor.max}</p>
                <p>topic: {selectedSensor.topic}</p>
          </>
        }


    </IonCol>
    <IonCol size="12" sizeLg="3" style={ selectedSensor && {backgroundColor: "#1E1E1E" , height: "46vh"}}>

        {/* Selection Box with Predictive Maintenance Algoithm */}
        {/* Component wich renders out the predictive schnittpunkt from a given sensor */}
        {
          (selectedSensor) && 
            <Algorithm selectedSensor={selectedSensor}/>
        }


    </IonCol>
    <IonCol size="12" sizeLg="9" style={ selectedSensor && {backgroundColor: "#1E1E1E" , height: "46vh"}}>
      {/* Column 4 - Sensor table */}
        {
          (selectedSensor) && 
            <MachineChart values={selectedSensor.values} min={selectedSensor.min} max={selectedSensor.max}></MachineChart>
        }

    </IonCol>
  </IonRow>
</IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default PreMain;
