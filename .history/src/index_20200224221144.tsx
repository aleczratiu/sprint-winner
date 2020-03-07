import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import './index.css';

const FirebaseContext = React.createContext(null);

ReactDOM.render(
  <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>
      ,
    </Provider>,
    document.getElementById('root'),
);


serviceWorker.register();
