import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './Machine.css';
import Navbar from '../../components/Navbar/Navbar';
import client from '../../helper/mqtt';
import mqtt from "mqtt"
import { Sensor, StoreModel } from '../../models/Store';
import AddSensor from './AddSensor/AddSensor';
import redButton from "./Button_Icon_Red.svg"
import blackButton from "./Button_Icon_Black.svg"
import greenButton from "./Button_Icon_Green.svg"
import { addOutline, addSharp, refreshOutline, refreshSharp, settingsOutline, settingsSharp, trashBinOutline, trashBinSharp } from 'ionicons/icons';
import AddEs from './AddEs/AddEs';
import EditSensor from './EditSensor/EditSensor';
import MachineChart from './MachineTable/MachineChart';
import axios from "axios";


const Machine: React.FC<{ storeModel: StoreModel }> = (props) => {

  // Allgemein
  const [id, setId] = useState("");
  const [machine, setmachine] = useState<any>();
  const [mqttStatus, setMqttStatus] = useState<boolean>(false);

  // 1
  const [configureEs, setConfigureEs] = useState(false);

  // 2
  const [logs, setLogs] = useState<string[]>([]);

  //3
  // Add Sensor
  const [configureSensor, setConfigureSensor] = useState(false);
  // Edit Sensor
  const [editSensor, setEditSensor] = useState<boolean>(false);
  const [editSensorSelected, setEditSensorSelected] = useState<Sensor>();

  // 3 + 4
  const [selectedSensor, setSelectedSensor] = useState<Sensor>();

  useEffect(() => {
    const le = ((window.location.href).toString().split("/")[(window.location.href).toString().split("/").length - 1]).toString();
    // Following line is not necassary
    if (props.storeModel.machines.length > 0) setId(props.storeModel.machines[0].id.toString());
    setId(le)
    setmachine(props.storeModel.machines.find(item => item.id == id))
  })

  const startMqttTransmission = () => {
    // Turn icon green
    setMqttStatus(true);
    // subscribe to logs
    client.subscribe(`machines/${machine.name}/logs`);
    // subscribe to sensors
    machine.sensors.map((s: Sensor) => {
      // TODO Hier eventuell direkt die topic einbinden
      client.subscribe(`machines/${machine.name}/data/${s.topic}`)
    })

    // Say client how he should handle the requests
    // MQTT subscribtions
    client.on(
      "message",
      (topic: string, payload: Buffer, packet: mqtt.Packet) => {
        // set machine active if it is transmitting information
        if (topic == `machines/${machine.name}/data/operation/running`){
          if(payload.toString() == "true"){
            props.storeModel.setMachineStatus(machine.id, true);
          }else{
            props.storeModel.setMachineStatus(machine.id, false);
          }
        } 

        // check if topic is for log messages
        if (topic == `machines/${machine.name}/logs`) props.storeModel.addLog(machine.id, payload.toString())

        // iterrate trhough the sensors 
        machine.sensors.map((s: Sensor) => {
          if(topic == `machines/${machine.name}/data/${s.topic}`) props.storeModel.addSensorValue(machine.id, s.id, payload.toString())
        })

        // TODO Subscribe to active sensor

        console.log(`Listener on Machine ${machine.name} received value: ${payload.toString()} from Topic: ${topic}`);
      }
    );
  }

  const stopMqttTransmission = () => {
    //turn icon red
    setMqttStatus(false);
    // unsubscribe to mqtt data 
    // subscribe to logs
    client.unsubscribe(`machines/${machine.name}/logs`);
    // subscribe to sensors
    machine.sensors.map((s: Sensor) => {
      // TODO Hier eventuell direkt die topic einbinden
      client.unsubscribe(`machines/${machine.name}/data/${s.topic}`)
    })
    // TODO Unsubscribe to active sensor
    // Remove all listeners
    client.removeAllListeners();
  }

  const executeEs = () => {
    axios.get(`${process.env.REACT_APP_MACHINE}/machines/operation/${machine.id}/stop`);
  }

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
                  <h1 style={{ color: "white" }}>{machine && <>{machine.name}</>}</h1>{ (machine && machine.active) && <h1 style={{color: "white", marginLeft: "0.2rem"}}> - Active</h1> }
                </IonRow>
                <IonRow>
                  <IonCol size="10">
                    <img style={{ width: "65%" }} src="https://www.arburg.com/fileadmin/redaktion/bilder/vollbild_650x320px/144999_920s.jpg" />
                  </IonCol>
                  <IonCol>
                    <div className="stop-container">
                      {(machine) && machine.es != "" ?
                        <img onClick={() => executeEs() } style={{ width: "50%" }} src={redButton}></img>
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
                <IonRow>
                  <IonButton onClick={() => startMqttTransmission()}>Start MQTT</IonButton>
                  <IonButton onClick={() => stopMqttTransmission()}>Stop MQTT</IonButton>
                </IonRow>
                <IonRow>
                <p style={{ marginLeft: "10px" }}>MQTT transmission status: </p>
                  <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginLeft: "15px", paddingTop: "9px" }}>

                    {
                      (mqttStatus == true) ?
                        <img src={greenButton} style={{ width: "30px", height: "30px" }}></img>
                        :
                        <img src={redButton} style={{ width: "30px", height: "30px" }}></img>
                    }

                    <IonIcon onClick={() => {
                      stopMqttTransmission();
                      setTimeout(() => {startMqttTransmission();}, 500)
                    }} style={{ marginLeft: "15px", marginTop: "6px" }} md={refreshOutline} ios={refreshSharp}></IonIcon>

                  </div>
                </IonRow>
              </IonGrid>
            </IonCol>
            <IonCol size="12" sizeLg="6" style={{ backgroundColor: "", height: "46.5vh", marginBottom: "0.5vh" }}>
              {/* Column 2 - Log Messages */}
              <h4>Logs</h4>
              <IonList style={{ height: "85%",  overflowY: "scroll" }}>
                {
                  machine && machine.logs.map((log:string, index:number) => {
                    if (log.search("[INFO]") != -1) {
                      return (<IonItem key={index}><IonLabel ><p style={{ color: "yellow" }}>{log}</p></IonLabel></IonItem>)
                    } else if (log.search("[DEBUG]") != -1) {
                      return (<IonItem key={index}><IonLabel><p style={{ color: "green" }}>{log}</p></IonLabel></IonItem>)
                    } else if (log.search("[ERROR]") != -1) {
                      return (<IonItem key={index}><IonLabel><p style={{ color: "red" }}>{log}</p></IonLabel></IonItem>)
                    } else {
                      return (<IonItem key={index}><IonLabel><p style={{ color: "white" }}>{log}</p></IonLabel></IonItem>)
                    }
                  })
                }
              </IonList>
            </IonCol>

            <IonCol size="12" sizeLg="6" style={{ height: "46vh" }}>
              {/* Column 3 - If Machine Clicked*/}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h4>Sensors</h4>
                <div style={{ marginLeft: "10px" }}>
                  <IonButton onClick={() => setConfigureSensor(true)} ><IonIcon md={addSharp} ios={addOutline}></IonIcon></IonButton>
                </div>
              </div>

              {(configureSensor == true) && <AddSensor machineId={machine.id}
                configureSensor={configureSensor}
                setConfigureSensor={setConfigureSensor}
                addSensor={props.storeModel.addSensor}>
              </AddSensor>}

              <IonGrid style={{ backgroundColor: "#1E1E1E" }}>
                <IonRow>
                  <IonCol><b>name</b></IonCol>
                  <IonCol><b>min</b></IonCol>
                  <IonCol><b>max</b></IonCol>
                  <IonCol><b>value</b></IonCol>
                  <IonCol><b>path</b></IonCol>
                  <IonCol><b>show</b></IonCol>
                  <IonCol><b>edit</b></IonCol>
                  <IonCol><b>remove</b></IonCol>
                </IonRow>

                {machine &&
                  <IonRow>
                    <IonCol style={{ overflowY: "hidden" }}>ES</IonCol>
                    <IonCol style={{ overflowY: "hidden" }}>N/A</IonCol>
                    <IonCol style={{ overflowY: "hidden" }}>N/A</IonCol>
                    <IonCol style={{ overflowY: "hidden" }}>N/A</IonCol>
                    <IonCol style={{ overflowY: "hidden" }}>{machine.es}</IonCol>
                    <IonCol style={{ overflowY: "hidden" }}><IonButton disabled={true} style={{ width: "80%" }}>show</IonButton></IonCol>
                    <IonCol style={{ overflowY: "hidden" }}><IonButton style={{ width: "80%" }}>edit</IonButton></IonCol>
                    <IonCol style={{ overflowY: "hidden" }}>N/A</IonCol>
                  </IonRow>
                }

                {machine &&
                  machine.sensors.map((sensor: Sensor) => {
                    return (
                      <IonRow key={sensor.id}>
                        <IonCol style={{ overflowY: "hidden" }}>{sensor.name}</IonCol>
                        <IonCol style={{ overflowY: "hidden" }}>{sensor.min}</IonCol>
                        <IonCol style={{ overflowY: "hidden" }}>{sensor.max}</IonCol>
                        <IonCol style={{ overflowY: "hidden" }}>N/A</IonCol>
                        <IonCol style={{ overflowY: "hidden" }}>{sensor.topic}</IonCol>
                        <IonCol style={{ overflowY: "hidden" }}><IonButton onClick={() => {
                          setSelectedSensor(sensor);
                          console.log("Selected Sensor changed: ", selectedSensor);
                        }} style={{ width: "80%" }}>show</IonButton></IonCol>
                        <IonCol style={{ overflowY: "hidden" }}><IonButton onClick={() => {
                          setEditSensorSelected(sensor);
                          setEditSensor(true);
                        }} style={{ width: "80%" }}>edit</IonButton></IonCol>
                        <IonCol style={{ overflowY: "hidden" }}><IonIcon onClick={() => props.storeModel.removeSensor(machine.id, sensor.id)} style={{marginTop:"10px", marginLeft:"19px"}} ios={trashBinOutline} md={trashBinSharp} ></IonIcon></IonCol>
                      </IonRow>
                    )
                  })
                }

                {
                  (editSensorSelected && editSensor == true) && <EditSensor
                    machineId={machine.id}
                    editSensor={editSensor}
                    setEditSensor={setEditSensor}
                    addSensor={props.storeModel.addSensor}
                    removeSensor={props.storeModel.removeSensor}
                    selectedSensor={editSensorSelected}
                  />
                }

              </IonGrid>
            </IonCol>
            <IonCol size="12" sizeLg="6" style={{ backgroundColor: "#1E1E1E", height: "46vh" }}>
              {/* Column 4 - Machine Overview */}
              {selectedSensor &&
                <MachineChart values={selectedSensor.values} min={selectedSensor.min} max={selectedSensor.max}/>
              }
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Machine;
