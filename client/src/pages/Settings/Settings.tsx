import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
// import { useParams } from 'react-router';
import './Settings.css';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';

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
        <IonButton onClick={() => {

          axios.get(`${process.env.REACT_APP_MACHINE}/wipe`);
          window.location.replace("/");

        }}>
          Wipe Machine Data
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Settings;
