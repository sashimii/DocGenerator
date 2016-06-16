import React from 'react';
import {Link} from 'react-router';
import {Router, Route, hashHistory} from 'react-router';
import Sidebar from './Sidebar.react';
import SidebarItem from './SidebarItem.react';
import ArticleView from './ArticleView.react';
import YAML from 'yamljs';

import axios from 'axios';


export default class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const _articleWithMarkdown = (rawMarkdown) => {
      console.log(rawMarkdown);
      return () => {
        return (<ArticleView markdown={rawMarkdown} />);
      };
    }

    return (
      <div>
        <div className="medium-3 columns">
          <Sidebar>
            <SidebarItem name="Hello World" />
          </Sidebar>
        </div>
        <div className="medium-9 columns">
          <Router history={hashHistory}>
            <Route path="/" component={_articleWithMarkdown('# Hello friends! This is awesome!')}/>
          </Router>
        </div>
      </div>
    )
  }
}
