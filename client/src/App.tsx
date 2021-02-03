import Menu from './components/Menu';
import Page from './pages/Page';
import React from 'react';
import { IonApp, IonPage, IonRouterOutlet, IonSplitPane } from '@ionic/react';
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
import Navbar from './components/Navbar/Navbar';
import Machine from './pages/Machine/Machine';
import Help from './pages/Help/Help';
import Settings from './pages/Settings/Settings';

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/Dashboard" component={Dashboard}/>
            <Route path="/Machines" component={Machines}/>
            <Route path="/Machine" component={Machine}/>
            <Route path="/Help" component={Help}/>
            <Route path="/Settings" component={Settings}/>
            <Redirect from="/" to="/Dashboard" exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
