import { combineReducers } from 'redux';
//reducers
import auth from './auth';
import tree from './tree';
import move from './move';
import modal from './../lib/modal/reducers/index';
import editTitle from './edit-title';
import order from './order';

const rootReducer = combineReducers({
	auth,
	tree,
	move,
	modal,
	editTitle,
	order
});

export default rootReducer;