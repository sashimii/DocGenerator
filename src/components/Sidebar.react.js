import React from 'react';
import {Link} from 'react-router';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        {this.props.children}
      </div>
    )
  }
}
