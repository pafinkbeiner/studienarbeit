import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
// import { useParams } from 'react-router';
import './Help.css';
import Navbar from '../../components/Navbar/Navbar';

const Help: React.FC = () => {


  return (
    <IonPage>

      <Navbar title="Help"/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Help</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Content */}
        <h1>{"Help"}</h1>

      </IonContent>
    </IonPage>
  );
};

export default Help;
