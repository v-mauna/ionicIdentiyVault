import React from 'react';
import { Route } from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { homeOutline, informationCircleOutline, optionsOutline } from 'ionicons/icons';
import Home from './Home';
import About from './About';
import Settings from './Settings';
import EditTeaCategory from './EditTeaCategory';
import BlankPage from './BlankPage';

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/tabs" component={BlankPage} />
      <Route path="/tabs/home" render={() => <Home />} exact={true} />
      <Route path="/tabs/home/edit-tea-category/:id" component={EditTeaCategory} />
      <Route path="/tabs/about" component={About} exact={true} />
      <Route path="/tabs/settings" component={Settings} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/tabs/home">
        <IonIcon icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="about" href="/tabs/about">
        <IonIcon icon={informationCircleOutline} />
        <IonLabel>About</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/tabs/settings">
        <IonIcon icon={optionsOutline} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
