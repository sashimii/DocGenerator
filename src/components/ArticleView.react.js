import React from 'react';
import {Link} from 'react-router';
import showdown from 'showdown';

let converter = new showdown.Converter();

export default class ArticleView extends React.Component {
  constructor(props) {
    super(props);
  }

  generateHtml() {
    return {__html: converter.makeHtml(this.props.markdown)};
  }

  render() {
    return (
      <div className="article-view" dangerouslySetInnerHTML={this.generateHtml()}>
      </div>
    )
  }
}
