import Menu from './components/Menu';
import React, { useEffect, useState } from 'react';
import { IonApp, IonLoading, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Machines from './pages/Machines/Machines';
import Machine from './pages/Machine/Machine';
import Help from './pages/Help/Help';
import Settings from './pages/Settings/Settings';

import { Sensor, StoreModel, AMachine } from './models/Store';
import PreMain from './pages/PreMain/PreMain';
import { DatabaseHandler } from './helper/db';

const App: React.FC = (props) => {

  const db = DatabaseHandler.getDbInstance();

  // State Management
  const [machines, setMachines] = useState<AMachine[]>([]);
  const [loading, setLoading ] = useState(true);

  // Machine Opertations
  const addMachine = (machine: AMachine) => {
    setMachines([...machines, machine]);
    db.push(machine);
  }
  const removeMachine = (machineId: string) => {
    setMachines(machines.filter(machine => machine.id !== machineId));
    db.remove(machineId);
  }

  // Sensor Operations
  const addSensor = (machineId: string, sensor: Sensor) => {
    setMachines( (state: AMachine[]) => {
      let newState = state;
      let machine = newState.find(m => m.id === machineId)
      if(machine !== undefined){
        machine.sensors = [...machine.sensors, sensor];
        return [...state.filter(m => m.id !== machineId),  machine]; 
      }else{
        return state;
      }
    })
    db.override(machines);
  }
  const removeSensor = (machineId: string, sensorId: string) => {
    setMachines( (state: AMachine[]) => {
      let machine = state.find(m => m.id === machineId)
      if(machine !== undefined){
        machine.sensors = [...machine.sensors.filter(s => s.id !== sensorId)];
        return [...state.filter(m => m.id !== machineId)]; 
      }else{
        return state;
      }
    })
    db.override(machines);
  }

    // Es Operations
    const addEs = (machineId: string, es: string) => {
      setMachines( (state: AMachine[]) => {
        let machine = state.find(m => m.id === machineId)
        if(machine !== undefined){
          machine.es = es;
          return [...state.filter(m => m.id !== machineId),  machine]; 
        }else{
          return state;
        }
      })
      db.override(machines);
    }

    const addLog = (machineId: string, log: string) => {
      setMachines( (state: AMachine[]) => {
        let machine = state.find(m => m.id === machineId)
        if(machine !== undefined){
          machine.logs = [...machine.logs, log];
          return [...state.filter(m => m.id !== machineId),  machine]; 
        }else{
          return state;
        }
      })
      db.override(machines);
    }

    const addSensorValue = (machineId: string, sensorId: string, value: string) => {
      setMachines( (state: AMachine[]) => {
        let newState = state;
        let machine = newState.find(m => m.id === machineId)
        if(machine !== undefined){
          machine.sensors.find(s => s.id == sensorId)?.values.push({
            value: Number.parseInt(value),
            date: Date.now().toString()
          })
          return [...state.filter(m => m.id !== machineId),  machine]; 
        }else{
          return state;
        }
      })
      db.override(machines);
    }

    const setMachineStatus = (machineId: string, active: boolean) => {
      setMachines( (state: AMachine[]) => {
        let machine = state.find(m => m.id === machineId)
        if(machine !== undefined){
          machine.active = active;
          return [...state.filter(m => m.id !== machineId),  machine]; 
        }else{
          return state;
        }
      })
      db.override(machines);
    }

  const StoreModel: StoreModel = {
    machines,
    loading,
    setMachines,
    setLoading, 
    addMachine,
    removeMachine,
    addSensor,
    removeSensor,
    addEs,
    addLog,
    addSensorValue,
    setMachineStatus,
}

  //DEBUG
  useEffect(() => {
    //TEMp load machines to db
              // if(machines.length < 1){
                /*   setMachines([
        {name: "Machine 1", id:"789jf824j29f8j2", sensors: [{name: "sensor1", min: 8, max: 23, id: "235j2ioj235oi2j52i5j", topic: "/sakdj/topic",values: [{value: 5, date: "12345"},{value: 6, date: "1235"},{value: 8, date: "1236"} ]}], logs: ["log1", "[ERROR] An error occured while starting machine..."], es:"/test"}, 
        {name: "Machine 2", id:"789jf82asdasdasdj2", sensors: [], logs: ["[DEBUG] The System is starting up....", "[INFO] System started"], es: ""}
      ])
              // }*/ 
    //clear db
              // db.remove("*");
    //add machines to db
              // machines.map(m => db.push(m))
      if(machines.length < 1){
        setMachines(db.getAll());
      }
  })

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/Dashboard" render={() => <Dashboard  storeModel={StoreModel}  />} />
            <Route path="/Machines" render={() => <Machines storeModel={StoreModel}/>}/>
            <Route exact path="/Machine" render={() => <Machines storeModel={StoreModel}/>}/>
            <Route path="/Machine/:id" render={ () => <Machine storeModel={StoreModel}/> }/>
            <Route path="/PreMain" render={ () => <PreMain storeModel={StoreModel}/> }/>
            <Route path="/Settings" component={Settings}/>
            <Redirect from="/" to="/Dashboard" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      <IonLoading
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'Please wait...'}
        duration={500}
      />
    </IonApp>
  );
};

export default App;
