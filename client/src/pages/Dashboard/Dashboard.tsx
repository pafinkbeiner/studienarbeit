import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams } from 'react-router';
import './Dashboard.css';
import { AMachine, StoreModel } from '../../models/Store';

const Dashboard: React.FC<{storeModel: StoreModel}> = (props) => {

  useEffect(() => {
    setTimeout(()=> {props.storeModel.setLoading(false)},1000)

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

        <IonGrid>

          <IonRow>
            <IonCol size="6" style={{backgroundColor: "green", height: "46.5vh", marginBottom: "0.5vh"}}>
              {/* Column 1 - Machine Overview */}
            </IonCol>
            <IonCol size="6" style={{backgroundColor: "red", height: "46.5vh", marginBottom: "0.5vh"}}>
              {/* Column 2 - Machine Overview */}
            </IonCol>
 
            <IonCol size="6" style={{backgroundColor: "blue" , height: "46vh"}}>
              {/* Column 3 - Machine Overview */}
            </IonCol>
            <IonCol size="6" style={{backgroundColor: "yellow" , height: "46vh"}}>
              {/* Column 4 - Machine Overview */}
            </IonCol>
          </IonRow>

        </IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
