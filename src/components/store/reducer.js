import { ADD, SUB } from './constants.js'


const defaultState = {
  counter: 0
}

function reducer(state = defaultState, action) {
  switch (action.type) {
    case ADD:
      return {...state, counter: state.counter + action.num};
    case SUB:
      return {...state, counter: state.counter - action.num};
    default:
      return state;
  }
}

export default reducer