import React from 'react';
import {Link} from 'react-router';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';
import Sidebar from './Sidebar.react';
import SidebarItem from './SidebarItem.react';
import ArticleView from './ArticleView.react';
import YAML from 'yamljs';
import config from '../../config';
import DataHandler from '../lib/dataHandler';

let dataHandler = new DataHandler(config().username, config().repoName, config().dataSrcRoot);


export default class MainView extends React.Component {
  constructor(props) {
    super(props);
  }

  _getPage(nextState, done) {
    const path = nextState.location.pathname;
    dataHandler.getArticleData(path);
  }

  render() {

    const _articleWithMarkdown = (rawMarkdown) => {
      console.log(rawMarkdown);
      return () => {
        return (<ArticleView markdownURL={rawMarkdown} />);
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
          <Router>
            <Route path="/" component={_articleWithMarkdown('# Hello friends! This is awesome!')}>
              <IndexRoute getComponent={this._getPage} />
              <Route getComponent={this._getPage} path="*" />
            </Route>
          </Router>
        </div>
      </div>
    )
  }
}
