const initialState = {x: 0, y: 0, data: {}, dataSource: '', boardId: '', fullScreen: false};
export default (state , action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return {...state, ...action};
    default:
      return state || initialState;
  }
};
