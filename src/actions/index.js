import { v4 } from 'node-uuid';
import { updateNodesFirebase } from './tree-firebase';
import { getSortedTreeKeys } from './../common';

// TODO: rebuild index on every data change operation
export const buildOrder = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'BUILD_ORDER',
      payload: getSortedTreeKeys(getState().tree)
    });
  };
};

// EXPAND / COLLAPSE

export const expand = id => {
  return dispatch => {
    dispatch({
      type: 'TREE_EXPAND',
      id
    });
    dispatch(updateNodesFirebase());
  };
};

export const collapse = id => {
  return dispatch => {
    dispatch({
      type: 'TREE_COLLAPSE',
      id
    });
    dispatch(updateNodesFirebase());
  };
};

// ADD {child, before, after} / DELETE

export const addNode = (insertToId, insertToType) => {
  return (dispatch, getState) => {
    const treeLength = v4();
    dispatch({
      type: 'TREE_ADD_NODE',
      id: treeLength,
      insertToId,
      insertToType,
    });
    dispatch(buildOrder());
    dispatch(updateNodesFirebase());
  };
};

export const deleteNode = deleteId => {
  return dispatch => {
    dispatch({
      type: 'TREE_DELETE_NODE',
      deleteId
    });
    dispatch(buildOrder());
    dispatch(updateNodesFirebase());
  };
};

// MOVE

// TODO restriction to move to inself or to any of it's children

// Select what to move

export const setMoveObject = (moveId, moveType) => {
  return {
    type: 'TREE_SET_MOVE_OBJECT',
    moveId,
    moveType
  };
};

// Complete move
// completeMove => commitMove + RESET_MOVE

const commitMove = (moveId, moveType, moveToId) => {
  return {
    type: 'TREE_COMMIT_MOVE',
    moveId,
    moveType,
    moveToId
  };
};

export const completeMove = moveToId => {
  return (dispatch, getState) => {
    const { moveId, moveType } = getState().move;
    dispatch(commitMove(moveId, moveType, moveToId));
    dispatch({
      type: 'TREE_RESET_MOVE'
    });
    dispatch(buildOrder());
    dispatch(updateNodesFirebase());
  };
};

// Edit title

export const startEditTitle = (id, title) => {
  return dispatch => {
    dispatch({
      type: 'TREE_START_EDIT_TITLE',
      id,
    });
  };
};

export const commitEditTitle = title => {
  return (dispatch, getState) => {
    const id = getState().editTitle.id;
    dispatch({
      type: 'TREE_COMMIT_EDIT_TITLE',
      id,
      title,
    });
    dispatch(updateNodesFirebase());
  };
};

export const setCurrentNodeId = id => (
  {
    type: 'SET_CURRENT_NODE_ID',
    id
  }
);

