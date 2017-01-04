export const setModal = ({x = 0, y = 0, dataSource = '', data = {}, boardId = '', fullScreen = false}) => {
  return {
    type: 'SET_MODAL',
    x,
    y,
    dataSource,
    data,
    boardId,
    fullScreen
  };
};