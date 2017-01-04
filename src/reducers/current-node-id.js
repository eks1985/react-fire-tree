export default (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT_NODE_ID':
      return action.id;
    default:
      return state;
  }
};