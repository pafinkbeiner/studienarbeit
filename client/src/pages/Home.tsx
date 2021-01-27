import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, {useEffect, useState} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import {socket} from "../helper/ws"
import './Home.css';

const Home: React.FC = () => {

  const [state, setstate] = useState("");
  const [button, setButton] = useState(false)

  useEffect(() => {

    console.log(button);
    
      socket.on('machineRes', (data: any) => {
        console.log(data);
      });

  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Title{state}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{state}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <button onClick={(e) => { setButton( !button ) }} >BUTTON</button>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
