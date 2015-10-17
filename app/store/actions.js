import {UPDATE_PROP, DEFAULT_PROPS} from './types';

export function updateProp(prop, value) {
  return {type: UPDATE_PROP, prop, value};
}

export function defaultProps(props) {
  return {type: DEFAULT_PROPS, props};
}
