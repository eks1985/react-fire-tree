import reducer from '../tree-node';
import { expect } from 'chai';

describe('tree-node reducer', () => {
  it('should return new child', () => {
    const expected = {id: 10, path: [0, 1, 2], collapsed: true};
    const actual = reducer(undefined, {type: 'ADD_NODE', id: 10, path: [0, 1, 2]});
    try {
      expect(
        actual
      ).to.deep.equal(expected);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  
  
});
