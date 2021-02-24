import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
// import { useParams } from 'react-router';
import './Settings.css';
import Navbar from '../../components/Navbar/Navbar';

const Settings: React.FC = () => {


  return (
    <IonPage>

      <Navbar title="Settings"/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Content */}
        <h1>{"Settings"}</h1>

      </IonContent>
    </IonPage>
  );
};

export default Settings;
