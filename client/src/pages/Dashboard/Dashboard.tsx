import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';
import { AMachine, StoreModel } from '../../models/Store';
import MachineItem from './MachineItem/MachineItem';

const Dashboard: React.FC<{storeModel: StoreModel}> = (props) => {

  const [selectedMachine, setSelectedMachine] = useState<AMachine>();
  const [logs, setLogs] = useState<string[]>([])


  useEffect(() => {

    props.storeModel.machines.map((machine: AMachine) => {
      machine.logs.map((log: string) => {
        setLogs((state: string[]) => [...state, log]);
      })
    })

    // subscribe to log messages of all machines
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
            <IonCol size="12" sizeLg="6" style={{backgroundColor: "", height: "46.5vh", marginBottom: "0.5vh"}}>
              {/* Column 1 - Machine Overview */}
              <IonGrid>
                <IonRow>
                  {props.storeModel.machines && props.storeModel.machines.map(machine => {
                    return <MachineItem key={machine.id} machine={machine} setSelectedMachine={setSelectedMachine}/>
                  })}
                </IonRow>

              </IonGrid>
            </IonCol>
            <IonCol size="12" sizeLg="6" style={{backgroundColor: "#1E1E1E", height: "46.5vh", marginBottom: "0.5vh"}}>
              {/* Column 2 - Log Messages */}
            </IonCol>
 
            <IonCol size="12" sizeLg="6" style={{backgroundColor: "#2E2E2E" , height: "46vh"}}>
              {/* Column 3 - If Machine Clicked*/}
            </IonCol>
            <IonCol size="12" sizeLg="6" style={{backgroundColor: "#3E3E3E" , height: "46vh"}}>
              {/* Column 4 - Machine Overview */}
            </IonCol>
          </IonRow>

        </IonGrid>


      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
