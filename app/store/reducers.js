import {UPDATE_PROP, DEFAULT_PROPS} from './types';

export function editor(state = {}, action) {
  switch (action.type) {
  case UPDATE_PROP:
    return {...state, [action.prop]: action.value};
  case DEFAULT_PROPS:
    return {...action.props};
  default:
    return state;
  }
}
