import { IonBadge, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './PreMain.css';
import Navbar from '../../components/Navbar/Navbar';
import { StoreModel } from '../../models/Store';


const PreMain: React.FC<{storeModel:StoreModel}> = (props) => {

  return (
    <IonPage>

      <Navbar title="Predictive Maintenance"/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Predictive Maintenance</IonTitle>
          </IonToolbar>
        </IonHeader>
        
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
                      <IonSelect value={machine.sensors} placeholder="Selsect a Sensor" onIonChange={() => {}}>
                      {
                        machine.sensors.map(sensor => {
                          return (
                            <IonSelectOption value="female">{sensor.name}</IonSelectOption>
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


      </IonContent>
    </IonPage>
  );
};

export default PreMain;
