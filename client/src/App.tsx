import Menu from './components/Menu';
import Page from './pages/Page';
import React, { useEffect, useState } from 'react';
import { IonApp, IonLoading, IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react';
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

const App: React.FC = (props) => {

  // State Management
  const [machines, setMachines] = useState<AMachine[]>([]);
  const [loading, setLoading ] = useState(true);

  // Machine Opertations
  const addMachine = (machine: AMachine) => setMachines([...machines, machine]);
  const removeMachine = (machineId: string) => setMachines(machines.filter(machine => machine.id != machineId));

  // Sensor Operations
  const addSensor = (machineId: string, sensor: Sensor) => {
    const machine = machines.find(machine => machine.id == machineId);
    if(machine != undefined){
      machine.sensors.push(sensor);
      removeMachine(machine.id);
      addMachine(machine);
    }
  }
  const removeSensor = (machineId: string, sensorId: string) => {
    const machine = machines.find(machine => machine.id == machineId);
    if(machine != undefined){
      machine.sensors = machine.sensors.filter(sensor => sensor.id != sensorId);
      removeMachine(machine.id);
      addMachine(machine);
    }
  }

  const StoreModel: StoreModel = {
    machines,
    loading,
    setMachines,
    setLoading, 
    addMachine,
    removeMachine,
    addSensor,
    removeSensor
}

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/Dashboard" render={() => <Dashboard  storeModel={StoreModel}  />} />
            <Route path="/Machines" render={() => <Machines storeModel={StoreModel}/>}/>
            <Route exact path="/Machine" render={() => <Machines storeModel={StoreModel}/>}/>
            <Route path="/Machine/:id" render={ () => <Machine {...props} storeModel={StoreModel}/> }/>
            <Route path="/PreMain" render={ () => <PreMain storeModel={StoreModel}/> }/>
            <Route path="/Help" component={Help}/>
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
