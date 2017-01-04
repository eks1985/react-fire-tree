import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { listenToAuth } from './actions/auth';
// import { listenToNodes } from './actions/tree-firebase';
import App from './App';
import store from './store';

export default class root extends Component {
  
  componentWillMount()  { 
		store.dispatch(listenToAuth());
		// store.dispatch(listenToNodes());
	}
  
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
  
}

