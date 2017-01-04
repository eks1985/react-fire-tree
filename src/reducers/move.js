const initialState = {
  moveId: '',
  moveType: ''
};

export default (state, action) => {
  switch (action.type) {
    case 'TREE_SET_MOVE_OBJECT':
      const { moveId, moveType } = action;
      return {...state, moveId: moveId, moveType: moveType};
    case 'TREE_RESET_MOVE':
      return {...state, ...initialState};
    default: 
      return state || initialState;
  }
};