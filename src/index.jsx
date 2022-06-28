import 'babel-polyfill';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/application.scss';
import App from './App';
import 'react-dates/initialize';

ReactDOM.render(<App />, document.getElementById('root'));
