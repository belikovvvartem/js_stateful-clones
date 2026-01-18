'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        newState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        newState = currentState;
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
