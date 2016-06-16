import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './components/App';
import MainView from './components/MainView.react';
import YAML from 'yamljs';

import Mapper from './components/mapper'

import axios from 'axios';


ReactDOM.render(
  (<MainView />), document.getElementById('content')
);
