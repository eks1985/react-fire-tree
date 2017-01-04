import { database } from '../firebase/firebase-app';
import { buildOrder } from './index';

export const updateNodesFirebase = () => {
	const nodesRef = database.ref('nodes');
	return (dispatch, getState) => {
		nodesRef.set(getState().tree);
	};
};

export const listenToNodes = () => {
	const nodesRef = database.ref('nodes');
	return (dispatch, getState) => {
		nodesRef.once('value', snapshot => {
			dispatch({
				type: 'TREE_NODES_RECEIVE_DATA',
				data: snapshot.val()
			});
			dispatch(buildOrder());
		});
	}; 
};