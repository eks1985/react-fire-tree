import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth from './components/auth';
import Tree from './components';
import * as treeActions from './actions/index';
import * as modalActions from './lib/modal/actions/index' ;

class App extends Component {
  
  render() {
    return (
      <div className="App" style={{padding: 10}}>
        <Auth />
        <Tree {...this.props} {...treeActions} {...modalActions} />
      </div>
    );
  }
}

App = connect(
  state => ({ data: state.tree, order: state.order })
)(App);

export default App;
