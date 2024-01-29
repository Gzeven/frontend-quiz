import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyleSheetManager } from 'styled-components';

const shouldForwardProp = (prop: string) => prop !== 'dark' ;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
    <App />
    </StyleSheetManager>
  </React.StrictMode>
);



// const shouldForwardProp = (prop: string) => prop !== 'dark' && !prop.startsWith('$') && // Exclude props starting with '$' (transient props)
// prop.toLowerCase() === prop;;

