import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { home, informationCircle, switcher } from 'ionicons/icons';
import Home from './Home';
import About from './About';
import Settings from './Settings';
import Details from './EditTeaCategory';

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Redirect exact path="/tabs" to="/tabs/home" />
      <Route path="/tabs/home" render={() => <Home />} exact={true} />
      <Route path="/tabs/home/edit-tea-category" component={Details} />
      <Route path="/tabs/about" component={About} exact={true} />
      <Route path="/tabs/settings" component={Settings} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs/home">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="about" href="/tabs/about">
        <IonIcon icon={informationCircle} />
        <IonLabel>About</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/tabs/settings">
        <IonIcon icon={switcher} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
