import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
// import { useParams } from 'react-router';
import './Dashboard.css';

const Dashboard: React.FC = () => {

  // const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>

      <Navbar title="Dashboard"/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Content */}
        <h1>Dashboard</h1>

      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
