import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
// import { useParams } from 'react-router';
import './Machines.css';

const Machines: React.FC = () => {

  // const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Machines</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Machines</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Content */}
        <h1>Machines</h1>

      </IonContent>
    </IonPage>
  );
};

export default Machines;
