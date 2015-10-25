import { expect } from 'chai';
import { List, Map } from 'immutable';

describe('immutability', () => {
  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      const state = 42;
      const nextState = increment(state);

      expect(nextState).to.equal(43);
      // Incrementing state will not change original
      expect(state).to.equal(42);
    });
  });

  describe('a List', () => {
    function addElement(currentState, element) {
      return currentState.push(element);
    }

    it('is immutable', () => {
      const state = List.of('one', 'two');
      const nextState = addElement(state, 'three');

      expect(nextState).to.equal(List.of(
        'one',
        'two',
        'three'
      ));

      // Original list does not change.
      // Compare this to the regular js push where
      // the orignal list is mutated
      expect(state).to.equal(List.of(
        'one',
        'two'
      ));
    });
  });

  // A tree is just a nested data structure with Maps and Lists
  // or other collections
  describe('a tree', () => {
    function addElement(currentState, element) {
      return currentState.update('elements',
                                 elements => elements.push(element));
    }

    it('is immutable', () => {
      const state = Map({
        elements: List.of('one', 'two')
      });

      const nextState = addElement(state, 'three');

      // New tree with elements updated
      expect(nextState).to.equal(Map({
        elements: List.of('one', 'two', 'three')
      }));

      // Original tree stays the same
      expect(state).to.equal(Map({
        elements: List.of('one', 'two')
      }));
    });
  });
});