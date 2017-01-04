import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../index';
/* global expect */

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  
  it('completeMove move => commitMove + resetMove', () => {
    const store = mockStore({
      tree: {
        'foo': {id: 'foo', path: [0], collapsed: true},
        'bar': {id: 'bar', path: [1], collapsed: true}
      },
      move: {
        moveId: 'bar',
        moveType: 'before'
      } 
    });
    
    const expectedActions = [
      {type: 'COMMIT_MOVE', moveId: 'bar', moveToId: 'foo', moveType: 'before'},
      {type: 'RESET_MOVE'}
    ];
    
    store.dispatch(actions.completeMove('foo'));
    
    expect(store.getActions()).toEqual(expectedActions);

  });
  
  it('setMoveObject', () => {
    expect(actions.setMoveObject('foo', 'after'))
    .toEqual({
      type: 'SET_MOVE_OBJECT',
      moveId: 'foo',
      moveType: 'after'
    });
  });
  
});