import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, {useEffect, useState} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import io from "socket.io-client"
import './Home.css';

const Home: React.FC = () => {

  const [state, setstate] = useState("");

  useEffect(() => {
      const socket = io('http://localhost:3000')
      socket.on('color change', (data: any) => {
        setstate(data);
      });
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{state}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
