import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import { title } from 'process';
import React from 'react';
import "./Navbar.css";

interface ContainerProps {
    title: string
}

const Navbar: React.FC<ContainerProps> = ({title}) => {
  return (
    <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  </IonHeader>
  );
};

export default Navbar;
