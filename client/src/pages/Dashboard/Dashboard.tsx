import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Dashboard.css';
import { AMachine, Sensor, StoreModel } from '../../models/Store';
import MachineItem from './MachineItem/MachineItem';
import MachineChart from '../Machine/MachineTable/MachineChart';
import { DatabaseHandler } from '../../helper/db';
import MachineOverviewChart from '../../components/MachineOverviewChart/MachineOverviewChart';

const Dashboard: React.FC<{storeModel: StoreModel}> = (props) => {

  const [selectedMachine, setSelectedMachine] = useState<AMachine>();
  const [logs, setLogs] = useState<string[]>([])
  const [selectedSensor, setSelectedSensor] = useState<Sensor>();


  useEffect(() => {

    if(logs.length < 1)
    props.storeModel.machines.map((machine: AMachine) => {
      machine.logs.slice(machine.logs.length - 5, machine.logs.length).map((log: string) => {
        setLogs((state: string[]) => [...state, `${machine.name}: ${log}`]);
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
                <IonRow style={{ height: "45.5vh",overflowY: "scroll"}}>
                  {props.storeModel.machines && props.storeModel.machines.map(machine => {
                    return <MachineItem key={machine.id} machine={machine} setSelectedMachine={setSelectedMachine} setSelectedSensor={setSelectedSensor}/>
                  })}
                </IonRow>
                
                {/* <IonButton onClick={() => { console.log(DatabaseHandler.getDbInstance().getAll()); }}>show db</IonButton> */}

              </IonGrid>
            </IonCol>
            <IonCol size="12" sizeLg="6" style={{backgroundColor: "#1E1E1E", height: "46.5vh", marginBottom: "0.5vh"}}>
              {/* Column 2 - Log Messages */}
              <h4>Logs</h4>
              <IonList style={{ height: "85%" , overflowY: "scroll"}}>
                {
                  logs.length > 0 && logs.map((log:string, index:number) => {
                    if (log.toUpperCase().search("INFO") != -1) {
                      return (<IonItem key={index}><IonLabel ><p style={{ color: "yellow" }}>{log}</p></IonLabel></IonItem>)
                    } else if (log.toUpperCase().search("DEBUG") != -1) {
                      return (<IonItem key={index}><IonLabel><p style={{ color: "green" }}>{log}</p></IonLabel></IonItem>)
                    } else if (log.toUpperCase().search("ERROR") != -1 ) {
                      return (<IonItem key={index}><IonLabel><p style={{ color: "red" }}>{log}</p></IonLabel></IonItem>)
                    } else {
                      return (<IonItem key={index}><IonLabel><p style={{ color: "white" }}>{log}</p></IonLabel></IonItem>)
                    }
                  })
                }
              </IonList>
            </IonCol>
            <IonCol size="12" sizeLg="2" style={ selectedSensor && {backgroundColor: "#1E1E1E" , height: "46vh"}}>
              {/* Column 3 - Sensor Overview */}
              { 
                (selectedMachine && selectedSensor) && 
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonButton onClick={() => {
                          const currentIndexPosition = selectedMachine.sensors.findIndex((s:Sensor) => s.id == selectedSensor.id);
                          if(currentIndexPosition != 0){
                            setSelectedSensor(selectedMachine.sensors[currentIndexPosition-1])
                          }else{
                            setSelectedSensor(selectedMachine.sensors[selectedMachine.sensors.length - 1])
                          }
                        }}>{"<"}</IonButton>
                        <IonButton onClick={() => {
                          const currentIndexPosition = selectedMachine.sensors.findIndex((s:Sensor) => s.id == selectedSensor.id);
                          if(currentIndexPosition != selectedMachine.sensors.length - 1){
                            setSelectedSensor(selectedMachine.sensors[currentIndexPosition + 1])
                          }else{
                            setSelectedSensor(selectedMachine.sensors[0])
                          }
                        }}>{">"}</IonButton>
                        <IonButton color="dark" style={{borderRadius: "15px"}} onClick={() =>{
                          setSelectedSensor(undefined);
                          setSelectedMachine(undefined);
                        }}>Close</IonButton>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <h5>{`Name: ${selectedSensor.name}`}</h5>
                    </IonRow>
                    <IonRow>
                    <h5>{`min: ${selectedSensor.min}`}</h5>
                    </IonRow>
                    <IonRow>
                    <h5>{`max: ${selectedSensor.max}`}</h5>
                    </IonRow>
                    <IonRow>
                    <h5>{`topic: ${selectedSensor.topic}`}</h5>
                    </IonRow>
                </IonGrid>
              }
            </IonCol>
            <IonCol size="12" sizeLg="10" style={ selectedSensor && {backgroundColor: "#1E1E1E" , height: "46vh"}}>
              {/* Column 4 - Sensor table */}
              {
                (selectedMachine && selectedSensor) && 
                  <MachineChart values={selectedSensor.values} min={selectedSensor.min} max={selectedSensor.max}></MachineChart>
              }
            </IonCol>
              </IonRow>

              {/* Dritte Zeile */}

              <IonRow>
              <IonCol size="12" sizeLg="6" style={{backgroundColor: "white", height: "46.5vh", marginBottom: "0.5vh"}}>
                  {/* Column 1 - Machine Overview */}
                    <div style={{width: "100%",justifyContent: "center", display: "flex"}}> 
                      <p style={{color: "black"}}>Machine Overview</p>
                    </div>
                    <div style={{width: "100%",justifyContent: "center", display: "flex"}}> 
                      <div style={{backgroundColor: "green", height: "10px", width: "10px", marginRight: "10px"}}></div>
                      <p style={{color: "black", margin: "0px"}}>active</p>
                    </div>

                    <div style={{width: "100%",justifyContent: "center", display: "flex"}}> 
                      <div style={{backgroundColor: "red", height: "10px", width: "10px", marginRight: "10px"}}></div>
                      <p style={{color: "black", margin: "0px"}}>inactive</p>
                    </div>

                    <MachineOverviewChart machines={props.storeModel.machines}></MachineOverviewChart>
              
                </IonCol>
                <IonCol size="12" sizeLg="6" style={{backgroundColor: "gray", height: "46.5vh", marginBottom: "0.5vh"}}>
                  {/* Column 1 - Machine Overview */}
                  <IonGrid>



                  </IonGrid>
                </IonCol>
              </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
