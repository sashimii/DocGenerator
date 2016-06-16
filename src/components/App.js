import React from 'react';
import {Link}  from 'react-router';


export default React.createClass({
  returnSomething(something) {
    //this is only for testing purposes. Check /test/components/App-test.js
    return something;
  },
  render() {

    return (
      <div>
        <header>
          <h1>FactoryMod Recipes for CivTemp</h1>
          <Link to="/factories">List of Factories</Link>
        </header>
        <section>
          {this.props.children || 'Factories'}
        </section>
      </div>
    )
  }
});
