import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import Firebase, { FirebaseContext } from './firebase/index';

// const FirebaseContext = React.createContext(null);

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
    document.getElementById('root'),
);


serviceWorker.register();
