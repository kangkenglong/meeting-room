import React from 'react';
import ReactDOM from 'react-dom/client';
import {Exception, bootstrap} from 'core-fe/src';
import App from './App.tsx';
import './index.css';
import './assets/reset-and-normalize.scss';

function* handleError(error: Exception) {
  console.log(error);
}

bootstrap({
    componentType: App,
    rootContainer: document.getElementById('root')!,
    errorListener: {
      onError: handleError,
    },
});

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
// );
