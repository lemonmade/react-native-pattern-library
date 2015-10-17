import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Defaults, Spacing, Fonts, Colors} from '../styles';

const {
  Component,
  PropTypes,
  TextInput,
} = React;

let styles = Stylish.create({
  input: {
    ...Defaults.BORDER,
    borderRadius: Defaults.BORDER_RADIUS,
    padding: Spacing.HALVED,
    fontSize: Fonts.Sizes.HEADING,
    height: Fonts.Sizes.HEADING + Spacing.DEFAULT,
  },
});

styles.variations({
  disabled: {
    input: {
      backgroundColor: Colors.GRAY_LIGHTER,
      color: Colors.GRAY_DARK,
    },
  },
});

@Stylish.connect(styles)
export default class Field extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    keyboard: PropTypes.oneOf([
      // Cross-platform
      'default',
      'numeric',
      'email-address',

      // iOS-only
      'ascii-capable',
      'numbers-and-punctuation',
      'url',
      'number-pad',
      'phone-pad',
      'name-phone-pad',
      'decimal-pad',
      'twitter',
      'web-search',
    ]),

    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    disabled: false,
    onChange: () => {},
    value: '',
  };

  render() {
    let {disabled, onChange, value, keyboard} = this.props;

    return (
      <TextInput
        styled="input"
        returnKeyType="done"
        editable={!disabled}
        keyboardType={keyboard}
        onChangeText={onChange}
        value={value.toString()}
      />
    );
  }
}
