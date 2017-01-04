// TODO refactor getChildrenQty => getChildrenIds.length

//COMMON

export const filterArray = (arr, exclude) => arr.reduce((result, elem) => exclude.indexOf(elem) > -1 ? result : result.concat(elem), []);

export const getChildrenQty = (pathStr, tree, order) => {
  const keys = order || Object.keys(tree);
  return keys.reduce((result, key) =>  tree[key].parentPathStr === pathStr ? result + 1 : result, 0);
};


//SORT TREE

// - transform tree object to array -objToArray-
// - sort array by path using function -sortByPath- that using function -pathSum-
// - return array keys -getArrKeys-
// - export to eternal -getSortedTreeKeys-

const pathSum = path => path.reduce((result, current, i) => result += current, 0);
  
const objToArray = obj => Object.keys(obj).map( key => ({ ...{...obj[key]} }) );

const sortByPath = arr => {
  arr.sort((a, b) => {
    if (pathSum(a.path) > pathSum(b.path)) {
      return 1;
    }
    if (pathSum(a.path) < pathSum(b.path)) {
      return -1;
    }
    return 0;
  });
  return arr;
};

const getArrKeys = arr => arr.reduce((result, elem) => [...result, ...[elem.id]], []);

export const getSortedTreeKeys = tree => getArrKeys(sortByPath(objToArray(tree)));

//INSERT BEFORE - AFTER


//BEFORE

// - update next included this
// - insert new on this position (new.path = this.path)

//AFTER 

// - update next NOT included this
// - insert new after this (new.path = updatePath(this.path, 0))


export const getSublingsNextIds = (id, tree, withThis = true) => {
  const path = tree[id].path;
  const sublingCoord = path.length> 1 ? path[path.length - 2] : path[path.length - 1];
  const level = path.length;
  const lastCoord = path[path.length - 1];
  const keys = Object.keys(tree);
  return keys.reduce((result, key) => {
    const currentPath = tree[key].path;
    const currentSublingCoord = currentPath.length> 1 ? currentPath[path.length - 2] : currentPath[currentPath.length - 1];
    const currentLevel = currentPath.length;
    const currentLastCoord = currentPath[currentPath.length - 1];
    //it one the same level && it subling && this condition && it located next to this && this condition
    const notThis = key !== id;
    const thisCondition = withThis ? true : notThis;
    return (currentLevel === level && currentSublingCoord === sublingCoord && currentLastCoord >= lastCoord && thisCondition) || (level === 1 && currentSublingCoord >= sublingCoord && thisCondition) ? result.concat(key) : result;
  }, []);  
};

export const getChildrenIds = (id, tree) => {
  const path = tree[id].path;
  const level = path.length;
  const pathStr = path.toString();
  const keys = Object.keys(tree);
  return keys.reduce((result, key) => {
    const calcPathStr = tree[key].path.slice(0, level).toString();
    return calcPathStr === pathStr && key !== id ? result.concat(key) : result;
  }, []);
};

//offset from end 
export const updatePathUniversal = (path, offset, increment) => {
  const length = path.length;
  const foo = path.slice(0, length - offset - 1) || [];
  const bar = path[length - offset - 1] ;
  const baz = path.slice(path.length - offset) || [];
  return [...foo, bar + increment, ...baz]; 
};

export const getParentPath = path => path.slice(0, path.length - 1);

export const updateSublingsNextNodes = (nextIds, tree, increment = 1, excludeChildrenIds = []) => {
  const result = {};
  nextIds.map(nextId => {
    const path = updatePathUniversal(tree[nextId].path, 0, increment);
    const pathStr = path.join();
    const parentPath = getParentPath(path);
    const parentPathStr = parentPath.join();
    result[nextId] = {...tree[nextId], path, pathStr, parentPathStr};  
    let childrenIds = getChildrenIds(nextId, tree);
    childrenIds = excludeChildrenIds.length === 0 ? childrenIds : filterArray(childrenIds, excludeChildrenIds);
    childrenIds.map(childId => {
      const lengthDiff =  tree[childId].path.length - tree[nextId].path.length;
      const path = updatePathUniversal(tree[childId].path, lengthDiff, increment);
      const pathStr = path.join();
      const parentPath = getParentPath(path);
      const parentPathStr = parentPath.join();
      result[childId] = {...tree[childId], path, pathStr, parentPathStr};
      return true;
    });
    return true;  
  });
  return result;
};

// MOVE

export const getConcat = (parentPath, childPath) => childPath.slice(parentPath.length);

export const applyConcat = (path, concat) => path.concat(concat);

export const updatedMoveChildren = (moveChildrenIds, tree, moveId, newPath) => {
  return moveChildrenIds.reduce((result, childId) => {
    const concat = getConcat(tree[moveId].path, tree[childId].path);
    result[childId] = {...tree[childId], path: applyConcat(newPath, concat)};
    return result;
  }, {});
};


