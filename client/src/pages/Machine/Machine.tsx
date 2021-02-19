import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import './Machine.css';
import Navbar from '../../components/Navbar/Navbar';
import client from '../../helper/mqtt';
import mqtt from "mqtt"
import { AMachine, StoreModel } from '../../models/Store';
import AddSensor from './AddSensor/AddSensor';
import redButton from "./Button_Icon_Red.svg"
import blackButton from "./Button_Icon_Black.svg"
import { settingsOutline, settingsSharp } from 'ionicons/icons';
import AddEs from './AddEs/AddEs';
import { DatabaseHandler } from '../../helper/db';


const Machine: React.FC<{ storeModel: StoreModel }> = (props) => {

  const [id, setId] = useState("");
  const [machine, setmachine] = useState<any>(undefined)
  const [configureEs, setConfigureEs] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {

    const le = ((window.location.href).toString().split("/")[(window.location.href).toString().split("/").length - 1]).toString();
    // Following line is not necassary
    if (props.storeModel.machines.length > 0) setId(props.storeModel.machines[0].id.toString());
    setId(le)
    setmachine(props.storeModel.machines.find(item => item.id == id))

    // get the last log messages
    let db = DatabaseHandler.getDbInstance();

    // get 2 last logs from every machine
    if (logs.length < 1) {
      if (machine != undefined) {
        db.get(machine.id)?.logs.slice(0, 2).map(log => {
          setLogs((state: string[]) => [...state, log]);
        });
      }
    }


    // Subscribe to mqtt feed
    return () => {
      // Unsubscribe from mqtt feed
    }
  })

  //MQTT for later
  // const [connectionStatus, setConnectionStatus] = React.useState(false);
  // const [messages, setMessages] = React.useState("");

  // useEffect(() => {
  //   client.on(
  //     "message",
  //     (topic: string, payload: Buffer, packet: mqtt.Packet) => {
  //       setMessages(payload.toString() + "topic: " + topic);

  //       console.log("Message received: ", payload.toString());
  //     }
  //   );
  // }, []);

  const trigger = () => {
    client.subscribe(`machines/+/logs`);
  };


  return (
    <IonPage>

      <Navbar title="Machine" />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Machine</IonTitle>
          </IonToolbar>
        </IonHeader>



        <IonGrid>

          <IonRow>
            <IonCol size="12" sizeLg="6" style={{ backgroundColor: "", height: "46.5vh", marginBottom: "0.5vh" }}>
              {/* Column 1 - Machine Overview */}
              <IonGrid>
                <IonRow>
                  <h1 style={{ color: "white" }}>{machine && machine.name}</h1>
                </IonRow>
                <IonRow>
                  <IonCol size="10">
                    <img style={{ width: "500px" }} src="https://www.arburg.com/fileadmin/redaktion/bilder/vollbild_650x320px/144999_920s.jpg" />
                  </IonCol>
                  <IonCol>
                    <div className="stop-container">
                      {(machine) && machine.es != "" ?
                        <img style={{ width: "50%" }} src={redButton}></img>
                        :
                        <img style={{ width: "50%" }} src={blackButton}></img>
                      }
                      <br />
                      {
                        machine && <IonIcon onClick={() => setConfigureEs(true)} md={settingsOutline} ios={settingsSharp}></IonIcon>
                      }
                      {machine && <AddEs modal={configureEs} setModal={setConfigureEs} machineId={machine.id} addEs={props.storeModel.addEs}></AddEs>}
                    </div>
                  </IonCol>
                </IonRow>

              </IonGrid>
            </IonCol>
            <IonCol size="12" sizeLg="6" style={{ backgroundColor: "grey", height: "46.5vh", marginBottom: "0.5vh", overflowY: "scroll"}}>
              {/* Column 2 - Log Messages */}
              <IonList>
                {
                  logs && logs.map((log, index) => {
                    console.log("asdadadasda",log.search("[INFO]"))
                    if(log.search("[INFO]") != -1){
                      return (<IonItem  key={index}><IonLabel ><p style={{color:"yellow"}}>{log}</p></IonLabel></IonItem>)
                    }else if(log.search("[DEBUG]") != -1){
                      return (<IonItem  key={index}><IonLabel><p style={{color:"green"}}>{log}</p></IonLabel></IonItem>)
                    }else if(log.search("[ERROR]") != -1){
                      return (<IonItem  key={index}><IonLabel><p style={{color:"red"}}>{log}</p></IonLabel></IonItem>)
                    }else{
                      return (<IonItem  key={index}><IonLabel><p style={{color:"white"}}>{log}</p></IonLabel></IonItem>)
                    }
                  })
                }

                <IonItem>
                  <IonLabel>askldaslkd</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>askldaslkd</IonLabel>
                </IonItem>

              </IonList>
            </IonCol>

            <IonCol size="12" sizeLg="6" style={{ backgroundColor: "blue", height: "46vh" }}>
              {/* Column 3 - If Machine Clicked*/}
            </IonCol>
            <IonCol size="12" sizeLg="6" style={{ backgroundColor: "yellow", height: "46vh" }}>
              {/* Column 4 - Machine Overview */}
            </IonCol>
          </IonRow>

        </IonGrid>

        {/* <AddSensor addSensor={props.storeModel.addSensor}/> */}
        <IonButton onClick={trigger}>Logs</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Machine;
