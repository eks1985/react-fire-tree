export default (
  state, action  
) => {
  switch (action.type) {
    case 'TREE_ADD_NODE':
      const { id, path, title = '', pathStr = '', parentPathStr = ''} = action;  
      return {id, path, collapsed: true, title, pathStr, parentPathStr};
    default: 
      return {};
  }
};