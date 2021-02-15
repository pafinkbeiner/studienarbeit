import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams } from 'react-router';
import './Dashboard.css';
import { AMachine, StoreModel } from '../../models/Store';

const Dashboard: React.FC<{storeModel: StoreModel}> = (props) => {

  useEffect(() => {
    setTimeout(()=> {props.storeModel.setLoading(false)},1000)
    return () => {
      props.storeModel.setLoading(false)
    };
  })

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
