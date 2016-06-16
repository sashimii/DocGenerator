import React from 'react';
import {Link} from 'react-router';

export default class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.name;

    return (
      <div className="sidebar-item">
        <Link>{name}</Link>
      </div>
    )
  }
}
