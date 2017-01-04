import reducer from '../index';
/*global expect */

describe('tree reducer', () => {
  
  //ADD NEW NODE
  
  it('should add new node child', () => {
    
    const tree = {
						      0: {id: 0, path: [0], collapsed: true},
						      1: {id: 1, path: [0, 0], collapsed: true},
						      2: {id: 2, path: [0, 1], collapsed: true},
						      3: {id: 3, path: [0, 1, 0], collapsed: true},
						      5: {id: 5, path: [0, 1, 1], collapsed: true},
						      4: {id: 4, path: [1], collapsed: true},
						      6: {id: 6, path: [1, 0], collapsed: true},
			    			};
    const actual = tree;
    const expected = {
						      0: {id: 0, path: [0], collapsed: true},
						      7: {id: 7, path: [0, 2], collapsed: true},
						      1: {id: 1, path: [0, 0], collapsed: true},
						      2: {id: 2, path: [0, 1], collapsed: true},
						      3: {id: 3, path: [0, 1, 0], collapsed: true},
						      5: {id: 5, path: [0, 1, 1], collapsed: true},
						      4: {id: 4, path: [1], collapsed: true},
						      6: {id: 6, path: [1, 0], collapsed: true},
			    			};
			    			
		const action = {
		  type: 'ADD_NODE',
		  insertToType: 'child',
		  id: 7,
		  insertToId: 0,
		} ;
		
		// console.log("*** result  ***\n", reducer(actual, action));
		
    try {
      expect(reducer(actual, action)).toEqual(expected);
    } catch (err) {
      console.log(err);
      throw err;
    }
    
  });
  
  it('should insert node before actual', () => {
    const key1 = "a";
    const key2 = "b";
    const key3 = "c";
    const key4 = "d";
    const key5 = "e";
    const key6 = "f";
    const key7 = "g";
    const key8 = "h";
    const key9 = "j";
    const key10 = "k";
    
    const tree = {
      					      [key1]: {id: key1, path: [0], collapsed: true},
      					        [key2]: {id: key2, path: [0, 0], collapsed: true},
      					        [key3]: {id: key3, path: [0, 1], collapsed: true}, 
      					          [key4]: {id: key4, path: [0, 1, 0], collapsed: true},
      					          [key5]: {id: key5, path: [0, 1, 1], collapsed: true},
      					         [key6]: {id: key6, path: [0, 2], collapsed: true},
      					          [key7]: {id: key7, path: [0, 2, 0], collapsed: true},
      					      [key8]: {id: key8, path: [1], collapsed: true},
      					        [key9]: {id: key9, path: [1, 0], collapsed: true},
      		    			};
      		    			
    const action = {
		  type: 'ADD_NODE',
		  insertToType: 'before',
		  insertToId: key3,
		  id: key10
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    // console.log("***actual\n", actual);
      		    			
    const expected = {
      					       [key1]: {id: key1, path: [0], collapsed: true},
      					         [key2]: {id: key2, path: [0, 0], collapsed: true},
      					         [key10]: {id: key10, path: [0, 1], collapsed: true}, 
      					         [key3]: {id: key3, path: [0, 2], collapsed: true}, 
      					           [key4]: {id: key4, path: [0, 2, 0], collapsed: true},
      					           [key5]: {id: key5, path: [0, 2, 1], collapsed: true},
      					         [key6]: {id: key6, path: [0, 3], collapsed: true},
      					           [key7]: {id: key7, path: [0, 3, 0], collapsed: true},
      					       [key8]: {id: key8, path: [1], collapsed: true},
      					         [key9]: {id: key9, path: [1, 0], collapsed: true},
      		    			 };
		 
		// console.log("***expected\n", expected);      		    			 
      		    			 
    try {
      expect(
        actual
      ).toEqual(expected);
    } catch (error) {
      throw error;
    }
  });
  
  it('should insert node after actual', () => {
    
    const key1 = "a";
    const key2 = "b";
    const key3 = "c";
    const key4 = "d";
    const key5 = "e";
    const key6 = "f";
    const key7 = "g";
    const key8 = "h";
    const key9 = "j";
    const key10 = "k";
    
    const tree = {
      					      [key1]: {id: key1, path: [0], collapsed: true},
      					        [key2]: {id: key2, path: [0, 0], collapsed: true},
      					        [key3]: {id: key3, path: [0, 1], collapsed: true}, 
      					          [key4]: {id: key4, path: [0, 1, 0], collapsed: true},
      					          [key5]: {id: key5, path: [0, 1, 1], collapsed: true},
      					        [key6]: {id: key6, path: [0, 2], collapsed: true},
      					          [key7]: {id: key7, path: [0, 2, 0], collapsed: true},
      					      [key8]: {id: key8, path: [1], collapsed: true},
      					        [key9]: {id: key9, path: [1, 0], collapsed: true},
      		    			};
      		    			
    const action = {
		  type: 'ADD_NODE',
		  insertToType: 'after', 
		  insertToId: key3,
		  id: key10
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    // console.log("***actual\n", actual);
      		    			
    const expected = {
      					       [key1]: {id: key1, path: [0], collapsed: true},
      					         [key2]: {id: key2, path: [0, 0], collapsed: true},
      					         [key3]: {id: key3, path: [0, 1], collapsed: true}, 
      					           [key4]: {id: key4, path: [0, 1, 0], collapsed: true},
      					           [key5]: {id: key5, path: [0, 1, 1], collapsed: true},
      					         [key10]: {id: key10, path: [0, 2], collapsed: true},  
      					         [key6]:  {id: key6,  path: [0, 3], collapsed: true},
      					           [key7]: {id: key7, path: [0, 3, 0], collapsed: true},
      					       [key8]: {id: key8, path: [1], collapsed: true},
      					         [key9]: {id: key9, path: [1, 0], collapsed: true},
      		    			 };
		 
		// console.log("***expected\n", expected);      		    			 
      		    			 
    try {
      expect(
        actual
      ).toEqual(expected);
    } catch (error) {
      throw error;
    }
  });
  
  //DELETE NODE
  
  it('should delete node', () => {
    const tree = {
      					      0: {id: 0, path: [0], collapsed: true},
      					        1: {id: 1, path: [0, 0], collapsed: true},
      					        2: {id: 2, path: [0, 1], collapsed: true}, 
      					          3: {id: 3, path: [0, 1, 0], collapsed: true},
      					          4: {id: 4, path: [0, 1, 1], collapsed: true},
      					        5: {id: 5, path: [0, 2], collapsed: true},
      					          51: {id: 51, path: [0, 2, 0], collapsed: true},
      					      6: {id: 6, path: [1], collapsed: true},
      					        7: {id: 7, path: [1, 0], collapsed: true},
      		    			};
      		    			
    const action = {
		  type: 'DELETE_NODE',
		  deleteId: 5
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    // console.log("***actual\n", actual);
      		    			
    const expected = {
      					      0: {id: 0, path: [0], collapsed: true},
      					        1: {id: 1, path: [0, 0], collapsed: true},
      					        2: {id: 2, path: [0, 1], collapsed: true}, 
      					          3: {id: 3, path: [0, 1, 0], collapsed: true},
      					          4: {id: 4, path: [0, 1, 1], collapsed: true},
      					      6: {id: 6, path: [1], collapsed: true},
      					        7: {id: 7, path: [1, 0], collapsed: true},
      		    			};
		 
		// console.log("***expected\n", expected);       		    			 
      		    			 
      expect(actual).toEqual(expected);

  }); 
  
  it('should delete node 1', () => {
    
    const key1 = "aaa";
    const key2 = "bbb";
    const key3 = "ccc";
    
    const tree = {
      					      [key1]: {id: key1, path: [0], collapsed: true},
      					      [key2]: {id: key2, path: [1], collapsed: true},
      					      [key3]: {id: key3, path: [2], collapsed: true}, 
      		    			};
      		    			
    // console.log("***tree", tree);
      		    			
    const action = {
		  type: 'DELETE_NODE',
		  deleteId: key1
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    // console.log("***actual\n", actual);
      		    			
    const expected = {
      					      [key2]: {id: key2, path: [0], collapsed: true},
      					      [key3]: {id: key3, path: [1], collapsed: true},
      		    			};
		 
		// console.log("***expected\n", expected);       		    			 
      		    			 
    try {
      expect(
        actual
      ).toEqual(expected);
    } catch (error) {
      throw error;
    }
  }); 
  
  //MOVE NODE
  
    //MOVE BEFORE
  
  it('should move node before actual (with reduce path)', () => {
    
    const tree = {
    					     a: {id: "a", path: [0], collapsed: true},
      					     b: {id: "b", path: [0, 0], collapsed: true},
    					       c: {id: "c", path: [0, 1], collapsed: true}, 
    					         d: {id: "d", path: [0, 1, 0], collapsed: true},
    					         e: {id: "e", path: [0, 1, 1], collapsed: true},
    					       f: {id: "f", path: [0, 2], collapsed: true},
    					         g: {id: "g", path: [0, 2, 0], collapsed: true},
    					     h: {id: "h", path: [1], collapsed: true},
    					       j: {id: "j", path: [1, 0], collapsed: true},
      		    	 };
      		    			
    const action = {
		  type: 'COMMIT_MOVE',
		  moveId: "c",
		  moveToId: "a",
		  moveType: 'before'
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    // console.log("***actual\n", actual);
      		    			
    const expected = {
                      c: {id: "c", path: [0], collapsed: true}, 
      					          d: {id: "d", path: [0, 0], collapsed: true},
      					          e: {id: "e", path: [0, 1], collapsed: true},
      					      a: {id: "a", path: [1], collapsed: true},
      					        b: {id: "b", path: [1, 0], collapsed: true},
      					        f: {id: "f", path: [1, 1], collapsed: true},
      					          g: {id: "g", path: [1, 1, 0], collapsed: true},
      					      h: {id: "h", path: [2], collapsed: true},
      					        j: {id: "j", path: [2, 0], collapsed: true},
      		    			};
		 
		// console.log("***expected\n", expected);      		    			 
      		    			 
    expect(actual).toEqual(expected);
      
  });
  
  it('should move node before actual (with increase path)', () => {
    
    const tree = {
    					     a: {id: "a", path: [0], collapsed: true},
      					     b: {id: "b", path: [0, 0], collapsed: true},
    					       c: {id: "c", path: [0, 1], collapsed: true}, 
    					         d: {id: "d", path: [0, 1, 0], collapsed: true},
    					         e: {id: "e", path: [0, 1, 1], collapsed: true},
    					       f: {id: "f", path: [0, 2], collapsed: true},
    					         g: {id: "g", path: [0, 2, 0], collapsed: true},
    					     h: {id: "h", path: [1], collapsed: true},
    					       j: {id: "j", path: [1, 0], collapsed: true},
      		    	 };
      		    			
    const action = {
		  type: 'COMMIT_MOVE',
		  moveId: "c",
		  moveToId: "g",
		  moveType: 'before'
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    // console.log("***actual\n", actual);
      		    			
    const expected = {
        					     a: {id: "a", path: [0], collapsed: true},
          					     b: {id: "b", path: [0, 0], collapsed: true},
        					       f: {id: "f", path: [0, 1], collapsed: true}, //
          					       c: {id: "c", path: [0, 1, 0], collapsed: true}, //
          					         d: {id: "d", path: [0, 1, 0, 0], collapsed: true}, //
          					         e: {id: "e", path: [0, 1, 0, 1], collapsed: true}, //
        					         g: {id: "g", path: [0, 1, 1], collapsed: true},
        					     h: {id: "h", path: [1], collapsed: true},
        					       j: {id: "j", path: [1, 0], collapsed: true},
          		    	 };
		 
		// console.log("***expected\n", expected);      		    			 
      		    			 
    expect(actual).toEqual(expected);
      
  });
  
  it('should move node before actual (with the same path length)', () => {
    
    const tree = {
    					     a: {id: "a", path: [0], collapsed: true},
      					     b: {id: "b", path: [0, 0], collapsed: true},
    					       c: {id: "c", path: [0, 1], collapsed: true}, 
    					         d: {id: "d", path: [0, 1, 0], collapsed: true},
    					         e: {id: "e", path: [0, 1, 1], collapsed: true},
    					       f: {id: "f", path: [0, 2], collapsed: true},
    					         g: {id: "g", path: [0, 2, 0], collapsed: true},
    					     h: {id: "h", path: [1], collapsed: true},
    					       j: {id: "j", path: [1, 0], collapsed: true},
      		    	 };
      		    			
    const action = {
		  type: 'COMMIT_MOVE',
		  moveId: "c",
		  moveToId: "b",
		  moveType: 'before'
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    // console.log("***actual\n", actual);
      		    			
    const expected = {
        					     a: {id: "a", path: [0], collapsed: true},
        					       c: {id: "c", path: [0, 0], collapsed: true}, 
        					         d: {id: "d", path: [0, 0, 0], collapsed: true},
        					         e: {id: "e", path: [0, 0, 1], collapsed: true},
        					       b: {id: "b", path: [0, 1], collapsed: true},
        					       f: {id: "f", path: [0, 2], collapsed: true},
        					         g: {id: "g", path: [0, 2, 0], collapsed: true},
        					     h: {id: "h", path: [1], collapsed: true},
        					       j: {id: "j", path: [1, 0], collapsed: true},
          		    	 };
		 
		// console.log("***expected\n", expected);      		    			 
      		    			 
    expect(actual).toEqual(expected);
      
  });
  
    //MOVE AFTER
  
  it('should move node after actual (with reduce path)', () => {
    
    const tree = {
    					     a: {id: "a", path: [0], collapsed: true},
      					     b: {id: "b", path: [0, 0], collapsed: true},
    					       c: {id: "c", path: [0, 1], collapsed: true}, 
    					         d: {id: "d", path: [0, 1, 0], collapsed: true},
    					         e: {id: "e", path: [0, 1, 1], collapsed: true},
    					       f: {id: "f", path: [0, 2], collapsed: true},
    					         g: {id: "g", path: [0, 2, 0], collapsed: true},
    					     h: {id: "h", path: [1], collapsed: true},
    					       j: {id: "j", path: [1, 0], collapsed: true},
      		    	 };
      		    			
    const action = {
		  type: 'COMMIT_MOVE',
		  moveId: "c",
		  moveToId: "a",
		  moveType: 'after'
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    const expected = {
        					     a: {id: "a", path: [0], collapsed: true},
          					     b: {id: "b", path: [0, 0], collapsed: true},
        					       f: {id: "f", path: [0, 1], collapsed: true},
        					         g: {id: "g", path: [0, 1, 0], collapsed: true},
        					     c: {id: "c", path: [1], collapsed: true}, 
        					         d: {id: "d", path: [1, 0], collapsed: true},
        					         e: {id: "e", path: [1, 1], collapsed: true},
        					     h: {id: "h", path: [2], collapsed: true},
        					       j: {id: "j", path: [2, 0], collapsed: true},
          		    	 };
      		    			
		 
    expect(actual).toEqual(expected);
      
  });
  
  it('should move node after actual (with increase path)', () => {
    
    const tree = {
    					     a: {id: "a", path: [0], collapsed: true},
      					     b: {id: "b", path: [0, 0], collapsed: true},
    					       c: {id: "c", path: [0, 1], collapsed: true}, 
    					         d: {id: "d", path: [0, 1, 0], collapsed: true},
    					         e: {id: "e", path: [0, 1, 1], collapsed: true},
    					       f: {id: "f", path: [0, 2], collapsed: true},
    					         g: {id: "g", path: [0, 2, 0], collapsed: true},
    					     h: {id: "h", path: [1], collapsed: true},
    					       j: {id: "j", path: [1, 0], collapsed: true},
      		    	 };
      		    			
    const action = {
		  type: 'COMMIT_MOVE',
		  moveId: "c",
		  moveToId: "g",
		  moveType: 'after'
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    const expected = {
        					     a: {id: "a", path: [0], collapsed: true},
          					     b: {id: "b", path: [0, 0], collapsed: true},
        					       f: {id: "f", path: [0, 1], collapsed: true},
        					         g: {id: "g", path: [0, 1, 0], collapsed: true},
        					         c: {id: "c", path: [0, 1, 1], collapsed: true}, 
          					         d: {id: "d", path: [0, 1, 1, 0], collapsed: true},
          					         e: {id: "e", path: [0, 1, 1, 1], collapsed: true},
        					     h: {id: "h", path: [1], collapsed: true},
        					       j: {id: "j", path: [1, 0], collapsed: true},
          		    	 };
		 
    expect(actual).toEqual(expected);
      
  });
  
  it('should move node after actual (with the same path length)', () => {
    
    const tree = {
    					     a: {id: "a", path: [0], collapsed: true},
      					     b: {id: "b", path: [0, 0], collapsed: true},
    					       c: {id: "c", path: [0, 1], collapsed: true}, 
    					         d: {id: "d", path: [0, 1, 0], collapsed: true},
    					         e: {id: "e", path: [0, 1, 1], collapsed: true},
    					       f: {id: "f", path: [0, 2], collapsed: true},
    					         g: {id: "g", path: [0, 2, 0], collapsed: true},
    					     h: {id: "h", path: [1], collapsed: true},
    					       j: {id: "j", path: [1, 0], collapsed: true},
      		    	 };
      		    			
    const action = {
		  type: 'COMMIT_MOVE',
		  moveId: "c",
		  moveToId: "f",
		  moveType: 'after' 
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    const expected = {
        					     a: {id: "a", path: [0], collapsed: true},
          					     b: {id: "b", path: [0, 0], collapsed: true},
        					       f: {id: "f", path: [0, 1], collapsed: true},
        					         g: {id: "g", path: [0, 1, 0], collapsed: true},
        					       c: {id: "c", path: [0, 2], collapsed: true}, 
        					         d: {id: "d", path: [0, 2, 0], collapsed: true},
        					         e: {id: "e", path: [0, 2, 1], collapsed: true},
        					     h: {id: "h", path: [1], collapsed: true},
        					       j: {id: "j", path: [1, 0], collapsed: true},
          		    	 };
		 
    expect(actual).toEqual(expected);
      
  });
  
    //MOVE AS cHILD
    
  it('should move node to actual last child', () => {
    
    const tree = {
    					     a: {id: "a", path: [0], collapsed: true},
      					     b: {id: "b", path: [0, 0], collapsed: true},
    					       c: {id: "c", path: [0, 1], collapsed: true}, 
    					         d: {id: "d", path: [0, 1, 0], collapsed: true},
    					         e: {id: "e", path: [0, 1, 1], collapsed: true},
    					       f: {id: "f", path: [0, 2], collapsed: true},
    					         g: {id: "g", path: [0, 2, 0], collapsed: true},
    					     h: {id: "h", path: [1], collapsed: true},
    					       j: {id: "j", path: [1, 0], collapsed: true},
      		    	 };
      		    			
    const action = {
		  type: 'COMMIT_MOVE',
		  moveId: "c",
		  moveToId: "a",
		  moveType: 'child' 
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    const expected = {
    					     a: {id: "a", path: [0], collapsed: true},
      					     b: {id: "b", path: [0, 0], collapsed: true},
    					       f: {id: "f", path: [0, 1], collapsed: true},
    					         g: {id: "g", path: [0, 1, 0], collapsed: true},
    					       c: {id: "c", path: [0, 2], collapsed: true}, 
    					         d: {id: "d", path: [0, 2, 0], collapsed: true},
    					         e: {id: "e", path: [0, 2, 1], collapsed: true},
    					     h: {id: "h", path: [1], collapsed: true},
    					       j: {id: "j", path: [1, 0], collapsed: true},
      		    	 };
		 
    expect(actual).toEqual(expected);
      
  });
  
  it('should move node to actual last child 1', () => {
    
    const tree = {
          'a': {id: 'a', path: [0], collapsed: true},
          'b': {id: 'b', path: [0, 0], collapsed: true},
          'c': {id: 'c', path: [0, 0, 0], collapsed: true},
        };
      		    			
    const action = {
		  type: 'COMMIT_MOVE',
		  moveId: "c",
		  moveToId: "a",
		  moveType: 'child' 
		} ;
      		    			
    const actual  = reducer(tree, action); 
    
    const expected = {
          'a': {id: 'a', path: [0], collapsed: true},
          'b': {id: 'b', path: [0, 0], collapsed: true},
          'c': {id: 'c', path: [0, 1], collapsed: true},
        };
		 
    expect(actual).toEqual(expected);
      
  });
  
});