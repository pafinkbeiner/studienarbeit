import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { paperPlaneOutline, paperPlaneSharp, appsSharp, appsOutline, settingsSharp, settingsOutline, albumsSharp, albumsOutline, cubeSharp, cubeOutline, helpCircleOutline, helpCircleSharp} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Dashboard',
    url: '/Dashboard',
    iosIcon: appsOutline,
    mdIcon: appsSharp
  },
  {
    title: 'Machines',
    url: '/Machines',
    iosIcon: albumsOutline,
    mdIcon: albumsSharp
  },
  {
    title: 'Machine',
    url: '/Machine',
    iosIcon: cubeOutline,
    mdIcon: cubeSharp
  }
];

const additionalAppPages: AppPage[] = [
  {
    title: 'Help',
    url: '/Help',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircleSharp
  },
  {
    title: 'Settings',
    url: '/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  }
];

const labels = ['Help', 'Settings'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Condition Monitoring</IonListHeader>
          <br/>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          
          {additionalAppPages.map((appPage, index) => {
            return (
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
