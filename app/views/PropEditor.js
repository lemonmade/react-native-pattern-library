import React from 'react-native';

const {
  Component,
  View,
  PropTypes,
} = React;

import {Field, Toggle, Chooser, Banner} from '../components';

export default class PropEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    prop: PropTypes.object.isRequired,
    value: PropTypes.any,
  };

  static defaultProps = {};

  handleChange(prop, value) {
    this.props(prop, value);
  }

  render() {
    let {prop, value, onChange} = this.props;
    let {type, name, shape} = prop;

    function handleChange(newValue) { onChange(name, newValue); }

    switch (type.toLowerCase()) {
    case 'string':
      return (
        <Field
          value={value}
          onChange={handleChange}
        />
      );

    case 'number':
      return (
        <Field
          value={value}
          keyboard="number-pad"
          onChange={(newValue) => handleChange(parseInt(newValue, 10))}
        />
      );

    case 'boolean':
      return (
        <Toggle
          value={value}
          onChange={handleChange}
        />
      );

    case 'oneof':
      return (
        <Chooser
          onChange={handleChange}
          options={shape[0]}
          selected={shape[0].indexOf(value)}
        />
      );

    default:
      return <Banner>Sorry, you can't edit props of this type.</Banner>;
    }
  }
}
