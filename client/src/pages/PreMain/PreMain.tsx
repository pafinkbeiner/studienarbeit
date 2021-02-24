import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
        {/* Content */}
        <h1>{"Hello"}</h1>

      </IonContent>
    </IonPage>
  );
};

export default PreMain;
