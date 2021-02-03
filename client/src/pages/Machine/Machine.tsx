import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
// import { useParams } from 'react-router';
import './Machine.css';
import Navbar from '../../components/Navbar/Navbar';

const Machine: React.FC = () => {


  return (
    <IonPage>

      <Navbar title="Machine"/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Machine</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Content */}
        <h1>{"Hello"}</h1>

      </IonContent>
    </IonPage>
  );
};

export default Machine;
