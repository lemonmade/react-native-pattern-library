import React from 'react-native';

const {PropTypes} = React;

const FUNCTION_PROPTYPES = [
  'instanceOf',
  'oneOf',
  'oneOfType',
  'arrayOf',
  'objectOf',
  'shape',
];

const PROPTYPE_NAMES = {
  any: 'Any',

  array: 'Array',
  bool: 'Boolean',
  func: 'Function',
  number: 'Number',
  object: 'Object',
  string: 'String',

  node: 'Node',
  element: 'Element',
};

const NAME = '_PLName';
const SHAPE = '_PLShape';

export function inject() {
  Object.keys(PropTypes).forEach((type) => {
    let propType = PropTypes[type];

    if (FUNCTION_PROPTYPES.indexOf(type) < 0) {
      propType[NAME] = type;
      propType.isRequired[NAME] = type;
      return;
    }

    PropTypes[type] = function(...args) {
      let result = propType.apply(this, args);

      result[SHAPE] = args;
      result[NAME] = type;
      result.isRequired[SHAPE] = args;
      result.isRequired[NAME] = type;

      return result;
    };
  });
}

export function resolve(propType) {
  if (!propType) { return {}; }

  let name = propType[NAME];

  return {
    type: PROPTYPE_NAMES[name] || name,
    shape: propType[SHAPE],
    required: !propType.hasOwnProperty('isRequired'),
  };
}

export function isSimpleType(type) {
  return FUNCTION_PROPTYPES.indexOf(type) < 0;
}
