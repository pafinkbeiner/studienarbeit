import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams } from 'react-router';
import './Dashboard.css';
import { AMachine, StoreModel } from '../../models/Store';
import MachineItem from './MachineItem/MachineItem';
import { DatabaseHandler } from '../../helper/db';

const Dashboard: React.FC<{storeModel: StoreModel}> = (props) => {

  const [selectedMachine, setSelectedMachine] = useState<AMachine>();


  useEffect(() => {
    let db = DatabaseHandler.getDbInstance();
    
    // get 10 most recent log messages from db
    // subscribe to log messages of all machines
    
    

    setTimeout(()=> {props.storeModel.setLoading(false)},1000)

    return () => {
      // unsubscribe to all log messages from the machines
    }

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
            <IonCol size="12" sizeLg="6" style={{backgroundColor: "green", height: "46.5vh", marginBottom: "0.5vh"}}>
              {/* Column 1 - Machine Overview */}
              {props.storeModel.machines && props.storeModel.machines.map(machine => {
                return <MachineItem machine={machine}/>
              })}
            </IonCol>
            <IonCol size="12" sizeLg="6" style={{backgroundColor: "red", height: "46.5vh", marginBottom: "0.5vh"}}>
              {/* Column 2 - Log Messages */}
            </IonCol>
 
            <IonCol size="12" sizeLg="6" style={{backgroundColor: "blue" , height: "46vh"}}>
              {/* Column 3 - If Machine Clicked*/}
            </IonCol>
            <IonCol size="12" sizeLg="6" style={{backgroundColor: "yellow" , height: "46vh"}}>
              {/* Column 4 - Machine Overview */}
            </IonCol>
          </IonRow>

        </IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
