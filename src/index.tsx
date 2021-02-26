import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import * as serviceWorker from './serviceWorker';

// Main Component
import App from './App';

// Routes Manager - inject routes, components, dependencies
import { routerManager } from './Container';

// Styles
import './Styles';

// Define ionic web components
defineCustomElements(window);

// Attach main component
ReactDOM.render(<App routerManager={routerManager} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
