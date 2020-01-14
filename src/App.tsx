import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import Tabs from './pages/Tabs';
import { store } from './store';

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
import './theme/styles.css';
import { load as loadAuth } from './store/auth-actions';
import AuthMonitor from "./components/AuthMonitor";

const App: React.FC = () => {
  store.dispatch(loadAuth());

  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/tabs" component={Tabs} />
            <Route path="/login" component={Login} />
            <Route path="/" render={() => <Redirect to="/tabs" />} exact={true} />
          </IonRouterOutlet>
          <AuthMonitor></AuthMonitor>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
