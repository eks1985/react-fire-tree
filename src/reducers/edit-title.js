const initialState = {id: ''};
export default (state, action) => {
  switch (action.type) {
    case 'TREE_START_EDIT_TITLE': 
      return {...state, id: action.id};
    case 'TREE_COMMIT_EDIT_TITLE':
      return {...state, id: ''};
    default:
      return state || initialState;
  }
};