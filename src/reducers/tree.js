import treeNode from './tree-node';
import api from './api.json';

import { 
  getChildrenIds, 
  getChildrenQty, 
  getSublingsNextIds, 
  updateSublingsNextNodes, 
  updatePathUniversal, 
  getConcat, 
  applyConcat, 
  filterArray ,
  getParentPath
} from '../common';

// highcharts api

let initialState = {};

const keys = Object.keys(api);
const maxLevel = keys.reduce((res, key) => {
  const fullName = api[key].fullname;
  const arr = fullName.split('.');
  return (arr.length > res && fullName.indexOf('<') === -1 ) ? arr.length : res;
}, 0);

let result;
const index1 = {};

let iterator = [];
for (var i = 1; i <= maxLevel; i++) {
  iterator.push(i);
}

iterator.forEach( i => {
  result = keys.reduce((res, key) => {
    const fullName = api[key].fullname;
    if ((api[key].isParent === false && api[key].returnValue === '') || fullName.indexOf('<') !== -1 || fullName.slice(-1) === '.'   ){
      return res;
    }
    const arr = fullName.split('.');
    if (arr.length >= 2 && fullName.indexOf('plotOptions') > -1 && fullName.indexOf('plotOptions.series') === -1) {
      return res;
    }
    return arr.length === i  ? [ ...res, key ] : res;
  }, []);
  
  if (i === 1) {
    initialState = result.reduce((res, key, j) => {
      // index1[api[key].name] = { path: [j] };
      index1[api[key].name] = [j];
      return { ...res, [key]: { id: key, collapsed: true, title: api[key].title, path: [j], pathStr: [j].join(), parentPathStr: '' } };
    } , {});
  }
  
  // if (i === 2) {
  //   result.forEach(key => {
  //     const insertToPath = index1[api[key].parent];
  //     const childrenQty = getChildrenQty(insertToPath, initialState);
  //     const newNodePath = insertToPath.concat(childrenQty);
  //     const action  = { type: 'TREE_ADD_NODE', id: key, collapsed: true, title: api[key].title, pathStr: newNodePath.join(), parentPathStr: insertToPath.join() };
  //     initialState =  { ...initialState, [key]: treeNode(undefined, {...action, path: newNodePath})};
  //     index1[api[key].name] = newNodePath;
  //   });
  // }
  
  // if (i === 3) {
  //   result.forEach(key => {
  //     const insertToPath = index1[api[key].parent];
  //     const childrenQty = getChildrenQty(insertToPath, initialState);
  //     const newNodePath = insertToPath.concat(childrenQty);
  //     const action  = { type: 'TREE_ADD_NODE', id: key, collapsed: true, title: api[key].title, pathStr: newNodePath.join(), parentPathStr: insertToPath.join() };
  //     initialState =  { ...initialState, [key]: treeNode(undefined, {...action, path: newNodePath})};
  //     index1[api[key].name] = newNodePath;
  //   });
  // }
  
  // if (i === 4) {
  //   result.forEach(key => {
  //     const insertToPath = index1[api[key].parent];
  //     const childrenQty = getChildrenQty(insertToPath, initialState);
  //     const newNodePath = insertToPath.concat(childrenQty);
  //     const action  = { type: 'TREE_ADD_NODE', id: key, collapsed: true, title: api[key].title, pathStr: newNodePath.join(), parentPathStr: insertToPath.join() };
  //     initialState =  { ...initialState, [key]: treeNode(undefined, {...action, path: newNodePath})};
  //     index1[api[key].name] = newNodePath;
  //   });
  // }
  
  // if (i === 5) {
  //   result.forEach(key => {
  //     const insertToPath = index1[api[key].parent];
  //     const childrenQty = getChildrenQty(insertToPath, initialState);
  //     const newNodePath = insertToPath.concat(childrenQty);
  //     const action  = { type: 'TREE_ADD_NODE', id: key, collapsed: true, title: api[key].title, pathStr: newNodePath.join(), parentPathStr: insertToPath.join() };
  //     initialState =  { ...initialState, [key]: treeNode(undefined, {...action, path: newNodePath})};
  //     index1[api[key].name] = newNodePath;
  //   });
  // }
  
  // if (i === 6) {
  //   result.forEach(key => {
  //     const insertToPath = index1[api[key].parent];
  //     const childrenQty = getChildrenQty(insertToPath, initialState);
  //     const newNodePath = insertToPath.concat(childrenQty);
  //     const action  = { type: 'TREE_ADD_NODE', id: key, collapsed: true, title: api[key].title, pathStr: newNodePath.join(), parentPathStr: insertToPath.join()};
  //     initialState =  { ...initialState, [key]: treeNode(undefined, {...action, path: newNodePath})};
  //     index1[api[key].name] = newNodePath;
  //   });
  // }
  
});

// console.log('initialState', initialState);
// highcharts api

//id, title, collapsed, path

// initialState = {};

export default (
  state = initialState, action
) => {
  switch (action.type) {
    case 'TREE_EXPAND': 
      return {...state, [action.id]: {...state[action.id], collapsed: false}};
    case 'TREE_COLLAPSE': 
      return {...state, [action.id]: {...state[action.id], collapsed: true}};
    case 'TREE_ADD_NODE': 
      const { id, insertToId, insertToType } = action;
      if (insertToType === "child") {
        const insertToPath = state[insertToId].path;
        const insertToPathStr = insertToPath.join();
        const childrenQty = getChildrenQty(insertToPathStr, state);
        const newNodePath = insertToPath.concat(childrenQty);
        return {...state, [id]: treeNode(undefined, {...action, path: newNodePath, pathStr: newNodePath.join(), parentPathStr: insertToPathStr })};
      } else if (insertToType === "before") {
        let treeCopy = {...state};
        const nextIds = getSublingsNextIds(insertToId, state);
        const updatedNext = updateSublingsNextNodes(nextIds, treeCopy, 1);
        const insertToPath = state[insertToId].path;
        return {...treeCopy, ...updatedNext, [id]: treeNode(undefined, {...action, path: insertToPath, pathStr: insertToPath.join(), parentPathStr: state[insertToId].parentPathStr })};
      } else if (insertToType === "after") {
        let treeCopy = {...state};
        const nextIds = getSublingsNextIds(insertToId, state, false);
        const updatedNext = updateSublingsNextNodes(nextIds, treeCopy,  1);
        const path = updatePathUniversal(state[insertToId].path, 0, 1);
        const pathStr = path.join();
        const parentPath = getParentPath(path);
        const parentPathStr = parentPath.join();
        return {...treeCopy, ...updatedNext, [id]: treeNode(undefined, {...action, path, pathStr, parentPathStr })};
      }
      return state;
    case 'TREE_DELETE_NODE': 
      const { deleteId } = action;
      let treeCopy = {...state};
      const nextIds = getSublingsNextIds(deleteId, state, false);
      const updatedNext = updateSublingsNextNodes(nextIds, treeCopy, -1);
      treeCopy = {...treeCopy, ...updatedNext};
      delete treeCopy[deleteId];
      let childrenToDeleteIds = getChildrenIds(deleteId, state);
      for (var key of childrenToDeleteIds) {
        delete treeCopy[key];
      }
      return treeCopy;
    case 'TREE_COMMIT_MOVE':
      const { moveId, moveToId, moveType } = action;
      if (moveType === 'before') {
        let treeCopy = {...state};
        //update sublings next to moveId with decrement
        //because we cut move from it's place
        let nextToMoveIds = getSublingsNextIds(moveId, state, false);
        const updatedNextToMove = updateSublingsNextNodes(nextToMoveIds, treeCopy, -1);
        treeCopy = {...treeCopy, ...updatedNextToMove};
        //move
        //update children of move and move 
        const newPath = treeCopy[moveToId].path; //get path of alreafy updated moveTo 
        const moveChildrenIds = getChildrenIds(moveId, state);
        const updatedMoveChildren = moveChildrenIds.reduce((result, childId) => {
          const concat = getConcat(state[moveId].path, state[childId].path);
          const path = applyConcat(newPath, concat);
          const pathStr = path.join();
          const parentPath = getParentPath(path);
          const parentPathStr = parentPath.join();
          result[childId] = {...state[childId], path, pathStr, parentPathStr};
          return result;
        }, {});
        treeCopy = {...treeCopy, ...updatedMoveChildren, [moveId]: {...state[moveId], path: newPath, pathStr: newPath.join, parentPathStr: getParentPath(newPath).join() }};
        //update moveToNext included moveTo
        let nextToMoveToIds = getSublingsNextIds(moveToId, treeCopy);
        nextToMoveToIds = filterArray(nextToMoveToIds, [moveId]);
        const toBeExcluded  = moveChildrenIds.concat(moveId);
        const updatedNextToMoveTo = updateSublingsNextNodes(nextToMoveToIds, treeCopy, 1, toBeExcluded);
        treeCopy = {...treeCopy, ...updatedNextToMoveTo};
        return treeCopy;
      } else if (moveType === 'after') {
        let treeCopy = {...state};
        //update sublings next to moveId with decrement
        //because we cut move from it's place
        let nextToMoveIds = getSublingsNextIds(moveId, state, false);
        const updatedNextToMove = updateSublingsNextNodes(nextToMoveIds, treeCopy, -1);
        treeCopy = {...treeCopy, ...updatedNextToMove};
        //move
        //update children of move and move 
        const newPath = updatePathUniversal(treeCopy[moveToId].path, 0, 1); //get path of alreafy updated moveTo 
        const moveChildrenIds = getChildrenIds(moveId, state);
        const updatedMoveChildren = moveChildrenIds.reduce((result, childId) => {
          const concat = getConcat(state[moveId].path, state[childId].path);
          const path = applyConcat(newPath, concat);
          const pathStr = path.join();
          const parentPath = getParentPath(path);
          const parentPathStr = parentPath.join();
          result[childId] = {...state[childId], path, pathStr, parentPathStr};
          return result;
        }, {});
        treeCopy = {...treeCopy, ...updatedMoveChildren, [moveId]: {...state[moveId], path: newPath, pathStr: newPath.join, parentPathStr: getParentPath(newPath).join()}};
        //update moveNext excluded move
        let nextToMoveIdsAfterMove = getSublingsNextIds(moveId, treeCopy, false);
        nextToMoveIdsAfterMove = filterArray(nextToMoveIdsAfterMove, [moveId]);
        const toBeExcluded  = moveChildrenIds.concat(moveId);
        const updatedNextToMoveAfterMove = updateSublingsNextNodes(nextToMoveIdsAfterMove, treeCopy, 1, toBeExcluded);
        treeCopy = {...treeCopy, ...updatedNextToMoveAfterMove};
        return treeCopy; 
      } else if (moveType === 'child') {
        let treeCopy = {...state};
        //update sublings next to moveId with decrement
        //because we cut move from it's place
        let nextToMoveIds = getSublingsNextIds(moveId, state, false);
        const updatedNextToMove = updateSublingsNextNodes(nextToMoveIds, treeCopy, -1);
        treeCopy = {...treeCopy, ...updatedNextToMove};
        //move
        //update children of move and move 
        //when calculate newPath last coord decrease 1 if moveTo contains move 
        const moveToPath = treeCopy[moveToId].path;
        const moveToPathStr = moveToPath.join();
        let childrenQty = getChildrenQty(moveToPathStr, treeCopy);
        const moveLevel = state[moveId].path.length;
        const moveToLevel = moveToPath.length;
        if (moveLevel === moveToLevel + 1)  {
          childrenQty -= 1; 
        }
        const newPath = moveToPath.concat(childrenQty);
        const moveChildrenIds = getChildrenIds(moveId, state);
        const updatedMoveChildren = moveChildrenIds.reduce((result, childId) => {
          const concat = getConcat(state[moveId].path, state[childId].path);
          const path = applyConcat(newPath, concat);
          const pathStr = path.join();
          const parentPath = getParentPath(path);
          const parentPathStr = parentPath.join();
          result[childId] = {...state[childId], path, pathStr, parentPathStr};
          return result;
        }, {});
        treeCopy = { ...treeCopy, ...updatedMoveChildren, [moveId]: {...state[moveId], path: newPath, pathStr: newPath.join(), parentPathStr: getParentPath(newPath).join() } };
        return treeCopy; 
      }
      return state;
    case 'TREE_NODES_RECEIVE_DATA':
      return {...state, ...action.data};
    case 'TREE_COMMIT_EDIT_TITLE':
      return {...state, [action.id]: {...state[action.id], title: action.title}};
    default:
      return state;
  }
};

