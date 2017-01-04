export default (state = [], action) => {
  switch (action.type) {
    case 'BUILD_ORDER':
      return action.payload;
    default:
      return state;
  }  
};